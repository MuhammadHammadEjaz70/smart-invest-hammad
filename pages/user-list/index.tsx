import UsersList from "@/components/UsersList";
import AuthGuard from "@/utils/authGuard";
import React from "react";

export default function index() {
  return (
    <AuthGuard type={"private"}>
      <UsersList />
    </AuthGuard>
  );
}
