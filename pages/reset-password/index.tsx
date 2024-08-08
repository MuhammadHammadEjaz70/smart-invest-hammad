import NewPassword from "@/components/Authentication/NewPassword";
import AuthGuard from "@/utils/authGuard";
import React from "react";
import { useRouter } from "next/router";

export default function index() {
	const router = useRouter();
	const { token, email } = router.query;
	return (
		<AuthGuard type={"public"}>
			<NewPassword token={token as string} email={email as string} />
		</AuthGuard>
	);
}
