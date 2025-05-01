import AddCategory from "./_components/AddCategory";
import AllCategory from "./_components/AllCateogry";

export default function Index() {
  return (
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Category Management</h1>
        <AddCategory/>
        <AllCategory/>
    </div>
  )
}
