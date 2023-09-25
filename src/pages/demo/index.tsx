import BaseLayout from "../../components/base-layout";
import type { ProjectCardProps } from "../../components/project-card/ProjectCard";
import ProjectCard from "../../components/project-card/ProjectCard";

export const demos: ProjectCardProps[] = [
  {
    title: "Video Recorder",
    description: "Record your webcam or your screen.",
    href: "demo/video-recorder",
  },
  {
    title: "Spatial Audio",
    description:
      "Experience music from different directions (bring headphones).",
    href: "demo/spatial-audio",
  },
  // put back in when train times works
  // {
  //   title: "Train Times",
  //   description:
  //     "See Train Times for CTA stops. (It updates aggressively fast)",
  //   href: "demo/train-tracker",
  // },
];

const DemoIndex = () => {
  return (
    <BaseLayout activeTab="demo">
      <div className="mt-4 flex  flex-col items-center gap-4">
        {demos.map((demo) => (
          <ProjectCard {...demo} key={demo.href} />
        ))}
      </div>
    </BaseLayout>
  );
};

export default DemoIndex;
