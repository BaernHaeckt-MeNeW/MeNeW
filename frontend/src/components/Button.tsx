import React, {type PropsWithChildren} from "react";

interface ButtonProps {
    children: React.ReactNode,
    type?: "button" | "submit" | "reset"
    onClick?: () => void
}

export function Button(props:PropsWithChildren<ButtonProps>) {
    return <button
        onClick={props.onClick}
        className="w-fit mt-6 text-white bg-primary text-onBackground font-semibold py-2 px-4 rounded transition hover:bg-primary-dark"
    >
        {props.children}
    </button>
}