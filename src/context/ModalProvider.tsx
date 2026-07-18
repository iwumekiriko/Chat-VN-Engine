import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import Modal from "../components/Modal";

type ModalConfig = {

    title?: string;

    onClose?(): void;

    children?: ReactNode;

};

type ModalContextType = {

    showModal: (config: ModalConfig) => void;
    
    closeModal: () => void;

};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({

    children

}: {

    children: ReactNode;

}) {

    const [open, setOpen] = useState(false);
    
    const [config, setConfig] = useState<ModalConfig>({});

    function showModal(config: ModalConfig) {

        setConfig(config);

        setOpen(true);

    }

    function closeModal() {

        config.onClose?.();

        setOpen(false);

    }

    return (

        <ModalContext.Provider
            value={{showModal, closeModal}}
        >

            {children}

            <Modal
                open={open}
                title={config.title}
                onClose={closeModal}
            >

                {config.children}

            </Modal>

        </ModalContext.Provider>

    );
}

export function useModal() {
    
    const ctx = useContext(ModalContext);

    if (!ctx)
        throw new Error("useModal must be used inside ModalProvider");

    return ctx;

}