import BaseLayout from "../../components/base-layout";
import PrivacyNotice from "../../components/tech-demo/privacy-notice/PrivacyNotice";

const Demo = () => (
  <BaseLayout activeTab="demo">
    <div className="hero">
      <PrivacyNotice />
    </div>
  </BaseLayout>
);

export default Demo;
