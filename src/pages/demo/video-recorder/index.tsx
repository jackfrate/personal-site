import BaseLayout from "../../../components/base-layout";
import Landing from "../../../components/new-recorder/landing/Landing";

const Demo = () => (
  <BaseLayout activeTab="demo">
    <div className="hero">
      <Landing />
    </div>
  </BaseLayout>
);

export default Demo;
