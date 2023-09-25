import Link from "next/link";

export type ProjectCardProps = {
  title: string;
  href: string;
  description?: string;
};

const ProjectCard = ({ title, description, href }: ProjectCardProps) => {
  return (
    <Link href={href}>
      <div className="card w-96 transform bg-neutral px-10 py-4 text-neutral-content transition duration-200 hover:scale-110">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
