"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "../data/site";

export default function WhatsAppButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
      className="fixed bottom-5 right-5 z-50"
    >
      <Link
        href={site.whatsappUrl}
        target="_blank"
        aria-label="Falar com a Bendita pelo WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#9C521B] text-white shadow-[0_16px_45px_rgba(72,44,27,0.35)] transition hover:scale-105 hover:bg-[#482C1B]"
      >
        <MessageCircle size={25} />
      </Link>
    </motion.div>
  );
}