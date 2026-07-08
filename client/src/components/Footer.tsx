import {
  Mail,
  Phone,
  MapPin,
  Github,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

interface FooterProps {
  onHomeClick: () => void;
  onAboutClick: () => void;
  onSkillsClick: () => void;
  onProjectsClick: () => void;
  onContactClick: () => void;
}

export default function Footer({
  onHomeClick,
  onAboutClick,
  onSkillsClick,
  onProjectsClick,
  onContactClick,
}: FooterProps) {
  return (
    <footer className="bg-[#0B1120] text-white py-16 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 font-mono font-bold text-base text-[#E7ECF5] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
              ~/ujjal
            </div>
            <div className="font-mono text-sm text-[#8a9a8f] leading-relaxed mb-5">
              <span className="text-[#6EE7A8]">$</span> echo "thanks for scrolling this far"
              <br />
              // EOF
            </div>
            <a
              href="/MyCV.pdf"
              download="Ujjal_Sigdel_CV.pdf"
              className="inline-flex font-mono text-sm px-3 py-2 rounded-md border border-[#2b5940] bg-[#122318] text-[#6EE7A8] hover:bg-[#173626] transition-colors"
            >
              $ download --resume
            </a>
          </div>

          <div>
            <h3 className="text-xl font-['Inter'] font-bold mb-4 text-[#4ADE80]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={onHomeClick}
                  className="group flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                >
                  <span className="font-mono text-[#4ADE80] text-sm opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={onAboutClick}
                  className="group flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                >
                  <span className="font-mono text-[#4ADE80] text-sm opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={onSkillsClick}
                  className="group flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                >
                  <span className="font-mono text-[#4ADE80] text-sm opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                  Skills
                </button>
              </li>
              <li>
                <button
                  onClick={onProjectsClick}
                  className="group flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                >
                  <span className="font-mono text-[#4ADE80] text-sm opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                  Projects
                </button>
              </li>
              <li>
                <button
                  onClick={onContactClick}
                  className="group flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
                >
                  <span className="font-mono text-[#4ADE80] text-sm opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-['Inter'] font-bold mb-4 text-[#A78BFA]">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center mr-3 flex-shrink-0 border border-[#3B82F6]/20">
                  <Mail className="h-4 w-4 text-[#3B82F6]" />
                </div>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@ujjalsigdel.com.np&su=Inquiry&body=Hello Ujjal,"
                  className="text-gray-300 hover:text-[#3B82F6] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  contact@ujjalsigdel.com.np
                </a>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-[#4ADE80]/10 flex items-center justify-center mr-3 flex-shrink-0 border border-[#4ADE80]/20">
                  <Phone className="h-4 w-4 text-[#4ADE80]" />
                </div>
                <a
                  href="tel:+9779761622468"
                  className="text-gray-300 hover:text-[#3B82F6] transition-colors"
                >
                  +977 9761622468
                </a>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-[#A78BFA]/10 flex items-center justify-center mr-3 flex-shrink-0 border border-[#A78BFA]/20">
                  <MapPin className="h-4 w-4 text-[#A78BFA]" />
                </div>
                <a
                  href="https://www.google.com/maps/place/Kathmandu,+Nepal"
                  className="text-gray-300 hover:text-[#3B82F6] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kathmandu, Nepal
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="font-['Inter'] font-medium mb-3 text-white">
                Connect With Me
              </h4>
              <div className="flex space-x-3">
                <a
                  href="https://github.com/UjjalSigdel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center hover:bg-[#3B82F6]/20 hover:text-[#3B82F6] transition-colors border border-gray-700"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ujjal-sigdel-07a292330/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center hover:bg-[#4ADE80]/20 hover:text-[#4ADE80] transition-colors border border-gray-700"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/ujjalsigdel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center hover:bg-[#A78BFA]/20 hover:text-[#A78BFA] transition-colors border border-gray-700"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/ujjalsigdel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center hover:bg-[#FB7185]/20 hover:text-[#FB7185] transition-colors border border-gray-700"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Ujjal Sigdel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
