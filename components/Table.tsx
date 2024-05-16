
export default function Table({ title, description }: { title: string; description: string; }) {
    return (
        <div className="flex flex-col gap-2 items-start">
            <h1 className="font-bold text-lg">{title}</h1>
            <h1>{description}</h1>
        </div>
    )
}
