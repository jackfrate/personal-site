import Image from "next/image";
import BaseLayout from "../../components/base-layout";

export type Article = {
  name: string;
  description: string;
  articleTitle: string;
  tags: string[];
};
const articles: Article[] = [
  {
    name: "vscode-vim",
    articleTitle: "Using real neo-vim inside of vscode",
    description: "Go beyond the standard vim emulation",
    tags: ["Editor", "Tutorial"],
  },
];

const Articles = () => {
  return (
    <BaseLayout activeTab="articles">
      <div className="mt-4 flex h-full w-full flex-col items-center gap-4">
        <h1>I really enjoy coding, so I&#39;ll be keeping my thoughts here.</h1>
        <div className="flex flex-col gap-4">
          {articles.map(({ name, description, articleTitle, tags }) => (
            <div
              className="card w-96 cursor-pointer bg-base-300 shadow-xl transition duration-500 hover:scale-105"
              key={name}
            >
              <figure>
                <Image
                  src={`/images/articles/${name}/card.jpg`}
                  alt="vscode + vim"
                  width={386}
                  height={386}
                ></Image>
              </figure>
              <div className="card-body">
                <h2 className="card-title">{articleTitle}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                  {tags.map((tag) => (
                    <div className="badge-outline badge" key={tag}>
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Articles;
