import type { ReactNode } from "react";

interface CardProps {
    text?: string;
    icon?: ReactNode;
    onClick?: () => void;
    interactive?: boolean;
}

export default function Card({ text, icon, onClick, interactive }: CardProps) {
    return (
        <div
            onClick={interactive ? onClick : undefined}
            className={`
        bg-gray-800
        text-gray-100
        px-6 py-4
        rounded-2xl
        shadow-md
        min-w-[200px]
        text-center
        transition
        ${interactive ? "cursor-pointer hover:shadow-lg hover:bg-gray-700 active:scale-95 active:bg-gray-700" : ""}
      `}
        >
            {text && <span className="text-lg font-medium block">{text}</span>}

            {icon && <div className="flex justify-center">{icon}</div>}
        </div>
    );
}
