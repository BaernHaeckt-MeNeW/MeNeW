import {useState, useCallback, useMemo, useEffect, useRef} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import Nav from "../components/Nav.tsx";
import {QUESTIONS_TREE} from "../inspiration/data/questions.ts";
import type {Answer, Question} from "../inspiration/model/dialog.ts";
import {RefreshCcw} from "lucide-react";
import {api} from "../lib/api.ts";
import type {MealType} from "../model/MealType.ts";

const INSPIRATION_TITLE = "🍽️ Inspirationen für Dich";

type InspirationItem = { title: string };

export default function Dialog() {
    const [searchParams] = useSearchParams();
    const dateString = searchParams.get("date") || undefined;
    const date = dateString ? new Date(dateString) : undefined;
    const mealType = (searchParams.get("mealType") as MealType) || undefined;

    const [inspirationHistory, setInspirationHistory] = useState<string[]>([]);
    const [conversation, setConversation] = useState<Question[]>([QUESTIONS_TREE]);
    const [seen, setSeen] = useState<Set<string>>(new Set([QUESTIONS_TREE.text]));
    const [selected, setSelected] = useState<Record<string, string>>({});
    const [isLeaf, setIsLeaf] = useState(false);
    const [isLoadingInspo, setIsLoadingInspo] = useState(false);
    const [inspoShown, setInspoShown] = useState(false);
    const [isProcessingChoice, setIsProcessingChoice] = useState(false);

    const [isManualEntry, setIsManualEntry] = useState(false);
    const [manualValue, setManualValue] = useState("");

    const scrollRef = useRef<HTMLDivElement>(null);
    const manualInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const resetDialog = useCallback(() => {
        setConversation([QUESTIONS_TREE]);
        setSeen(new Set([QUESTIONS_TREE.text]));
        setSelected({});
        setIsLeaf(false);
        setIsLoadingInspo(false);
        setInspoShown(false);
        setIsProcessingChoice(false);
        setIsManualEntry(false);
        setManualValue("");
        if (scrollRef.current) scrollRef.current.scrollTo({top: 0, behavior: "auto"});
    }, []);

    const onClickAnswer = useCallback((q: Question, a: Answer) => {
        if (q.text === INSPIRATION_TITLE && a.text === "✨ Etwas Neues") {
            if (isLoadingInspo) return;

            setSelected(prev => ({ ...prev, [q.text]: a.text }));

            const userEcho: Question = { text: "✨ Etwas Neues", answers: [] };
            setConversation(prev => [...prev, userEcho]);
            setSeen(prev => new Set(prev).add(userEcho.text));

            (async () => {
                setIsLoadingInspo(true);

                const pairs = conversation
                    .filter(msg => selected[msg.text])
                    .map(msg => ({ question: msg.text, answer: selected[msg.text] }));

                const inspiration = await api.getInspiration(
                    pairs,
                    date || new Date(),
                    mealType || "DINNER",
                    inspirationHistory
                );

                const newIdeas: string[] = inspiration.ideas.slice(0, 3);
                const newAnswers: Answer[] = newIdeas.map(t => ({ text: t }));

                const newInspo: Question = {
                    text: INSPIRATION_TITLE,
                    answers: [...newAnswers, { text: "✨ Etwas Neues" }],
                };

                setConversation(prev => [...prev, newInspo]);
                setSeen(prev => new Set(prev).add(newInspo.text));
                setInspirationHistory(prev => [...prev, ...newIdeas]);
                setIsLoadingInspo(false);
                setIsLeaf(false);

                setSelected(prev => {
                    const { [q.text]: _, ...rest } = prev;
                    return rest;
                });
            })();

            return;
        }

        if (selected[q.text]) return;
        setSelected(prev => ({...prev, [q.text]: a.text}));

        if (a.manual) {
            const prompt: Question = {text: "✍️ Was geht dir durch den Kopf?", answers: []};
            setConversation(prev => [...prev, prompt]);
            setSeen(prev => new Set(prev).add(prompt.text));
            setIsManualEntry(true);
            setIsLeaf(false);
            setIsProcessingChoice(false);
            return;
        }

        if (q.text === INSPIRATION_TITLE) {
            const confirmation: Question = {text: `🎉 Ausgezeichnete Wahl: ${a.text}. Mahlzeit wird gespeichert...`, answers: []};
            setConversation(prev => [...prev, confirmation]);
            setSeen(prev => new Set(prev).add(confirmation.text));
            setIsProcessingChoice(true);
            void api.createMeal({name: a.text, mealTime: mealType, plannedMealDate: date ?? new Date()});
            setTimeout(() => navigate("/"), 3000);
            return;
        }

        const next = a.followUp as Question | undefined;
        if (!next || !next.answers?.length) {
            setIsLeaf(true);
            return;
        }
        setIsLeaf(false);
        if (seen.has(next.text)) return;
        setConversation(prev => [...prev, next]);
        setSeen(prev => new Set(prev).add(next.text));
    }, [conversation, selected, seen, navigate, mealType, date, isLoadingInspo]);

    const summary = useMemo(
        () => conversation.filter(q => selected[q.text]).map(q => ({question: q.text, answer: selected[q.text]})),
        [conversation, selected]
    );

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({top: scrollRef.current.scrollHeight, behavior: "smooth"});
        }
    }, [conversation, isLeaf, isLoadingInspo, isProcessingChoice, isManualEntry]);

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
            const ideas = items.map(it => it.title);
            const inspirationQuestion: Question = {
                text: INSPIRATION_TITLE,
                answers: [...ideas.map<Answer>(t => ({text: t})), {text: "✨ Etwas Neues"}],
            };
            setConversation(prev => [...prev, inspirationQuestion]);
            setSeen(prev => new Set(prev).add(inspirationQuestion.text));
            setInspirationHistory(prev => [...prev, ...ideas]);
            setIsLoadingInspo(false);
            setInspoShown(true);
            setIsLeaf(false);
        })();
    }, [isLeaf, inspoShown, isLoadingInspo, summary, api, date, mealType]);

    useEffect(() => {
        if (isManualEntry) setTimeout(() => manualInputRef.current?.focus(), 50);
    }, [isManualEntry]);

    const submitManual = useCallback(() => {
        const value = manualValue.trim();
        if (!value) return;

        const confirmation: Question = {
            text: `📝 ${value}`,
            answers: [],
            userEcho: true
        };
        setConversation(prev => [...prev, confirmation]);
        setSeen(prev => new Set(prev).add(confirmation.text));

        setSelected(prev => ({ ...prev, ["Gedanken"]: value }));

        setIsManualEntry(false);
        setIsProcessingChoice(false);

        (async () => {
            setIsLoadingInspo(true);

            const pairsFromState = conversation
                .filter(msg => selected[msg.text])
                .map(msg => ({ question: msg.text, answer: selected[msg.text] }));

            const hasGedanken = pairsFromState.some(p => p.question === "Gedanken");
            const pairs = hasGedanken
                ? pairsFromState
                : [...pairsFromState, { question: "Gedanken", answer: value }];

            const inspiration = await api.getInspiration(
                pairs,
                date || new Date(),
                mealType || "DINNER",
                inspirationHistory
            );

            const ideas = inspiration.ideas.slice(0, 3);
            const newInspo: Question = {
                text: INSPIRATION_TITLE,
                answers: [...ideas.map<Answer>(t => ({ text: t })), { text: "✨ Etwas Neues" }],
            };

            setConversation(prev => [...prev, newInspo]);
            setSeen(prev => new Set(prev).add(newInspo.text));
            setInspirationHistory(prev => [...prev, ...ideas]);
            setIsLoadingInspo(false);
            setIsLeaf(false);
            setInspoShown(true);
        })();
    }, [manualValue, mealType, date, conversation, selected, inspirationHistory]);


    return (
        <div className="h-screen overflow-hidden">
            <div className="fixed top-0 left-0 right-0 z-50 h-16 py-6 px-4 bg-transparent">
                <Nav
                    backButton
                    topCenterElement={
                        <img src={"/assets/logo.svg"} alt="Logo" className="w-24 mx-auto"/>}
                    topRightElement={
                        <button
                            onClick={resetDialog}
                            className="p-2 rounded-xl hover:bg-muted transition active:rotate-180"
                            aria-label="Start over"
                            title="Start over"
                        >
                            <RefreshCcw className="w-5 h-5"/>
                        </button>
                    }
                />
            </div>

            <div className="pt-20 h-full">
                <div
                    ref={scrollRef}
                    className="h-[calc(100vh-4rem)] overflow-y-auto flex flex-col gap-4 p-4 w-full pb-24"
                >
                    {conversation.map((message, i) => (
                        <div key={`msg-${i}`} className="w-full">
                            {!message.userEcho ? (
                                <div className="bg-blue-700 text-white p-4 rounded-2xl shadow-md my-4 w-fit max-w-2xl">
                                    {message.text}
                                </div>
                            ) : (
                                <div className="flex justify-end">
                                    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white p-4 rounded-2xl shadow-md my-4 w-fit max-w-2xl">
                                        {message.text}
                                    </div>
                                </div>
                            )}

                            {message.answers.length > 0 && (
                                <div className="flex justify-end">
                                    <div
                                        className="bg-gray-800 w-4/5 text-white p-4 rounded-2xl shadow-md my-4 flex flex-col gap-3">
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
                                                    {isSelectedAns && <span
                                                        className="ml-2 inline-block text-sm font-semibold animate-pulse">✓</span>}
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
                <span
                    className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg"></span>
                <span
                    className="absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-75 animate-ping"></span>
              </span>
                        </div>
                    )}

                    {isProcessingChoice && (
                        <div className="w-full flex justify-center mt-2">
              <span className="relative inline-flex">
                <span
                    className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg"></span>
                <span
                    className="absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-75 animate-ping"></span>
              </span>
                        </div>
                    )}

                    {isManualEntry && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                submitManual();
                            }}
                            className="mt-10 sticky bottom-4 mx-auto w-full max-w-lg flex items-center gap-2 bg-white/80 backdrop-blur rounded-2xl shadow px-3 py-2"
                        >
                            <input
                                ref={manualInputRef}
                                value={manualValue}
                                onChange={(e) => setManualValue(e.target.value)}
                                placeholder="Gedanken"
                                className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
                                disabled={isProcessingChoice}
                            />
                            <button
                                type="submit"
                                disabled={isProcessingChoice || !manualValue.trim()}
                                className={`px-3 py-1.5 rounded-xl text-sm font-medium text-white transition
                  bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
                  ${isProcessingChoice || !manualValue.trim() ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}
                            >
                                Speichern
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
