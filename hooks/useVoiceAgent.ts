"use client";

import { useCallback, useMemo, useRef, useState } from "react";

export type CareScreen = "home" | "activity" | "post";
export type AlertState = "normal" | "warning";
type ListenMode = "capture" | "agent";

type ListenOptions = {
  mode?: ListenMode;
  onTranscript?: (transcript: string) => void;
};

type AgentContext = "home" | "activity" | "post" | "general";

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

const SAFETY_TERMS = [
  "chest pain",
  "dizziness",
  "pressure",
  "tightness",
  "shortness of breath",
  "nausea",
  "racing heart",
  "irregular heartbeat"
];

const SAFETY_RESPONSE =
  "Please stop immediately. I’m concerned about your symptoms. Contact your care team or emergency services right now.";

const FALLBACK_RESPONSE = "I’m here with you. Let’s take this one step at a time.";

export function detectSafetyRisk(transcript: string) {
  const normalized = transcript.toLowerCase();
  return SAFETY_TERMS.some((term) => normalized.includes(term));
}

function getDeterministicOverride(transcript: string) {
  const normalized = transcript.toLowerCase();

  if (normalized.includes("i finished my walk")) {
    return "That’s wonderful, Maria. You’re building strength every time you show up.";
  }

  if (normalized.includes("i feel tired") || normalized.includes("i don't want to do this") || normalized.includes("i dont want to do this")) {
    return "That’s completely okay. Do you want to slow down together or take a short break?";
  }

  return null;
}

export function useVoiceAgent() {
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [alertState, setAlertState] = useState<AlertState>("normal");
  const [errorMessage, setErrorMessage] = useState("");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const browserSupport = useMemo(() => {
    if (typeof window === "undefined") {
      return { speech: false, recognition: false };
    }

    const recognition = Boolean((window as Window & typeof globalThis & { webkitSpeechRecognition?: unknown; SpeechRecognition?: unknown }).webkitSpeechRecognition || (window as Window & typeof globalThis & { SpeechRecognition?: unknown }).SpeechRecognition);
    const speech = "speechSynthesis" in window;
    return { speech, recognition };
  }, []);

  const speak = useCallback((text: string) => {
    setAiResponse(text);

    if (!browserSupport.speech || typeof window === "undefined") {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [browserSupport.speech]);

  const processTranscript = useCallback(async (input: string, context: AgentContext = "general") => {
    const message = input.trim();
    if (!message) return;

    setTranscript(message);
    setErrorMessage("");

    if (detectSafetyRisk(message)) {
      setAlertState("warning");
      speak(SAFETY_RESPONSE);
      return;
    }

    const deterministic = getDeterministicOverride(message);
    if (deterministic) {
      setAlertState("normal");
      speak(deterministic);
      return;
    }

    try {
      setIsThinking(true);
      setAlertState("normal");

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, context })
      });

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      const data = (await response.json()) as { response: string };
      speak(data.response);
    } catch {
      speak(FALLBACK_RESPONSE);
      setErrorMessage("Voice connection had trouble. Please try again.");
    } finally {
      setIsThinking(false);
    }
  }, [speak]);

  const startListening = useCallback((options: ListenOptions = {}) => {
    const RecognitionCtor = (window as Window & typeof globalThis & { webkitSpeechRecognition?: new () => SpeechRecognitionLike; SpeechRecognition?: new () => SpeechRecognitionLike }).SpeechRecognition || (window as Window & typeof globalThis & { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition;

    if (!RecognitionCtor) {
      setErrorMessage("Voice input is not available in this browser. Please try Chrome or type instead.");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new RecognitionCtor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const heard = event.results[0][0].transcript;
      setTranscript(heard);
      options.onTranscript?.(heard);
      if ((options.mode ?? "agent") === "agent") {
        void processTranscript(heard);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      setErrorMessage(`Speech input failed: ${event.error}. Please try again.`);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    setErrorMessage("");
    setIsListening(true);
    recognition.start();
  }, [processTranscript]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return {
    transcript,
    aiResponse,
    isListening,
    isThinking,
    isSpeaking,
    alertState,
    errorMessage,
    browserSupport,
    startListening,
    stopListening,
    processTranscript,
    speak,
    setAlertState
  };
}
