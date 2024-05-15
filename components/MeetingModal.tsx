import { ReactNode } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface MeetingModalProps {
    title: string;
    buttonText?: string;
    className?: string;
    onClose?: () => void;
    handleClick?: () => void;
    isModalOpen?: boolean;
    children?: ReactNode;
}

export default function MeetingModal({ title, buttonText, className, isModalOpen, onClose, handleClick, children }: MeetingModalProps) {
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-stone-500 text-gray-50">
                <div className={cn('text-center', className)}>
                    <DialogTitle>{title}</DialogTitle>
                </div>
                {children}
                <Button onClick={handleClick}>
                    {buttonText || 'Schedule Meeting'}
                </Button>
            </DialogContent>
        </Dialog>
    )
}
