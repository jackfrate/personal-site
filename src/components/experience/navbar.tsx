import Link from "next/link";

type Props = {
  activeTab: "about" | "experience" | "demo";
};

const Navbar: React.FC<Props> = ({ activeTab }) => {
  return (
    <div className="navbar flex w-full grow-0 flex-row justify-center bg-base-300">
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
          <Link href="/demo">Video Recorder Demo</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
