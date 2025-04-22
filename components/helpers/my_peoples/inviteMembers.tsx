"use client";
import TnModal from "@/lib/wrapper/Tn_modal";
import { InviteFamily } from "../home_card/homeCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";

export function Invites() {
  const form = useForm();
  const [inviteEmail, setInviteEmail] = useState<string>("");
  const onPartnerInvite = () => {
    console.log(inviteEmail);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(e.target.value);
  };

  return (
    <Form {...form}>
      <div className="mt-3">
        <FormLabel>Invite your partner </FormLabel>
        <div className="flex w-full  items-center space-x-2 mt-2">
          <Input onChange={handleEmailChange} placeholder="Email" />
          <Button type="button" onClick={onPartnerInvite} className="py-1">
            Invite
          </Button>
        </div>
      </div>
      <div className="mt-3">
        <FormLabel>Invite your Childrens</FormLabel>
        <div className="w-full space-x-2 mt-2">
          <Input onChange={handleEmailChange} placeholder="Email" />
          <div className="flex items-center justify-between mt-3">
            <Button type="button" onClick={onPartnerInvite} className="py-1">
              Invite children
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}

function InviteModal({
  isOpen,
  closeInviteModal,
}: {
  isOpen: boolean;
  closeInviteModal: (close: boolean) => void;
}) {
  const handleClose = () => {
    closeInviteModal(false);
  };

  return (
    <TnModal className="rounded-md" isOpen={isOpen} handleClose={handleClose}>
      <h2 className="font-semibold">Invite Your Family</h2>
      <Invites />
    </TnModal>
  );
}

export default function InviteMembers() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const handleClose = (close: boolean) => {
    setIsInviteModalOpen(close);
  };

  const handleInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  return (
    <>
      <Button onClick={handleInviteModal}>Invite Members</Button>
      <InviteModal isOpen={isInviteModalOpen} closeInviteModal={handleClose} />
    </>
  );
}
