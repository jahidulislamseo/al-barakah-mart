'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { UploadButton } from './upload-button'

export function ProductForm({ categories }: { categories: any[] }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        categoryId: '',
        image: '',
        inStock: true
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    inStock: true // Default for now
                })
            })

            if (res.ok) {
                router.push('/admin/products')
                router.refresh()
            } else {
                alert('Failed to create product')
            }
        } catch (error) {
            console.error(error)
            alert('Error creating product')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border max-w-2xl">
            <div className="space-y-2">
                <label className="text-sm font-medium">Product Title</label>
                <Input
                    name="title"
                    required
                    placeholder="e.g. Organic Bananas"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Price (৳)</label>
                    <Input
                        name="price"
                        type="number"
                        required
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <select
                        name="categoryId"
                        required
                        className="w-full p-2 border rounded-md text-sm bg-background"
                        value={formData.categoryId}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Product Image</label>
                <input type="hidden" name="image" value={formData.image} />
                <UploadButton onUpload={(url) => setFormData(prev => ({ ...prev, image: url }))} defaultValue={formData.image} />
                <p className="text-xs text-muted-foreground">Upload an image or it will default to a placeholder.</p>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                    name="description"
                    required
                    className="w-full min-h-[100px] p-3 rounded-md border text-sm"
                    placeholder="Product details..."
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Product'}
                </Button>
            </div>
        </form>
    )
}
