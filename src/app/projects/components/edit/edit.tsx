import { Button } from "@/components/ui/button";
import DialogParent from "@/components/ui/dialog-parent/dialogParent";
import { Pencil } from "lucide-react";
import React from "react";
import { FormProject } from "./formProject";

interface Props {
  id: string;
  fetchData?: () => void;
}

export default function EditProject({ id, fetchData }: Props) {
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  const onClose = () => {
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }
    if (fetchData) {
      fetchData();
    }
  };

  const editAction = (
    <Button size={"icon"}>
      <Pencil />
    </Button>
  );
  return (
    <DialogParent
      buttonTrigger={editAction}
      title="Edit Project"
      closeButtonRef={closeButtonRef}
      body={<FormProject onClose={onClose} id={id} />}
    />
  );
}
