import DepositCoins from "@/components/DepositCoins";
import AuthGuard from "@/utils/authGuard";
import React from "react";

export default function index() {
  return (
    <AuthGuard type={"private"}>
      <DepositCoins />
    </AuthGuard>
  );
}
