'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight, CheckCircle, Leaf, ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
    {
        image: '/images/hero/hero-1.png',
        title: 'Fresh Groceries',
        subtitle: 'Delivered to You',
        description: 'Experience the best quality organic fruits, vegetables, and daily essentials. Sourced directly from farmers to your kitchen table.'
    },
    {
        image: '/images/hero/hero-2.png',
        title: 'Farm Fresh Vegetables',
        subtitle: '100% Organic',
        description: 'Handpicked vegetables from certified organic farms. No pesticides, no chemicals, just pure natural goodness.'
    },
    {
        image: '/images/hero/hero-3.png',
        title: 'Seasonal Fruits',
        subtitle: 'Nature\'s Best',
        description: 'Enjoy the freshest seasonal fruits delivered to your doorstep. Sweet, juicy, and packed with nutrients.'
    },
    {
        image: '/images/hero/hero-4.png',
        title: 'Fast Delivery',
        subtitle: 'To Your Doorstep',
        description: 'Same-day delivery available. Order before 12 PM and get fresh groceries delivered within hours.'
    }
]

export function HeroSlideshow() {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    return (
        <section className="relative bg-gradient-to-r from-green-50 to-emerald-50 py-12 md:py-20 lg:py-32 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6 md:space-y-8">
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full text-green-700 font-medium text-xs md:text-sm border border-green-100 shadow-sm">
                            <Leaf className="h-3 w-3 md:h-4 md:w-4" /> 100% Organic & Fresh
                        </div>

                        <div className="space-y-3 md:space-y-4">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
                                {slides[currentSlide].title} <br />
                                <span className="text-primary">{slides[currentSlide].subtitle}</span>
                            </h1>
                            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
                                {slides[currentSlide].description}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                            <Link href="/shop">
                                <Button size="lg" className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 text-base md:text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                                    Shop Now <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                                </Button>
                            </Link>
                            <Link href="/about">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 text-base md:text-lg rounded-full border-2">
                                    Learn More
                                </Button>
                            </Link>
                        </div>

                        <div className="flex items-center gap-4 md:gap-8 pt-2 md:pt-4 text-xs md:text-sm font-medium text-gray-500">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500" /> Free Shipping
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500" /> Secure Payment
                            </div>
                        </div>
                    </div>

                    {/* Right Image Slideshow */}
                    <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
                        {/* Images */}
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                <div className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={slide.image}
                                        alt={slide.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                                        className="object-cover"
                                        priority={index === 0}
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all z-10 touch-manipulation"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-gray-800" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all z-10 touch-manipulation"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-gray-800" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`h-2 rounded-full transition-all touch-manipulation ${index === currentSlide
                                            ? 'w-8 bg-primary'
                                            : 'w-2 bg-white/60 hover:bg-white/80'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Blob */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-3xl -z-0" />
        </section>
    )
}
