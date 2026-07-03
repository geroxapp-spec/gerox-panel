import { C, money, splitMoney, rr } from "./utils.js";
import { Layout } from "./layout.js";

// =========================
// PRICE TAG BACK SHAPE
// =========================

function drawPriceTag(ctx, x, y, w, h) {

    ctx.save();

    ctx.shadowColor = "rgba(255,212,0,0.30)";
    ctx.shadowBlur = 22;
    ctx.shadowOffsetY = 10;

    ctx.fillStyle = C.gold;

    ctx.beginPath();
    ctx.moveTo(x + 28, y);
    ctx.lineTo(x + w - 52, y);
    ctx.lineTo(x + w, y + h / 2);
    ctx.lineTo(x + w - 52, y + h);
    ctx.lineTo(x + 28, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - 28);
    ctx.lineTo(x, y + 28);
    ctx.quadraticCurveTo(x, y, x + 28, y);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

// =========================
// OLD PRICE (STRIKETHROUGH)
// =========================

function drawOldPrice(ctx, x, y, oldPrice) {

    const txt = money(oldPrice);

    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "600 30px Arial";

    ctx.fillText(txt, x, y);

    const w = ctx.measureText(txt).width;

    ctx.strokeStyle = C.gold;
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(x, y - 10);
    ctx.lineTo(x + w, y - 10);
    ctx.stroke();
}

// =========================
// NEW PRICE (HERO PRICE)
// =========================

function drawNewPrice(ctx, x, y, price) {

    const p = splitMoney(price);

    let size = 110;

    while (size > 60) {

        ctx.font = `900 ${size}px Arial`;
        const w1 = ctx.measureText(p.lira).width;

        ctx.font = `900 ${Math.round(size * 0.5)}px Arial`;
        const w2 = ctx.measureText("," + p.kurus).width;

        ctx.font = `700 ${Math.round(size * 0.45)}px Arial`;
        const w3 = ctx.measureText("₺").width;

        if (w1 + w2 + w3 < 420) break;

        size -= 4;
    }

    ctx.textAlign = "left";

    ctx.fillStyle = "#141414";

    ctx.font = `900 ${size}px Arial`;
    ctx.fillText(p.lira, x, y);

    const w1 = ctx.measureText(p.lira).width;

    ctx.font = `900 ${Math.round(size * 0.5)}px Arial`;
    ctx.fillText("," + p.kurus, x + w1 + 8, y - 6);

    const w2 = ctx.measureText("," + p.kurus).width;

    ctx.font = `700 ${Math.round(size * 0.45)}px Arial`;
    ctx.fillText("₺", x + w1 + w2 + 22, y - 6);
}

// =========================
// MAIN EXPORT
// =========================

export function drawPriceBlock(ctx, deal) {

    // OLD PRICE
    drawOldPrice(
        ctx,
        Layout.oldPrice.x,
        Layout.oldPrice.y,
        deal.old_price
    );

    // TAG BACKGROUND
    drawPriceTag(
        ctx,
        Layout.priceTag.x,
        Layout.priceTag.y,
        Layout.priceTag.w,
        Layout.priceTag.h
    );

    // NEW PRICE
    drawNewPrice(
        ctx,
        Layout.newPrice.x,
        Layout.newPrice.y,
        deal.new_price
    );

    // =========================
    // DISCOUNT BADGE
    // =========================

    const old = Number(deal.old_price || 0);
    const nw = Number(deal.new_price || 0);

    const disc =
        old > 0
            ? Math.max(0, Math.round(((old - nw) / old) * 100))
            : 0;

    if (disc > 0) {

        ctx.save();

        rr(
            ctx,
            Layout.badge.x,
            Layout.badge.y,
            Layout.badge.w,
            Layout.badge.h,
            Layout.badge.radius
        );

        ctx.fillStyle = "rgba(0,0,0,0.65)";
        ctx.fill();

        ctx.strokeStyle = "rgba(255,212,0,0.45)";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.textAlign = "center";

        ctx.fillStyle = C.gold;
        ctx.font = "900 44px Arial Black, Arial";
        ctx.fillText(`%${disc}`, 930, 900);

        ctx.fillStyle = C.white;
        ctx.font = "bold 20px Arial";
        ctx.fillText("İNDİRİM", 930, 930);

        ctx.restore();
    }
}
