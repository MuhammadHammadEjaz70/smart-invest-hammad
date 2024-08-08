import ForgotPassword from "@/components/Authentication/ForgetPassoword";
import AuthGuard from "@/utils/authGuard";
import React from "react";

export default function index() {
	return (
		<AuthGuard type={"public"}>
			<ForgotPassword />
		</AuthGuard>
	);
}
