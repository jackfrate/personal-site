import Image from "next/image";
import BaseLayout from "../../components/base-layout";

const articleLinkNames = ["vscode-vim"];

const Articles = () => {
  return (
    <BaseLayout activeTab="articles">
      <div className="mt-4 flex h-full w-full flex-col items-center gap-4">
        <h1>I really enjoy coding, so I&#39;ll be keeping my thoughts here.</h1>
        <div className="flex flex-col gap-4">
          {articleLinkNames.map((name) => (
            <div className="card w-96 bg-base-100 shadow-xl" key={name}>
              <figure>
                <Image src=""></Image>
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  Shoes!
                  <div className="badge-secondary badge">NEW</div>
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <div className="badge-outline badge">Fashion</div>
                  <div className="badge-outline badge">Products</div>
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
