import { DashboardView } from "@/components/dashboard/dashboard-view";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="min-h-full bg-white">
            <DashboardView
                name={session.user.name}
                email={session.user.email}
                image={session.user.image}
            />
        </div>
    );
};

export default Home;
