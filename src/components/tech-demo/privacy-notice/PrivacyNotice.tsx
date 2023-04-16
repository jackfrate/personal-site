"use-client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import RecordingControllerContainer from "../recording-controller/RecordingControllerContainer";

const PrivacyNotice = () => {
  // local storage is weird with next and can cause hydration errors,
  // getting around it with a use effect and separate state
  const [noticeAgreed, setNoticeAgreed] = useState(false);
  const [privacyNoticeAgreed, setPrivacyNoticeAgreed] = useLocalStorage(
    "PRIVACY_NOTICE",
    false
  );

  useEffect(() => {
    setNoticeAgreed(privacyNoticeAgreed);
  }, [privacyNoticeAgreed, setPrivacyNoticeAgreed]);

  return !noticeAgreed ? (
    <div className="card mt-3 bg-neutral text-neutral-content md:max-w-[50%]">
      <div className="card-body flex flex-col items-center ">
        <h2 className="card-title">Privacy notice</h2>
        <div className="flex flex-col gap-4">
          <p>
            This project lets you create either a webcam or screen recording
            using your browser.
          </p>
          <p>
            <em>Nothing </em>made on here is saved anywhere except locally on
            your machine (if you download the video).
          </p>
          <p>
            You will not see this message again on this machine once you
            acknowledge
          </p>
        </div>
      </div>
      <div className="card-actions flex flex-row p-8">
        <button
          className="btn-primary btn"
          onClick={() => setPrivacyNoticeAgreed(true)}
        >
          OK, let me record a video
        </button>
      </div>
    </div>
  ) : (
    <RecordingControllerContainer />
  );
};

export default PrivacyNotice;
