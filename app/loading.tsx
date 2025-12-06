export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8 animate-pulse">
            {/* Hero Section Skeleton */}
            <div className="h-64 md:h-96 bg-gray-200 rounded-xl mb-12"></div>

            {/* Categories Skeleton */}
            <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-12 w-32 bg-gray-200 rounded-full flex-shrink-0"></div>
                ))}
            </div>

            {/* Products Grid Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="space-y-4">
                        <div className="aspect-square bg-gray-200 rounded-xl"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}
