"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  AIKA_GREETING,
  AIKA_OPENING_LINE,
  AIKA_PRIVACY_LINK,
  AIKA_PRIVACY_NOTICE,
  AIKA_ROLE_LINE,
} from "./persona";
import type {
  AikaChatResponse,
  AikaMessage,
  AikaRoute,
} from "./types";

export interface AikaWidgetProps {
  /** Chat endpoint. Defaults to /api/aika/chat (same origin). */
  endpoint?: string;
  /** Scheduler URL opened on BOOK_CALL. If absent, BOOK_CALL falls back to the contact path. */
  schedulerUrl?: string;
  /** Path opened on SEND_MESSAGE. Defaults to /contact. */
  contactPath?: string;
  /** Privacy disclosure link in the chat header. Defaults to /legal/privacy#ai-sub-processors. */
  privacyHref?: string;
  /** Mascot illustration. Defaults to a placeholder line-art owl. */
  mascot?: ReactNode;
  /** Extra class on the root for consumer overrides. */
  className?: string;

  /**
   * Controlled open state. If provided, the widget is fully controlled
   * and `onOpenChange` MUST be supplied. If omitted, the widget owns
   * its own state.
   */
  open?: boolean;
  /** Controlled-mode change callback. */
  onOpenChange?: (open: boolean) => void;

  /**
   * Hide the floating launcher button. Useful when the host page
   * provides its own trigger (e.g. a "Start a conversation" CTA) and
   * the widget is opened via the controlled `open` prop.
   */
  hideLauncher?: boolean;

  /**
   * If true, when the widget opens with an empty conversation Aika
   * sends an opening line first instead of waiting for the visitor.
   * Defaults to true when the widget is in controlled mode (the host
   * triggered it deliberately), false otherwise.
   */
  initiateOnOpen?: boolean;

  /**
   * Aika's opening line when `initiateOnOpen` fires. Defaults to
   * AIKA_OPENING_LINE from persona.ts.
   */
  openingLine?: string;

  /**
   * Called when the visitor clicks the SEND_MESSAGE CTA, before the
   * widget navigates to `contactPath`. Receives a plain-text summary
   * of the conversation so the host can persist it, append it to the
   * URL, or otherwise carry context to the commission page.
   *
   * If the handler returns a string, that string is used as the
   * navigation target (overriding `contactPath`). Returning anything
   * else (or nothing) means the widget falls back to plain navigation.
   */
  onSendMessageRoute?: (summary: string) => string | void | undefined;
}

