"use client";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import TnModal from "@/lib/wrapper/Tn_modal";
import { ApiMethod, childApiUrls } from "@/shared/utils/enums/apiEnums";
import { useAppSelector } from "@/shared/utils/hooks/redux-hook";
import {
  useGetMethodQuery,
  useLazyGetMethodQuery,
} from "@/shared/utils/services/dataServices";
import { StringFormatService } from "@/shared/utils/services/stringFormatService";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import moment from "moment";

import React, { useEffect, useState } from "react";
const SecurePageLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(30);
  const user = useAppSelector((state) => state.user);

  const { data, refetch, error } = useGetMethodQuery({
    httpResponse: {
      reqType: ApiMethod.GET,
      url: StringFormatService(childApiUrls.getChildById, [user.userId]),
      headers: user.token,
    },
  });

  const [
    trigger,
    {
      data: emailData,
      isError: isEmailError,
      isLoading: isEmailLoading,
      isSuccess: isEmailSuccess,
    },
  ] = useLazyGetMethodQuery();

  const sendEmail = () => {
    trigger({
      httpResponse: {
        reqType: ApiMethod.GET,
        url: StringFormatService(childApiUrls.childResendEmail, [user.userId]),
        headers: user.token,
      },
    });
  };

  useEffect(() => {
    if ((error as FetchBaseQueryError)?.status === 403) {
      sendEmail();
      setIsOpen(true);
      return;
    }
    setIsOpen(false);
  }, [data, error]);

  useEffect(() => {
    if (count > 0) {
      const interval = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [count]);

  const handleResendEmail = async () => {
    refetch();
    setCount(30);
  };

  return (
    <div>
      {children}
      <TnModal isOpen={isOpen}>
        <DialogHeader>Verify Account</DialogHeader>
        <DialogDescription>
          You did not verify your email. Please verify your email to continue.
        </DialogDescription>
        <DialogFooter className="flex justify-end items-center">
          <p>Resend email in {moment.utc(count * 1000).format("mm:ss")}</p>
          <Button
            disabled={count !== 0 || isEmailLoading}
            onClick={handleResendEmail}
            variant={"link"}
          >
            {isEmailLoading ? "sending" : "Resend email"}
          </Button>
        </DialogFooter>
      </TnModal>
    </div>
  );
};

export default SecurePageLayout;
