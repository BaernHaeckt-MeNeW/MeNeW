export function Button({children, onClick}: { children: React.ReactNode, onClick?: () => void }) {
    return <button
        onClick={onClick}
        className="w-fit mt-6 text-white bg-primary text-onBackground font-semibold py-2 px-4 rounded transition hover:bg-primary-dark"
    >
        {children}
    </button>
}