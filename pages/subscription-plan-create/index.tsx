import SubscriptionPlanCreate from "@/components/SubscriptionPlanCreate";
import AuthGuard from "@/utils/authGuard";
import React from "react";

export default function index() {
  return (
    <AuthGuard type={"private"}>
      <SubscriptionPlanCreate />
    </AuthGuard>
  );
}
