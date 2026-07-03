import { cover, drawNoise } from "./utils.js";
import { Layout } from "./layout.js";

export function drawBackground(ctx, productImg) {

    const W = Layout.canvas.width;
    const H = Layout.canvas.height;

    // =========================
    // BASE GRADIENT BACKGROUND
    // =========================

    const bg = ctx.createLinearGradient(0, 0, 0, H);

    bg.addColorStop(0, "#050505");
    bg.addColorStop(0.5, "#0b0b0b");
    bg.addColorStop(1, "#020202");

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // =========================
    // PRODUCT BLUR BACKGROUND LAYER
    // =========================

    if (productImg) {
        ctx.save();

        ctx.globalAlpha = 0.25;
        ctx.filter = "blur(30px) saturate(1.4) brightness(0.9)";

        cover(
            ctx,
            productImg,
            -160,
            60,
            W + 320,
            H * 0.75,
            0.5,
            0.5
        );

        ctx.restore();
        ctx.filter = "none";
    }

    // =========================
    // GOLD MAIN LIGHT (RIGHT SIDE HERO)
    // =========================

    const light = ctx.createRadialGradient(
        Layout.productGlow.x,
        Layout.productGlow.y,
        30,
        Layout.productGlow.x,
        Layout.productGlow.y,
        Layout.productGlow.radius
    );

    light.addColorStop(0, "rgba(255,210,0,0.35)");
    light.addColorStop(0.3, "rgba(255,170,0,0.18)");
    light.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = light;
    ctx.fillRect(0, 0, W, H);

    // =========================
    // SECOND LIGHT (CLEAN DEPTH)
    // =========================

    const light2 = ctx.createRadialGradient(
        240,
        820,
        10,
        240,
        820,
        520
    );

    light2.addColorStop(0, "rgba(255,255,255,0.04)");
    light2.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = light2;
    ctx.fillRect(0, 0, W, H);

    // =========================
    // TOP DARK HEADER FADE
    // =========================

    const top = ctx.createLinearGradient(0, 0, 0, Layout.header.height);

    top.addColorStop(0, "rgba(0,0,0,0.95)");
    top.addColorStop(1, "rgba(0,0,0,0.2)");

    ctx.fillStyle = top;
    ctx.fillRect(0, 0, W, Layout.header.height);

    // =========================
    // LEFT INFO DEPTH LAYER
    // =========================

    const left = ctx.createLinearGradient(0, 0, 650, 0);

    left.addColorStop(0, "rgba(0,0,0,0.95)");
    left.addColorStop(0.5, "rgba(0,0,0,0.85)");
    left.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = left;
    ctx.fillRect(0, 140, 700, 720);

    // =========================
    // BOTTOM SHADOW BASE
    // =========================

    const bottom = ctx.createLinearGradient(0, H - 400, 0, H);

    bottom.addColorStop(0, "rgba(0,0,0,0)");
    bottom.addColorStop(0.4, "rgba(0,0,0,0.6)");
    bottom.addColorStop(1, "rgba(0,0,0,1)");

    ctx.fillStyle = bottom;
    ctx.fillRect(0, H - 420, W, 420);

    // =========================
    // SUB GOLD LINE ACCENT
    // =========================

    const goldLine = ctx.createLinearGradient(0, 0, W, 0);

    goldLine.addColorStop(0, "rgba(255,212,0,0)");
    goldLine.addColorStop(0.5, "rgba(255,212,0,0.15)");
    goldLine.addColorStop(1, "rgba(255,212,0,0)");

    ctx.fillStyle = goldLine;
    ctx.fillRect(0, 170, W, 2);

    // =========================
    // VIGNETTE
    // =========================

    const vig = ctx.createRadialGradient(
        W / 2,
        H / 2,
        200,
        W / 2,
        H / 2,
        900
    );

    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, "rgba(0,0,0,0.75)");

    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    // =========================
    // NOISE TEXTURE
    // =========================

    drawNoise(ctx, W, H, 0.018);
}
