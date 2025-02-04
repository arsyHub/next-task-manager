"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import DialogParent from "@/components/ui/dialog-parent/dialogParent";
import { CirclePlus } from "lucide-react";
import { FormUser } from "./formUser";

interface Props {
  fetchData: () => void;
}

export default function Create({ fetchData }: Props) {
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  const onClose = () => {
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }
    fetchData();
  };

  const addAction = (
    <Button>
      <CirclePlus />
      Add
    </Button>
  );
  return (
    <DialogParent
      buttonTrigger={addAction}
      title="Add User"
      closeButtonRef={closeButtonRef}
      body={<FormUser onClose={onClose} />}
    />
  );
}
