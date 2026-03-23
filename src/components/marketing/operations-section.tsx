"use client";

import React from "react";
import { useTranslations } from "next-intl";
import createGlobe from "cobe";
import { useTheme } from "next-themes";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { HyeprLabsMark } from "@/components/marketing/brand/logos";

const MUNICH_COORDS: [number, number] = [48.137154, 11.576124];

function MunichGlobe() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const pointerX = React.useRef<number | null>(null);
  const dragPhi = React.useRef(0);
  const phiOffset = React.useRef(0);
  const [size, setSize] = React.useState(360);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      setSize(Math.max(260, Math.round(container.offsetWidth)));
    });

    observer.observe(container);
    setSize(Math.max(260, Math.round(container.offsetWidth)));

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (pointerX.current === null) return;
      dragPhi.current = (e.clientX - pointerX.current) / 220;
    };

    const handlePointerUp = () => {
      phiOffset.current += dragPhi.current;
      dragPhi.current = 0;
      pointerX.current = null;
      canvas.style.cursor = "grab";
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    let phi = 0;
    let animationFrame = 0;
    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.2,
      dark: isDark ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: isDark ? [0.3, 0.3, 0.3] : [1, 1, 1],
      markerColor: [0.2, 0.4, 1],
      glowColor: isDark ? [0.1, 0.1, 0.1] : [1, 1, 1],
      markers: [{ location: MUNICH_COORDS, size: 0.06, id: "munich" }],
    });

    const animate = () => {
      phi += 0.003;
      globe.update({
        phi: phi + phiOffset.current + dragPhi.current,
        theta: 0.2,
        width: size * 2,
        height: size * 2,
      });
      animationFrame = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.cancelAnimationFrame(animationFrame);
      globe.destroy();
    };
  }, [isDark, size]);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden"
      ref={containerRef}
    >
      <canvas
        className="h-full w-full cursor-grab"
        onPointerDown={(e) => {
          pointerX.current = e.clientX;
          dragPhi.current = 0;
          e.currentTarget.style.cursor = "grabbing";
        }}
        ref={canvasRef}
        style={{ contain: "layout paint size" }}
      />
      <div
        className="pointer-events-none absolute flex items-center gap-1 bg-blue-600 px-2 py-1 text-white text-xs font-mono"
        style={
          {
            positionAnchor: "--cobe-munich",
            opacity: "var(--cobe-visible-munich, 0)",
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            marginBottom: "10px",
          } as React.CSSProperties
        }
      >
        <HyeprLabsMark className="size-3 shrink-0" height={12} />
        Munich, DE
      </div>
    </div>
  );
}

export function OperationsSection() {
  const t = useTranslations("OperationsSection");

  return (
    <section className="relative mx-auto mb-12 w-full max-w-5xl md:mb-36">
      <DecorIcon className="size-4" position="top-left" />
      <DecorIcon className="size-4" position="top-right" />
      <DecorIcon className="size-4" position="bottom-left" />
      <DecorIcon className="size-4" position="bottom-right" />

      <FullWidthDivider position="top" />
      <div className="grid gap-8 px-4 py-8 md:grid-cols-2 md:items-center md:gap-10 md:py-12 lg:px-6">
        <div>
          <h2 className="mb-4 font-semibold text-3xl md:text-4xl">{t("title")}</h2>
          <p className="mb-6 max-w-xl text-muted-foreground font-mono text-sm md:text-base">
            {t("description")}
          </p>

          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
              {t("headquartersLabel")}
            </p>
            <div className="inline-flex items-center gap-1 bg-blue-600 px-2 py-1 text-white text-xs font-mono">
              <HyeprLabsMark className="size-3 shrink-0" height={12} />
              Munich, DE
            </div>
            <p className="text-sm font-mono text-muted-foreground">{t("coordinates")}</p>
          </div>

        </div>

        <MunichGlobe />
      </div>
      <FullWidthDivider position="bottom" />
    </section>
  );
}