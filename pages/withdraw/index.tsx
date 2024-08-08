import ForgotPassword from "@/components/Authentication/ForgetPassoword";
import UserWithDraw from "@/components/UserWithdraw";
import AuthGuard from "@/utils/authGuard";
import React from "react";

export default function index() {
  return (
    <AuthGuard type={"private"}>
      <UserWithDraw />
    </AuthGuard>
  );
}
