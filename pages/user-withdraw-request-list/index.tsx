import UserWithdrawRequest from "@/components/userWithdrawRequest";
import AuthGuard from "@/utils/authGuard";
import React from "react";

export default function index() {
  return (
    <AuthGuard type={"private"}>
      <UserWithdrawRequest />
    </AuthGuard>
  );
}
