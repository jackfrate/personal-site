import Head from "next/head";
import type { ReactNode } from "react";
import Navbar from "./experience/navbar";

type Props = {
  activeTab: "about" | "experience" | "demo";
  children: ReactNode;
};

const BaseLayout: React.FC<Props> = ({ activeTab, children }: Props) => {
  return (
    <>
      <Head>
        <title>Jack Frate</title>
        <meta name="description" content="Jack Frate's personal site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="2-screen flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Navbar activeTab={activeTab}></Navbar>
        <div className="flex h-full w-full grow flex-col">{children}</div>
      </main>
    </>
  );
};

export default BaseLayout;
