import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  export function FAQ() {
    return (
      <div className="my-20">
        <h1 className="mb-14 text-center text-3xl md:text-4xl font-poppins text-slate-200 font-extrabold tracking-wider">
          Frequently Asked Questions
        </h1>
        <Accordion
          type="single"
          collapsible
          className="w-full sm:w-[90%] md:w-[65%] lg:[55%] xl:[45%] mx-auto"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl">
              How do I sign up?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              To sign up, click on the 'Log in with GitHub' button in the
              navigation menu to login with your GitHub account.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl">
              Is there a fee to use the platform?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              No, the platform is free to use and does not charge anything from
              you.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl">
              How do I submit a solution to a challenge?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              To submit a solution, navigate to the challenge page, write your
              code in the provided code editor, and click the 'Submit' button.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl">
              How can I contact support?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              You can contact our support team by clicking on the 'Contact Us'
              link at the bottom of the page. Fill out the form with your query,
              and our support team will get back to you as soon as possible.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-xl">
              What should I do if I encounter a bug?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              If you encounter a bug, please report it to our support team through
              the 'Contact Us' page. Include as much detail as possible, including
              steps to reproduce the issue and any error messages you received.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
  