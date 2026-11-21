import { useEffect, useState } from "react"

type Dimentions = { width: number; height: number }
export function UseEffect() {
    const [dimentions, setDimentions] = useState<Dimentions>({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    useEffect(() => {
        const handleResize = () => {
            setDimentions({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <code className="text-start font-mono">
            <pre>
                {dimentions.width}&times;{dimentions.height}
            </pre>
        </code>
    )
}