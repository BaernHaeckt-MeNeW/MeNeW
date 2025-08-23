import {ArrowLeft} from "lucide-react";
import * as React from "react";

interface NavProps {
    backButton?: boolean;
    topLeftElement?: React.ReactNode;
    topRightElement?: React.ReactNode;
}

export default function Nav({backButton, topLeftElement, topRightElement}: NavProps) {
    const glowClasses =
        "cursor-pointer p-1 rounded-xl transition " +
        "hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] " +
        "active:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]";

    return (
        <nav className="w-full flex justify-between items-center pb-6">
            <div>
                {backButton ? (
                    <div onClick={() => window.history.back()} className={glowClasses}>
                        <ArrowLeft className="w-8 h-8"/>
                    </div>
                ) : (
                    topLeftElement && <div className={glowClasses}>{topLeftElement}</div>
                )}
            </div>

            <div className={glowClasses}>{topRightElement}</div>
        </nav>
    );
}
