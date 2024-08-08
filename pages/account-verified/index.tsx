import AccountVerificationSuccess from "@/components/Authentication/AccountVerificationSuccess";
import AuthGuard from "@/utils/authGuard";
import { useRouter } from "next/router";
import React from "react";

export default function index() {
  const router = useRouter();
  const { token } = router.query;
  return (
    <AuthGuard type={"public"}>
      <AccountVerificationSuccess token={token as string} />
    </AuthGuard>
  );
}
