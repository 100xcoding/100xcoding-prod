import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <div className="my-10 text-white">
      <h1 className="mb-14 text-center text-3xl md:text-5xl tracking-wide font-bold">
        Frequently Asked Questions
      </h1>
      <Accordion
        type="single"
        collapsible
        className="w-full sm:w-[90%] md:w-[65%] lg:[55%] xl:[45%] space-y-4  mx-auto px-2"
      >
        <AccordionItem
          value="item-1"
          className="bg-blue-600 px-10 rounded-full border-none text-blue-500"
        >
          <AccordionTrigger className=" text-bsae md:text-xl">
            How do I sign up?
          </AccordionTrigger>
          <AccordionContent className="text-base md:text-lg">
            To sign up, click on the &apos;Log in with GitHub&apos; button in
            the navigation menu to login with your GitHub account.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="bg-blue-600 px-10 rounded-full border-none text-blue-500"
        >
          <AccordionTrigger className=" text-bsae md:text-xl">
            How do I sign up?
          </AccordionTrigger>
          <AccordionContent className="text-base md:text-lg">
            To sign up, click on the &apos;Log in with GitHub&apos; button in
            the navigation menu to login with your GitHub account.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="bg-blue-600 px-10 rounded-full border-none text-blue-500"
        >
          <AccordionTrigger className=" text-bsae md:text-xl">
            How do I sign up?
          </AccordionTrigger>
          <AccordionContent className="text-base md:text-lg">
            To sign up, click on the &apos;Log in with GitHub&apos; button in
            the navigation menu to login with your GitHub account.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-4"
          className="bg-blue-600 px-10 rounded-full border-none text-blue-500"
        >
          <AccordionTrigger className=" text-bsae md:text-xl">
            How do I sign up?
          </AccordionTrigger>
          <AccordionContent className="text-base md:text-lg">
            To sign up, click on the &apos;Log in with GitHub&apos; button in
            the navigation menu to login with your GitHub account.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
