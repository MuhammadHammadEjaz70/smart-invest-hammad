import Login from "@/components/Authentication/Login";
import AuthGuard from "@/utils/authGuard";
import React from "react";

export default function index() {
  return (
    <AuthGuard type={"public"}>
      <Login />
    </AuthGuard>
  );
}
