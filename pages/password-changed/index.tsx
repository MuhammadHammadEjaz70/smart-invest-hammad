import ForgotPassword from "@/components/Authentication/ForgetPassoword";
import Login from "@/components/Authentication/Login";
import NewPasswordSuccess from "@/components/NewPasswordSuccess";
import AuthGuard from "@/utils/authGuard";
import React from "react";

export default function index() {
  return (
    <AuthGuard type={"public"}>
      <NewPasswordSuccess />
    </AuthGuard>
  );
}
