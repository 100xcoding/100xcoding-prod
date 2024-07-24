import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constants";

export function FAQ() {
  return (
    <div className="my-10 text-white">
      <h1 className="mb-14 text-center text-3xl md:text-5xl tracking-wide font-bold">
        Frequently Asked Questions
      </h1>
      <Accordion
        type="multiple"
        className="w-full sm:w-[90%] md:w-[65%] lg:[55%] xl:[45%] space-y-4  mx-auto px-2 "
      >
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={`${faq.id}`}
            className="bg-dark-500 px-10 rounded-xl border-none text-white/80"
          >
            <AccordionTrigger className="text-left  text-bsae md:text-xl">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base md:text-lg text-white">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
