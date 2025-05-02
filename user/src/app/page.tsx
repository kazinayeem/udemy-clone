import HomePageCourse from "@/components/product/HomePageCourse";
import SearchSection from "@/components/product/SearchSection";
import TestimonialsSection from "@/components/product/TestimonialsSection";

export default function Home() {
  return (
    <div >
      <SearchSection/>
      <HomePageCourse />
      <TestimonialsSection/>
    </div>
  );
}
