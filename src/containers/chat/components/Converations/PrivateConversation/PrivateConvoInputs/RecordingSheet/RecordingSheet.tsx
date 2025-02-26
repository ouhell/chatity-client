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

    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(128, 128, 128)";
    ctx.beginPath();

    const sliceWidth = width / dataArray.length;
    let x = 0;

    const centerY = height / 2;

    for (let i = 0; i < dataArray.length; i++) {
      // Calculate normalized value (0-1) from the audio data (0-255)
      const normalizedValue = (dataArray[i] - 128) / 128.0;

      // Apply sensitivity reduction
      const dampedValue = normalizedValue * 0.7;

      // Calculate y position with reduced amplitude
      const y = centerY + dampedValue * (height / 3); // Reduce amplitude by using height/3 instead of height/2

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(width, centerY);
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
    <div className="bg-red-200 w-full h-full">
      {isRecording && <canvas className="size-full" ref={canvasRef}></canvas>}
    </div>
  );
};

export default RecordingSheet;
