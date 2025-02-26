import { cn } from "@/utils/libs/classNames";
import { Mic } from "lucide-react";
import React, { ComponentRef } from "react";

const RecordInput = () => {
  const [recording, setRecording] = React.useState(false);

  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const analyserRef = React.useRef<AnalyserNode | null>(null);
  const canvasRef = React.useRef<ComponentRef<"canvas"> | null>(null);
  const animationRef = React.useRef<number | null>(null);
  const dataArrayRef = React.useRef<Uint8Array | null>(null);
  const setupAudioContext = (stream: MediaStream) => {
    const audioContext = new window.AudioContext();
    audioContextRef.current = audioContext;

    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);

    analyserRef.current = analyser;
    const bufferLength = analyser.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);
  };

  const drawWaveform = () => {
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
  };
  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      setupAudioContext(stream);

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // Store audio chunks
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      // When recording stops, create audio blob and URL
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const audioURL = URL.createObjectURL(blob);
        //  setAudioData([
        //    ...audioData,
        //    { url: audioURL, date: new Date().toLocaleString() },
        //  ]);
        setRecording(false);
      };

      // Start the media recorder
      mediaRecorder.start();
      setRecording(true);
      drawWaveform();
    } catch (err) {
      //    setError("Microphone access denied or not available");
      console.error("Error accessing microphone:", err);
    }
  }
  return (
    <div className="flex justify-center items-center relative">
      <button
        onClick={() => {
          setRecording((old) => !old);
        }}
        className="relative"
      >
        <Mic
          className={cn("size-5", {
            "text-red-500": recording,
          })}
        />
      </button>

      {recording && (
        <canvas
          ref={canvasRef}
          className="absolute h-80 bg-green-200 w-[30rem]  left-full bottom-0 top-0 right-0 border"
        ></canvas>
      )}
    </div>
  );
};

export default RecordInput;
