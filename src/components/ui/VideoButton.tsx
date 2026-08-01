"use client";

import { useState } from "react";
import Button from "./Button";
import { Play } from "lucide-react";
import VideoModal from "./VideoModal";

export interface VideoButtonProps {
  videoId: string;
  title: string;
  videoRatio?: "16:9" | "9:16";
}

export default function VideoButton({ videoId, title, videoRatio = "16:9" }: VideoButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        icon={<Play size={14} />}
        iconPosition="left"
        aria-label={`${title} 동영상 보기`}
      >
        영상 보기
      </Button>
      <VideoModal
        videoId={videoId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        videoRatio={videoRatio}
      />
    </>
  );
}
