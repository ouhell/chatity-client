import { RECORDING_TIMEOUT } from "@/containers/chat/utils/constants";
import { cn } from "@/utils/libs/classNames";
import { Mic } from "lucide-react";
import React from "react";

export type RecordData = {
  isRecording: boolean;
  recorder?: MediaRecorder | null;
};

type Props = {
  onRecordChange?: (data: RecordData) => void;
  onRecordComplete?: (blob: Blob) => void;
};

const RecordInput = ({ onRecordChange, onRecordComplete }: Props) => {
  const [isRecording, setIsRecording] = React.useState(false);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const recordTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
      mediaRecorderRef.current = null;
      setIsRecording(false);
    }
    if (recordTimeoutRef.current) {
      clearTimeout(recordTimeoutRef.current);
    }
  };

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // Store audio chunks
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        console.log("receiving data : ", e.data.size);
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      recordTimeoutRef.current = setTimeout(() => {
        stopRecording();
      }, RECORDING_TIMEOUT);
      // When recording stops, create audio blob and URL
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });

        onRecordComplete?.(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  }

  React.useEffect(() => {
    onRecordChange?.({ isRecording, recorder: mediaRecorderRef.current });
  }, [isRecording]);

  React.useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        stopRecording();
      }

      onRecordChange?.({
        isRecording: false,
      });
    };
  }, []);
  return (
    <div className="flex justify-center items-center relative">
      <button
        onClick={() => {
          if (!isRecording) startRecording();
          else {
            stopRecording();
          }
        }}
        className="relative"
      >
        <Mic
          className={cn("size-5", {
            "text-red-500": isRecording,
          })}
        />
      </button>
    </div>
  );
};

export default RecordInput;
