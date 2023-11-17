import BaseLayout from "../../../components/base-layout";
import TrainContainer from "../../../components/train-tracker/train-container/TrainContainer";
import TrainPageClient from "../../../components/train-tracker/train-page-client/TrainPageClient";

const TrainTrackerDemo = () => {
  return (
    <BaseLayout activeTab="demo">
      <TrainContainer>
        <TrainPageClient />
      </TrainContainer>
    </BaseLayout>
  );
};

export default TrainTrackerDemo;
