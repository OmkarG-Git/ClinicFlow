"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Upload, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button/Button";

interface LogoUploaderProps {
  value?: string;
  onUpload: (url: string) => void;
  onFileSelect?: (file: File | null) => void;
}

export function LogoUploader({
  value,
  onUpload,
  onFileSelect,
}: LogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(value ?? "");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  async function handleFile(file: File) {
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      alert("Only PNG, JPG and WEBP are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5MB.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onFileSelect?.(file);

    setUploading(true);

    try {
      // Cloudinary upload comes next
      // const url = await uploadLogo(file);
      
      // temporary
      const url = objectUrl;
      onUpload(url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-6">
      <div className="relative flex-shrink-0">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-border flex items-center justify-center">
          {preview ? (
            <Image
              src={preview}
              alt="Clinic Logo"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera className="h-8 w-8 text-slate-400" />
          )}
        </div>

        <AnimatePresence>
          {preview && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              type="button"
              onClick={() => {
                setPreview("");
                onUpload("");
                onFileSelect?.(null);
              }}
              className="absolute -top-1 -right-1 p-1 bg-red-500 hover:bg-red-600 rounded-full shadow-lg transition-colors"
            >
              <X className="h-3.5 w-3.5 text-white" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
            className="h-9 px-4 text-sm"
          >
            <Upload className="mr-2 h-3.5 w-3.5" />
            {preview ? "Change Logo" : "Upload Logo"}
          </Button>

          {preview && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setPreview("");
                onUpload("");
                onFileSelect?.(null);
              }}
              className="h-9 px-3 text-sm text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              Remove
            </Button>
          )}

          {uploading && (
            <span className="text-sm text-muted-foreground animate-pulse">
              Uploading...
            </span>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-1.5">
          PNG, JPG or WEBP • Max 5MB
        </p>

        <input
          ref={inputRef}
          hidden
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) handleFile(file);
          }}
          className={`mt-2 border-2 border-dashed rounded-lg p-3 text-center transition-colors cursor-pointer ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/40 hover:bg-neutral-800"
          }`}
          onClick={() => inputRef.current?.click()}
        >
          <p className="text-xs text-muted-foreground">
            Drag & drop or click to browse
          </p>
        </div>
      </div>
    </div>
  );
}