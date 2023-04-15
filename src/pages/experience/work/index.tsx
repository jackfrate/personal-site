import BaseLayout from "../../../components/base-layout";
import ExperienceLayout from "../../../components/experience/experience-layout";
import JobExperience from "../../../components/experience/job-experience";

const WorkExperience = () => {
  return (
    <BaseLayout activeTab="experience">
      <ExperienceLayout activeSection="work">
        <JobExperience></JobExperience>
      </ExperienceLayout>
    </BaseLayout>
  );
};

export default WorkExperience;
