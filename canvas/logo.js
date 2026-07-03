import { C, loadProxyImage, contain } from "./utils.js";
import { Layout } from "./layout.js";

export async function drawLogo(ctx, business) {

    const box = Layout.logo;

    let drawn = false;

    // =========================
    // LOGO IMAGE (IF EXISTS)
    // =========================

    if (business && business.logo_url) {
        try {

            const logo = await loadProxyImage(business.logo_url, {
                w: 1000,
                h: 300,
                fit: "inside",
                output: "png",
                q: 95
            });

            ctx.save();

            // soft glow
            ctx.shadowColor = "rgba(255,212,0,0.35)";
            ctx.shadowBlur = 22;

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

        } catch (e) {
            drawn = false;
        }
    }

    // =========================
    // FALLBACK TEXT LOGO
    // =========================

    if (!drawn) {

        const name =
            (business && business.name)
                ? business.name
                : "MARKET";

        ctx.textAlign = "center";
        ctx.fillStyle = C.gold;

        let size = 64;

        // auto fit
        while (size > 28) {

            ctx.font = `900 ${size}px Arial Black, Arial`;

            const w = ctx.measureText(name).width;

            if (w <= box.w) break;

            size -= 2;
        }

        ctx.font = `900 ${size}px Arial Black, Arial`;

        ctx.fillText(name.toLocaleUpperCase("tr-TR"), 540, 95);
    }

    // =========================
    // GOLD LINE UNDER LOGO
    // =========================

    ctx.strokeStyle = "rgba(255,212,0,0.55)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(310, 168);
    ctx.lineTo(770, 168);
    ctx.stroke();
}
