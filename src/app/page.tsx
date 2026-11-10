import { SignOutButton } from "@/components/auth/sign-out-button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return <SignOutButton />;
};

export default Home;
