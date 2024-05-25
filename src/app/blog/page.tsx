"use client";
// import { auth } from "@/auth";
import { useSession } from "next-auth/react";
import React from "react";
// import { SignOut } from "../_comp/sign-out";

const Blog = () => {
	// const session = await auth();
	const session = useSession();
	// if (!session) return <div>Not authenticated</div>;
	// console.log(session);
	return (
		<div>
			fhsdjkfjksdfj
			{/* <SignOut /> */}
		</div>
	);
};

export default Blog;
