import { MDXProvider } from "@mdx-js/react";
import Article from "./yeet.mdx";

const VscodeVimArticle = () => {
  return (
    <MDXProvider>
      <Article />;
    </MDXProvider>
  );
};

export default VscodeVimArticle;
