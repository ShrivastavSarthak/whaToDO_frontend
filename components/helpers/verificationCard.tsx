"use client";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import TnModal from "@/lib/wrapper/Tn_modal";
import { childApiUrls, parentApiUrls } from "@/shared/utils/enums/apiEnums";
import { userEnums } from "@/shared/utils/enums/user-enums";
import { useLazyGetApi } from "@/shared/utils/hooks/lazyGetApi";
import { useAppSelector } from "@/shared/utils/hooks/redux-hook";
import { StringFormatService } from "@/shared/utils/services/stringFormatService";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import moment from "moment";

import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

export default function VerificationCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(30);
  const user = useAppSelector((state) => state.user);

  const {
    data: emailData,
    error: isEmailError,
    getApi: getEmail,
    isLoading: isEmailLoading,
  } = useLazyGetApi();

  const {
    getApi: getUser,
    data: userData,
    error: isUserError,
    isLoading: isUserLoading,
  } = useLazyGetApi();

  const chooseAndGetUser = () => {
    const userUrl =
      user.role === userEnums.PARENT
        ? StringFormatService(parentApiUrls.getParentById, [user.id])
        : StringFormatService(childApiUrls.getChildById, [user.id]);

    getUser(userUrl);
  };

  const listenIsUserVerified = () => {
    socket.on(`emailVerified:${user.id}`, () => {
      setIsOpen(false);
    });

    return () => {
      socket.off(`emailVerified:${user.id}`);
    };
  };

  useEffect(() => {
    listenIsUserVerified();
    chooseAndGetUser();
  }, []);

  const sendEmail = () => {
    const userUrl =
      user.role === userEnums.PARENT
        ? StringFormatService(parentApiUrls.parentResendEmail, [user.id])
        : StringFormatService(childApiUrls.childResendEmail, [user.id]);
    getEmail(userUrl, user.token);
  };

  useEffect(() => {
    if ((isUserError as FetchBaseQueryError)?.status === 403 && !isOpen) {
      sendEmail();
      setIsOpen(true);
      return;
    }
    setIsOpen(false);
  }, [userData, isUserError]);

  useEffect(() => {
    if (count > 0) {
      const interval = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [count]);

  const handleResendEmail = async () => {
    sendEmail();
    setCount(30);
  };

  return (
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
  );
}
