import {cover} from "./utils.js";
import {LAYOUT} from "./layout.js";

export function drawProductImage(ctx, productImg) {
  if (!productImg) return;

  const { x, y, w, h } = LAYOUT.product;

  // Ürün arkasına sıcak glow
  const glow = ctx.createRadialGradient(780, 510, 80, 780, 510, 560);
  glow.addColorStop(0, "rgba(255,212,0,0.18)");
  glow.addColorStop(0.45, "rgba(255,140,0,0.08)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(180, 120, 900, 780);

  ctx.save();

  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  ctx.filter = "saturate(1.18) contrast(1.12)";
  cover(ctx, productImg, x, y, w, h, 0.60, 0.52);
  ctx.filter = "none";

  ctx.restore();

  // Sol geçiş
  const leftFade = ctx.createLinearGradient(210, 0, 560, 0);
  leftFade.addColorStop(0, "rgba(0,0,0,1)");
  leftFade.addColorStop(0.54, "rgba(0,0,0,0.78)");
  leftFade.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = leftFade;
  ctx.fillRect(190, 145, 410, 760);

  // Üstten karartma
  const topFade = ctx.createLinearGradient(0, y, 0, y + 170);
  topFade.addColorStop(0, "rgba(0,0,0,0.82)");
  topFade.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = topFade;
  ctx.fillRect(x, y, w, 180);

  // Alttan karartma
  const bottomFade = ctx.createLinearGradient(0, y + h - 240, 0, y + h);
  bottomFade.addColorStop(0, "rgba(0,0,0,0)");
  bottomFade.addColorStop(1, "rgba(0,0,0,0.90)");
  ctx.fillStyle = bottomFade;
  ctx.fillRect(x, y + h - 250, w, 250);

  // Sağ alt zemin gölgesi
  const shadow = ctx.createRadialGradient(760, 815, 20, 760, 815, 370);
  shadow.addColorStop(0, "rgba(0,0,0,0.72)");
  shadow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = shadow;
  ctx.fillRect(360, 650, 740, 280);
}
