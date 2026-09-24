"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useFinal } from "@/lib/final";
import { ease, durations } from "@/lib/timing";
import { asset } from "@/lib/asset";

// Screens are 431 by 907 crops of the real Terra's Garden site, taken from the hackathon demo recording.
export const gardenScreens = {
  plant: { src: "/renders/garden-plant.png", alt: "Check-in form titled Plant yourself, asking for a name and favourite part of the world" },
  seed: { src: "/renders/garden-seed.png", alt: "Daniel's profile as an Orchid at the Seed stage, zero of seven connections" },
  connect: { src: "/renders/garden-connect.png", alt: "New connection card: Steve is a Sunflower, Connected" },
  budding: { src: "/renders/garden-budding.png", alt: "Daniel's plant at the Budding stage with five people met" },
  bloom: { src: "/renders/garden-bloom.png", alt: "Daniel's Orchid in Full Bloom with seven people met" },
} as const;
export type GardenScreen = keyof typeof gardenScreens;

/** A phone frame showing one Garden screen, cross-fading when the screen changes. */
export function Phone({ screen, height = 760, className = "" }: { screen: GardenScreen; height?: number; className?: string }) {
  const final = useFinal();
  const width = Math.round(height * 431 / 907);
  const shot = gardenScreens[screen];
  return (
    <div className={`relative overflow-hidden rounded-[44px] bg-ink p-3 shadow-card ${className}`} style={{ width: width + 24, height: height + 24 }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={screen}
          className="absolute inset-3 overflow-hidden rounded-[34px]"
          initial={final ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: final ? 0 : durations.base, ease }}
        >
          <Image src={asset(shot.src)} alt={shot.alt} width={431} height={907} style={{ width, height }} priority />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** The projected garden illustration from the hackathon, empty or in full bloom. */
export function GardenWall({ full, size = 420, className = "" }: { full: boolean; size?: number; className?: string }) {
  const final = useFinal();
  return (
    <div className={`relative overflow-hidden rounded-card shadow-card ${className}`} style={{ width: size, height: size * 1080 / 1020 }}>
      <Image src={asset("/renders/garden-empty.jpg")} alt="Projected garden clearing with no flowers yet" width={1020} height={1080} style={{ width: "100%", height: "100%" }} />
      <motion.div
        className="absolute inset-0"
        initial={final ? false : { opacity: 0 }}
        animate={{ opacity: full ? 1 : 0 }}
        transition={{ duration: final ? 0 : durations.slow, ease }}
      >
        <Image src={asset("/renders/garden-full.jpg")} alt="The same garden clearing filled with flowers after the event" width={1020} height={1080} style={{ width: "100%", height: "100%" }} />
      </motion.div>
    </div>
  );
}
