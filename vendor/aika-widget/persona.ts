// Visitor-facing copy that the widget renders. The Worker does not
// consume this; it lives here because only the widget shows it.
//
// The AI sub-processor (Anthropic) is disclosed in the site's
// /legal/privacy page under the anchor #ai-sub-processors. The widget
// header should link there so the disclosure is one click away.

export const AIKA_PRIVACY_NOTICE =
  "This conversation is ephemeral. If you ask to send us a note, the context can travel with you to the contact form so we have useful background. Refresh to clear.";

export const AIKA_PRIVACY_LINK = "/legal/privacy#ai-sub-processors";

// Static greeting shown when the visitor opens the panel but Aika has
// not been told to initiate. Fallback only.
export const AIKA_GREETING =
  "Hi. I'm Aika. Tell me about the problem you're working on, or ask anything about the studio's work.";

// Aika's opening line when the panel opens via an explicit trigger
// (e.g. the "Start a conversation" CTA on the site). She speaks first
// and asks one qualifying question. Tunable; see persona docs.
export const AIKA_OPENING_LINE =
  "Hi, I'm Aika, the studio's screening agent. Tell me a bit about what you're working on.";

// One-line role text under the Aika name in the header.
export const AIKA_ROLE_LINE =
  "A screening agent for Kinyoubi Atelier.";
