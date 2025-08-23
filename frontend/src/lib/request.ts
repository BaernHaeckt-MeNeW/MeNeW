const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export class HttpError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export async function request<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(BASE + path, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        ...options,
    });

    if (!res.ok) {
        const msg = await res.text().catch(() => res.statusText);
        throw new HttpError(res.status, msg);
    }

    if (res.status === 204) return undefined as T;
    return await res.json() as Promise<T>;
}

export type Todo = { id: string; title: string; done: boolean };
export type NewTodo = { title: string };
