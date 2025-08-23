interface DatePickerPopUpProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DatePickerPopUp(props: DatePickerPopUpProps) {



    return <>
        {props.isOpen && <div className="fixed inset-0 bg-black opacity-30 flex items-center justify-center z-50" onClick={props.onClose}>
            <div className="bg-white rounded-lg p-6 opacity-100" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4">Wähle ein Datum</h2>
                <input type="date" className="border border-gray-300 rounded-md p-2 w-full"/>
                <div className="mt-4 flex justify-end">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={props.onClose}>Schließen</button>
                </div>
            </div>
        </div>}

    </>;
}