"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import DialogParent from "@/components/ui/dialog-parent/dialogParent";
import { CirclePlus } from "lucide-react";
import { FormProject } from "./formProject";

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
      title="Add Project"
      closeButtonRef={closeButtonRef}
      body={<FormProject onClose={onClose} />}
    />
  );
}
