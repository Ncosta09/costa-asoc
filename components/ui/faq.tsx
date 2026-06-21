import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/content/faq";

export function Faq({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="divide-y divide-cream-300 border-y border-cream-300">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
            <h3 className="font-display text-[1.15rem] leading-snug tracking-tight text-navy-900">
              {item.question}
            </h3>
            <ChevronDown
              strokeWidth={1.75}
              className="h-5 w-5 flex-none text-terra-700 transition-transform duration-300 group-open:rotate-180"
            />
          </summary>
          <p className="pb-6 pr-8 text-[15.5px] leading-relaxed text-ink-700">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
