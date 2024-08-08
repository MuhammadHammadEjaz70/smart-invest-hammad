"use client";
import React, { useEffect, useState } from "react";
import AuthGuard from "@/utils/authGuard";
import AdminDashboard from "@/components/AdminDashboard";
import UserDashboard from "@/components/UserDashboard";

const Dashboard = () => {
  const [role, setRole] = useState<any>("");
  useEffect(() => {
    let roleName =
      typeof window !== "undefined" ? localStorage.getItem("userType") : "";
    setRole(roleName);
  }, []);

  return (
    //new checks added
    <AuthGuard type={"private"}>
      {role === "Admin" ? <AdminDashboard /> : <UserDashboard />}
    </AuthGuard>
  );
};

export default Dashboard;
