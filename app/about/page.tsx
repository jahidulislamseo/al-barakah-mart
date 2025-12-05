import { ShieldCheck, Truck, Leaf, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl font-bold mb-6">About Al Barakah Mart</h1>
                <p className="text-xl text-muted-foreground">
                    We are on a mission to deliver fresh, organic, and premium quality groceries to every household in Bangladesh.
                </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                        src="/images/about-team.png"
                        alt="Our Team"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                    />
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold">Our Story</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Founded in 2024, Al Barakah Mart started with a simple idea: that everyone deserves access to fresh, chemical-free food. What began as a small local delivery service has now grown into a trusted online supermarket serving thousands of happy customers.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        We work directly with local farmers and trusted suppliers to ensure that every product you receive meets our strict quality standards. From farm-fresh vegetables to premium meats, we handle everything with care.
                    </p>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="text-center space-y-4 p-6 rounded-xl bg-green-50">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                            <Leaf className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-lg">100% Organic</h3>
                        <p className="text-sm text-muted-foreground">Sourced directly from certified organic farms.</p>
                    </div>
                    <div className="text-center space-y-4 p-6 rounded-xl bg-blue-50">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600">
                            <Truck className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-lg">Fast Delivery</h3>
                        <p className="text-sm text-muted-foreground">Same-day delivery for orders placed before 12 PM.</p>
                    </div>
                    <div className="text-center space-y-4 p-6 rounded-xl bg-purple-50">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-purple-600">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-lg">Quality Guarantee</h3>
                        <p className="text-sm text-muted-foreground">Not satisfied? We offer a 100% money-back guarantee.</p>
                    </div>
                    <div className="text-center space-y-4 p-6 rounded-xl bg-pink-50">
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto text-pink-600">
                            <Heart className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-lg">Customer First</h3>
                        <p className="text-sm text-muted-foreground">24/7 dedicated support to help you with any queries.</p>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to Experience Quality?</h2>
                <p className="text-lg mb-8 opacity-90">Join thousands of satisfied customers and start shopping today.</p>
                <Link href="/shop">
                    <Button size="lg" variant="secondary" className="font-bold">
                        Start Shopping Now
                    </Button>
                </Link>
            </div>
        </div>
    )
}
