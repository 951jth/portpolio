"use client";

import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { createPortal } from "react-dom";

export interface VideoModalProps {
  videoId: string;
  isOpen: boolean;
  onClose: () => void;
  videoRatio?: "16:9" | "9:16";
}

export default function VideoModal({ videoId, isOpen, onClose, videoRatio = "16:9" }: VideoModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsLoading(true);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="absolute inset-0" 
        onClick={onClose} 
        aria-label="모달 닫기"
      />
      <div className={`relative z-10 w-full flex justify-center ${videoRatio === "16:9" ? "max-w-4xl" : "max-w-md h-[80vh]"}`}>
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-accent transition-colors p-2 rounded-full bg-black/50 hover:bg-black/80"
          aria-label="닫기"
        >
          <X size={24} />
        </button>
        <div className={`w-full h-full relative bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 flex items-center justify-center ${videoRatio === "16:9" ? "aspect-[16/9]" : "aspect-[9/16]"}`}>
           {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white/50 animate-spin" />
            </div>
          )}
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
