import Link from "next/link";
import type { ReactNode } from "react";

const sections = ["work", "openSource", "projects"] as const;

type Props = {
  activeSection: typeof sections[number];
  children: ReactNode;
};

const ExperienceLayout = ({ activeSection, children }: Props) => {
  return (
    <div className="flex grow-0 flex-col lg:flex-row">
      {/* Dropdown for mobile */}
      <div className="dropdown lg:hidden">
        <label tabIndex={0} className="btn m-1">
          {activeSection}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
        ></ul>
      </div>
      {/* Sidebar menu for desktop */}
      <div className="hidden grow-0 lg:flex">
        <ul className="menu w-56 bg-base-100">
          {sections.map((section) => (
            <li key={section}>
              <Link href={`/experience/${section}`}>
                <p className={`${section === activeSection ? "active" : ""}`}>
                  {section}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* actual content that shows up */}
      {children}
      {/* TODO: delete or use this */}
      {/* <div className="flex grow"> */}
      {/* </div> */}
    </div>
  );
};

export default ExperienceLayout;
