import SubscriptionPlanList from "@/components/SubscriptionPlanList";
import AuthGuard from "@/utils/authGuard";
import React from "react";

export default function index() {
  return (
    <AuthGuard type={"private"}>
      <SubscriptionPlanList />
    </AuthGuard>
  );
}
