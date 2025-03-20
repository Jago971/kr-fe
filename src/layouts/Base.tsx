import React, { ReactNode } from "react";
import { Header } from "../components/Header";
import { Nav } from "../components/Nav";

interface BaseLayoutProps {
  children: ReactNode;
}

export const BaseLayout: React.FunctionComponent<BaseLayoutProps> = ({children}) => {
    return (
        <div className="flex flex-col items-center h-screen p-4 gap-4 bg-orange-100">
            <Header></Header>
            <main className="border w-full max-w-md">main
                {children}
            </main>
            <Nav></Nav>
        </div>
    )
}