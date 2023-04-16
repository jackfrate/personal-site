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
    <div className="card w-96 bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">settings</h2>
        <div className="dropdown">
          <label tabIndex={0} className="btn-secondary btn m-1">
            {selectedVideoDevice?.label ?? "select video device"}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
          >
            {(videoDevices ?? []).map((device) => (
              <button
                className="btn "
                key={device.deviceId}
                onClick={() => console.log("bada bing")}
              >
                {device.label}
              </button>
            ))}
          </ul>
        </div>
        <div className="card-actions justify-end">
          <button className="btn-primary btn">Accept</button>
          <button className="btn-ghost btn">Deny</button>
        </div>
      </div>
    </div>
  );
};

export default RecordingSettings;
