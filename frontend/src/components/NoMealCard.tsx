import type { ReactNode } from "react";

interface NoMealCardProps {
    text?: string;
    icon?: ReactNode;
    onClick?: () => void;
    interactive?: boolean;
}

export default function NoMealCard({ text, icon, onClick, interactive }: NoMealCardProps) {
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
            <div className={"flex gap-2 justify-center mt-5"}>
                <div className="relative rounded-2xl bg-white/10 backdrop-blur-md">
                    <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-md opacity-75"></div>
                    <div className="relative bg-white/5 rounded-2xl py-4 px-2">
                        <p className="text-white">✨ Inspiriere mich</p>
                    </div>
                </div>
                <div className={"border-dotted border-gray-600 border-2 rounded-2xl py-4 px-2"}>Mahlzeit festlegen</div>
            </div>
        </div>
    );
}
