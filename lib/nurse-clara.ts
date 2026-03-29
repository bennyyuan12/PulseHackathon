type NurseClaraContext = "home" | "activity" | "post" | "general";

export function getNurseClaraReply(message: string, context: NurseClaraContext = "general") {
  const input = message.toLowerCase().trim();

  if (!input) {
    return "I am here with you, dear. You can ask about today’s plan, your check-in, or when to contact the care team.";
  }

  if (input.includes("who are you") || input.includes("what can you do")) {
    return "I am Nurse Clara, your warm support companion. I can explain your plan, repeat instructions, encourage you, and help hand concerns to the care team. I am not a doctor, and I do not give medical advice.";
  }

  if (input.includes("plan") || input.includes("today") || input.includes("schedule")) {
    if (context === "activity") {
      return "You are in today’s walking session now. Keep to the gentle pace already prescribed, and I can stay with you while you continue.";
    }
    return "Today’s plan is a gentle 20-minute walk with a short reflection afterward. I can help you move through it one calm step at a time.";
  }

  if (input.includes("walk") || input.includes("exercise") || input.includes("session")) {
    if (context === "post") {
      return "You have already done something meaningful today. I can help you reflect on how it felt and note any discomfort for your care team.";
    }
    return "Please follow the activity your care team already set for you. I can repeat the steps and help you move through the session calmly, but I do not change your exercise plan.";
  }

  if (
    input.includes("dizzy") ||
    input.includes("dizziness") ||
    input.includes("chest") ||
    input.includes("pressure") ||
    input.includes("short of breath") ||
    input.includes("breathless") ||
    input.includes("nausea") ||
    input.includes("racing heart") ||
    input.includes("irregular heartbeat")
  ) {
    return "Please stop immediately. I’m concerned about your symptoms. Contact your care team or emergency services right now.";
  }

  if (input.includes("sad") || input.includes("worried") || input.includes("anxious") || input.includes("afraid")) {
    return "It is alright to feel that way. You are not alone in this. We can take things one step at a time, and I can stay with you through your next small step.";
  }

  if (input.includes("check-in") || input.includes("questions")) {
    if (context === "home") {
      return "This morning’s check-in is just two simple questions about how you feel and whether you have any warning symptoms before your walk.";
    }
    return "The check-in helps your care team stay informed about effort, discomfort, and how today’s session felt for you.";
  }

  if (input.includes("tired") || input.includes("rest") || input.includes("break")) {
    return "It is alright to take a slower moment. You can pause, catch your breath, and decide whether you are ready to continue.";
  }

  if (context === "activity") {
    return "You are doing well staying with the walk. Keep listening to your body, and tell me right away if anything feels concerning.";
  }

  if (context === "post") {
    return "Thank you for checking in after your activity. Your reflection matters, and it can help your care team understand how the session went.";
  }

  return "I can help explain today’s routine, repeat your session steps, or help you share concerns with the care team. If something feels worrying, I can help flag it for follow-up.";
}
