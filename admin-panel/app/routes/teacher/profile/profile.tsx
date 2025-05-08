import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useGetUserQuery, useUpdateUserMutation } from "~/redux/api/userApi";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import toast from "react-hot-toast";

interface UserData {
  name?: string;
  email?: string;
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

  const handleEditToggle = () => setIsEditing(true);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await updateUser(userData).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update profile.");
      console.error("Update error:", err);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  if (error)
    return (
      <div className="text-center text-red-500">Error loading profile</div>
    );

  const renderField = (
    label: string,
    name: keyof UserData,
    isTextarea = false,
    editable = true
  ) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {isEditing && editable ? (
        isTextarea ? (
          <Textarea
            name={name as string}
            value={userData[name] || ""}
            onChange={handleInputChange}
            placeholder={`Enter your ${label.toLowerCase()}`}
          />
        ) : (
          <Input
            name={name as string}
            value={userData[name] || ""}
            onChange={handleInputChange}
            placeholder={`Enter your ${label.toLowerCase()}`}
          />
        )
      ) : (
        <p className="text-gray-900 bg-white rounded-md p-2 border">
          {userData[name] || "N/A"}
        </p>
      )}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded space-y-6 mt-3">
      <h2 className="text-3xl font-bold text-gray-800">Your Profile</h2>

      {renderField("Name", "name")}
      {renderField("Email", "email")}
      {renderField("Address", "address")}
      {renderField("Bio", "bio", true)}
      {renderField("Description", "description", true)}

      <div className="pt-4 flex gap-4">
        <Button
          onClick={isEditing ? handleSaveChanges : handleEditToggle}
          className={isEditing ? "bg-green-600 hover:bg-green-700" : ""}
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
