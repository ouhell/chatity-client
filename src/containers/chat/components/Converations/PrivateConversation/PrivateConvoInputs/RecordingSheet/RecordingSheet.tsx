import React, { ComponentRef } from "react";

type Props = {
  isRecording: boolean;
  stream?: MediaStream | null;
  blob?: Blob;
};

const RecordingSheet = ({ isRecording, stream }: Props) => {
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const analyserRef = React.useRef<AnalyserNode | null>(null);
  const canvasRef = React.useRef<ComponentRef<"canvas"> | null>(null);
  const animationRef = React.useRef<number | null>(null);
  const dataArrayRef = React.useRef<Uint8Array | null>(null);

  const setupAudioContext = React.useCallback((stream: MediaStream) => {
    const audioContext = new window.AudioContext();
    audioContextRef.current = audioContext;

    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);

    analyserRef.current = analyser;
    const bufferLength = analyser.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);
  }, []);

  const drawWaveform = React.useCallback(() => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    if (!dataArray) return;
    analyser.getByteTimeDomainData(dataArray);

    ctx.fillStyle = "rgb(240, 240, 240)";
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0, 122, 255)";
    ctx.beginPath();

    const sliceWidth = width / dataArray.length;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * (height / 2);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(width, height / 2);
    ctx.stroke();

    animationRef.current = requestAnimationFrame(drawWaveform);
  }, []);

  React.useEffect(() => {
    if (isRecording && stream) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      setupAudioContext(stream);
      drawWaveform();
    }
  }, [isRecording, stream]);
  return (
    <div className="fixed top-0 left-0 min-w-fit min-h-fit size-80 border">
      {isRecording && (
        <canvas width="400" height="100" ref={canvasRef}></canvas>
      )}
    </div>
  );
};

export default RecordingSheet;
