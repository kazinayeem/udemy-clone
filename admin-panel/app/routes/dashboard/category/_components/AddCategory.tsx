import React, { useState } from "react";
import { useCreateCategoryMutation } from "~/redux/api/categoryApi";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import toast from "react-hot-toast";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required.");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      toast.success(`Category "${result.name}" created successfully`);
      setName("");
    } catch (error: any) {
      toast.error("Failed to create category.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Adding..." : "Add Category"}
          </Button>
        </form>
      </CardContent>
    </div>
  );
}
