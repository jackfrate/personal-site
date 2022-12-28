import BaseLayout from "../../components/base-layout";

export type JobItem = {
  companyName: string;
  startDate: string;
  endDate: string;
  jobTitle: string;
  jobPoints: string[];
  // use index to sort by date, date objects might be yikes here
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
  return (
    <BaseLayout activeTab="experience">
      <div className="hero h-full w-screen grow bg-base-100">
        <div className="hero-content relative flex h-full w-full flex-col overflow-y-scroll lg:gap-16">
          <div className="space-between relative flex w-full flex-col gap-16 lg:max-w-[66%] lg:px-16">
            {jobItems.map((jobItem) => (
              <div key={jobItem.index.toString()}>
                <div className="mb-3 flex min-w-full flex-col justify-between lg:flex-row lg:items-end">
                  <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">
                      {jobItem.companyName}
                    </h1>
                    <p className="text-2xl">{jobItem.jobTitle}</p>
                  </div>
                  <p>
                    {jobItem.startDate} - {jobItem.endDate}
                  </p>
                </div>
                <ul className="flex flex-col">
                  {jobItem.jobPoints.map((point) => (
                    <li key={point} className="">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Experience;
