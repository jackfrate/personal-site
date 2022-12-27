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

  return (
    <div className="hero h-full w-screen grow bg-base-100">
      <div className="hero-content relative flex h-full w-full flex-col lg:gap-16">
        {/* job desc */}
        <div className="space-between relative flex w-full flex-col">
          {jobItems.map((jobItem) => (
            <>
              <div className="flex min-w-full flex-row items-center justify-between">
                <h1 className="text-3xl font-bold">{jobItem.jobTitle}</h1>
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
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
