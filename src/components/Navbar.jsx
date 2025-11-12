import React, { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  // Load theme preference (optional, just to keep dark visuals consistent)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2  transform -translate-x-1/2 z-50 w-[90%] sm:w-[85%] md:w-[80%] 
      backdrop-blur-2xl border border-white/20 shadow-[0_4px_32px_rgba(0,0,50,0.2)]
      rounded-full px-6 py-3 flex justify-between items-center 
      transition-all duration-700 ${theme === "dark"
          ? "bg-white/10 text-white"
          : "bg-white/60 text-gray-900"
        }`}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src="/favicon.png"
            alt="Logo"
            className="w-9 h-9 rounded-full hover:scale-110 transition-all duration-300"
          />
          <div className="absolute inset-0 blur-xl opacity-40 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full -z-10"></div>
        </div>
        <h1 className="font-extrabold text-xl tracking-wide bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
          ACTION PLAN
        </h1>
      </div>

      {/* Desktop Buttons */}
      <ul className="hidden md:flex gap-5 items-center text-sm font-medium">
        {/* Developer Button */}
        <a
          href="https://mrpatra.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2 rounded-full 
          bg-gradient-to-r from-blue-500/80 to-blue-700/80 text-white font-semibold 
          backdrop-blur-md border border-white/20 hover:scale-105 hover:shadow-blue-400/30 
          transition-all duration-300 shadow-md"
        >
          <User className="text-lg" />
          Developer
        </a>

        {/* GitHub Button */}
        <a
          href="https://github.com/amitkumarpatra99"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2 rounded-full 
          bg-gradient-to-r from-[#0a2f7b]/90 to-[#0f66d0]/90 text-white font-semibold 
          backdrop-blur-md border border-white/20 hover:scale-105 hover:shadow-blue-700/40 
          transition-all duration-300 shadow-md"
        >
          <FaGithub className="text-lg" />
          GitHub
        </a>
      </ul>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:scale-105 transition-all"
      >
        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Slide Menu */}
      {/* MOBILE SLIDE MENU */}
      {menuOpen && (
        <div
          className={`fixed top-0 right-0 h-screen w-2/3 sm:w-1/3 
    backdrop-blur-2xl border-l border-blue-900/30 
    shadow-[0_8px_32px_rgba(31,38,135,0.37)] transition-transform duration-500 
    md:hidden  // ✅ hides this entirely on desktop
    ${theme === "dark"
              ? "bg-[#0a2f7b]/90 text-white"
              : "bg-white/70 text-gray-900"
            }`}
        >
          <div className="flex justify-between items-center mb-8 px-5 py-4 border-b border-white/10">
            <h2 className="font-bold text-lg bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              ACTION PLAN
            </h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex flex-col items-start gap-6 px-6">
            <a
              href="https://mrpatra.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg font-medium bg-white/10 px-4 py-3 w-full rounded-2xl border border-white/10 hover:bg-white/20 transition-all"
            >
              <User className="text-blue-300" /> Developer
            </a>
            <a
              href="https://github.com/amitkumarpatra99"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-lg font-medium bg-white/10 px-4 py-3 w-full rounded-2xl border border-white/10 hover:bg-white/20 transition-all"
            >
              <FaGithub className="text-blue-300" /> GitHub
            </a>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
