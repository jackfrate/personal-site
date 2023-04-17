import BaseLayout from "../../../components/base-layout";

const WorkExperience = () => {
  return (
    <BaseLayout activeTab="experience">
      {/* TODO: gonna change this up */}
      <div className="flex w-screen flex-col items-center pt-4">
        <a href="/resume/JackFrateResume.pdf" target="_blank">
          <button className="btn">See my Resume (opens in new tab)</button>
        </a>
      </div>
      {/* <ExperienceLayout activeSection="work">
        <JobExperience></JobExperience>
      </ExperienceLayout> */}
    </BaseLayout>
  );
};

export default WorkExperience;
