// Visitor-facing copy that the widget renders. The Worker does not
// consume this; it lives here because only the widget shows it.
//
// The AI sub-processor (Anthropic) is disclosed in the site's
// /legal/privacy page under the anchor #ai-sub-processors. The widget
// header should link there so the disclosure is one click away.

export const AIKA_PRIVACY_NOTICE =
  "Conversations are saved for 30 days so Aika can learn from real interactions. If you ask to send us a note, the context can travel with you to the contact form. Refresh to clear this session.";

export const AIKA_PRIVACY_LINK = "/legal/privacy#ai-sub-processors";

// Static greeting shown when the visitor opens the panel but Aika has
// not been told to initiate. Fallback only.
export const AIKA_GREETING =
  "Hi. I'm Aika. Tell me about the problem you're working on, or ask anything about the studio's work.";

// Aika's opening line when the panel opens via an explicit trigger
// (e.g. the "Start a conversation" CTA on the site). Static fallback;
// the widget normally uses computeOpeningLine() which adds a time-of-
// day greeting based on the visitor's local clock.
export const AIKA_OPENING_LINE =
  "Hi, I'm Aika, the studio's concierge. What should I call you, and what brings you in?";

// Time-aware opening line. Uses the visitor's local clock so the
// greeting matches their part of the world. The JS Date object resolves
// hours in the local timezone, and that respects whatever DST rule the
// runtime is configured for, so no extra DST logic is needed.
export function computeOpeningLine(): string {
  if (typeof Date === "undefined") return AIKA_OPENING_LINE;
  const hour = new Date().getHours();
  let greeting: string;
  if (hour >= 5 && hour < 12) greeting = "Good morning";
  else if (hour >= 12 && hour < 17) greeting = "Good afternoon";
  else if (hour >= 17 && hour < 22) greeting = "Good evening";
  else greeting = "Hello";
  return `${greeting}. I'm Aika, the studio's concierge. What should I call you, and what brings you in?`;
}

// One-line role text under the Aika name in the header.
// "AI" is named in the role line to satisfy the EU AI Act Article 50
// expectation that visitors be informed they are interacting with an
// AI system. The /legal/privacy page carries the longer sub-processor
// disclosure; this line is the in-widget acknowledgement.
export const AIKA_ROLE_LINE =
  "An AI concierge for Kinyoubi Atelier.";
