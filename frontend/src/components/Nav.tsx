import {ArrowLeft} from "lucide-react";
import * as React from "react";

interface NavProps {
    backButton?: boolean
    topLeftElement?: React.ReactNode;
    topRightElement?: React.ReactNode;
}

export default function Nav({backButton, topLeftElement, topRightElement}: NavProps) {
    return (
        <nav className="
            w-full
            flex
            justify-between
            items-center
            pb-6
            ">
            <div>
                {backButton ?
                    <div onClick={() => window.history.back()} className="cursor-pointer">
                        <ArrowLeft className={"w-8 h-8"}/>
                    </div>
                    : topLeftElement}
            </div>

            <div>
                {topRightElement}
            </div>
        </nav>
    );
}