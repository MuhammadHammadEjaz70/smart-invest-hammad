import ForgotPasswordSuccess from "@/components/Authentication/ForgotPasswordSuccess";
import AuthGuard from "@/utils/authGuard";
import React from "react";

export default function index() {
  return (
    <AuthGuard type={"public"}>
      <ForgotPasswordSuccess />
    </AuthGuard>
  );
}
