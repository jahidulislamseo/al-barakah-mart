'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Upload, X, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface UploadButtonProps {
    onUpload: (url: string) => void
    defaultValue?: string
}

export function UploadButton({ onUpload, defaultValue }: UploadButtonProps) {
    const [image, setImage] = useState(defaultValue || '')
    const [loading, setLoading] = useState(false)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setLoading(true)

        try {
            // 1. Get signature
            const timestamp = Math.round(new Date().getTime() / 1000)
            const paramsToSign = {
                timestamp,
                folder: 'al-barakah-mart',
            }

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({ paramsToSign }),
            })
            const { signature } = await res.json()

            if (!signature) throw new Error('Failed to get signature')

            // 2. Upload to Cloudinary
            const formData = new FormData()
            formData.append('file', file)
            formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '')
            formData.append('timestamp', timestamp.toString())
            formData.append('signature', signature)
            formData.append('folder', 'al-barakah-mart')

            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
            if (!cloudName) throw new Error('Missing Cloud Name')

            const uploadRes = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            )
            const data = await uploadRes.json()

            if (data.secure_url) {
                setImage(data.secure_url)
                onUpload(data.secure_url)
            }
        } catch (error) {
            console.error('Upload failed:', error)
            alert('Upload failed. Please check your API keys.')
        } finally {
            setLoading(false)
        }
    }

    if (image) {
        return (
            <div className="relative w-40 h-40 border rounded-lg overflow-hidden group">
                <Image src={image} alt="Product" fill className="object-cover" />
                <button
                    type="button"
                    onClick={() => {
                        setImage('')
                        onUpload('')
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-4">
            <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                disabled={loading}
            >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                Upload Image
            </Button>
            <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
            />
        </div>
    )
}
