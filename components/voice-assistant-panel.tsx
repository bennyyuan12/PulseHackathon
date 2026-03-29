"use client";

import { useMemo, useRef, useState } from "react";
import { Mic, MicOff, Repeat2, SendHorizonal, Volume2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

declare global {
  interface Window {
    webkitSpeechRecognition?: new () => SpeechRecognition;
    SpeechRecognition?: new () => SpeechRecognition;
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
    start: () => void;
    stop: () => void;
  }

  interface SpeechRecognitionEvent {
    results: {
      [key: number]: {
        [key: number]: {
          transcript: string;
        };
      };
      length: number;
    };
  }

  interface SpeechRecognitionErrorEvent {
    error: string;
  }
}

type Message = {
  role: "user" | "assistant";
  text: string;
};

const todaysPlan =
  "Today’s plan includes a gentle walk, a breathing and stretch break, and an easy indoor cycling session if you feel ready for your scheduled activity.";

export function VoiceAssistantPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello dear. Press Start voice mode and ask me a question, or type below if you prefer."
    }
  ]);
  const [question, setQuestion] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState("Voice mode is ready.");
  const [lastReply, setLastReply] = useState(messages[0].text);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const speechSupported = useMemo(
    () => typeof window !== "undefined" && "speechSynthesis" in window,
    []
  );

  function speak(text: string) {
    if (!speechSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.94;
    utterance.pitch = 0.92;
    window.speechSynthesis.speak(utterance);
  }

  async function askNurseClara(message: string) {
    const cleanMessage = message.trim();
    if (!cleanMessage) return;

    setMessages((current) => [...current, { role: "user", text: cleanMessage }]);
    setQuestion("");
    setStatus("Nurse Clara is answering...");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cleanMessage, context: "general" })
      });

      const data = (await response.json()) as { response: string };
      setMessages((current) => [...current, { role: "assistant", text: data.response }]);
      setLastReply(data.response);
      setStatus("Nurse Clara answered.");
      speak(data.response);
    } catch {
      const fallback =
        "I had a little trouble answering just now. Please try again, and if something feels concerning I can still help you flag it for the care team.";
      setMessages((current) => [...current, { role: "assistant", text: fallback }]);
      setLastReply(fallback);
      setStatus("There was a connection problem. Please try again.");
      speak(fallback);
    }
  }

  function startVoiceMode() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setStatus("Voice input is not available in this browser. You can still type a question below.");
      speak("Voice input is not available in this browser. You can still type a question below.");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setStatus(`Heard: ${transcript}`);
      void askNurseClara(transcript);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      setStatus(`Voice mode had trouble listening: ${event.error}. You can try again or type instead.`);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    setIsListening(true);
    setStatus("Listening now. Please ask Nurse Clara a question.");
    recognition.start();
  }

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Assistant controls</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Button size="lg" className="h-14 justify-start gap-2 text-lg" onClick={startVoiceMode}>
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            {isListening ? "Listening..." : "Start voice mode"}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 justify-start gap-2 text-lg"
            onClick={() => speak(lastReply)}
          >
            <Repeat2 className="h-5 w-5" />
            Repeat last answer
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="h-14 justify-start gap-2 text-lg"
            onClick={() => speak(todaysPlan)}
          >
            <Volume2 className="h-5 w-5" />
            Read today’s plan aloud
          </Button>
          <p className="rounded-[22px] bg-secondary/55 p-4 text-base leading-7 text-muted-foreground">{status}</p>
        </CardContent>
      </Card>

      <Card className="bg-[#FFF8E7]">
        <CardHeader>
          <CardTitle className="text-3xl">Voice conversation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-h-[320px] space-y-3 overflow-y-auto rounded-[24px] bg-white p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={message.role === "assistant" ? "rounded-[22px] bg-[#EEF5F8] p-4" : "ml-8 rounded-[22px] bg-[#F7E9C7] p-4"}
              >
                <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">
                  {message.role === "assistant" ? "Nurse Clara" : "You"}
                </p>
                <p className="mt-2 text-lg leading-8 text-slate-700">{message.text}</p>
              </div>
            ))}
          </div>

          <form
            className="flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              void askNurseClara(question);
            }}
          >
            <Input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Type a question for Nurse Clara"
              className="h-14 text-base"
            />
            <Button type="submit" size="icon" className="h-14 w-14">
              <SendHorizonal className="h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
