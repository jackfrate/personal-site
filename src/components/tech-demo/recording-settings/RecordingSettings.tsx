"use-client";

import { useEffect, useState } from "react";
import { MdOutlineMic, MdVideocam } from "react-icons/md";
import { RxChevronDown } from "react-icons/rx";
import { useLocalStorage } from "usehooks-ts";
import {
  getAudioDevices,
  getVideoDevices,
  handlePermissions,
} from "../utils/utils";

type RecordingSettingsProps = {
  onConstraintsChange: (
    constraints: MediaStreamConstraints | undefined
  ) => void;
};

const RecordingSettings = ({ onConstraintsChange }: RecordingSettingsProps) => {
  const [recordingMode, setRecordingMode] = useLocalStorage<
    "screen" | "webcam"
  >("RECORDING_TYPE", "webcam");

  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>();
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>();

  const [selectedAudioDevice, setSelectedAudioDevice] =
    useState<MediaDeviceInfo>();
  const [preferredAudioDevice, setPreferredAudioDevice] = useLocalStorage<
    string | undefined
  >("PREFERRED_AUDIO_DEVICE", undefined);

  const [selectedVideoDevice, setSelectedVideoDevice] =
    useState<MediaDeviceInfo>();
  const [preferredVideoDevice, setPreferredVideoDevice] = useLocalStorage<
    string | undefined
  >("PREFERRED_VIDEO_DEVICE", undefined);

  useEffect(() => {
    const setupDevices = async () => {
      await handlePermissions();
      const mics = await getAudioDevices();
      const cams = await getVideoDevices();

      setAudioDevices(mics);
      setVideoDevices(cams);

      // just use first item in each list, can change later
      // do the camera first, since we only need a mic to start desktop recording
      if (cams.length > 0) {
        const prefCam = cams.find(
          (device) => device.deviceId === preferredVideoDevice
        );
        setSelectedVideoDevice(prefCam ?? cams[0]);
      }

      if (mics.length > 0) {
        const prefMic = mics.find(
          (device) => device.deviceId === preferredAudioDevice
        );
        setSelectedAudioDevice(prefMic ?? mics[0]);
      }
    };

    setupDevices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedAudioDevice || !selectedVideoDevice) {
      return;
    }

    onConstraintsChange({
      video: { deviceId: selectedVideoDevice.deviceId },
      audio: { deviceId: selectedAudioDevice.deviceId },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAudioDevice?.deviceId, selectedVideoDevice?.deviceId]);

  return (
    <div className="card  bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Recording Settings</h2>
        <div className="flex flex-col md:flex-row">
          {/* recording mode */}
          <div className="flex flex-col md:min-w-[200px] md:px-6">
            Recording Mode
            <div className="form-control pt-4">
              <label
                className="label cursor-pointer"
                onClick={() => setRecordingMode("webcam")}
              >
                <span className="label-text">Webcam</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio"
                  defaultChecked={recordingMode === "webcam"}
                />
              </label>
              <label
                className="label cursor-pointer"
                onClick={() => setRecordingMode("screen")}
              >
                <span className="label-text">Screen</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio"
                  defaultChecked={recordingMode === "screen"}
                />
              </label>
            </div>
          </div>
          {/* camera / mic dropdowns */}
          <div className="flex max-w-[400px] flex-col">
            <h3 className="pb-4">Device Settings</h3>
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
                    onClick={() => {
                      setSelectedAudioDevice(device);
                      setPreferredAudioDevice(device.deviceId);
                    }}
                  >
                    {device.label}
                  </button>
                ))}
              </ul>
            </div>
            {/* TODO: remove this check when  */}
            {recordingMode === "webcam" && (
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
                      onClick={() => {
                        setSelectedVideoDevice(device);
                        setPreferredVideoDevice(device.deviceId);
                      }}
                    >
                      {device.label}
                    </button>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingSettings;
