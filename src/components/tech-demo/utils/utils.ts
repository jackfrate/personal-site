export const handlePermissions = async (): Promise<{
  audio: boolean;
  video: boolean;
}> => {
  let audio = false;
  let video = false;

  try {
    // need to do this to request permissions
    const defaultStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    // stop memory leaks n stuff
    defaultStream.getTracks().forEach((track) => track.stop());
  } catch (e) {
    console.error("camera disabled at system level");
  }

  try {
    const micPermissionParam = { name: "microphone" as PermissionName };
    const micPermissions = await navigator.permissions.query(
      micPermissionParam
    );
    if (micPermissions.state === "denied") {
      throw new Error();
    }
    audio = micPermissions.state === "granted";
  } catch (e) {
    // TODO: popup error
    console.error("could not get mic permissions");
  }

  try {
    const cameraPermissionParam = { name: "camera" as PermissionName };
    const camPermissions = await navigator.permissions.query(
      cameraPermissionParam
    );
    if (camPermissions.state === "denied") {
      throw new Error();
    }
    video = camPermissions.state === "granted";
  } catch (e) {
    // TODO: popup error
    console.error("could not get camera permissions");
  }

  return { audio, video };
};

export const getAudioDevices = async (): Promise<MediaDeviceInfo[]> => {
  // this won't work without permissions btw
  try {
    const allDevices = await navigator.mediaDevices.enumerateDevices();
    return allDevices.filter((device) => device.kind === "audioinput");
  } catch (e) {
    console.error(e);
    return Promise.resolve([]);
  }
};

export const getVideoDevices = async (): Promise<MediaDeviceInfo[]> => {
  try {
    const allDevices = await navigator.mediaDevices.enumerateDevices();
    return allDevices.filter((device) => device.kind === "videoinput");
  } catch (e) {
    console.error(e);
    return Promise.resolve([]);
  }
};
