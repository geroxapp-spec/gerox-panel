import { cover } from "./utils.js";
import { Layout } from "./layout.js";

export function drawProductImage(ctx, productImg) {

    if (!productImg) return;

    const hero = Layout.hero;

    // =========================
    // GOLD BACK LIGHT (DEPTH CORE)
    // =========================

    const glow = ctx.createRadialGradient(
        Layout.productGlow.x,
        Layout.productGlow.y,
        20,
        Layout.productGlow.x,
        Layout.productGlow.y,
        Layout.productGlow.radius
    );

    glow.addColorStop(0, "rgba(255,210,0,0.20)");
    glow.addColorStop(0.35, "rgba(255,170,0,0.10)");
    glow.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 1080, 1080);

    // =========================
    // MAIN PRODUCT RENDER
    // =========================

    ctx.save();

    ctx.shadowColor = "rgba(0,0,0,0.65)";
    ctx.shadowBlur = 60;
    ctx.shadowOffsetY = 25;

    ctx.filter = "saturate(1.15) contrast(1.1)";

    cover(
        ctx,
        productImg,
        hero.x,
        hero.y,
        hero.w,
        hero.h,
        0.56,
        0.52
    );

    ctx.restore();
    ctx.filter = "none";

    // =========================
    // FLOOR SHADOW (REALISM)
    // =========================

    const shadow = ctx.createRadialGradient(
        760,
        820,
        40,
        760,
        820,
        340
    );

    shadow.addColorStop(0, "rgba(0,0,0,0.60)");
    shadow.addColorStop(0.5, "rgba(0,0,0,0.20)");
    shadow.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = shadow;

    ctx.beginPath();
    ctx.ellipse(760, 830, 260, 55, 0, 0, Math.PI * 2);
    ctx.fill();

    // =========================
    // LEFT DARK DEPTH MASK
    // =========================

    const left = ctx.createLinearGradient(250, 0, 600, 0);

    left.addColorStop(0, "rgba(0,0,0,0.95)");
    left.addColorStop(0.6, "rgba(0,0,0,0.65)");
    left.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = left;
    ctx.fillRect(220, 120, 360, 760);

    // =========================
    // TOP SOFT FADE
    // =========================

    const top = ctx.createLinearGradient(0, hero.y, 0, hero.y + 180);

    top.addColorStop(0, "rgba(0,0,0,0.75)");
    top.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = top;
    ctx.fillRect(hero.x, hero.y, hero.w, 200);

    // =========================
    // BOTTOM FADE (GROUND LOCK)
    // =========================

    const bottom = ctx.createLinearGradient(
        0,
        hero.y + hero.h - 260,
        0,
        hero.y + hero.h
    );

    bottom.addColorStop(0, "rgba(0,0,0,0)");
    bottom.addColorStop(1, "rgba(0,0,0,0.85)");

    ctx.fillStyle = bottom;
    ctx.fillRect(hero.x, hero.y + hero.h - 260, hero.w, 260);

    // =========================
    // PREMIUM EDGE HIGHLIGHT
    // =========================

    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.strokeStyle = "#FFD400";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(760, 420, 260, Math.PI * 0.95, Math.PI * 1.7);
    ctx.stroke();

    ctx.restore();
}
