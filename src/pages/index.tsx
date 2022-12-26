import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import About from "../components/About";
import Demo from "../components/demo";
import Experience from "../components/experience";

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="2-screen flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="navbar flex w-full flex-row justify-center bg-base-100">
          {/* TODO: make tabs into a dropdown when in mobile   */}
          <div className="tabs">
            <div
              className={`tab tab-bordered ${
                activeTab === 0 ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab(0)}
            >
              Experience
            </div>
            <div
              className={`tab tab-bordered ${
                activeTab === 1 ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab(1)}
            >
              About me
            </div>
            <div
              className={`tab tab-bordered ${
                activeTab === 2 ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab(2)}
            >
              Demo
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col">
          {activeTab === 0 && <Experience></Experience>}
          {activeTab === 1 && <About></About>}
          {activeTab === 2 && <Demo></Demo>}
        </div>
      </main>
    </>
  );
};

export default Home;
