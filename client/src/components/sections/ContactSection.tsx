import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import SectionHeading from "@/components/ui/section-heading";
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
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react";
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
          <h2 className="text-4xl font-['Inter'] font-bold text-white mb-4">Let's work together</h2>
          <div className="h-1 w-20 bg-[#3B82F6]"></div>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-start"
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
                            className="w-full px-4 py-2 bg-[#0F172A] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] text-white transition-colors"
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
                            className="w-full px-4 py-2 bg-[#0F172A] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] text-white transition-colors"
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
                            className="w-full px-4 py-2 bg-[#0F172A] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] text-white transition-colors"
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
                            className="w-full px-4 py-2 bg-[#0F172A] border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] text-white transition-colors resize-none"
                          />
                        </FormControl>
                        <FormMessage className="text-[#F87171]" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isPending || formSubmitted}
                    className="w-full px-6 py-3 bg-[#3B82F6] text-white font-['Inter'] font-medium rounded-lg shadow-md hover:bg-[#3B82F6]/90 transition-colors"
                  >
                    {isPending ? "Sending..." : formSubmitted ? "Message Sent!" : "Send Message"}
                  </Button>
                </form>
              </Form>
            </Card>
          </motion.div>

          {/* Combined Contact Information and Connect with Me Sections */}
          <div className="hidden md:block">
            {/* Contact Information Section */}
            <motion.div variants={itemVariants}>
              <Card className="bg-[#1E293B] border-none rounded-lg p-8 shadow-xl mb-8">
                <h3 className="text-2xl font-['Inter'] font-semibold text-white mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center mr-4 mt-1 flex-shrink-0 border border-[#3B82F6]/20">
                      <Mail className="h-5 w-5 text-[#3B82F6]" />
                    </div>
                    <div>
                      <h4 className="font-['Inter'] font-medium text-gray-300">Email</h4>
                      <a href="mailto:contact@ujjalsigdel.com.np" className="text-[#3B82F6] hover:text-[#3B82F6]/80 transition-colors">
                        contact@ujjalsigdel.com.np
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-lg bg-[#4ADE80]/10 flex items-center justify-center mr-4 mt-1 flex-shrink-0 border border-[#4ADE80]/20">
                      <Phone className="h-5 w-5 text-[#4ADE80]" />
                    </div>
                    <div>
                      <h4 className="font-['Inter'] font-medium text-gray-300">Phone</h4>
                      <a
                        href="tel:+9779761622468"
                        className="text-gray-400 hover:text-[#3B82F6] transition-colors"
                      >
                        +977 9761622468
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-lg bg-[#A78BFA]/10 flex items-center justify-center mr-4 mt-1 flex-shrink-0 border border-[#A78BFA]/20">
                      <MapPin className="h-5 w-5 text-[#A78BFA]" />
                    </div>
                    <div>
                      <h4 className="font-['Inter'] font-medium text-gray-300">Location</h4>
                      <a
                        href="https://www.google.com/maps/place/Kathmandu,+Nepal"
                        className="text-gray-400 hover:text-[#3B82F6] transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Kathmandu, Nepal
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Connect with Me Section */}
            <motion.div variants={itemVariants}>
              <Card className="bg-[#1E293B] border-none rounded-lg p-8 shadow-xl">
                <h3 className="text-2xl font-['Inter'] font-semibold text-white mb-6">Connect with Me</h3>

                <div className="flex justify-center space-x-6">
                  <a
                    href="https://x.com/UjjalSigdel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#0F172A] border border-gray-700 flex items-center justify-center hover:bg-[#3B82F6] hover:border-[#3B82F6] transition-colors group"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5 text-[#3B82F6] group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ujjal-sigdel-07a292330/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#0F172A] border border-gray-700 flex items-center justify-center hover:bg-[#4ADE80] hover:border-[#4ADE80] transition-colors group"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 text-[#4ADE80] group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://github.com/UjjalSigdel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#0F172A] border border-gray-700 flex items-center justify-center hover:bg-[#A78BFA] hover:border-[#A78BFA] transition-colors group"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5 text-[#A78BFA] group-hover:text-white transition-colors" />
                  </a>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
