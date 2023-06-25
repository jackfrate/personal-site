import Link from "next/link";

export type NavbarLinks = "about" | "experience" | "demo" | "articles";

type Props = {
  activeTab: NavbarLinks;
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
          <Link href="/demo">Tech Demos</Link>
        </div>
        <div
          className={`tab tab-bordered ${
            activeTab === "articles" ? "tab-active" : ""
          }`}
        >
          <Link href="/articles">Articles</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
