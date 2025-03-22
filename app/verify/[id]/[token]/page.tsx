"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ApiMethod, LoginApiUrls } from "@/shared/utils/enums/apiEnums";
import { usePostMethodMutation } from "@/shared/utils/services/dataServices";
import { toast } from "sonner";

export default function Verify({
  params,
}: {
  params: { id: string; token: string };
}) {
  const [verification, { isError, isLoading, isSuccess,data,error }] =
    usePostMethodMutation();

  const handleClick = async () => {
    const res :any = await verification({
      httpResponse: {
        reqType: ApiMethod.POST,
        url: LoginApiUrls.childVerify,
      },
      payload: {
        id: params.id,
        verifyToken: params.token,
      },
    });
    
    if (res.data?.statusCode === 201) {
      toast.success("Verification successful");
    } else {
      if(res?.error){
        toast.error(res?.error?.data?.message  || "Verification failed");
      }
    }
  };

  

  return (
    <div className="flex items-start justify-center w-full h-screen p-10 ">
      <Card className="w-full max-w-[30rem] shadow-lg p-4 my-[3%] flex justify-center items-center flex-col">
        <h1 className="font-bold">Welcome to taskNest</h1>
        <h6 className="text-center">Here you can verify your account</h6>
        <Button disabled={isLoading} className="mt-3" onClick={handleClick}>
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </Card>
    </div>
  );
}
