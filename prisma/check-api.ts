async function main() {
    console.log('Fetching from http://localhost:3000/api/products ...')
    try {
        const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' })
        console.log(`Status: ${res.status}`)
        if (!res.ok) {
            console.error(`Status text: ${res.statusText}`)
            const text = await res.text()
            console.error(text)
            return
        }
        const data = await res.json()
        console.log(`API returned ${data.length} products`)
        data.forEach((p: any) => console.log(`- ${p.title} (${p.image})`))
    } catch (e) {
        console.error('Fetch error:', e)
    }
}

main()
