'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Image from 'next/image'

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000))
        alert('Message sent successfully!')
        setIsSubmitting(false)
        // Reset form logic would go here
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                <p className="text-xl text-muted-foreground">
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="bg-primary/5 p-8 rounded-2xl space-y-6">
                        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm text-primary">
                                <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Visit Us</h3>
                                <p className="text-muted-foreground">
                                    House #123, Road #4, Dhanmondi<br />
                                    Dhaka-1209, Bangladesh
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm text-primary">
                                <Phone className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Call Us</h3>
                                <p className="text-muted-foreground">
                                    +880 1609132361
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm text-primary">
                                <Mail className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Email Us</h3>
                                <p className="text-muted-foreground">
                                    opjahidulislam@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Customer Support Image */}
                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src="/images/contact-support.png"
                            alt="Customer Support"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-2xl border shadow-sm">
                    <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">First Name</label>
                                <Input required placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Last Name</label>
                                <Input required placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input type="email" required placeholder="john@example.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Subject</label>
                            <Input required placeholder="How can we help?" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Message</label>
                            <textarea
                                required
                                className="w-full min-h-[150px] p-3 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                placeholder="Write your message here..."
                            />
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : (
                                <>
                                    Send Message <Send className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
