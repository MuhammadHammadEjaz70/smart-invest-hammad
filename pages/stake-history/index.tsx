import AuthGuard from "@/utils/authGuard";
import React from "react";
import StakeHistory from "../../components/StakeHistory/index";

export default function index() {
  return (
    <AuthGuard type={"private"}>
      <StakeHistory />
    </AuthGuard>
  );
}
