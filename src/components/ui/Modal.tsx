import Button from "./Button";

interface ModalProps {
    onClose?: () => void;
    onConfirm?: () => void;
    text?: string;
}

export default function Modal({ onClose, onConfirm, text }: ModalProps) {
    return (
        <div>
            <div className="opacity-70 fixed inset-0 bg-black"></div>
            <div className="fixed inset-0 overflow-y-auto h-full w-full">
                {/* El background medio transparente */}
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                    <div className="mt-3 text-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{text}</h3>
                        
                        <div className="items-center px-4 py-3">
                            <Button text="Delete" color="danger" onClick={onConfirm} />
                            <Button text="Cancel" color="secondary" onClick={onClose} className="ml-2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}