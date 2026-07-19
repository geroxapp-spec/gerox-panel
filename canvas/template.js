import { LAYOUT } from "./layout.js";

import {
  loadProxyImage,
  dateRangeTR,
  C,
  rr
} from "./utils.js";

import { drawBackground } from "./background.js";
import { drawLogo } from "./logo.js";
import { drawProductImage } from "./image.js";
import { drawProductInfo } from "./typography.js";
import { drawPriceBlock } from "./price.js";


function createProductFileName(title) {
  return String(title || "")
    .toLocaleLowerCase("tr-TR")

    // Karpuz (KG) -> Karpuz
    .replace(/\([^)]*\)/g, " ")

    // Başlığın sonundaki parantezsiz birimleri kaldır
    .replace(
      /\b\d*\s*(kg|gr|g|lt|l|ml|litre|adet|pkt)\s*$/gi,
      " "
    )

    // Türkçe karakterleri dönüştür
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")

    // Geçersiz dosya adı karakterlerini kaldır
    .replace(/[^a-z0-9\s_-]/g, " ")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_") + ".png";
}


function blobToImage(blob) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(blob);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("PNG dosyası görsele dönüştürülemedi."));
    };

    image.src = objectUrl;
  });
}


async function loadLocalProductImage(localPath) {
  // Sürüm parametresi eski PNG önbelleğini engeller
  const requestUrl = localPath + "?v=20260719-3";

  const response = await fetch(requestUrl, {
    method: "GET",
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(
      "Yerel görsel bulunamadı. HTTP durum kodu: " +
      response.status
    );
  }

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.toLowerCase().startsWith("image/")) {
    throw new Error(
      "Yerel dosya bir görsel değil. Content-Type: " +
      contentType
    );
  }

  const blob = await response.blob();

  return blobToImage(blob);
}


async function loadProductImage(deal) {
  const fileName = createProductFileName(deal.title);
  const localPath = "/canvas/products/" + fileName;

  console.log("Üretilen ürün dosya adı:", fileName);
  console.log("Denenen yerel ürün görseli:", localPath);

  try {
    const localImage = await loadLocalProductImage(localPath);

    console.log("Yerel PNG başarıyla yüklendi:", localPath);

    return localImage;
  } catch (localError) {
    console.warn(
      "Yerel PNG yüklenemedi, kampanya görseline geçiliyor:",
      localPath,
      localError
    );
  }

  if (deal.image_url) {
    try {
      const remoteImage = await loadProxyImage(deal.image_url, {
        w: 1600,
        h: 1200,
        fit: "cover",
        output: "jpg",
        q: 96
      });

      console.log("Kampanya görseli kullanıldı:", deal.image_url);

      return remoteImage;
    } catch (remoteError) {
      console.error(
        "Kampanya görseli de yüklenemedi:",
        deal.image_url,
        remoteError
      );
    }
  }

  return null;
}


export async function renderPoster({ deal, business }) {
  const canvas = document.createElement("canvas");

  canvas.width = 1080;
  canvas.height = 1080;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context oluşturulamadı.");
  }

  const productImg = await loadProductImage(deal);

  drawBackground(ctx, productImg);
  await drawLogo(ctx, business);
  drawProductImage(ctx, productImg);
  drawProductInfo(ctx, deal);
  drawPriceBlock(ctx, deal);

  const dateText =
    dateRangeTR(deal.start_date, deal.end_date) +
    " TARİHLERİ ARASINDA GEÇERLİDİR";

  let fontSize = 20;

  ctx.font = "500 " + fontSize + "px Arial";

  while (
    ctx.measureText(dateText).width > 820 &&
    fontSize > 16
  ) {
    fontSize -= 1;
    ctx.font = "500 " + fontSize + "px Arial";
  }

  const textWidth = ctx.measureText(dateText).width;
  const pillWidth = Math.min(900, textWidth + 82);
  const pillHeight = 42;
  const pillX = (canvas.width - pillWidth) / 2;

  const pillY =
    LAYOUT &&
    LAYOUT.date &&
    Number.isFinite(Number(LAYOUT.date.y))
      ? Number(LAYOUT.date.y)
      : 1017;

  ctx.save();

  // Tarih alanının üstündeki ince çizgi
  ctx.strokeStyle = "rgba(255,212,0,0.30)";
  ctx.lineWidth = 1.2;

  ctx.beginPath();
  ctx.moveTo(120, pillY - 17);
  ctx.lineTo(960, pillY - 17);
  ctx.stroke();

  // Tarih kapsülü
  rr(
    ctx,
    pillX,
    pillY,
    pillWidth,
    pillHeight,
    21
  );

  ctx.fillStyle = "rgba(0,0,0,0.58)";
  ctx.fill();

  ctx.strokeStyle = "rgba(255,212,0,0.58)";
  ctx.lineWidth = 1.4;
  ctx.stroke();

  // Tarih yazısı
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = C.gold;
  ctx.font = "500 " + fontSize + "px Arial";

  ctx.fillText(
    dateText,
    canvas.width / 2,
    pillY + 28
  );

  ctx.restore();

  return canvas;
}
