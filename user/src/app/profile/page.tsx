"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCookie } from "../auth/action";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  bio: string | null;
  address: string | null;
  country: string | null;
  description: string | null;
  image: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

type FormField = {
  id: keyof User;
  label: string;
  required?: boolean;
  type?: "text" | "email" | "tel" | "textarea";
};

const formFields: FormField[] = [
  { id: "name", label: "Full Name", required: true },
  { id: "email", label: "Email", required: true, type: "email" },
  { id: "phone", label: "Phone Number", type: "tel" },
  { id: "bio", label: "Short Bio", type: "textarea" },
  { id: "description", label: "About You", type: "textarea" },
  { id: "address", label: "Address" },
  { id: "country", label: "Country" },
];

type FormErrors = Partial<Record<keyof User, string>>;

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const router = useRouter();

  const fetchUser = async () => {
    try {
      setLoading(true);
      const token = await getCookie("token");
      if (!token) {
        toast.error("Please login to access your profile");
        router.push("/login");
        return;
      }

      const res = await axios.get<User>("http://localhost:8080/api/user/userid", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data);
      setFormData(res.data); // Initialize formData with user data
    } catch (err) {
      console.error("Failed to fetch user:", err);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [router]);

  const handleChange = (field: keyof User, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const token = await getCookie("token");
      if (!token || !user?.id) {
        toast.error("Authentication required");
        router.push("/login");
        return;
      }

      const res = await axios.put<User>(
        `http://localhost:8080/api/user/${user.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update user and formData
      setUser(res.data);
      setFormData(res.data);
      setEditMode(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update user:", error);
      const err = error as AxiosError;
      const errorMessage = (err.response?.data as { message?: string })?.message || "Failed to update profile";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData(user || {});
    setErrors({});
  };

  const getFieldValue = (fieldId: keyof User): string => {
    return String(formData[fieldId] ?? "");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>

      {loading ? (
        <Card className="p-6 space-y-4">
          {formFields.map(field => (
            <div key={field.id} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-4">
            <Skeleton className="h-10 w-24" />
          </div>
        </Card>
      ) : user ? (
        <Card className="p-6">
          <CardContent className="space-y-6">
            {formFields.map(field => (
              <div key={field.id} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </label>

                {editMode ? (
                  <>
                    {field.type === "textarea" ? (
                      <textarea
                        value={getFieldValue(field.id)}
                        onChange={e => handleChange(field.id, e.target.value)}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        rows={3}
                      />
                    ) : (
                      <Input
                        type={field.type || "text"}
                        value={getFieldValue(field.id)}
                        onChange={e => handleChange(field.id, e.target.value)}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        className={errors[field.id] ? "border-red-500" : ""}
                      />
                    )}
                    {errors[field.id] && (
                      <p className="text-sm text-red-500">{errors[field.id]}</p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-900 dark:text-gray-100 p-2 rounded bg-gray-50 dark:bg-gray-800">
                    {getFieldValue(field.id) ? (
                      getFieldValue(field.id)
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">
                        Not provided
                      </span>
                    )}
                  </p>
                )}
              </div>
            ))}

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
              {editMode ? (
                <>
                  <Button onClick={handleSave} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setEditMode(true)}
                  className="w-full sm:w-auto"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">
            User not found. Please try logging in again.
          </p>
          <Button onClick={() => router.push("/login")} className="mt-4">
            Go to Login
          </Button>
        </div>
      )}
    </div>
  );
}
