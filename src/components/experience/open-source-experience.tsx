import { openSourceItems } from "../../json-data/open-source-experience";

const OpenSourceExperience = () => {
  return (
    <div className="hero h-full grow bg-base-100">
      <div className="hero-content relative flex h-full w-full flex-col overflow-y-scroll lg:gap-16">
        <div className="space-between relative flex w-full flex-col gap-16 lg:max-w-[66%] lg:px-16">
          {openSourceItems.map((openSourceItem) => (
            <div key={openSourceItem.index.toString()}>
              <div className="mb-3 flex min-w-full flex-col justify-between lg:flex-row lg:items-end">
                <div className="flex flex-col">
                  <h1 className="text-3xl font-bold text-primary">
                    {openSourceItem.repo}
                  </h1>
                  <a className="" href={openSourceItem.prLink}>
                    Pull Request Link
                  </a>
                  <p className="text-secondary">{openSourceItem.description}</p>
                </div>
                <p>
                  {/* {openSourceItem.startDate} - {openSourceItem.endDate} */}
                </p>
              </div>
              <ul className="flex flex-col">
                {/* {openSourceItem.jobPoints.map((point) => (
                  <li key={point} className="flex flex-row items-center">
                    <p>
                      <span className="text-2xl text-primary">•</span> {point}
                    </p>
                  </li>
                ))} */}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpenSourceExperience;
