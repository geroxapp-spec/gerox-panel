import { LAYOUT } from "./layout.js";
import { dateRangeTR, C, rr } from "./utils.js";
import { drawBackground } from "./background.js";
import { drawLogo } from "./logo.js";
import { drawProductImage } from "./image.js";
import { drawProductInfo } from "./typography.js";
import { drawPriceBlock } from "./price.js";


function createProductFileName(title) {
  return String(title || "")
    .toLocaleLowerCase("tr-TR")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\b\d*\s*(kg|gr|g|lt|l|ml|litre|adet|pkt)\s*$/gi, " ")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9\s_-]/g, " ")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_") + ".png";
}

function blobToImage(blob) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => { URL.revokeObjectURL(objectUrl); resolve(image); };
    image.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error("PNG yüklenemedi.")); };
    image.src = objectUrl;
  });
}

async function loadLocalProductImage(localPath) {
  const requestUrl = localPath + "?v=20260719-4";
  const response = await fetch(requestUrl, { method: "GET", cache: "no-store" });
  if (!response.ok) throw new Error("HTTP " + response.status);
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.toLowerCase().startsWith("image/")) throw new Error("Görsel değil: " + contentType);
  const blob = await response.blob();
  return blobToImage(blob);
}

async function loadProductImage(deal) {
  const fileName = createProductFileName(deal.title);
  const localPath = "/canvas/products/" + fileName;

  try {
    return await loadLocalProductImage(localPath);
  } catch (e) {
    console.warn("Yerel görsel yok, uzak görsele geçiliyor:", localPath, e);
  }

  if (deal.image_url) {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
        img.src = deal.image_url;
      });
      return img;
    } catch (err) {
      console.error("Uzak görsel de yüklenemedi:", err);
    }
  }

  return null;
}


export async function renderPoster({ deal, business }) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1080;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context oluşturulamadı.");

  const productImg = await loadProductImage(deal);

  drawBackground(ctx, productImg);
  await drawLogo(ctx, business);
  drawProductImage(ctx, productImg);

  const infoLayout = drawProductInfo(ctx, deal);
  drawPriceBlock(ctx, deal, infoLayout);

  // ---- TARİH ----
  const dateText =
    dateRangeTR(deal.start_date, deal.end_date) +
    " TARİHLERİ ARASINDA GEÇERLİDİR";

  let fontSize = 20;
  ctx.font = "500 " + fontSize + "px Arial";
  while (ctx.measureText(dateText).width > 820 && fontSize > 16) {
    fontSize -= 1;
    ctx.font = "500 " + fontSize + "px Arial";
  }

  const textW = ctx.measureText(dateText).width;
  const pillW = Math.min(900, textW + 82);
  const pillH = 42;
  const pillX = (1080 - pillW) / 2;
  const pillY = (LAYOUT && LAYOUT.date && Number.isFinite(Number(LAYOUT.date.y))) ? Number(LAYOUT.date.y) : 1017;

  ctx.save();
  ctx.strokeStyle = "rgba(255,212,0,0.30)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(120, pillY - 17);
  ctx.lineTo(960, pillY - 17);
  ctx.stroke();

  rr(ctx, pillX, pillY, pillW, pillH, 21);
  ctx.fillStyle = "rgba(0,0,0,0.58)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,212,0,0.58)";
  ctx.lineWidth = 1.4;
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = C.gold;
  ctx.font = "500 " + fontSize + "px Arial";
  ctx.fillText(dateText, 540, pillY + 28);
  ctx.restore();

  return canvas;
}
