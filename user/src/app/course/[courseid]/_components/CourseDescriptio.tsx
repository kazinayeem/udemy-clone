"use client";
import React, { useState } from "react";

interface CourseDescriptionProps {
  description: string;
}

export default function CourseDescription({
  description,
}: CourseDescriptionProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const getTruncatedDescription = (desc: string) => {
    const cleanText = desc.replace(/<[^>]+>/g, ""); // Remove HTML tags
    return cleanText.length > 300 ? cleanText.slice(0, 300) + "..." : cleanText;
  };

  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  return (
    <div className="p-6 text-gray-800 leading-relaxed mb-8 tracking-wide text-base/8">
      {!showFullDescription ? (
        <>
          <p>{getTruncatedDescription(description)}</p>
          <button
            className="text-blue-600 text-sm mt-2 font-semibold cursor-pointer"
            onClick={toggleDescription}
          >
            Read More
          </button>
        </>
      ) : (
        <>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
          <button
            className="text-blue-600 text-sm mt-2 font-semibold cursor-pointer"
            onClick={toggleDescription}
          >
            Read Less
          </button>
        </>
      )}
    </div>
  );
}
