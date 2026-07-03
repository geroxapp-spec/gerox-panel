import { cover, drawNoise } from "./utils.js";

export function drawBackground(ctx, productImg) {

    const W = 1080;
    const H = 1080;

    // =====================================================
    // PREMIUM BLACK BACKGROUND
    // =====================================================

    const bg = ctx.createLinearGradient(0, 0, 0, H);

    bg.addColorStop(0, "#060606");
    bg.addColorStop(.55, "#0d0d0d");
    bg.addColorStop(1, "#020202");

    ctx.fillStyle = bg;
    ctx.fillRect(0,0,W,H);

    // =====================================================
    // PRODUCT BLUR
    // =====================================================

    if(productImg){

        ctx.save();

        ctx.globalAlpha=.28;

        ctx.filter="blur(28px) saturate(1.35) brightness(.95)";

        cover(
            ctx,
            productImg,
            -140,
            70,
            1380,
            860,
            .56,
            .50
        );

        ctx.restore();

        ctx.filter="none";

    }

    // =====================================================
    // GOLD LIGHT
    // =====================================================

    let light=ctx.createRadialGradient(
        860,
        360,
        30,
        860,
        360,
        650
    );

    light.addColorStop(0,"rgba(255,208,0,.34)");
    light.addColorStop(.20,"rgba(255,190,0,.22)");
    light.addColorStop(.45,"rgba(255,170,0,.10)");
    light.addColorStop(1,"rgba(0,0,0,0)");

    ctx.fillStyle=light;
    ctx.fillRect(0,0,W,H);

    // =====================================================
    // SECOND LIGHT
    // =====================================================

    let light2=ctx.createRadialGradient(
        260,
        820,
        20,
        260,
        820,
        520
    );

    light2.addColorStop(0,"rgba(255,255,255,.05)");
    light2.addColorStop(.45,"rgba(255,255,255,.02)");
    light2.addColorStop(1,"rgba(0,0,0,0)");

    ctx.fillStyle=light2;
    ctx.fillRect(0,0,W,H);

    // =====================================================
    // TOP PANEL
    // =====================================================

    let top=ctx.createLinearGradient(0,0,0,250);

    top.addColorStop(0,"rgba(0,0,0,1)");
    top.addColorStop(.55,"rgba(0,0,0,.95)");
    top.addColorStop(1,"rgba(0,0,0,.35)");

    ctx.fillStyle=top;
    ctx.fillRect(0,0,W,260);

    // =====================================================
    // LEFT PANEL
    // =====================================================

    let left=ctx.createLinearGradient(
        0,
        0,
        700,
        0
    );

    left.addColorStop(0,"rgba(0,0,0,1)");
    left.addColorStop(.55,"rgba(0,0,0,.90)");
    left.addColorStop(.82,"rgba(0,0,0,.45)");
    left.addColorStop(1,"rgba(0,0,0,0)");

    ctx.fillStyle=left;
    ctx.fillRect(0,140,W,720);

    // =====================================================
    // BOTTOM
    // =====================================================

    let bottom=ctx.createLinearGradient(
        0,
        650,
        0,
        H
    );

    bottom.addColorStop(0,"rgba(0,0,0,0)");
    bottom.addColorStop(.35,"rgba(0,0,0,.55)");
    bottom.addColorStop(.70,"rgba(0,0,0,.88)");
    bottom.addColorStop(1,"rgba(0,0,0,1)");

    ctx.fillStyle=bottom;
    ctx.fillRect(0,560,W,520);

    // =====================================================
    // GOLD STRIPE
    // =====================================================

    let gold=ctx.createLinearGradient(
        0,
        0,
        W,
        0
    );

    gold.addColorStop(0,"rgba(255,212,0,0)");
    gold.addColorStop(.50,"rgba(255,212,0,.10)");
    gold.addColorStop(1,"rgba(255,212,0,0)");

    ctx.fillStyle=gold;
    ctx.fillRect(0,165,W,4);

    // =====================================================
    // VIGNETTE
    // =====================================================

    let vig=ctx.createRadialGradient(
        540,
        520,
        280,
        540,
        520,
        900
    );

    vig.addColorStop(0,"rgba(0,0,0,0)");
    vig.addColorStop(.65,"rgba(0,0,0,.28)");
    vig.addColorStop(1,"rgba(0,0,0,.86)");

    ctx.fillStyle=vig;
    ctx.fillRect(0,0,W,H);

    // =====================================================
    // FILM GRAIN
    // =====================================================

    drawNoise(ctx,W,H,.020);

}
