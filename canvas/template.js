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

export async function renderPoster({ deal, business }) {

  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1080;

  const ctx = canvas.getContext("2d");

  let productImg = null;

  try {

    const fileName = deal.title
      .toLocaleLowerCase("tr-TR")
      .replace(/\(kg\)/gi, "")
      .replace(/[()]/g, "")
      .replace(/\s+/g, "_")
      .replace(/ç/g,"c")
      .replace(/ğ/g,"g")
      .replace(/ı/g,"i")
      .replace(/ö/g,"o")
      .replace(/ş/g,"s")
      .replace(/ü/g,"u")
      + ".png";

    productImg = await loadProxyImage(
      "./canvas/products/" + fileName,
      {
        w:1600,
        h:1200,
        fit:"contain",
        output:"png"
      }
    );

  } catch(e) {

    try {

      productImg = await loadProxyImage(deal.image_url, {
        w:1600,
        h:1200,
        fit:"cover",
        output:"jpg",
        q:96
      });

    } catch(err) {

      productImg = null;

    }

  }

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

  while (ctx.measureText(dateText).width > 820 && fontSize > 16) {
    fontSize--;
    ctx.font = "500 " + fontSize + "px Arial";
  }

  const textW = ctx.measureText(dateText).width;
  const pillW = Math.min(900, textW + 82);
  const pillH = 42;
  const pillX = (1080 - pillW) / 2;
  const pillY = LAYOUT.date.y;

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
