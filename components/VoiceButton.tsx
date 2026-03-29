"use client";

import { Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type VoiceButtonProps = {
  isListening: boolean;
  isThinking: boolean;
  isSpeaking: boolean;
  onClick: () => void;
  floating?: boolean;
};

export function VoiceButton({ isListening, isThinking, isSpeaking, onClick, floating = false }: VoiceButtonProps) {
  const label = isListening ? "Listening" : isThinking ? "Thinking" : isSpeaking ? "Speaking" : "Voice";

  return (
    <Button
      size={floating ? "lg" : "default"}
      onClick={onClick}
      className={[
        "gap-2 rounded-full text-base",
        floating ? "fixed bottom-36 right-6 z-50 h-16 px-6 shadow-soft" : "h-12 px-5",
        isListening ? "bg-[#C56E59] text-white hover:bg-[#B65F4A]" : "bg-primary text-primary-foreground"
      ].join(" ")}
    >
      {isListening ? <MicOff className="h-5 w-5" /> : isSpeaking ? <Volume2 className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      {label}
    </Button>
  );
}
