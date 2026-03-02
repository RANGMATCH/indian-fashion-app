"use client";

import { useRef, useEffect, useCallback } from "react";
import type { MutableRefObject, RefObject } from "react";
import { applyTriAssetRecolor } from "@/lib/canvas/recolor";

interface TriAssetCache {
  base: ImageData;
  mask: ImageData;
  idmap: ImageData;
  width: number;
  height: number;
}

interface RecolorEngineProps {
  baseUrl: string;
  maskUrl: string;
  idmapUrl: string;
  selectedColor: string;
  width?: number;
  height?: number;
  className?: string;
  onLoad?: () => void;
  canvasRef?: RefObject<HTMLCanvasElement>;
}

async function loadImageData(url: string, w: number, h: number): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const offscreen = document.createElement("canvas");
      offscreen.width = w;
      offscreen.height = h;
      const ctx = offscreen.getContext("2d");
      if (!ctx) return reject(new Error("No 2D context"));
      ctx.drawImage(img, 0, 0, w, h);
      resolve(ctx.getImageData(0, 0, w, h));
    };
    img.onerror = reject;
    img.src = url;
  });
}

function createMockTriAsset(w: number, h: number): TriAssetCache {
  const offscreen = document.createElement("canvas");
  offscreen.width = w;
  offscreen.height = h;
  const ctx = offscreen.getContext("2d");
  if (!ctx) {
    const empty = new ImageData(w, h);
    return { base: empty, mask: empty, idmap: empty, width: w, height: h };
  }

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#a9a9a9";
  ctx.fillRect(20, 20, w - 40, h - 40);
  ctx.fillStyle = "#8f8f8f";
  for (let i = 30; i < w - 40; i += 18) ctx.fillRect(i, 25, 8, h - 50);
  const base = ctx.getImageData(0, 0, w, h);

  const mask = new ImageData(w, h);
  const idmap = new ImageData(w, h);
  for (let i = 0; i < mask.data.length; i += 4) {
    const x = (i / 4) % w;
    const y = Math.floor(i / 4 / w);
    const inShape = x > 20 && x < w - 20 && y > 20 && y < h - 20;
    const hardware = inShape && y < 60 && x > w / 2 - 16 && x < w / 2 + 16;

    if (inShape) {
      mask.data[i] = 255;
      mask.data[i + 1] = 255;
      mask.data[i + 2] = 255;
      mask.data[i + 3] = 255;
      if (hardware) {
        idmap.data[i + 1] = 255;
      } else {
        idmap.data[i] = 255;
      }
      idmap.data[i + 3] = 255;
    }
  }

  return { base, mask, idmap, width: w, height: h };
}

export function RecolorEngine({
  baseUrl,
  maskUrl,
  idmapUrl,
  selectedColor,
  width = 300,
  height = 380,
  className = "",
  onLoad,
  canvasRef,
}: RecolorEngineProps) {
  const internalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cacheRef = useRef<TriAssetCache | null>(null);
  const prevKeyRef = useRef<string>("");

  const loadAndCache = useCallback(async () => {
    const key = `${baseUrl}||${maskUrl}||${idmapUrl}||${width}||${height}`;
    if (key === prevKeyRef.current && cacheRef.current) return;
    prevKeyRef.current = key;
    cacheRef.current = null;

    try {
      const [base, mask, idmap] = await Promise.all([
        loadImageData(baseUrl, width, height),
        loadImageData(maskUrl, width, height),
        loadImageData(idmapUrl, width, height),
      ]);
      cacheRef.current = { base, mask, idmap, width, height };
    } catch {
      cacheRef.current = createMockTriAsset(width, height);
    }

    onLoad?.();
  }, [baseUrl, maskUrl, idmapUrl, width, height, onLoad]);

  const applyRecolor = useCallback(() => {
    const canvas = internalCanvasRef.current;
    const cache = cacheRef.current;
    if (!canvas || !cache) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const output = applyTriAssetRecolor(cache.base, cache.mask, cache.idmap, selectedColor);
    ctx.clearRect(0, 0, cache.width, cache.height);
    ctx.putImageData(output, 0, 0);
  }, [selectedColor]);

  useEffect(() => {
    loadAndCache().then(applyRecolor).catch(() => {});
  }, [loadAndCache, applyRecolor]);

  useEffect(() => {
    if (cacheRef.current) applyRecolor();
  }, [selectedColor, applyRecolor]);

  const setCanvasRef = useCallback(
    (node: HTMLCanvasElement | null) => {
      internalCanvasRef.current = node;
      if (canvasRef) {
        (canvasRef as MutableRefObject<HTMLCanvasElement | null>).current = node;
      }
    },
    [canvasRef]
  );

  return (
    <canvas
      ref={setCanvasRef}
      width={width}
      height={height}
      className={className}
      style={{ background: "transparent" }}
    />
  );
}
