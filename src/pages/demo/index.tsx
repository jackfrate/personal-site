import Link from "next/link";
import BaseLayout from "../../components/base-layout";

const DemoIndex = () => {
  return (
    <BaseLayout activeTab="demo">
      <div className="mt-4 flex h-full w-full flex-col items-center gap-4">
        <p>Record your webcam or your screen</p>
        <Link href="demo/video-recorder">
          <button className="btn-primary btn">Video Recorder</button>
        </Link>

        <p>Experience Spatial Audio</p>
        <Link href="demo/spatial-audio">
          <button className="btn-primary btn">Spatial Audio</button>
        </Link>

        <p>See Train Times for CTA stops</p>
        <Link href="demo/train-tracker">
          <button className="btn-primary btn">Train Times</button>
        </Link>
      </div>
    </BaseLayout>
  );
};

export default DemoIndex;
