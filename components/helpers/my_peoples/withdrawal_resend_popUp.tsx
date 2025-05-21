import TnModal from "@/lib/wrapper/Tn_modal";



export function WithdrawalInvites({id, isOpen,handleModalClose }:{
    id: string;
    isOpen: boolean;
    handleModalClose: (data:boolean) => void;
}) {
    
    const handleClose = () => {
        handleModalClose(false);
    }

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
                        onClick={() => {
                            console.log("Resend Invitation", id);
                            handleClose();
                        }}
                        className="py-1 px-4 bg-black text-white rounded-md"
                    >
                        Withdrawal Invitation
                    </button>
                </div>
            </div>
        </TnModal>
    )


}


export function ResendInvite({id, isOpen,handleModalClose }:{
    id: string;
    isOpen: boolean;
    handleModalClose: (data:boolean) => void;
}) {
    
    const handleClose = () => {
        handleModalClose(false);
    }

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
                        onClick={() => {
                            console.log("Resend Invitation", id);
                            handleClose();
                        }}
                        className="py-1 px-4 bg-black  text-white rounded-md"
                    >
                        Resend Invitation
                    </button>
                </div>
            </div>
        </TnModal>
    )


}