export function AikaWidget(props: AikaWidgetProps) {
  const {
    endpoint = "/api/aika/chat",
    schedulerUrl,
    contactPath = "/contact",
    privacyHref = AIKA_PRIVACY_LINK,
    mascot,
    className,
    open: openProp,
    onOpenChange,
    hideLauncher = false,
    initiateOnOpen,
    openingLine = AIKA_OPENING_LINE,
    onSendMessageRoute,
  } = props;

  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? openProp : internalOpen;
  const setOpen = useCallback(
    (next: boolean) => {
      if (isControlled) {
        onOpenChange?.(next);
      } else {
        setInternalOpen(next);
      }
    },
    [isControlled, onOpenChange],
  );

  const shouldInitiate = initiateOnOpen ?? isControlled;

  const [messages, setMessages] = useState<AikaMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingRoute, setPendingRoute] = useState<AikaRoute | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll thread to the latest message.
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, pendingRoute]);

  // Focus input when panel opens; restore focus to launcher when it closes.
  useEffect(() => {
    if (open) inputRef.current?.focus();
    else launcherRef.current?.focus();
  }, [open]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  // Aika initiates: when the panel opens with an empty thread and the
  // host wants Aika to greet first, seed the conversation with her
  // opening line as if she sent it. The model takes over from turn 2.
  useEffect(() => {
    if (open && shouldInitiate && messages.length === 0) {
      setMessages([{ role: "assistant", content: openingLine }]);
    }
  }, [open, shouldInitiate, messages.length, openingLine]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const next: AikaMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);
    setPendingRoute(null);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `${res.status} ${res.statusText}`);
      }

      const data = (await res.json()) as AikaChatResponse;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
      if (data.route) setPendingRoute(data.route);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(`Aika could not respond: ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  function handleRouteClick(route: AikaRoute) {
    if (route.kind === "BOOK_CALL") {
      const target = schedulerUrl ?? contactPath;
      window.open(target, "_blank", "noopener,noreferrer");
    } else if (route.kind === "SEND_MESSAGE") {
      const summary = summariseConversation(messages);
      const target =
        onSendMessageRoute?.(summary) ??
        defaultContactWithSummary(contactPath, summary);
      window.location.href = target;
    } else if (route.kind === "READ_CASE_STUDY" && route.path) {
      window.open(route.path, "_blank", "noopener,noreferrer");
    }
  }

  const rootClass = className ? `aika-root ${className}` : "aika-root";
  const owl = mascot ?? <DefaultMascot />;
  const showLauncher = !hideLauncher && !open;
  const showGreeting =
    messages.length === 0 && !loading && !shouldInitiate;

  return (
    <div className={rootClass} data-open={open}>
      {showLauncher && (
        <button
          ref={launcherRef}
          type="button"
          className="aika-launcher"
          aria-label="Chat with Aika"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span className="aika-launcher-mascot">{owl}</span>
          <span className="aika-launcher-name">Aika</span>
        </button>
      )}

      {open && (
        <div
          className="aika-panel"
          role="dialog"
          aria-label="Aika chat"
          aria-modal="false"
        >
          <header className="aika-header">
            <span className="aika-header-mascot">{owl}</span>
            <span className="aika-header-text">
              <span className="aika-header-name">Aika</span>
              <span className="aika-header-role">{AIKA_ROLE_LINE}</span>
            </span>
            <button
              type="button"
              className="aika-close"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 3 L13 13 M13 3 L3 13" />
              </svg>
            </button>
          </header>

          <p className="aika-notice">
            {AIKA_PRIVACY_NOTICE}{" "}
            <a href={privacyHref} target="_blank" rel="noopener noreferrer">
              Privacy
            </a>
          </p>

          <div ref={threadRef} className="aika-thread" aria-live="polite">
            {showGreeting && (
              <p className="aika-greeting">{AIKA_GREETING}</p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`aika-msg aika-msg-${m.role}`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="aika-msg aika-msg-assistant aika-typing" aria-label="Aika is typing">
                <span className="aika-dot" />
                <span className="aika-dot" />
                <span className="aika-dot" />
              </div>
            )}
            {error && (
              <p className="aika-error" role="alert">
                {error}
              </p>
            )}
            {pendingRoute && !loading && (
              <button
                type="button"
                className="aika-cta"
                onClick={() => handleRouteClick(pendingRoute)}
              >
                {ctaLabel(pendingRoute)}
              </button>
            )}
          </div>

          <form className="aika-input" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Aika"
              disabled={loading}
              aria-label="Your message"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 8 L13 8 M9 4 L13 8 L9 12" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function ctaLabel(route: AikaRoute): string {
  switch (route.kind) {
    case "BOOK_CALL":
      return "Set up a call";
    case "SEND_MESSAGE":
      return "Send us a note";
    case "READ_CASE_STUDY":
      return "Open the case study";
  }
}

// Builds a plain-text transcript of the conversation. Used as the
// summary handed to the SEND_MESSAGE handler (or appended to the
// contact URL by default). Plain text, no formatting, so it pastes
// cleanly into a contact form's message field.
export function summariseConversation(messages: AikaMessage[]): string {
  return messages
    .map((m) => `${m.role === "user" ? "You" : "Aika"}: ${m.content}`)
    .join("\n\n");
}

function defaultContactWithSummary(
  contactPath: string,
  summary: string,
): string {
  if (!summary) return contactPath;
  const sep = contactPath.includes("?") ? "&" : "?";
  return `${contactPath}${sep}aika_summary=${encodeURIComponent(summary)}`;
}

// Placeholder line-art owl in the house glyph register. Replaced via the
// `mascot` prop when the commissioned illustration ships.
function DefaultMascot() {
  return (
    <svg
      viewBox="0 0 32 32"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 11 Q6 4 16 4 Q26 4 26 11 L26 20 Q26 28 16 28 Q6 28 6 20 Z" />
      <circle cx="12" cy="13" r="2.4" />
      <circle cx="20" cy="13" r="2.4" />
      <circle cx="12" cy="13" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="20" cy="13" r="0.7" fill="currentColor" stroke="none" />
      <path d="M14 17 L16 19 L18 17" />
      <path d="M5 6 L9 10" />
      <path d="M27 6 L23 10" />
    </svg>
  );
}
