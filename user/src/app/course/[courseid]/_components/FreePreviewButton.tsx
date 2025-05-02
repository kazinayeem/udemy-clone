"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FreePreviewButtonProps {
  videoUrl: string;
}

export default function FreePreviewButton({
  videoUrl,
}: FreePreviewButtonProps) {
  const [open, setOpen] = useState(false);

  // Ensure the URL is in embed format
  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes("youtube.com/watch?v=")) {
        const videoId = new URL(url).searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return url;
    } catch {
      return "";
    }
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">🎬 Free Preview</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-lg">🎥 Video Preview</DialogTitle>
        </DialogHeader>
        <div className="w-full aspect-video">
          <iframe
            src={embedUrl}
            title="Free Preview Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full border-none rounded-b-md"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
