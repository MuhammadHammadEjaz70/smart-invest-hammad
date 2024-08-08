import Signup from "@/components/Authentication/Signup";
import AuthGuard from "@/utils/authGuard";
import React from "react";

export default function index() {
  return (
    <AuthGuard type={'public'}>
      <Signup/>
    </AuthGuard>
  );
}
