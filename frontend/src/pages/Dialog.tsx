import {useState, useCallback, useMemo} from "react";
import Nav from "../components/Nav.tsx";
import {QUESTIONS_TREE} from "../inspiration/data/questions.ts";
import type {Answer, Question} from "../inspiration/model/dialog.ts";

export default function Dialog() {
    const [conversation, setConversation] = useState<Question[]>([QUESTIONS_TREE]);
    const [seen, setSeen] = useState<Set<string>>(new Set([QUESTIONS_TREE.text]));
    const [selected, setSelected] = useState<Record<string, string>>({});

    const onClickAnswer = useCallback((q: Question, a: Answer) => {
        console.log(summary);
        if (selected[q.text]) return;
        const next = a.followUp as Question | undefined;
        setSelected(prev => ({ ...prev, [q.text]: a.text }));
        if (!next || !next.answers?.length) {
            // TODO trigger request
            return;
        }
        if (seen.has(next.text)) return;
        setConversation(prev => [...prev, next]);
        setSeen(prev => new Set(prev).add(next.text));
    }, [seen, selected]);

    const summary = useMemo(
        () => conversation.filter(q => selected[q.text]).map(q => ({ question: q.text, answer: selected[q.text] })),
        [conversation, selected]
    );

    return (
        <div className="h-screen overflow-hidden">
            <div className="fixed top-0 left-0 right-0 z-50 h-16 py-6 px-4 bg-background">
                <Nav backButton topCenterElement={<h1 className="font-bold text-2xl">MeNeW Assistant</h1>} />
            </div>

            <div className="pt-16 h-full">
                <div className="h-[calc(100vh-4rem)] overflow-y-auto flex flex-col gap-4 p-4 w-full">
                    {conversation.map((message, i) => (
                        <div key={`msg-${i}`} className="w-full">
                            <div className="bg-blue-100 text-black p-4 rounded-2xl shadow-md my-4 w-fit max-w-2xl">
                                {message.text}
                            </div>

                            <div className="flex justify-end">
                                <div className="bg-gray-800 w-4/5 text-white p-4 rounded-2xl shadow-md my-4 flex flex-col gap-3">
                                    {message.answers.map((a, j) => {
                                        const isSelected = selected[message.text] === a.text;
                                        const locked = !!selected[message.text];
                                        return (
                                            <button
                                                type="button"
                                                onClick={() => onClickAnswer(message, a)}
                                                disabled={locked && !isSelected}
                                                key={`ans-${j}`}
                                                className={`text-left p-4 rounded-2xl shadow-md w-full transition-all duration-300
        ${
                                                    isSelected
                                                        ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-75 text-white shadow-lg scale-[1.02]"
                                                        : "bg-blue-100 text-black hover:bg-blue-200"
                                                }
        ${locked && !isSelected ? "opacity-60 cursor-not-allowed" : ""}`}
                                            >
                                                {a.text}
                                                {isSelected && (
                                                    <span className="ml-2 inline-block text-sm font-semibold animate-pulse">
          ✓
        </span>
                                                )}
                                            </button>
                                        );
                                    })}

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
