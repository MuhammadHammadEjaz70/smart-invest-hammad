import AuthGuard from "@/utils/authGuard";
import React from "react";
import P2P from "@/components/P2P";

export default function index() {
  return (
    <AuthGuard type={"private"}>
        <P2P />
    </AuthGuard>
  );
}
