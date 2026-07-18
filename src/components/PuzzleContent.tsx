import { useState } from "react";
import { useModal } from "../context/ModalProvider";
import { puzzles } from "../scenario/puzzles";

type Props = {

    puzzleId: string;

    onSuccess(): void;

};

export default function PuzzleContent({

    puzzleId,

    onSuccess

}: Props) {

    const puzzle = puzzles[puzzleId];

    const { closeModal } = useModal();

    const [value, setValue] = useState("");

    const [error, setError] = useState("");

    function submit() {

        if (
            value.trim().toUpperCase() !==
            puzzle.answer.toUpperCase()
        ) {

            setError("Неверно.")

            return;

        }

        closeModal();

        onSuccess();

    }

    return (

        <div className="flex flex-col gap-4">

            <p className="text-xs font-bold uppercase tracking-wide text-gray-200">{puzzle.description}</p>

            <input 
                value={value}
                onChange={e => {

                    setValue(e.target.value);

                    setError("");

                }}
                onKeyDown={e => {

                    if (e.key === "Enter")
                        submit();

                }}
                className="rounded bg-zinc-800 border border-zinc-700 px-3 py-2 outline-none text-white"
                autoFocus
            />

            {error && (

                <span className="text-xs font-bold uppercase tracking-wide text-red-400">

                    {error}
                    
                </span>

            )}

            <button
                onClick={submit}
                className="px-4 py-2 cursor-pointer rounded bg-gray-500 text-white active:scale-95 transition-transform"
            >

                Подтвердить

            </button>
            
        </div>

    );
}