export async function saveOutfitToGallery(params: {
  shirtCanvas: HTMLCanvasElement;
  trouserCanvas: HTMLCanvasElement;
  shoesCanvas: HTMLCanvasElement;
  beltCanvas: HTMLCanvasElement;
  skinTone: string;
  occasion: string;
}): Promise<void> {
  const { shirtCanvas, trouserCanvas, shoesCanvas, beltCanvas, skinTone, occasion } = params;

  const W = 1080;
  const H = 1350;
  const SLOT_W = W / 2;
  const SLOT_H = H / 2;

  const output = document.createElement("canvas");
  output.width = W;
  output.height = H;
  const ctx = output.getContext("2d");
  if (!ctx) return;

  const gradient = ctx.createLinearGradient(0, 0, 0, H);
  gradient.addColorStop(0, "#7B1C2B");
  gradient.addColorStop(1, "#3d0c15");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.beginPath();
  ctx.roundRect(24, 80, W - 48, H - 200, 24);
  ctx.fill();

  const canvases = [shirtCanvas, trouserCanvas, shoesCanvas, beltCanvas];
  const labels = ["Shirt / shart", "Trouser / paint", "Shoes / joote", "Belt / belt"];

  canvases.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 24 + col * SLOT_W + SLOT_W / 2 - (SLOT_W - 40) / 2;
    const y = 104 + row * SLOT_H;
    ctx.drawImage(c, x, y, SLOT_W - 40, SLOT_H - 60);

    ctx.fillStyle = "#7B1C2B";
    ctx.font = "bold 28px Inter";
    ctx.textAlign = "center";
    ctx.fillText(labels[i], 24 + col * SLOT_W + SLOT_W / 2, y + SLOT_H - 20);
  });

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 36px Inter";
  ctx.textAlign = "center";
  ctx.fillText("RangMatch", W / 2, H - 80);
  ctx.font = "24px Inter";
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.fillText(`${occasion} - ${skinTone} Skin`, W / 2, H - 40);

  const link = document.createElement("a");
  link.download = `rangmatch-outfit-${Date.now()}.png`;
  link.href = output.toDataURL("image/png", 1.0);
  link.click();
}
