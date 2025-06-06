import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useUpdateCourseMutation } from "~/redux/api/courseApi";

interface PriceFormProps {
  userid: string;
  courseid: string;
  price: number;
}

export default function PriceForm({
  userid,
  courseid,
  price: propsPrice,
}: PriceFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState<number>(propsPrice);

  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const handleSave = async () => {
    if (price !== propsPrice) {
      try {
        await updateCourse({ id: courseid, price }).unwrap();
        setIsEditing(false);
        toast.success("Course price updated successfully!");
      } catch (error) {
        toast.error("Failed to update course price.");
        console.error("Error updating course:", error);
      }
    } else {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between container mx-auto p-4 bg-white shadow-md rounded-lg">
      <div>
        {!isEditing ? (
          <p
            className="text-lg font-semibold cursor-pointer"
            onDoubleClick={() => setIsEditing(true)}
          >
            {price && price > 0
              ? `$${price.toFixed(2)} USD`
              : "Set Course Price"}

            <span className="text-sm text-gray-500">
              {" "}
              (double-click to edit)
            </span>
          </p>
        ) : (
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            placeholder="Course Price"
            className="w-full"
          />
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

      {isLoading && <p className="text-sm text-gray-500 ml-2">Saving...</p>}
    </div>
  );
}
