"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function toggleFullscreen() {
  if (document.fullscreenElement) return void document.exitFullscreen();
  void document.documentElement.requestFullscreen();
}

/** N toggles notes, F full screen, P opens the print route. Hides the cursor when idle. */
export function usePresenterKeys() {
  const [notesOpen, setNotesOpen] = useState(false);
  const [idle, setIdle] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "n") setNotesOpen((v) => !v);
      if (key === "f") toggleFullscreen();
      if (key === "p") router.push("/print/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  useEffect(() => {
    let timer = window.setTimeout(() => setIdle(true), 3000);
    const wake = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), 3000);
    };
    window.addEventListener("mousemove", wake);
    return () => {
      window.removeEventListener("mousemove", wake);
      window.clearTimeout(timer);
    };
  }, []);

  return { notesOpen, idle };
}

/** Scale factor that fits a 1920 by 1080 stage inside the window. */
export function useStageScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}
