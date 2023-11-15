import React from "react";
import BaseLayout from "../base-layout";

type ArticleLayoutProps = {
  children: React.ReactNode;
};

const ArticleLayout: React.FC<ArticleLayoutProps> = ({ children }) => {
  return (
    <BaseLayout activeTab="articles">
      <div className="flex w-full justify-center pt-4 sm:px-3 md:px-8">
        <div className="flex max-w-[680px] flex-col">{children}</div>
      </div>
    </BaseLayout>
  );
};

export default ArticleLayout;
