"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export function HeroImage() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://clypai.com"
      className="relative block overflow-hidden pointer-events-none md:pointer-events-auto md:cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{ filter: hovered ? "blur(6px)" : "blur(0px)" }}
        transition={{ duration: 0.4 }}
      >
        <Image
          alt="ClypAI app screen light"
          src="/clypai-light.png"
          width={1600}
          height={900}
          className="aspect-video object-cover dark:hidden"
          priority
        />
        <Image
          alt="ClypAI app screen dark"
          src="/clypai-dark.png"
          width={1600}
          height={900}
          className="aspect-video object-cover hidden dark:block"
          priority
        />
      </motion.div>

      <motion.span
        className="absolute inset-0 flex items-center justify-center gap-1.5 font-mono text-sm text-muted-foreground pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        clypai.com
        <ExternalLink className="size-3" />
      </motion.span>
    </a>
  );
}
