import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

interface props {
  buttonTrigger: React.ReactNode;
  title?: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
  closeButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

export default function DialogParent({
  buttonTrigger,
  title,
  body,
  footer,
  closeButtonRef,
}: props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DialogTitle>{buttonTrigger}</DialogTitle>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-left font-bold">{title}</DialogHeader>
        <div className="grid gap-4 py-4">{body}</div>
        <DialogFooter>
          {footer}

          <DialogClose asChild>
            <button
              ref={closeButtonRef}
              type="button"
              style={{ display: "none" }}
            >
              Close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
