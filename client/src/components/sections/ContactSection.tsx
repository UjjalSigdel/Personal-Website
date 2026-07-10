import { useRef, useState } from "react";
import { m, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "@/lib/contact.schema";
import { apiRequest } from "@/lib/api";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TerminalWindow from "@/components/ui/terminal-window";
import { terminalButton } from "@/components/ui/terminal-button";
import { staggerContainer, fadeUpItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const inputClass =
  "w-full px-4 py-2 bg-background border border-border-strong rounded-lg placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus:border-accent text-white transition-colors";

export default function ContactSection() {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      company: ""
    }
  });

  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (data: ContactFormValues) => {
    setIsPending(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "$ message sent ✓",
        description:
          "Thanks — I read every message myself. Expect a reply within a couple of days.",
        variant: "default"
      });
      form.reset();
      setFormSubmitted(true);
    } catch (error) {
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-block text-accent font-medium mb-2">GET IN TOUCH</span>
          <h2 className="text-4xl font-bold text-white">Let's work together</h2>
        </div>

        <m.div
          className="grid md:grid-cols-[3fr_2fr] gap-12 items-start"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer()}
        >
          <m.div variants={fadeUpItem()}>
            <Card className="bg-[#1E293B] border-none rounded-lg p-8 shadow-xl">
              <h3 className="text-2xl font-semibold text-accent mb-6">Send a Message</h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Honeypot — invisible to sighted users and screen readers;
                      bots that autofill every input they find will trip it. */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] w-px h-px overflow-hidden"
                    {...form.register("company")}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-accent">Your Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...field}
                            className={inputClass}
                          />
                        </FormControl>
                        <FormMessage className="text-[#F87171]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-accent">Your Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="johndoe@example.com"
                            type="email"
                            {...field}
                            className={inputClass}
                          />
                        </FormControl>
                        <FormMessage className="text-[#F87171]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-accent">Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Project Inquiry"
                            {...field}
                            className={inputClass}
                          />
                        </FormControl>
                        <FormMessage className="text-[#F87171]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-accent">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message here..."
                            rows={4}
                            {...field}
                            className={cn(inputClass, "resize-none")}
                          />
                        </FormControl>
                        <FormMessage className="text-[#F87171]" />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    disabled={isPending || formSubmitted}
                    className={cn(
                      terminalButton({ tone: "solid" }),
                      "w-full px-6 py-3 font-bold rounded-lg",
                    )}
                  >
                    {isPending ? "$ sending..." : formSubmitted ? "$ message sent" : "$ send --message"}
                  </button>
                </form>
              </Form>
            </Card>
          </m.div>

          {/* FAQ card — replaces the old duplicate Contact Information / Connect with Me
              cards, which just repeated the footer's email/phone/location/socials.
              Styled as a terminal window since it's read-only content (unlike the
              form, which stays a conventional input so it's clearly fillable). */}
          <m.div variants={fadeUpItem()}>
            <TerminalWindow title="faq.log">
              <div className="p-6 space-y-5">
                <div>
                  <p className="font-mono text-accent text-sm mb-1.5">
                    Q: Are you open to internships?
                  </p>
                  <p className="text-gray-400 text-base leading-relaxed pl-4">
                    Yes — that's honestly most of why this form exists.
                  </p>
                </div>

                <div>
                  <p className="font-mono text-accent text-sm mb-1.5">
                    Q: What should the subject line say?
                  </p>
                  <p className="text-gray-400 text-base leading-relaxed pl-4">
                    Whatever you're reaching out about — internship, project, hackathon, or just to connect.
                  </p>
                </div>

                <div>
                  <p className="font-mono text-accent text-sm mb-1.5">
                    Q: How fast do you reply?
                  </p>
                  <p className="text-gray-400 text-base leading-relaxed pl-4">
                    Usually within a couple of days. I read every message myself.
                  </p>
                </div>
              </div>
            </TerminalWindow>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
