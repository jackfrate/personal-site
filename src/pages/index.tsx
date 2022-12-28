import { type NextPage } from "next";
import About from "../components/about";
import BaseLayout from "../components/base-layout";

const Home: NextPage = () => {
  return (
    <BaseLayout activeTab="about">
      <About></About>
    </BaseLayout>
  );
};

export default Home;
