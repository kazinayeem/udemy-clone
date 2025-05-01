import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "~/components/ui/select";
import { useUpdateCourseMutation } from "~/redux/api/courseApi";

interface Category {
  id: string;
  name: string;
}

interface CategoryFormProps {
  productId: string;
  categoryId: string | null;
}

export default function CategoryForm({
  productId,
  categoryId,
}: CategoryFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedId, setSelectedId] = useState<string | undefined>(
    categoryId ?? undefined
  );
  const [isEditing, setIsEditing] = useState(false);

  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_API}/category`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        toast.error("Failed to load categories");
        console.error("Category fetch error:", error);
      }
    };

    fetchCategories();
  }, []);

  const currentCategory = categories.find((cat) => cat.id === selectedId);

  const handleSave = async () => {
    if (selectedId !== categoryId && selectedId) {
      try {
        await updateCourse({ id: productId, categoryId: selectedId }).unwrap();
        toast.success("Category updated successfully!");
        setIsEditing(false);
      } catch (error) {
        toast.error("Failed to update category");
        console.error("Update error:", error);
      }
    } else {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between container mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="w-full">
        {!isEditing ? (
          <p
            className="text-lg font-semibold cursor-pointer"
            onDoubleClick={() => setIsEditing(true)}
          >
            Category: {currentCategory?.name || "Not selected"}
            <span className="text-sm text-gray-500">
              {" "}
              (double-click to edit)
            </span>
          </p>
        ) : (
          <Select
            value={selectedId}
            onValueChange={(val) => setSelectedId(val)}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <Button
        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        className="ml-4"
        disabled={isLoading}
      >
        {isEditing ? "Save" : "Edit"}
        <Pencil className="ml-2" size={16} />
      </Button>

      {isLoading && <p className="text-sm text-gray-500 mt-2">Saving...</p>}
    </div>
  );
}
