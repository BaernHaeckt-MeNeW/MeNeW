import type {ReactNode} from "react";

interface CardProps {
    text?: string;
    icon?: ReactNode;
    onClick?: () => void;
}

export default function Card({ text, icon, onClick }: CardProps) {
    return (
        <div
            onClick={onClick}
            className="
        bg-gray-800
        text-gray-100
        px-6 py-4
        rounded-2xl
        shadow-md
        hover:shadow-lg
        hover:bg-gray-700
        transition
        cursor-pointer
        min-w-[200px]
        text-center
      "
        >
            {text && <span className="text-lg font-medium block">{text}</span>}

            {icon && (
                <div className="flex justify-center">
                    {icon}
                </div>
            )}
        </div>
    );
}
