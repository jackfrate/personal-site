import BaseLayout from "../../../components/base-layout";
import ExperienceLayout from "../../../components/experience/experience-layout";
import OpenSourceExperience from "../../../components/experience/open-source-experience";

const OpenSource = () => {
  return (
    <BaseLayout activeTab="experience">
      <ExperienceLayout activeSection="open-source">
        <OpenSourceExperience></OpenSourceExperience>
      </ExperienceLayout>
    </BaseLayout>
  );
};

export default OpenSource;
