import React, {useState, type KeyboardEvent} from "react";
import {X} from "lucide-react";

interface TagInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    tagColor?: "green" | "warn";
}

const TagInput: React.FC<TagInputProps> = ({value, onChange, placeholder, tagColor}) => {
    const [input, setInput] = useState("");

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && input.trim()) {
            e.preventDefault();
            if (!value.includes(input.trim())) {
                onChange([...value, input.trim()]);
            }
            setInput("");
        }
        if (e.key === "Backspace" && !input && value.length > 0) {
            onChange(value.slice(0, -1));
        }
    };

    const removeTag = (tag: string) => {
        onChange(value.filter((t) => t !== tag));
    };

    return (
        <div
            className="flex flex-wrap items-center gap-2 border rounded-lg p-2.5 cursor-text focus-within:ring-1 focus-within:ring-blue-100">
            {value.map((tag) => (
                <span
                    key={tag}
                    className={`flex items-center gap-1  text-white px-2 py-1 rounded-sm text-base ${tagColor == "green" ? 'bg-good' : 'bg-warn'}`}
                >
          {tag}
                    <button
                        type="button"
                        className="text-white"
                        onClick={() => removeTag(tag)}
                    >
            <X/>
          </button>
        </span>
            ))}

            <input
                type="text"
                className="flex-1 outline-none p-1 text-sm bg-transparent"
                placeholder={placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default TagInput;
