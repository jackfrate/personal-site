import { useState } from "react";

export type JobItem = {
  companyName: string;
  startDate: string;
  endDate: string;
  jobTitle: string;
  jobPoints: string[];
  // use index to sort by date, date objects might be yikse here
  index: number;
};

const jobItems: JobItem[] = [
  {
    companyName: "sigma men",
    startDate: "6/9/2022",
    endDate: "9/6/2022",
    jobTitle: "sigma male",
    jobPoints: [
      "buy porsche",
      "be sigma male",
      "become a landlord",
      "invest in bulgarian poppy seeds",
    ],
    index: 0,
  },
  {
    companyName: "gamer",
    startDate: "6/9/2021",
    endDate: "9/6/2021",
    jobTitle: "gaming",
    jobPoints: ["yeet", "jeet", "quit vaping"],
    index: 1,
  },
];

const Experience = () => {
  const [activeJobItem, changeActiveJobItem] = useState<JobItem>(
    jobItems[0] as JobItem
  );

  const jobItemsUI = jobItems.map((item) => (
    <li
      key={item.index.toString()}
      className={`text-lg font-bold ${
        activeJobItem.index === item.index ? "bordered" : ""
      }`}
    >
      <p onClick={() => changeActiveJobItem(item)}>{item.companyName}</p>
    </li>
  ));

  return (
    <div className="hero mt-4 h-full w-full">
      <div className="hero-content flex-col bg-base-100 lg:flex-row-reverse">
        {/* text on right / top */}
        <div className="text-center lg:text-left">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-3xl font-bold">{activeJobItem.jobTitle}</h1>
            <p>
              {activeJobItem.startDate} - {activeJobItem.endDate}
            </p>
          </div>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        {/* text on left / bottom */}
        <div className="card w-full max-w-sm flex-shrink-0">
          <div className="card-body">
            <ul className="menu w-56 bg-base-100">{jobItemsUI}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
