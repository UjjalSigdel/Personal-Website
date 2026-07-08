import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
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
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const API_BASE_URL = "";  // UPDATED

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormValues) =>
      apiRequest("POST", "/api/contact", data), // UPDATED
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
        variant: "default"
      });
      form.reset();
      setFormSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-[#0F172A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-block text-[#4ADE80] font-medium mb-2">GET IN TOUCH</span>
          <h2 className="text-4xl font-['Inter'] font-bold text-white">Let's work together</h2>
        </div>

        <motion.div
          className="grid md:grid-cols-[3fr_2fr] gap-12 items-start"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-[#1E293B] border-none rounded-lg p-8 shadow-xl">
              <h3 className="text-2xl font-['Inter'] font-semibold text-white mb-6">Send a Message</h3>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-300">Your Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...field}
                            className="w-full px-4 py-2 bg-[#0F172A] border border-[#2b5940] rounded-lg focus-visible:ring-2 focus-visible:ring-[#4ADE80] focus:border-[#4ADE80] text-white transition-colors"
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
                        <FormLabel className="text-sm font-medium text-gray-300">Your Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="johndoe@example.com"
                            type="email"
                            {...field}
                            className="w-full px-4 py-2 bg-[#0F172A] border border-[#2b5940] rounded-lg focus-visible:ring-2 focus-visible:ring-[#4ADE80] focus:border-[#4ADE80] text-white transition-colors"
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
                        <FormLabel className="text-sm font-medium text-gray-300">Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Project Inquiry"
                            {...field}
                            className="w-full px-4 py-2 bg-[#0F172A] border border-[#2b5940] rounded-lg focus-visible:ring-2 focus-visible:ring-[#4ADE80] focus:border-[#4ADE80] text-white transition-colors"
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
                        <FormLabel className="text-sm font-medium text-gray-300">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message here..."
                            rows={4}
                            {...field}
                            className="w-full px-4 py-2 bg-[#0F172A] border border-[#2b5940] rounded-lg focus-visible:ring-2 focus-visible:ring-[#4ADE80] focus:border-[#4ADE80] text-white transition-colors resize-none"
                          />
                        </FormControl>
                        <FormMessage className="text-[#F87171]" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isPending || formSubmitted}
                    className="w-full px-6 py-3 font-mono font-bold bg-[#173626] text-[#6EE7A8] border border-[#2b5940] rounded-lg hover:bg-[#173626]/70 transition-colors"
                  >
                    {isPending ? "$ sending..." : formSubmitted ? "$ message sent" : "$ send --message"}
                  </Button>
                </form>
              </Form>
            </Card>
          </motion.div>

          {/* FAQ card — replaces the old duplicate Contact Information / Connect with Me
              cards, which just repeated the footer's email/phone/location/socials.
              Styled as a terminal window since it's read-only content (unlike the
              form, which stays a conventional input so it's clearly fillable). */}
          <motion.div variants={itemVariants}>
            <div className="rounded-lg border border-[#1f3a2b] bg-[#0B1710] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#122318] border-b border-[#1f3a2b]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#20402e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#20402e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#20402e]" />
                <span className="font-mono text-sm text-[#5f8a71] ml-2">faq.log</span>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <p className="font-mono text-[#4ADE80] text-sm mb-1.5">
                    Q: Are you open to internships?
                  </p>
                  <p className="text-gray-400 text-base leading-relaxed pl-4">
                    Yes — that's honestly most of why this form exists.
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[#4ADE80] text-sm mb-1.5">
                    Q: What should the subject line say?
                  </p>
                  <p className="text-gray-400 text-base leading-relaxed pl-4">
                    Whatever you're reaching out about — internship, project, hackathon, or just to connect.
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[#4ADE80] text-sm mb-1.5">
                    Q: How fast do you reply?
                  </p>
                  <p className="text-gray-400 text-base leading-relaxed pl-4">
                    Usually within a couple of days. I read every message myself.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
