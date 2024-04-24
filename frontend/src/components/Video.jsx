import { useEffect, useRef } from "react";

export const Video = ({ stream, Audiomuted }) => {
  const videoRef = useRef();
  useEffect(() => {
    if (videoRef && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [videoRef, stream]);

  return (
    <div>
      <div>
        <video
          style={{ borderRadius: 10 }}
          ref={videoRef}
          // muted={Audiomuted}
          controls
          // controlslist="play timeline volume"
          width="100%"
          autoPlay={true}
          playsInline={true}
        />
      </div>
    </div>
  );
};
