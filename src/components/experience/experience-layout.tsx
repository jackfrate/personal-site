import type { ReactNode } from "react";

const sections = ["work", "openSource", "projects"] as const;

type Props = {
  activeSection: typeof sections[number];
  children: ReactNode;
};

const ExperienceLayout = ({ activeSection, children }: Props) => {
  return (
    <div className="relative flex grow-0 flex-col bg-base-100 lg:flex-row">
      {/* Dropdown for mobile */}
      <div className="dropdown flex flex-row justify-center lg:hidden">
        <label tabIndex={0} className="btn m-1">
          {activeSection}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-52 bg-base-300 p-2 shadow"
        >
          {sections.map((section) => (
            <li key={section}>
              <a href={`/experience/${section}`}>{section}</a>
            </li>
          ))}
        </ul>
      </div>
      {/* Sidebar menu for desktop */}
      <div className="sticky hidden max-h-screen grow-0 flex-col items-center justify-center lg:flex">
        <ul className="menu w-56 bg-base-100">
          {sections.map((section) => (
            <li key={section}>
              <a href={`/experience/${section}`}>
                <p className={`${section === activeSection ? "active" : ""}`}>
                  {section}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* actual content that shows up */}
      <div className="flex grow flex-col ">{children}</div>
      {/* TODO: delete or use this */}
      {/* <div className="flex grow"> */}
      {/* </div> */}
    </div>
  );
};

export default ExperienceLayout;
