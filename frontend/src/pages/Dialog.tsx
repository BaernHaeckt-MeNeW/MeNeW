import {useState, useCallback, useMemo, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import Nav from "../components/Nav.tsx";
import {QUESTIONS_TREE} from "../inspiration/data/questions.ts";
import type {Answer, Question} from "../inspiration/model/dialog.ts";
import {RefreshCcw} from "lucide-react";
import {api} from "../lib/api.ts";
import {useSearchParams} from "react-router-dom";
import type {MealType} from "../model/MealType.ts";

const INSPIRATION_TITLE = "🍽️ Inspirationen für euch";

type InspirationItem = { title: string };

export default function Dialog() {

    const [searchParams] = useSearchParams();

    const dateString = searchParams.get("date") || undefined;
    const date = dateString ? new Date(dateString) : undefined;
    const mealType = searchParams.get("mealType") as MealType || undefined;

    const [conversation, setConversation] = useState<Question[]>([QUESTIONS_TREE]);
    const [seen, setSeen] = useState<Set<string>>(new Set([QUESTIONS_TREE.text]));
    const [selected, setSelected] = useState<Record<string, string>>({});
    const [isLeaf, setIsLeaf] = useState(false);
    const [isLoadingInspo, setIsLoadingInspo] = useState(false);
    const [inspoShown, setInspoShown] = useState(false);
    const [isProcessingChoice, setIsProcessingChoice] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const resetDialog = useCallback(() => {
        setConversation([QUESTIONS_TREE]);
        setSeen(new Set([QUESTIONS_TREE.text]));
        setSelected({});
        setIsLeaf(false);
        setIsLoadingInspo(false);
        setInspoShown(false);
        setIsProcessingChoice(false);
        if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    const onClickAnswer = useCallback((q: Question, a: Answer) => {
        if (selected[q.text]) return;
        setSelected(prev => ({ ...prev, [q.text]: a.text }));

        if (q.text === INSPIRATION_TITLE) {
            const confirmation: Question = {
                text: `🎉 Ausgezeichnete Wahl: ${a.text}`,
                answers: [],
            };
            setConversation(prev => [...prev, confirmation]);
            setSeen(prev => new Set(prev).add(confirmation.text));

            setIsProcessingChoice(true);

            api.createMeal({ name: a.text, mealTime: mealType, plannedMealDate: date ?? new Date() });
            setTimeout(() => {
                navigate("/");
            }, 2000);

            return;
        }

        const next = a.followUp as Question | undefined;
        if (!next || !next.answers?.length) { setIsLeaf(true); return; }
        setIsLeaf(false);

        if (seen.has(next.text)) return;
        setConversation(prev => [...prev, next]);
        setSeen(prev => new Set(prev).add(next.text));
    }, [seen, selected, navigate]);

    const summary = useMemo(
        () => conversation.filter(q => selected[q.text]).map(q => ({ question: q.text, answer: selected[q.text] })),
        [conversation, selected]
    );

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
        }
    }, [conversation, isLeaf, isLoadingInspo, isProcessingChoice]);

    useEffect(() => {
        if (!isLeaf || inspoShown || isLoadingInspo) return;

        const fetchInspiration = async (pairs: {
            question: string;
            answer: string
        }[]): Promise<InspirationItem[]> => {
            setIsLoadingInspo(true);
            const inspiration = await api.getInspiration(pairs, date || new Date(), mealType || "DINNER", [""]);
            return inspiration.ideas.map((inspiration: string) => ({title: inspiration}));
        };

        (async () => {
            const items = await fetchInspiration(summary);
            const inspirationQuestion: Question = {
                text: INSPIRATION_TITLE,
                answers: items.map<Answer>(it => ({ text: it.title, followUp: undefined })),
            };
            setConversation(prev => [...prev, inspirationQuestion]);
            setSeen(prev => new Set(prev).add(inspirationQuestion.text));
            setIsLoadingInspo(false);
            setInspoShown(true);
            setIsLeaf(false);
        })();
    }, [isLeaf, inspoShown, isLoadingInspo]);

    return (
        <div className="h-screen overflow-hidden">
            <div className="fixed top-0 left-0 right-0 z-50 h-16 py-6 px-4 bg-background">
                <Nav
                    backButton
                    topCenterElement={<h1 className="font-bold text-2xl">MeNeW Assistant</h1>}
                    topRightElement={
                        <button
                            onClick={resetDialog}
                            className="p-2 rounded-xl hover:bg-muted transition active:rotate-180"
                            aria-label="Start over"
                            title="Start over"
                        >
                            <RefreshCcw className="w-5 h-5" />
                        </button>
                    }
                />
            </div>

            <div className="pt-16 h-full">
                <div
                    ref={scrollRef}
                    className="h-[calc(100vh-4rem)] overflow-y-auto flex flex-col gap-4 p-4 w-full pb-16"
                >
                    {conversation.map((message, i) => (
                        <div key={`msg-${i}`} className="w-full">
                            <div className="bg-blue-700 text-white p-4 rounded-2xl shadow-md my-4 w-fit max-w-2xl">
                                {message.text}
                            </div>

                            {message.answers.length > 0 && (
                                <div className="flex justify-end">
                                    <div className="bg-gray-800 w-4/5 text-white p-4 rounded-2xl shadow-md my-4 flex flex-col gap-3">
                                        {message.answers.map((a, j) => {
                                            const isSelectedAns = selected[message.text] === a.text;
                                            const locked = !!selected[message.text];
                                            return (
                                                <button
                                                    type="button"
                                                    onClick={() => onClickAnswer(message, a)}
                                                    disabled={locked && !isSelectedAns}
                                                    key={`ans-${j}`}
                                                    className={`text-left p-4 rounded-2xl shadow-md w-full transition-all duration-300
                            ${isSelectedAns
                                                        ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-75 text-white shadow-lg scale-[1.02]"
                                                        : "bg-blue-100 text-black hover:bg-blue-200"}
                            ${locked && !isSelectedAns ? "opacity-60 cursor-not-allowed" : ""}`}
                                                >
                                                    {a.text}
                                                    {isSelectedAns && <span className="ml-2 inline-block text-sm font-semibold animate-pulse">✓</span>}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {(isLeaf && !inspoShown) && (
                        <div className="w-full flex justify-center mt-2">
              <span className="relative inline-flex">
                <span className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg"></span>
                <span className="absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-75 animate-ping"></span>
              </span>
                        </div>
                    )}

                    {isProcessingChoice && (
                        <div className="w-full flex justify-center mt-2">
              <span className="relative inline-flex">
                <span className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg"></span>
                <span className="absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-75 animate-ping"></span>
              </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
