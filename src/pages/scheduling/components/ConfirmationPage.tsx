import { Link } from "react-router-dom";
import { CheckCircle2, Phone, Mail, ArrowRight, Clock } from "lucide-react";
import { PageLayout } from "./PageLayout";
import { AppointmentDetails } from "./confirmation/AppointmentDetails";
import { ZapierNotifier } from "./confirmation/ZapierNotifier";
import { useAppointmentData } from "./confirmation/useAppointmentData";
import { trackPhoneClick } from "@/utils/tracking";

/**
 * Post-booking confirmation screen.
 *
 * Business role: this is the last impression a prospect has before the human
 * handoff, so it carries weight. Three jobs:
 *   1. Confirm the submission landed (reduces resubmit / bounce).
 *   2. Set expectations about what happens next (reduces anxiety and
 *      "did they get it?" follow-up emails).
 *   3. Provide a direct-call fallback in case they want a faster response.
 */
export function ConfirmationPage() {
  const appointmentDetails = useAppointmentData();

  const nextSteps = [
    {
      title: "We review your request",
      description:
        "Our team reads every inquiry. If your project needs clarification, we'll reach out by phone or email — usually the same day during business hours.",
    },
    {
      title: "A quick conversation",
      description:
        "A short call to align on scope, budget, and timing. Nothing formal — we're just making sure we're a good fit before anyone books calendar time.",
    },
    {
      title: "On-site walkthrough",
      description:
        "For larger projects we'll schedule a walkthrough of the property so we can put together an accurate proposal with no surprises.",
    },
  ];

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto pt-6 pb-20 px-2 sm:px-4">
        <div className="text-center animate-fade-up">
          {/* Success mark */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 border border-accent/30 mb-6">
            <CheckCircle2 className="w-8 h-8 text-accent" />
          </div>

          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Request Received
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Thanks — we'll be in touch.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Your consultation request is with Matt. You'll get a response from a real
            person — usually within a few hours during business hours, and by the next
            business day otherwise.
          </p>
        </div>

        {/* Details card */}
        <div className="animate-fade-up [animation-delay:100ms] mb-10">
          <h2 className="text-white/70 text-sm font-semibold uppercase tracking-wide mb-3">
            Your request
          </h2>
          <AppointmentDetails appointmentDetails={appointmentDetails} />
        </div>

        {/* What happens next */}
        <div className="animate-fade-up [animation-delay:150ms] mb-10">
          <h2 className="text-white/70 text-sm font-semibold uppercase tracking-wide mb-4">
            What happens next
          </h2>
          <div className="space-y-3">
            {nextSteps.map((step, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm"
              >
                <span className="shrink-0 w-8 h-8 rounded-full bg-accent/10 border border-accent/20 text-accent font-semibold text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Response expectation + fallback */}
        <div className="animate-fade-up [animation-delay:200ms] rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm p-6 mb-10">
          <div className="flex items-start gap-3 mb-4">
            <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold mb-1">Response time</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Monday–Friday 8am–6pm, Saturday 9am–4pm. After-hours inquiries get a reply
                the next business day.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+19705193013"
              onClick={trackPhoneClick}
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm"
            >
              <Phone className="w-4 h-4" /> Call (970) 519-3013
            </a>
            <a
              href="mailto:info@symphonysh.com"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm"
            >
              <Mail className="w-4 h-4" /> info@symphonysh.com
            </a>
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:250ms] text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors"
          >
            Browse recent projects while you wait
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Silent webhook + conversion ping */}
        <ZapierNotifier appointmentDetails={appointmentDetails} />
      </div>
    </PageLayout>
  );
}
