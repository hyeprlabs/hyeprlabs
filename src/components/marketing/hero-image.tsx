"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

/**
 * Render a linked, responsive hero screenshot that blurs on hover and reveals a site caption.
 *
 * The anchor opens https://clypai.com in a new tab and includes light- and dark-theme responsive
 * screenshots. Hovering the anchor applies a blur to the images and fades in a centered caption
 * overlay; moving the pointer away restores the image clarity and hides the caption. The anchor
 * includes accessible attributes (`aria-label`, `rel`, `target`) and the caption is marked
 * `aria-hidden`.
 *
 * @returns The hero image anchor element containing responsive screenshots and a hover-activated caption overlay.
 */
export function HeroImage() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://clypai.com"
      className="relative block overflow-hidden pointer-events-none md:pointer-events-auto md:cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Visit ClypAI"
      rel="noopener noreferrer"
      target="_blank"
    >
      <motion.div
        animate={{ filter: hovered ? "blur(6px)" : "blur(0px)" }}
        transition={{ duration: 0.4 }}
      >
        <Image
          alt="ClypAI app screenshot — light theme"
          src="/clypai-light.png"
          width={1600}
          height={900}
          className="aspect-video object-cover dark:hidden"
          priority
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
        />
        <Image
          alt="ClypAI app screenshot — dark theme"
          src="/clypai-dark.png"
          width={1600}
          height={900}
          className="aspect-video object-cover hidden dark:block"
          priority
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
        />
      </motion.div>

      <motion.span
        className="absolute inset-0 flex items-center justify-center gap-1.5 font-mono text-sm text-muted-foreground pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        aria-hidden="true"
      >
        clypai.com
        <ExternalLink className="size-3" />
      </motion.span>
    </a>
  );
}
