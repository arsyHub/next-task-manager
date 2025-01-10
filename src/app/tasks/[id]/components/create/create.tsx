"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import DialogParent from "@/components/ui/dialog-parent/dialogParent";
import { CirclePlus } from "lucide-react";
import { FormTask } from "./formTask";
import { StatusEnum } from "@/app/tasks/types/types";

interface Props {
  fetchData: () => void;
  status?: StatusEnum;
  buttonTrigger?: React.ReactNode;
}

export default function Create({ fetchData, status, buttonTrigger }: Props) {
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
      buttonTrigger={buttonTrigger || addAction}
      title="Add Task"
      closeButtonRef={closeButtonRef}
      body={<FormTask onClose={onClose} defaultStatus={status} />}
    />
  );
}
