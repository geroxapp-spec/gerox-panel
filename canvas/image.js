import { cover } from "./utils.js";

export function drawProductImage(ctx, productImg) {

    if (!productImg) return;

    const W = 1080;
    const H = 1080;

    // =====================================================
    // HERO AREA
    // =====================================================

    const hero = {
        x: 280,
        y: 120,
        w: 800,
        h: 720
    };

    // =====================================================
    // GOLD LIGHT
    // =====================================================

    const glow = ctx.createRadialGradient(
        790,
        420,
        20,
        790,
        420,
        520
    );

    glow.addColorStop(0,"rgba(255,210,0,.18)");
    glow.addColorStop(.28,"rgba(255,180,0,.10)");
    glow.addColorStop(1,"rgba(0,0,0,0)");

    ctx.fillStyle = glow;
    ctx.fillRect(120,40,W,H);

    // =====================================================
    // PRODUCT SHADOW
    // =====================================================

    ctx.save();

    ctx.shadowColor = "rgba(0,0,0,.70)";
    ctx.shadowBlur = 70;
    ctx.shadowOffsetY = 28;

    ctx.filter = "saturate(1.10) contrast(1.08)";

    cover(
        ctx,
        productImg,
        hero.x,
        hero.y,
        hero.w,
        hero.h,
        .56,
        .50
    );

    ctx.restore();

    ctx.filter="none";

    // =====================================================
    // FLOOR SHADOW
    // =====================================================

    const floor = ctx.createRadialGradient(
        760,
        820,
        60,
        760,
        820,
        320
    );

    floor.addColorStop(0,"rgba(0,0,0,.55)");
    floor.addColorStop(.60,"rgba(0,0,0,.18)");
    floor.addColorStop(1,"rgba(0,0,0,0)");

    ctx.fillStyle = floor;

    ctx.beginPath();

    ctx.ellipse(
        760,
        820,
        240,
        48,
        0,
        0,
        Math.PI*2
    );

    ctx.fill();

    // =====================================================
    // LEFT FADE
    // =====================================================

    const left = ctx.createLinearGradient(
        250,
        0,
        520,
        0
    );

    left.addColorStop(0,"rgba(0,0,0,1)");
    left.addColorStop(.50,"rgba(0,0,0,.78)");
    left.addColorStop(1,"rgba(0,0,0,0)");

    ctx.fillStyle = left;

    ctx.fillRect(
        220,
        120,
        330,
        760
    );

    // =====================================================
    // TOP FADE
    // =====================================================

    const top = ctx.createLinearGradient(
        0,
        hero.y,
        0,
        hero.y+160
    );

    top.addColorStop(0,"rgba(0,0,0,.82)");
    top.addColorStop(1,"rgba(0,0,0,0)");

    ctx.fillStyle = top;

    ctx.fillRect(
        hero.x,
        hero.y,
        hero.w,
        170
    );

    // =====================================================
    // BOTTOM FADE
    // =====================================================

    const bottom = ctx.createLinearGradient(
        0,
        hero.y+hero.h-220,
        0,
        hero.y+hero.h
    );

    bottom.addColorStop(0,"rgba(0,0,0,0)");
    bottom.addColorStop(1,"rgba(0,0,0,.92)");

    ctx.fillStyle = bottom;

    ctx.fillRect(
        hero.x,
        hero.y+hero.h-220,
        hero.w,
        220
    );

    // =====================================================
    // PREMIUM HIGHLIGHT
    // =====================================================

    ctx.save();

    ctx.globalAlpha=.08;

    ctx.strokeStyle="#FFD400";

    ctx.lineWidth=2;

    ctx.beginPath();

    ctx.arc(
        760,
        420,
        250,
        Math.PI*.95,
        Math.PI*1.70
    );

    ctx.stroke();

    ctx.restore();

}
