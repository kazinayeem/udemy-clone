import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useGetUserQuery, useUpdateUserMutation } from "~/redux/api/userApi";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import toast from "react-hot-toast";

interface UserData {
  name?: string;
  email?: string;
  role?: string;
  address?: string;
  bio?: string;
  description?: string;
  [key: string]: any;
}

export default function Profile() {
  const { data, error, isLoading } = useGetUserQuery({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({});

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (data) setUserData(data);
  }, [data]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      console.log("Saving changes:", userData);

      await updateUser(userData).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update profile.");
      console.error("Update error:", err);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-centertext-center py-10">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500">Error loading profile</div>
    );

  const renderField = (
    label: string,
    name: keyof UserData,
    editable: boolean = true
  ) => (
    <div className="space-y-1">
      <label className="block text-sm text-gray-600 font-medium">{label}</label>
      {isEditing && editable ? (
        <Input
          name={name as string}
          value={userData[name] || ""}
          onChange={handleInputChange}
          placeholder={`Enter your ${name}`}
        />
      ) : (
        <p className="text-gray-800">{userData[name] || "N/A"}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-full mx-auto p-6 bg-gray-200  space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Profile</h2>

      {renderField("Name", "name")}
      {renderField("Email", "email")}
      {renderField("Role", "role", false)}
      {renderField("Address", "address")}
      {renderField("Bio", "bio")}
      {renderField("Description", "description")}

      <div className="pt-4 flex gap-3">
        <Button
          onClick={isEditing ? handleSaveChanges : handleEditToggle}
          className={
            isEditing
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>

        {isEditing && (
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
