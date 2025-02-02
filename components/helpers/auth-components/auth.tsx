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
    <Card className="w-[25rem] mx-2">
      <CardHeader className="flex flex-col items-center">
        <h3>
          Welcome to <span className="font-extrabold">TaskNest</span>
        </h3>
      </CardHeader>
      <h5 className="font-bold text-center">{isSignUp ? "Login" : "Signup"}</h5>
      <CardContent>
        {isSignUp ? <Signin /> : <Signup />}
        <p className="text-center m-2">
          {!isSignUp ? "Already have an account?" : "New to TaskNest?"}{" "}
          <Button onClick={handleSignUp} variant="link">
            {isSignUp ? "Sign Up" : "Login"}
          </Button>{" "}
        </p>
      </CardContent>
    </Card>
  );
}
