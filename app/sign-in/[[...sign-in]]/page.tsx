import { SignIn } from "@clerk/nextjs";
import { Bot, Share2, FileText } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Architecture Generation",
    description: "Describe your system, AI maps it to nodes and edges on a live canvas.",
  },
  {
    icon: Share2,
    title: "Real-time Collaboration",
    description: "Live cursors, presence indicators, and shared node editing across your team.",
  },
  {
    icon: FileText,
    title: "Instant Spec Generation",
    description: "Export a complete Markdown technical spec directly from the canvas graph.",
  },
];

export default function SignInPage() {
  return (
    <div className="flex h-screen font-sans">
      <aside className="hidden lg:flex lg:w-1/2 flex-col bg-bg-auth-panel border-r border-border-default shrink-0">
        <div className="p-10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-primary shrink-0">
              <span className="text-xs font-bold text-bg-base leading-none">G</span>
            </div>
            <span className="text-sm font-semibold tracking-tight text-text-primary">
              Ghost AI
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center px-14 pb-12">
          <h1 className="text-[2.25rem] font-semibold text-text-primary leading-tight tracking-tight mb-4">
            Design systems at the
            <br />
            speed of thought.
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed mb-10 max-w-xs">
            Describe your architecture in plain English. Ghost AI maps it to a
            shared canvas your whole team can refine in real time.
          </p>

          <ul className="space-y-6">
            {features.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-bg-elevated">
                  <Icon className="h-4 w-4 text-accent-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary mb-0.5">{title}</p>
                  <p className="text-xs text-text-muted leading-relaxed">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="flex flex-1 items-center justify-center px-4 bg-bg-base">
        <SignIn />
      </div>
    </div>
  );
}
