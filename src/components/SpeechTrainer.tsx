import React, { useState, useRef } from 'react';
import { Mic, Square, Volume2 } from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';

interface SpeechTrainerProps {
  targetPhrase: string;
}

const SpeechTrainer: React.FC<SpeechTrainerProps> = ({ targetPhrase }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [intonation, setIntonation] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('audio', audioBlob);

        try {
          const response = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();
          setTranscription(data.transcription);
          setAccuracy(data.accuracy);
          setIntonation(data.pitch);
        } catch (error) {
          console.error('Error analyzing speech:', error);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Speech Practice</h2>
        <p className="text-lg text-gray-700">Target Phrase: <span className="font-semibold">{targetPhrase}</span></p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white transition-colors ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'}}
        >
          {isRecording ? (
            <>
              <Square className="h-5 w-5" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="h-5 w-5" />
              Start Recording
            </>
          )}
        </button>
      </div>

      {(transcription || accuracy !== null || intonation) && (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-indigo-600" />
              Results
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Transcription</p>
                <p className="text-lg font-medium text-gray-900">{transcription || '...'}</p>
              </div>

              {accuracy !== null && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Accuracy</p>
                  <div className="relative">
                    <Progress.Root
                      className="h-4 w-full overflow-hidden bg-gray-200 rounded-full"
                      value={accuracy}
                    >
                      <Progress.Indicator
                        className="h-full bg-indigo-600 transition-all duration-500 ease-in-out"
                        style={{ width: ${accuracy}% }}
                      />
                    </Progress.Root>
                    <span className="absolute right-0 top-6 text-sm font-medium text-gray-900">
                      {accuracy.toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}

              {intonation && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Intonation Difference</p>
                  <p className="text-lg font-medium text-gray-900">{intonation}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeechTrainer;
