import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <div className="my-20 bg-gray-950 opacity-85">
      <h1 className="mb-14 text-center text-3xl md:text-5xl font-mono text-slate-200 font-extrabold">
        Frequently Asked Questions
      </h1>
      <Accordion
        type="single"
        collapsible
        className="w-full sm:w-[90%] md:w-[65%] lg:[55%] xl:[45%]  mx-auto px-2"
      >
        <AccordionItem value="item-1" className="border border-white/[0.4] rounded-lg px-2.5 md:px-5">
          <AccordionTrigger className=" text-bsae md:text-xl">
            How do I sign up?
          </AccordionTrigger>
          <AccordionContent className="text-base md:text-lg">
            To sign up, click on the 'Log in with GitHub' button in the
            navigation menu to login with your GitHub account.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border border-white/[0.4] rounded-lg px-2.5 md:px-5 my-4">
          <AccordionTrigger className="text-base md:text-xl">
            Is there a fee to use the platform?
          </AccordionTrigger>
          <AccordionContent className="text-base md:text-lg">
            No, the platform is free to use and does not charge anything from
            you.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border border-white/[0.4] rounded-lg px-2.5 md:px-5">
          <AccordionTrigger className="text-base md:text-xl">
            How do I submit a solution to a challenge?
          </AccordionTrigger>
          <AccordionContent className="text-base md:text-lg">
            To submit a solution, navigate to the challenge page, write your
            code in the provided code editor, and click the 'Submit' button.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="border border-white/[0.4] rounded-lg px-2.5 md:px-5 my-4">
          <AccordionTrigger className="text-base md:text-xl">
            How can I contact support?
          </AccordionTrigger>
          <AccordionContent className="text-base md:text-lg">
            You can contact our support team by clicking on the 'Contact Us'
            link at the bottom of the page. Fill out the form with your query,
            and our support team will get back to you as soon as possible.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5" className="border border-white/[0.4] rounded-lg px-2.5 md:px-5">
          <AccordionTrigger className="text-base md:text-xl">
            What should I do if I encounter a bug?
          </AccordionTrigger>
          <AccordionContent className="text-base md:text-lg">
            If you encounter a bug, please report it to our support team through
            the 'Contact Us' page. Include as much detail as possible, including
            steps to reproduce the issue and any error messages you received.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
