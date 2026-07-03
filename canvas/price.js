import { C, money, splitMoney, rr } from "./utils.js";
import { Layout } from "./layout.js";

function drawGlass(ctx, x, y, w, h) {

    ctx.save();

    rr(ctx, x, y, w, h, 36);

    const g = ctx.createLinearGradient(0, y, 0, y + h);

    g.addColorStop(0, "rgba(255,255,255,.08)");
    g.addColorStop(.5, "rgba(255,255,255,.03)");
    g.addColorStop(1, "rgba(255,255,255,.02)");

    ctx.fillStyle = g;
    ctx.fill();

    ctx.strokeStyle = "rgba(255,212,0,.20)";
    ctx.lineWidth = 2;

    ctx.stroke();

    ctx.restore();

}

function drawPriceCard(ctx, x, y, w, h) {

    ctx.save();

    ctx.shadowColor = "rgba(0,0,0,.45)";
    ctx.shadowBlur = 35;
    ctx.shadowOffsetY = 12;

    rr(ctx, x, y, w, h, 40);

    const g = ctx.createLinearGradient(
        x,
        y,
        x,
        y + h
    );

    g.addColorStop(0, "#FFD94B");
    g.addColorStop(.5, "#FFD000");
    g.addColorStop(1, "#F0B600");

    ctx.fillStyle = g;

    ctx.fill();

    ctx.restore();

}

function drawOldPrice(ctx, x, y, value) {

    if (!value) return;

    const txt = money(value);

    ctx.textAlign = "left";

    ctx.font = "600 30px Arial";

    ctx.fillStyle = "rgba(255,255,255,.65)";

    ctx.fillText(txt, x, y);

    const w = ctx.measureText(txt).width;

    ctx.strokeStyle = "#ff4040";

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(x, y - 10);

    ctx.lineTo(x + w, y - 10);

    ctx.stroke();

}

function drawPrice(ctx, x, y, value) {

    const p = splitMoney(value);

    ctx.textAlign = "left";

    ctx.fillStyle = "#151515";

    ctx.font = "900 110px Arial Black";

    ctx.fillText(p.lira, x, y);

    const w = ctx.measureText(p.lira).width;

    ctx.font = "900 54px Arial Black";

    ctx.fillText("," + p.kurus, x + w + 10, y - 6);

    const w2 = ctx.measureText("," + p.kurus).width;

    ctx.font = "700 42px Arial";

    ctx.fillText("₺", x + w + w2 + 22, y - 6);

}

function drawDiscount(ctx, x, y, value) {

    if (value <= 0) return;

    ctx.save();

    rr(ctx, x, y, 170, 96, 26);

    ctx.fillStyle = "#D62828";

    ctx.fill();

    ctx.textAlign = "center";

    ctx.fillStyle = "#FFF";

    ctx.font = "900 44px Arial Black";

    ctx.fillText("%" + value, x + 85, y + 48);

    ctx.font = "700 20px Arial";

    ctx.fillText("İNDİRİM", x + 85, y + 76);

    ctx.restore();

}

export function drawPriceBlock(ctx, deal) {

    const box = Layout.price;

    drawGlass(
        ctx,
        box.x - 18,
        box.y - 18,
        box.w + 36,
        box.h + 36
    );

    drawOldPrice(
        ctx,
        box.x + 20,
        box.y + 15,
        deal.old_price
    );

    drawPriceCard(
        ctx,
        box.x,
        box.y + 35,
        box.w,
        145
    );

    drawPrice(
        ctx,
        box.x + 26,
        box.y + 140,
        deal.new_price
    );

    const old = Number(deal.old_price || 0);
    const nw = Number(deal.new_price || 0);

    const disc = old > 0
        ? Math.round(((old - nw) / old) * 100)
        : 0;

    drawDiscount(
        ctx,
        box.x + box.w - 185,
        box.y - 5,
        disc
    );

}
