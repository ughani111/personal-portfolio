"use client";

import { ArrowUpRight, MoveRight } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

import { DoodleArrow } from "@/components/decorative/DoodleArrow";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  buildMailtoHref,
  contactFormSchema,
  getPublicContactConfig,
  inquiryTypes,
  type ContactFormInput
} from "@/lib/contact";
import type { Profile } from "@/types/portfolio";

type FormState = ContactFormInput;

const initialFormState: FormState = {
  company: "",
  consent: false,
  email: "",
  honeypot: "",
  inquiryType: undefined,
  message: "",
  name: ""
};

export function ContactSection({ profile }: { profile: Profile }) {
  const { email, endpoint } = getPublicContactConfig();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"error" | "idle" | "submitting" | "success">(
    "idle"
  );
  const [feedback, setFeedback] = useState("");
  const endpointLabel = useMemo(
    () => (endpoint ? "External form endpoint" : "Mailto fallback"),
    [endpoint]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "submitting") {
      return;
    }

    const parsed = contactFormSchema.safeParse(form);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(fieldErrors)
            .filter(([, value]) => value?.[0])
            .map(([key, value]) => [key, value?.[0] || "Invalid input"])
        )
      );
      setStatus("error");
      setFeedback("Please correct the highlighted fields and try again.");
      return;
    }

    setErrors({});
    setStatus("submitting");
    setFeedback("Sending your message...");

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          body: JSON.stringify(parsed.data),
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST"
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        setStatus("success");
        setFeedback("Thanks. Your message has been sent.");
        setForm(initialFormState);
        return;
      }

      window.location.href = buildMailtoHref(parsed.data, email);
      setStatus("success");
      setFeedback("Your email client has been opened.");
      setForm(initialFormState);
    } catch {
      setStatus("error");
      setFeedback("The message could not be sent right now. Please try again later.");
    }
  }

  return (
    <Section id="contact">
      <SectionHeading
        description="The initial implementation stays static-first: it can post to an external endpoint when configured, or fall back safely to email without requiring a custom backend."
        eyebrow="Contact"
        number="11"
        title="Say hello and start a serious technical conversation"
      />
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal className="relative rounded-[2rem] border border-[var(--color-border-strong)] bg-[var(--color-foreground)] p-6 text-[var(--color-background)]">
          <div aria-hidden="true" className="absolute right-5 top-6 text-white/70">
            <DoodleArrow className="h-12 w-24" />
          </div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/70">
            Contact mode
          </p>
          <h3 className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] uppercase leading-[0.94] tracking-[-0.05em]">
            {endpointLabel}
          </h3>
          <p className="mt-4 max-w-lg text-base leading-8 text-white/82">
            Use the form for professional opportunities, collaborations, freelance inquiries,
            or technical conversations. Public contact details should be reviewed before launch.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={`mailto:${email}`}
              icon={<ArrowUpRight className="h-4 w-4" />}
              variant="secondary"
            >
              Email directly
            </Button>
            <Button href="/#home" variant="text">
              Back to top
            </Button>
          </div>
          <div className="mt-8 rounded-[1.5rem] border border-white/14 bg-white/6 p-3">
            <ResponsiveImage
              alt={profile.imageSlots.contact.alt}
              className="aspect-[0.98] rounded-[1.2rem] bg-white/8"
              height={profile.imageSlots.contact.height}
              sizes={profile.imageSlots.contact.sizes}
              src={profile.imageSlots.contact.preferredSrc}
              width={profile.imageSlots.contact.width}
            />
          </div>
        </Reveal>
        <Reveal>
          <form
            className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-background)] p-6 shadow-[var(--shadow-card)]"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                Name
                <input
                  className="min-h-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-foreground)] outline-none transition focus:border-[var(--color-foreground)]"
                  name="name"
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  value={form.name}
                />
                {errors.name ? <span className="text-sm text-red-600">{errors.name}</span> : null}
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Email
                <input
                  className="min-h-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-foreground)] outline-none transition focus:border-[var(--color-foreground)]"
                  name="email"
                  onChange={(event) =>
                    setForm((current) => ({ ...current, email: event.target.value }))
                  }
                  type="email"
                  value={form.email}
                />
                {errors.email ? (
                  <span className="text-sm text-red-600">{errors.email}</span>
                ) : null}
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Company or organization
                <input
                  className="min-h-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-foreground)] outline-none transition focus:border-[var(--color-foreground)]"
                  name="company"
                  onChange={(event) =>
                    setForm((current) => ({ ...current, company: event.target.value }))
                  }
                  value={form.company}
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Inquiry type
                <select
                  className="min-h-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-foreground)] outline-none transition focus:border-[var(--color-foreground)]"
                  name="inquiryType"
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      inquiryType: event.target.value
                        ? (event.target.value as ContactFormInput["inquiryType"])
                        : undefined
                    }))
                  }
                  value={form.inquiryType || ""}
                >
                  <option value="">Select a topic</option>
                  {inquiryTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="mt-5 grid gap-2 text-sm font-medium">
              Message
              <textarea
                className="min-h-[11rem] rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-foreground)] outline-none transition focus:border-[var(--color-foreground)]"
                name="message"
                onChange={(event) =>
                  setForm((current) => ({ ...current, message: event.target.value }))
                }
                value={form.message}
              />
              {errors.message ? (
                <span className="text-sm text-red-600">{errors.message}</span>
              ) : null}
            </label>
            <label className="sr-only" htmlFor="company-website">
              Company website
            </label>
            <input
              autoComplete="off"
              className="hidden"
              id="company-website"
              name="honeypot"
              onChange={(event) =>
                setForm((current) => ({ ...current, honeypot: event.target.value }))
              }
              tabIndex={-1}
              value={form.honeypot}
            />
            <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-[var(--color-muted-strong)]">
              <input
                checked={Boolean(form.consent)}
                className="mt-1 h-4 w-4 rounded border-[var(--color-border)]"
                onChange={(event) =>
                  setForm((current) => ({ ...current, consent: event.target.checked }))
                }
                type="checkbox"
              />
              <span>
                I understand that placeholder legal and privacy text must be reviewed before
                launch.
              </span>
            </label>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button
                icon={<MoveRight className="h-4 w-4" />}
                type="submit"
                variant="primary"
              >
                {status === "submitting" ? "Sending..." : "Send message"}
              </Button>
              <p aria-live="polite" className="text-sm text-[var(--color-muted-strong)]">
                {feedback}
              </p>
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
              Privacy note: this form is designed for a static-first deployment and can submit
              to an external endpoint or your local email client. No private phone number is
              published by default.
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
