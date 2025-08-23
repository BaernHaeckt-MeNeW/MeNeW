import {Button} from "./Button.tsx";

interface DatePickerPopUpProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDate?: Date;
}

export function DatePickerPopUp(props: DatePickerPopUpProps) {

    return <>
        {props.isOpen && <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex pt-[30%] z-50" onClick={props.onClose}>
            <div className="bg-background rounded-lg p-6 opacity-100 mx-auto h-[200px] w-[320px]" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4">Wähle ein Datum</h2>
                <input type="date" value={props?.selectedDate?.toISOString().split('T')[0]} className="border bg-background border-gray-300 rounded-md p-2 w-full"/>
                <div className="mt-4 flex justify-end">
                    <Button onClick={props.onClose}>Schließen</Button>
                </div>
            </div>
        </div>}

    </>;
}