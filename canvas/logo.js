import { C, loadProxyImage, contain, fitFont, rr } from "./utils.js";
import { Layout } from "./layout.js";

export async function drawLogo(ctx, business) {

    const box = Layout.logo;

    // =====================================================
    // GLASS HEADER
    // =====================================================

    ctx.save();

    rr(ctx,
        box.x - 35,
        box.y - 10,
        box.w + 70,
        box.h + 20,
        30
    );

    const glass = ctx.createLinearGradient(
        0,
        box.y,
        0,
        box.y + box.h
    );

    glass.addColorStop(0, "rgba(255,255,255,.05)");
    glass.addColorStop(.5, "rgba(255,255,255,.02)");
    glass.addColorStop(1, "rgba(255,255,255,.01)");

    ctx.fillStyle = glass;
    ctx.fill();

    ctx.strokeStyle = "rgba(255,212,0,.18)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();

    // =====================================================
    // LOGO
    // =====================================================

    let drawn = false;

    if (business?.logo_url) {

        try {

            const logo = await loadProxyImage(business.logo_url, {
                w: 1200,
                h: 300,
                fit: "inside",
                output: "png",
                q: 100
            });

            ctx.save();

            ctx.shadowColor = "rgba(255,212,0,.35)";
            ctx.shadowBlur = 28;

            contain(
                ctx,
                logo,
                box.x,
                box.y,
                box.w,
                box.h
            );

            ctx.restore();

            drawn = true;

        } catch {

            drawn = false;

        }

    }

    // =====================================================
    // FALLBACK
    // =====================================================

    if (!drawn) {

        const name = (
            business?.name || "MANSUR GROSS"
        ).toLocaleUpperCase("tr-TR");

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const size = fitFont(
            ctx,
            name,
            box.w,
            72,
            42,
            "Arial Black"
        );

        ctx.font = `900 ${size}px Arial Black`;

        ctx.strokeStyle = "rgba(0,0,0,.75)";
        ctx.lineWidth = 8;
        ctx.strokeText(
            name,
            540,
            box.y + (box.h / 2)
        );

        ctx.fillStyle = C.gold;
        ctx.fillText(
            name,
            540,
            box.y + (box.h / 2)
        );

    }

    // =====================================================
    // GOLD LINE
    // =====================================================

    const line = ctx.createLinearGradient(
        160,
        0,
        920,
        0
    );

    line.addColorStop(0, "rgba(255,212,0,0)");
    line.addColorStop(.5, "rgba(255,212,0,.95)");
    line.addColorStop(1, "rgba(255,212,0,0)");

    ctx.save();

    ctx.shadowColor = "#FFD400";
    ctx.shadowBlur = 12;

    ctx.strokeStyle = line;
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(180, box.y + box.h + 18);
    ctx.lineTo(900, box.y + box.h + 18);
    ctx.stroke();

    ctx.restore();

}
