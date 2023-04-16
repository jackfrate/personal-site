"use-client";
type RecordingSettingsProps = {
  audioDevices?: MediaDeviceInfo[];
  videoDevices?: MediaDeviceInfo[];
  selectedAudioDevice?: MediaDeviceInfo;
  selectedVideoDevice?: MediaDeviceInfo;
  onAudioDeviceChange: (device: MediaDeviceInfo) => void;
  onVideoDeviceChange: (device: MediaDeviceInfo) => void;
};

const RecordingSettings = ({
  audioDevices,
  videoDevices,
  selectedAudioDevice,
  selectedVideoDevice,
  onAudioDeviceChange,
  onVideoDeviceChange,
}: RecordingSettingsProps) => {
  return (
    <div className="card w-[400px] bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Recording Settings</h2>
        <h3 className="">Camera Settings</h3>
        {/* camera / mic dropdowns */}
        <div className="flex flex-col ">
          <div className="dropdown w-full">
            <label tabIndex={0} className="btn-secondary btn m-1 w-full">
              {selectedAudioDevice?.label ?? "select video device"} ⌄
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
            <label tabIndex={0} className="btn-secondary btn m-1 w-full">
              {selectedVideoDevice?.label ?? "select video device"} ⌄
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
