import { type NextPage } from "next";
import { useState } from "react";
import About from "../components/about";
import Demo from "../components/demo";
import Experience from "../components/experience";

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <main className="2-screen flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="navbar flex w-full grow-0 flex-row justify-center bg-base-300">
          {/* TODO: make tabs into a dropdown when in mobile   */}
          <div className="tabs">
            <div
              className={`tab tab-bordered ${
                activeTab === 0 ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab(0)}
            >
              Home
            </div>
            <div
              className={`tab tab-bordered ${
                activeTab === 1 ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab(1)}
            >
              Experience
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
        <div className="flex h-full w-full grow flex-col">
          {activeTab === 0 && <About></About>}
          {activeTab === 1 && <Experience></Experience>}
          {activeTab === 2 && <Demo></Demo>}
        </div>
      </main>
    </>
  );
};

export default Home;
