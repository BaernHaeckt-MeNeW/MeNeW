import { Outlet, ScrollRestoration } from "react-router-dom";
import MobileShell from "./components/MobileShell.tsx";

export default function App() {
    return (
        <div className="min-h-dvh">
            <main>
                <MobileShell>
                    <Outlet />
                    <ScrollRestoration />
                </MobileShell>
            </main>

            <ScrollRestoration />
        </div>
    );
}
