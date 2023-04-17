"use-client";

import { MdOutlineMic, MdVideocam } from "react-icons/md";
import { RxChevronDown } from "react-icons/rx";

type RecordingSettingsProps = {
  audioDevices?: MediaDeviceInfo[];
  videoDevices?: MediaDeviceInfo[];
  selectedAudioDevice?: MediaDeviceInfo;
  selectedVideoDevice?: MediaDeviceInfo;
  recordingMode: "screen" | "webcam";
  onAudioDeviceChange: (device: MediaDeviceInfo) => void;
  onVideoDeviceChange: (device: MediaDeviceInfo) => void;
  onRecordingModeChange: (recordingMode: "screen" | "webcam") => void;
};

const RecordingSettings = ({
  audioDevices,
  videoDevices,
  selectedAudioDevice,
  selectedVideoDevice,
  recordingMode,
  onAudioDeviceChange,
  onVideoDeviceChange,
  onRecordingModeChange,
}: RecordingSettingsProps) => {
  return (
    <div className="card  bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Recording Settings</h2>
        <div className="flex flex-col md:flex-row">
          {/* recording mode */}

          <div className="flex flex-col md:min-w-[200px] md:px-6">
            Recording Mode
            <div className="form-control">
              <label
                className="label cursor-pointer"
                onClick={() => onRecordingModeChange("webcam")}
              >
                <span className="label-text">Webcam</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio"
                  checked={recordingMode === "webcam"}
                />
              </label>
              <label
                className="label cursor-pointer"
                onClick={() => onRecordingModeChange("screen")}
              >
                <span className="label-text">Screen</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio"
                  checked={recordingMode === "screen"}
                />
              </label>
            </div>
          </div>
          {/* camera / mic dropdowns */}
          <div className="flex max-w-[400px] flex-col">
            <h3 className="">Camera Settings</h3>
            <div className="dropdown w-full">
              <label
                tabIndex={0}
                className="btn-outline btn-secondary btn m-1 w-full"
              >
                <div className="flex w-full flex-row items-center justify-between ">
                  <MdOutlineMic size="32px" />
                  <p className="overflow-hidden">
                    {selectedAudioDevice?.label ?? "select video device"}
                  </p>
                  <RxChevronDown size="32px" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box flex flex-col gap-2 bg-base-100 p-2 shadow"
              >
                {(audioDevices ?? []).map((device) => (
                  <button
                    className="btn"
                    key={device.deviceId}
                    onClick={() => onAudioDeviceChange(device)}
                  >
                    {device.label}
                  </button>
                ))}
              </ul>
            </div>
            <div className="dropdown w-full">
              <label
                tabIndex={0}
                className="btn-outline btn-secondary btn m-1 w-full"
              >
                <div className="flex w-full flex-row items-center justify-between">
                  <MdVideocam size="32px" />
                  <p className="overflow-hidden">
                    {selectedVideoDevice?.label ?? "select video device"}
                  </p>
                  <RxChevronDown size="32px" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box flex flex-col gap-2 bg-base-100 p-2 shadow"
              >
                {(videoDevices ?? []).map((device) => (
                  <button
                    className="btn"
                    key={device.deviceId}
                    onClick={() => onVideoDeviceChange(device)}
                  >
                    {device.label}
                  </button>
                ))}
              </ul>
            </div>
            {/* TODO: delete this part when camera stuff works */}
            <p className="pt-4">
              Screen recording coming soon (as that&apos;s the main reason I
              made this)
            </p>
          </div>
        </div>
        <div className="card-actions justify-end">
          {/* <button className="btn-primary btn">Accept</button> */}
          {/* <button className="btn-ghost btn">Deny</button> */}
        </div>
      </div>
    </div>
  );
};

export default RecordingSettings;
