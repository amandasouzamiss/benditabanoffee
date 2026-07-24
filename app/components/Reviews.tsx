"use client";

import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { reviews } from "../data/site";

export default function Reviews() {
  return (
    <section className="section-padding bg-[#F1DCC9]">
      <div className="container-site">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#9C521B]">
            Quem vive recomenda
          </span>

          <h2 className="mx-auto mt-5 max-w-3xl text-5xl font-semibold leading-[0.95] text-[#482C1B] sm:text-6xl lg:text-7xl">
            Experiências que deixam
            <span className="block italic text-[#9C521B]">boas lembranças</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.article
              key={`${review.name}-${index}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.65,
                delay: index * 0.1,
              }}
              className="rounded-[2rem] bg-[#FEEFE1] p-8 sm:p-10"
            >
              <div className="flex items-center justify-between">
                <Quote size={34} className="text-[#B27730]" />

                <div className="flex gap-1 text-[#B27730]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>

              <p className="mt-8 text-lg leading-8 text-[#482C1B]/75">
                “{review.text}”
              </p>

              <div className="mt-8 border-t border-[#482C1B]/10 pt-6">
                <strong className="text-sm text-[#482C1B]">
                  {review.name}
                </strong>

                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#9C521B]">
                  Avaliação de cliente
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}