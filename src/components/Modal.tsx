import type { ReactNode } from "react";

type Props = {
    open: boolean;
    title?: string;
    children?: ReactNode;
    onClose: () => void;
};

export default function Modal({
    open,
    title,
    children,
    onClose
}: Props) {
    if (!open)
        return null;

    return (

        <div className="absolute inset-0 z-50 bg-black/70 flex items-center justify-center">

            <div className="relative bg-[#313338] rounded-xl w-full max-w-xl mx-4 p-6">

                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 text-white text-xl cursor-pointer"
                >
                    ✕
                </button>

                {title && (
                    
                    <h2 className="text-white text-xl font-bold mb-4">

                        {title}

                    </h2>

                )}

                {children}

            </div>

        </div>

    );
}