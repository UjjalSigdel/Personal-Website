import { Download, Mail, Phone, MapPin, Github, Facebook, Instagram, Linkedin } from "lucide-react";

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
  onContactClick
}: FooterProps) {
  return (
    <footer className="bg-[#0B1120] text-white py-16 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-['Inter'] font-bold mb-4 text-white">
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">U</span>jjal
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent ml-1">S</span>igdel
            </h3>
            <p className="text-gray-300 mb-4">
              First-year Electronic and Information Communication Engineering student passionate about technology and innovation.
            </p>
            <a
              href="/MyCV.pdf"
              download="Ujjal_Sigdel_CV.pdf"
              className="inline-flex items-center text-[#3B82F6] hover:text-[#3B82F6]/80 transition-colors"
            >
              <span>Download Resume</span>
              <Download className="h-4 w-4 ml-1" />
            </a>
          </div>

          <div>
            <h3 className="text-xl font-['Inter'] font-bold mb-4 text-[#4ADE80]">Quick Links</h3>
            <ul className="space-y-3">
              <li><button onClick={onHomeClick} className="text-gray-300 hover:text-white hover:translate-x-1 transition-all">Home</button></li>
              <li><button onClick={onAboutClick} className="text-gray-300 hover:text-white hover:translate-x-1 transition-all">About</button></li>
              <li><button onClick={onSkillsClick} className="text-gray-300 hover:text-white hover:translate-x-1 transition-all">Skills</button></li>
              <li><button onClick={onProjectsClick} className="text-gray-300 hover:text-white hover:translate-x-1 transition-all">Projects</button></li>
              <li><button onClick={onContactClick} className="text-gray-300 hover:text-white hover:translate-x-1 transition-all">Contact</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-['Inter'] font-bold mb-4 text-[#A78BFA]">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center mr-3 flex-shrink-0 border border-[#3B82F6]/20">
                  <Mail className="h-4 w-4 text-[#3B82F6]" />
                </div>
                <span className="text-gray-300">contact@ujjalsigdel.com.np</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-[#4ADE80]/10 flex items-center justify-center mr-3 flex-shrink-0 border border-[#4ADE80]/20">
                  <Phone className="h-4 w-4 text-[#4ADE80]" />
                </div>
                <span className="text-gray-300">+977 9761622468</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-[#A78BFA]/10 flex items-center justify-center mr-3 flex-shrink-0 border border-[#A78BFA]/20">
                  <MapPin className="h-4 w-4 text-[#A78BFA]" />
                </div>
                <span className="text-gray-300">Kathmandu, Nepal</span>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="font-['Inter'] font-medium mb-3 text-white">Connect With Me</h4>
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
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center hover:bg-[#A78BFA]/20 hover:text-[#A78BFA] transition-colors border border-gray-700"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/"
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
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Ujjal Sigdel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
