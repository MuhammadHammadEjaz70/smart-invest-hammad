import StakePlans from "@/components/StakePlans";
import AuthGuard from "@/utils/authGuard";
import React from "react";

export default function index() {
  return (
    <AuthGuard type={"private"}>
      <StakePlans />
    </AuthGuard>
  );
}
