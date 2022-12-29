import BaseLayout from "../../components/base-layout";
import { jobItems } from "./experience";

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
                    <h1 className="text-3xl font-bold text-primary">
                      {jobItem.companyName}
                    </h1>
                    <p className="text-2xl text-secondary">
                      {jobItem.jobTitle}
                    </p>
                  </div>
                  <p>
                    {jobItem.startDate} - {jobItem.endDate}
                  </p>
                </div>
                <ul className="flex flex-col">
                  {jobItem.jobPoints.map((point) => (
                    <li key={point} className="flex flex-row items-center">
                      <p>
                        <span className="text-2xl text-primary">•</span> {point}
                      </p>
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
