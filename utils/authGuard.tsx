"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminMainLayout from "@/components/AdminMainLayout";
interface AuthGuardProps {
  type: string;
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = (props) => {
  const router = useRouter();
  let token =
    typeof window !== "undefined" ? localStorage.getItem("userToken") : null;
  useEffect(() => {
    if (props.type === "public") {
      if (token) router.push("/dashboard");
    } else {
      if (!token) router.push("/login");
    }
  }, [router]);

  return props.type === "public" ? (
    <>{props.children}</>
  ) : (
    <div className="d-flex w-100">
      <AdminMainLayout>{props.children}</AdminMainLayout>
    </div>
  );
};

export default AuthGuard;
