import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  activeTab: "about" | "experience" | "demo";
  children: ReactNode;
};

const BaseLayout = ({ activeTab, children }: Props) => {
  return (
    <>
      <Head>
        <title>Jack Frate</title>
        <meta name="description" content="Jack Frate's personal site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="2-screen flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="navbar flex w-full grow-0 flex-row justify-center bg-base-300">
          {/* TODO: make tabs into a dropdown when in mobile   */}
          <div className="tabs">
            <div
              className={`tab tab-bordered ${
                activeTab === "about" ? "tab-active" : ""
              }`}
            >
              <Link href="/">Home</Link>
            </div>
            <div
              className={`tab tab-bordered ${
                activeTab === "experience" ? "tab-active" : ""
              }`}
            >
              <Link href="/experience">Experience</Link>
            </div>
            <div
              className={`tab tab-bordered ${
                activeTab === "demo" ? "tab-active" : ""
              }`}
            >
              <Link href="/demo">Demo</Link>
            </div>
          </div>
        </div>
        <div className="flex h-full w-full grow flex-col">{children}</div>
      </main>
    </>
  );
};

export default BaseLayout;
