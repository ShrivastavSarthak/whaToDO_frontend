"use client";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TnModal from "@/lib/wrapper/Tn_modal";
import { ApiMethod, InviteMembersUrls } from "@/shared/utils/enums/apiEnums";
import usePostApi from "@/shared/utils/hooks/postApi";
import { useAppSelector } from "@/shared/utils/hooks/redux-hook";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ImCross } from "react-icons/im";
import { toast } from "sonner";

export function Invites({isApiLoading}:{isApiLoading?: (loading:boolean)=> void}) {
  const form = useForm();
  const [parentInviteEmail, setParentInviteEmail] = useState<string>("");
  const [inviteChildEmail, setInviteChildEmail] = useState<string>("");
  const [inviteChildrenEmail, setInviteChildrenEmail] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const homeId = useAppSelector((state) => state.user.homeId);
  const {data,isLoading,postApiCall}= usePostApi()

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleInviteChildrenEmail = (email: string) => {
    const trimmedEmail = email.trim();
    if (
      isEmailValid(trimmedEmail) &&
      !inviteChildrenEmail.includes(trimmedEmail)
    ) {
      setInviteChildrenEmail((prev) => [...prev, trimmedEmail]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", "Tab", ",", " "].includes(e.key)) {
      e.preventDefault();
      if (inviteChildEmail) {
        handleInviteChildrenEmail(inviteChildEmail);
        setInviteChildEmail("");
      }
    } else if (e.key === "Backspace" && inviteChildEmail === "") {
      setInviteChildrenEmail(inviteChildrenEmail.slice(0, -1));
    }
  };

  const removeChildrenEmail = (index: Number) => {
    setInviteChildrenEmail(inviteChildrenEmail.filter((_, i) => i !== index));
  };

  useEffect(()=>{
    if (isApiLoading) {
      isApiLoading(isLoading)
    }
  },[isLoading])

  const onPartnerInvite = async() => {
    
    const res = await postApiCall({
      method: ApiMethod.POST,
      url: InviteMembersUrls.invitePartner,
      payload: {
        homeId:homeId,
        email: parentInviteEmail,
      },
    })
    
    if(res.data?.statusCode === 201){
      toast.success(res.data?.response?.message ?? "Partner Invited successfully")
      setParentInviteEmail("")
    }

  };

  const handleParentEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParentInviteEmail(e.target.value);
  };
  const handleChildEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInviteChildEmail(e.target.value);
  };

  const OnChildInvites = async()=>{
    
    const res = await postApiCall({
      method: ApiMethod.POST,
      url: InviteMembersUrls.inviteChildrens,
      payload: {
        homeId:homeId,
        emails: inviteChildrenEmail,
      },
    })
    
    if(res.data?.statusCode === 201){
      toast.success(res.data?.response?.message ?? "Childrens Invited successfully")
      setInviteChildrenEmail([])
    }
    
  }


  return (
    <Form {...form}>
      <div className="mt-3">
        <FormLabel>Invite your partner </FormLabel>
        <div className="flex w-full  items-center space-x-2 mt-2">
          <Input value={parentInviteEmail} onChange={handleParentEmailChange} placeholder="Email" />
          <Button disabled={isLoading} type="button" onClick={onPartnerInvite} className="py-1">
            Invite
          </Button>
        </div>
      </div>
      <div className="mt-3">
        <FormLabel>Invite your Childrens</FormLabel>
        <div className="w-full space-x-2 mt-2 ">
          {inviteChildrenEmail.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2 max-h-20 overflow-y-auto">
              {inviteChildrenEmail.map((email, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-2 py-1 bg-gray-200 text-gray-600 rounded-full"
                >
                  <span className="mr-1 text-[0.8rem]">{email}</span>
                  <button
                    className="text-sm text-red-500 ml-1"
                    onClick={() => removeChildrenEmail(i)}
                  >
                    <ImCross size={10} color="gray" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <Input
            ref={inputRef}
            onChange={handleChildEmailChange}
            onKeyDown={handleKeyDown}
            value={inviteChildEmail}
            placeholder="Email"
          />
          <div className="flex items-center justify-between mt-3">
            <Button disabled={isLoading} type="button" onClick={OnChildInvites} className="py-1">
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
  const [isApiLoading, setIsApiLoading] = useState(true);
  const handleLoading = (loading: boolean) => {
    setIsApiLoading(!loading);
  };
  
  const handleClose = () => {
    if(isApiLoading){
      closeInviteModal(false);
    }
  };


  return (
    <TnModal className="rounded-md" isOpen={isOpen} handleClose={handleClose}>
      <h2 className="font-semibold">Invite Your Family</h2>
      <Invites isApiLoading={handleLoading} />
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
