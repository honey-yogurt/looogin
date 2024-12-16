'use client'

import { useState } from "react"
import { Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  className?: string
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      toast.error("请上传图片文件")
      return
    }

    // 验证文件大小（例如最大 5MB）
    if (file.size > 5 * 1024 * 1024) {
      toast.error("图片大小不能超过 5MB")
      return
    }

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      onChange(data.url)
    } catch (error) {
      toast.error("上传失败，请重试")
      console.error(error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className={cn(
      "relative border-2 border-dashed rounded-lg overflow-hidden",
      className
    )}>
      {value ? (
        <>
          <img
            src={value}
            alt="Upload"
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white"
          >
            <X className="w-4 h-4" />
          </button>
        </>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-gray-50">
          <Upload className="w-6 h-6 mb-2 text-gray-400" />
          <span className="text-sm text-gray-500">
            {isUploading ? "上传中..." : "点击上传"}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  )
} 