"use client";

import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

function hexToRgb(hex: string) {
  const cleaned = hex.replace("#", "");
  return {
    r: parseInt(cleaned.slice(0, 2), 16),
    g: parseInt(cleaned.slice(2, 4), 16),
    b: parseInt(cleaned.slice(4, 6), 16),
  };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    const timeout = window.setTimeout(() => {
      reject(new Error(`Timeout loading ${src}`));
    }, 8000);
    img.onload = () => {
      window.clearTimeout(timeout);
      resolve(img);
    };
    img.onerror = () => {
      window.clearTimeout(timeout);
      reject(new Error(`Failed to load ${src}`));
    };
    img.src = src;
  });
}

async function loadFirstAvailable(
  bucketBase: string,
  prefixes: string[],
  suffix: "base" | "mask" | "idmap",
  explicitFileName?: string | null,
) {
  const exts = ["png", "jpg", "jpeg", "webp"];
  if (explicitFileName) {
    return loadImage(`${bucketBase}/${explicitFileName}`);
  }
  let lastError: unknown = null;
  for (const prefix of prefixes) {
    for (const ext of exts) {
      try {
        return await loadImage(`${bucketBase}/${prefix}_${suffix}.${ext}`);
      } catch (err) {
        lastError = err;
      }
    }
  }
  throw lastError ?? new Error(`Missing ${suffix} image`);
}

async function findBucketFileName(
  bucketName: string,
  aliases: string[],
  suffix: "base" | "mask" | "idmap",
) {
  if (!supabase) return null;
  const { data, error } = await supabase.storage.from(bucketName).list("", {
    limit: 1000,
    sortBy: { column: "name", order: "asc" },
  });
  if (error || !data) return null;

  const normalizedAliases = aliases.map((a) => a.toLowerCase());
  const allowedExts = [".png", ".jpg", ".jpeg", ".webp"];

  const match = data.find((obj) => {
    const name = obj.name.toLowerCase();
    if (!allowedExts.some((ext) => name.endsWith(ext))) return false;
    const isRightSuffix =
      name.includes(`_${suffix}.`) || name.includes(`-${suffix}.`) || name.includes(`${suffix}.`);
    if (!isRightSuffix) return false;
    return normalizedAliases.some((alias) => name.includes(alias));
  });

  return match?.name ?? null;
}

function drawMissingState(canvasRef: HTMLCanvasElement | null, label: string) {
  if (!canvasRef) return;
  canvasRef.width = 512;
  canvasRef.height = 512;
  const ctx = canvasRef.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = "#fafafa";
  ctx.fillRect(0, 0, canvasRef.width, canvasRef.height);
  ctx.fillStyle = "#9ca3af";
  ctx.font = "18px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`Missing: ${label}`, canvasRef.width / 2, canvasRef.height / 2);
}

async function applySanthianRecoloring(
  baseImg: HTMLImageElement,
  maskImg: HTMLImageElement | null,
  idmapImg: HTMLImageElement | null,
  targetHex: string,
  canvasRef: HTMLCanvasElement | null,
) {
  if (!canvasRef) return;

  const width = baseImg.naturalWidth || baseImg.width;
  const height = baseImg.naturalHeight || baseImg.height;
  canvasRef.width = width;
  canvasRef.height = height;

  const baseCanvas = document.createElement("canvas");
  const maskCanvas = document.createElement("canvas");
  const idmapCanvas = document.createElement("canvas");
  baseCanvas.width = maskCanvas.width = idmapCanvas.width = width;
  baseCanvas.height = maskCanvas.height = idmapCanvas.height = height;

  const baseCtx = baseCanvas.getContext("2d");
  const maskCtx = maskCanvas.getContext("2d");
  const idmapCtx = idmapCanvas.getContext("2d");
  const outCtx = canvasRef.getContext("2d");
  if (!baseCtx || !maskCtx || !idmapCtx || !outCtx) return;

  baseCtx.drawImage(baseImg, 0, 0, width, height);
  if (maskImg) {
    maskCtx.drawImage(maskImg, 0, 0, width, height);
  } else {
    maskCtx.fillStyle = "#ffffff";
    maskCtx.fillRect(0, 0, width, height);
  }
  if (idmapImg) {
    idmapCtx.drawImage(idmapImg, 0, 0, width, height);
  } else {
    idmapCtx.fillStyle = "rgb(255,0,0)";
    idmapCtx.fillRect(0, 0, width, height);
  }

  const baseData = baseCtx.getImageData(0, 0, width, height);
  const maskData = maskCtx.getImageData(0, 0, width, height);
  const idmapData = idmapCtx.getImageData(0, 0, width, height);
  const outData = outCtx.createImageData(width, height);

  const target = hexToRgb(targetHex);

  for (let i = 0; i < baseData.data.length; i += 4) {
    const br = baseData.data[i];
    const bg = baseData.data[i + 1];
    const bb = baseData.data[i + 2];

    const ir = idmapData.data[i];
    const ig = idmapData.data[i + 1];

    if (ir > 150 && ig < 100) {
      const luma = 0.299 * br + 0.587 * bg + 0.114 * bb;
      const isVeryDark = target.r < 20 && target.g < 20 && target.b < 20;

      let multipliedR = (br * target.r) / 255;
      let multipliedG = (bg * target.g) / 255;
      let multipliedB = (bb * target.b) / 255;

      if (isVeryDark) {
        multipliedR = br * 0.25;
        multipliedG = bg * 0.25;
        multipliedB = bb * 0.25;

        if (luma > 150) {
          const highlight = (luma - 150) * 0.8;
          multipliedR = Math.min(255, multipliedR + highlight);
          multipliedG = Math.min(255, multipliedG + highlight);
          multipliedB = Math.min(255, multipliedB + highlight);
        }
      }

      const factor = Math.max(0, luma - 180) / 75;

      outData.data[i] = Math.round(multipliedR + (255 - multipliedR) * factor);
      outData.data[i + 1] = Math.round(multipliedG + (255 - multipliedG) * factor);
      outData.data[i + 2] = Math.round(multipliedB + (255 - multipliedB) * factor);
    } else if (ig > 150 && ir < 100) {
      outData.data[i] = br;
      outData.data[i + 1] = bg;
      outData.data[i + 2] = bb;
    } else {
      outData.data[i] = br;
      outData.data[i + 1] = bg;
      outData.data[i + 2] = bb;
    }

    const mr = maskData.data[i];
    const mg = maskData.data[i + 1];
    const mb = maskData.data[i + 2];
    outData.data[i + 3] = Math.round((mr + mg + mb) / 3);
  }

  outCtx.putImageData(outData, 0, 0);
}

