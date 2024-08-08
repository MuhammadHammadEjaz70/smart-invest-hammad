import DepositCoins from "@/components/DepositCoins";
import DepositHistory from "@/components/DepositHistory";
import AuthGuard from "@/utils/authGuard";
import React from "react";

export default function index() {
  return (
    <AuthGuard type={"private"}>
      <DepositHistory />
    </AuthGuard>
  );
}
