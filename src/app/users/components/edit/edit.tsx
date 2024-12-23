import { Button } from "@/components/ui/button";
import DialogParent from "@/components/ui/dialog-parent/dialogParent";
import { Pencil } from "lucide-react";
import React from "react";
import { FormUser } from "./formUser";

interface Props {
  id: string;
  fetchData?: () => void;
}

export default function EditUser({ id, fetchData }: Props) {
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
      title="Edit User"
      closeButtonRef={closeButtonRef}
      body={<FormUser onClose={onClose} id={id} />}
    />
  );
}
