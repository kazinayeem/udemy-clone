import { Link, useParams } from "react-router";
import { useState } from "react";
import {
  useCreateFqaMutation,
  useGetFqaByIdQuery,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} from "~/redux/api/courseApi";

import toast from "react-hot-toast";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

export default function FAQManager() {
  const { courseId } = useParams<{ courseId: string }>();
  const { data, refetch } = useGetFqaByIdQuery(courseId);
  const [createFqa] = useCreateFqaMutation();
  const [updateFqa] = useUpdateFaqMutation();
  const [deleteFqa] = useDeleteFaqMutation();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!question || !answer) return toast.error("Please fill all fields");

    try {
      if (editId) {
        await updateFqa({ faqId: editId, data: { question, answer } }).unwrap();
        toast.success("FAQ updated");
        setEditId(null);
      } else {
        await createFqa({ courseId, question, answer }).unwrap();
        toast.success("FAQ added");
      }

      setQuestion("");
      setAnswer("");
      refetch();
    } catch (err) {
      toast.error("Failed to submit FAQ");
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFqa(id).unwrap();
      toast.success("FAQ deleted");
      refetch();
    } catch (err) {
      toast.error("Failed to delete FAQ");
    }
  };

  const handleEdit = (faq: any) => {
    setEditId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <Link
        viewTransition
        to={`/teacher/course/course-details/${courseId}`}
        className="text-blue-600 hover:underline"
      >
        ← Back to Course Details
      </Link>
      <h1 className="text-2xl font-bold">Manage FAQs</h1>

      <div className="bg-white p-4 shadow rounded-lg space-y-4">
        <Input
          placeholder="Enter question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Input
          placeholder="Enter answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Button onClick={handleSubmit} className="w-full">
          {editId ? "Update FAQ" : "Add FAQ"}
        </Button>
      </div>

      <div className="space-y-4">
        {data?.data?.length ? (
          data.data.map((faq: any) => (
            <Card key={faq.id} className="border shadow-sm">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold">{faq.question}</h2>
                <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">
                  {faq.answer}
                </p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" onClick={() => handleEdit(faq)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(faq.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No FAQs found for this course.</p>
        )}
      </div>
    </div>
  );
}
