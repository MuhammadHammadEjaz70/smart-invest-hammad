import UserRequestList from "@/components/UserRequests";
import AuthGuard from "@/utils/authGuard";
import React from "react";

export default function index() {
  return (
    <AuthGuard type={"private"}>
      <UserRequestList />
    </AuthGuard>
  );
}
