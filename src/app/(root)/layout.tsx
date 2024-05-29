import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="">
			<Navbar />
			<main className=" container mx-auto px-4 lg:px-10">{children}</main>
			<Footer />
		</div>
	);
};

export default UserLayout;