export default function ImageTestPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://pykzlebnrzcdksfyoukz.supabase.co";
  const bucketBase = `${baseUrl}/storage/v1/object/public/recolor_assets`;

  const shirtRef = useRef<HTMLCanvasElement>(null);
  const trouserRef = useRef<HTMLCanvasElement>(null);
  const beltRef = useRef<HTMLCanvasElement>(null);
  const shoesRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const BUCKET_NAME = "recolor_assets";
    const items = [
      { prefixes: ["formal_shirt"], color: "#FF4D6D", ref: shirtRef.current, label: "formal_shirt" },
      {
        prefixes: ["trouser", "trousers", "formal_trouser", "formal_trousers", "pant", "pants"],
        color: "#2E7D32",
        ref: trouserRef.current,
        label: "trouser",
      },
      {
        prefixes: ["belt", "belts", "leather_belt", "formal_belt", "accessory_belt"],
        color: "#000000",
        ref: beltRef.current,
        label: "belt",
      },
      {
        prefixes: [
          "chelsea_shoes",
          "chelsea_shoe",
          "chelsea_boots",
          "chelsea_boot",
          "chelsia_shoes",
          "chelsia_shoe",
        ],
        color: "#000000",
        ref: shoesRef.current,
        label: "chelsea_shoes",
      },
    ];

    Promise.allSettled(
      items.map(async (item) => {
        try {
          const [baseName, maskName, idmapName] = await Promise.all([
            findBucketFileName(BUCKET_NAME, item.prefixes, "base"),
            findBucketFileName(BUCKET_NAME, item.prefixes, "mask"),
            findBucketFileName(BUCKET_NAME, item.prefixes, "idmap"),
          ]);

          const base = await loadFirstAvailable(bucketBase, item.prefixes, "base", baseName);
          const mask = await loadFirstAvailable(bucketBase, item.prefixes, "mask", maskName).catch(() => null);
          const idmap = await loadFirstAvailable(bucketBase, item.prefixes, "idmap", idmapName).catch(() => null);
          await applySanthianRecoloring(base, mask, idmap, item.color, item.ref);
        } catch {
          drawMissingState(item.ref, item.label);
        }
      }),
    );
  }, [bucketBase]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Santhian Alpha 2.5D Recoloring Test</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded border bg-white">
          <canvas ref={shirtRef} className="h-full w-full object-contain" />
        </div>
        <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded border bg-white">
          <canvas
            ref={trouserRef}
            className="h-full w-full object-contain"
            style={{ transform: "scale(1.4)", transformOrigin: "center center", objectFit: "contain" }}
          />
        </div>
        <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded border bg-white">
          <canvas ref={beltRef} className="h-full w-full object-contain" />
        </div>
        <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded border bg-white">
          <canvas ref={shoesRef} className="h-full w-full object-contain" />
        </div>
      </div>
    </main>
  );
}
