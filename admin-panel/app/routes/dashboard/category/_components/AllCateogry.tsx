import React, { useState } from "react";
import {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "~/redux/api/categoryApi";
import { Card, CardContent } from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "~/components/ui/alert-dialog";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "react-hot-toast";

interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export default function AllCategory() {
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useGetAllCategoriesQuery({});
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [editName, setEditName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // New state to manage dialog visibility

  // Delete Handler
  const handleDelete = async () => {
    if (!selectedCategory) return;
    try {
      await deleteCategory(selectedCategory.id).unwrap();
      toast.success(`Deleted category "${selectedCategory.name}"`);
      setSelectedCategory(null);
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // Edit Handler
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    try {
      await updateCategory({
        id: selectedCategory.id,
        name: editName,
      }).unwrap();
      toast.success(`Updated to "${editName}"`);
      setSelectedCategory(null);
      setEditName("");
      setIsDialogOpen(false); // Close the dialog after successful update
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (isLoading) {
    return (
      <Card className="p-4 space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-4 text-red-500 font-semibold">
        Error: Failed to fetch categories.
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>ID</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category: Category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">
                    {category.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-center">
                      {/* Edit Dialog */}
                      <AlertDialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedCategory(category);
                              setEditName(category.name);
                              setIsDialogOpen(true); // Open the dialog when editing
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Edit Category</AlertDialogTitle>
                          </AlertDialogHeader>
                          <form
                            onSubmit={handleEditSubmit}
                            className="space-y-4"
                          >
                            <div>
                              <Label htmlFor="name">Category Name</Label>
                              <Input
                                id="name"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                required
                              />
                            </div>
                            <AlertDialogFooter>
                              <Button type="submit" disabled={isUpdating}>
                                {isUpdating ? "Updating..." : "Update"}
                              </Button>
                            </AlertDialogFooter>
                          </form>
                        </AlertDialogContent>
                      </AlertDialog>

                      {/* Delete Dialog */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to delete this category?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              <strong>{selectedCategory?.name}</strong> will be
                              permanently deleted.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
