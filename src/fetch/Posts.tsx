import { useState, useEffect, useRef } from "react"

type Post = { title: string; id: string }

export function Posts() {
    const [refresh, setRefresh] = useState<boolean>()

    const controller = useRef<AbortController | null>(null)

    const [isLoading, setLoading] = useState<boolean>()
    const [posts, setPosts] = useState<Post[]>()

    useEffect(() => {
        async function pull() {
            controller.current?.abort()
            controller.current = new AbortController()

            setLoading(true)
            try {
                const res = await fetch(
                    "https://jsonplaceholder.typicode.com/posts",
                    { signal: controller.current.signal },
                )
                const data = await res.json()
                setPosts(data)
            } catch (_) {
                console.log("error occured")
            } finally {
                setLoading(false)
            }
        }
        pull()
        // Override reload data for debugging
        // oxlint-disable-next-line react/exhaustive-effect-dependencies
    }, [refresh])

    function handleDeletePost(id: Post["id"]) {
        if (!posts) return
        const newPosts = posts.filter((post) => post.id !== id)
        setPosts(newPosts)
    }

    if (!posts) return <p>Loading...</p>

    return (
        <>
            <button
                onClick={() => setRefresh((v) => !v)}
                className="font-medium bg-teal-950"
            >
                Refresh
            </button>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ol className="text-left max-w-full">
                    {posts.map((p, idx) => {
                        return (
                            <li
                                key={p.id}
                                className="flex gap-2 items-center min-w-0 relative"
                            >
                                <button
                                    onClick={() => handleDeletePost(p.id)}
                                    className="absolute inset-0"
                                    aria-label="Delete Post"
                                />
                                <span className="opacity-40 font-regular font-mono select-none pointer-none">
                                    {idx.toString().padStart(2, "0")}.
                                </span>
                                <p className="truncate">{p.title}</p>
                            </li>
                        )
                    })}
                </ol>
            )}
        </>
    )
}