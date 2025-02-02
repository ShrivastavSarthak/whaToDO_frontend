"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import Signin from "./signin";
import Signup from "./signup";
import { Button } from "@/components/ui/button";

export function Auth() {
  const [isSignUp, setIsSignup] = useState(false);

  const handleSignUp = () => {
    setIsSignup(!isSignUp);
  };

  return (
    <div className="flex items-start justify-center   overflow-y-auto w-full h-screen p-2 ">
      <Card className="w-full max-w-[30rem] shadow-lg p-4 my-[3%]">
        <CardHeader className="flex flex-col items-center">
          <h2 className=" font-semibold">
            Welcome to <span className="font-extrabold">TaskNest</span>
          </h2>
          <h3 className="font-bold text-center">
            {isSignUp ? "Login" : "Signup"}
          </h3>
        </CardHeader>
        <CardContent className="">
          {isSignUp ? <Signin /> : <Signup />}
          <p className="text-center mt-4">
            {!isSignUp ? "Already have an account?" : "New to TaskNest?"}{" "}
            <Button onClick={handleSignUp} variant="link">
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
