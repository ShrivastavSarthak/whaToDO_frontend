import TnModal from "@/lib/wrapper/Tn_modal";
import { ApiMethod, InviteMembersUrls } from "@/shared/utils/enums/apiEnums";
import { useLazyGetApi } from "@/shared/utils/hooks/lazyGetApi";
import { useAppSelector } from "@/shared/utils/hooks/redux-hook";
import { StringFormatService } from "@/shared/utils/services/stringFormatService";
import { useEffect } from "react";
import { toast } from "sonner";

export function WithdrawalInvites({
  id,
  isOpen,
  handleModalClose,
}: {
  id: string;
  isOpen: boolean;
  handleModalClose: (data: boolean) => void;
}) {
    const user = useAppSelector((state) => state.user);
    const { data, error, getApi, isLoading } = useLazyGetApi();
  
    useEffect(()=>{
      if (data) {
        if (data?.response?.status === 200) {
          toast.success(data?.response?.message ?? "Invitation resent successfully");
          handleModalClose(false);
        } else {
          toast.error(data?.response?.message || "Failed to resend invitation");
        }
      }
      if (error) {
        toast.error("An error occurred while resending the invitation");
      }
    },[data])
  
    const handleClose = () => {
      if (!isLoading) {
        handleModalClose(false);
      }
    };
  
    const handleWithdrawalInvitation = async () => {
      getApi(
        StringFormatService(InviteMembersUrls.withdrawalInvite, [ id]),
        user.token,
        ApiMethod.DELETE
      );
    };
  

  return (
    <TnModal className="rounded-md" isOpen={isOpen} handleClose={handleClose}>
      <h2 className="font-semibold">Withdrawal Invitation</h2>
      <div className="flex flex-col gap-4">
        <p>Are you sure you want to withdrawal the invitation?</p>
        <div className="flex items-center justify-between mt-3">
          <button
            type="button"
            onClick={handleClose}
            className="py-1 px-4 bg-gray-300 text-black rounded-md"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleWithdrawalInvitation}
            className="py-1 px-4 bg-black text-white rounded-md"
          >
            {!isLoading ? "Withdrawal Invitation" : "Loading..."}
          </button>
        </div>
      </div>
    </TnModal>
  );
}

export function ResendInvite({
  id,
  isOpen,
  handleModalClose,
}: {
  id: string;
  isOpen: boolean;
  handleModalClose: (data: boolean) => void;
}) {
  const user = useAppSelector((state) => state.user);
  const { data, error, getApi, isLoading } = useLazyGetApi();

  useEffect(()=>{
    if (data) {
      if (data?.response?.status === 200) {
        toast.success("Invitation resent successfully");
        handleModalClose(false);
      } else {
        toast.error(data?.response?.message || "Failed to resend invitation");
      }
    }
    if (error) {
      toast.error("An error occurred while resending the invitation");
    }
  },[data])

  const handleClose = () => {
    if (!isLoading) {
      handleModalClose(false);
    }
  };

  const handleResendInvitation = async () => {
    getApi(
      StringFormatService(InviteMembersUrls.resendInvite, [user.homeId, id]),
      user.token
    );
  };



  return (
    <TnModal className="rounded-md " isOpen={isOpen} handleClose={handleClose}>
      <h2 className="font-semibold">Resend Invitation</h2>
      <div className="flex flex-col gap-4">
        <p>Are you sure you want to resend the invitation?</p>
        <div className="flex items-center justify-between mt-3">
          <button
            type="button"
            onClick={handleClose}
            className="py-1 px-4 bg-gray-300 text-black rounded-md"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleResendInvitation}
            className="py-1 px-4 bg-black  text-white rounded-md"
          >
            {!isLoading ? "Resend Invitation" : "Loading..."}
          </button>
        </div>
      </div>
    </TnModal>
  );
}
