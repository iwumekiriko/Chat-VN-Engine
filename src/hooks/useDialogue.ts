import { useContext } from "react";
import { DialogueContext } from "../engine/DialogueContext";

export function useDialogue() {

    const context = useContext(DialogueContext);

    if (!context) {

        throw new Error(
            "DialogueProvider missing"
        );

    }

    return context;

}