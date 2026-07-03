import { loadProxyImage, dateRangeTR, C } from "./utils.js";
import { drawBackground } from "./background.js";
import { drawLogo } from "./logo.js";
import { drawProductImage } from "./image.js";
import { drawProductInfo } from "./typography.js";
import { drawPriceBlock } from "./price.js";

function drawBottomDate(ctx, deal) {

    const text =
        dateRangeTR(
            deal.start_date,
            deal.end_date
        ) + " TARİHLERİ ARASINDA GEÇERLİDİR";

    ctx.save();

    const x = 180;
    const y = 1010;
    const w = 720;
    const h = 48;
    const r = 24;

    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();

    ctx.fillStyle = "rgba(0,0,0,.55)";
    ctx.fill();

    ctx.strokeStyle = "rgba(255,212,0,.45)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = C.gold;
    ctx.font = "700 20px Arial";

    ctx.fillText(
        text,
        540,
        y + (h / 2)
    );

    ctx.restore();

}

export async function renderPoster({ deal, business }) {

    const canvas = document.createElement("canvas");

    canvas.width = 1080;
    canvas.height = 1080;

    const ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    let productImg = null;

    try {

        if (deal.image_url) {

            productImg = await loadProxyImage(
                deal.image_url,
                {
                    w: 1800,
                    h: 1800,
                    fit: "cover",
                    output: "jpg",
                    q: 100
                }
            );

        }

    } catch (e) {

        console.warn(e);

    }

    // ==========================
    // DRAW ORDER
    // ==========================

    drawBackground(ctx, productImg);

    drawProductImage(ctx, productImg);

    await drawLogo(ctx, business);

    drawProductInfo(ctx, deal);

    drawPriceBlock(ctx, deal);

    drawBottomDate(ctx, deal);

    return canvas;

}
