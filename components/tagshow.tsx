
interface TagInputProps {
  tags?: string[];
}

export default function Tagshow({ tags = [] }: TagInputProps) {
 
  return (
    <div className="flex flex-wrap items-center gap-2 p-4 max-w-3xl relative bg-white w-full">
      {tags.map((tag, index) => (
        <div
          key={`tag${index}`}
          className="flex items-center border border-black px-3 py-1 rounded font-semibold text-sm"
        >
          <span>{tag}</span>
        </div>
      ))}
    </div>
  );
}
