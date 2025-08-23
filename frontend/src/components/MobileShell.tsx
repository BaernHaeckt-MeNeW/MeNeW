import type {PropsWithChildren} from "react";

export default function MobileShell(props: PropsWithChildren) {
    return (
        <div
            className="min-h-dvh flex flex-row justify-center py-6 px-4"
        >
            <main className="max-w-[500px] flex-1 overflow-y-auto overscroll-y-contain touch-pan-y">
                {props.children}
            </main>
        </div>
    );
}