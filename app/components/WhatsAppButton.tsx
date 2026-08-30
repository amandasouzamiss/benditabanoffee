"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { site } from "../data/site";

export default function WhatsAppButton() {
  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Link
          href={site.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar pelo WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#20c45a] sm:h-16 sm:w-16"
        >
          <FaWhatsapp size={30} className="sm:hidden" />
          <FaWhatsapp size={34} className="hidden sm:block" />
        </Link>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#25D366]"
        animate={{
          scale: [1, 1.45],
          opacity: [0.35, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
}