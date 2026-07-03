import { C, upperTR, wrapLines, rr } from "./utils.js";
import { Layout } from "./layout.js";

const CATEGORY_LABELS = {
    manav: "MANAV",
    kasap: "KASAP",
    sut: "SÜT ÜRÜNLERİ",
    bakliyat: "BAKLİYAT",
    cay: "ÇAY & KAHVE",
    temizlik: "TEMİZLİK",
    kisisel: "KİŞİSEL BAKIM"
};

function categoryLabel(cat) {

    return CATEGORY_LABELS[String(cat || "").toLowerCase()]
        || upperTR(cat || "FIRSAT");

}

function parseTitle(title) {

    let t = String(title || "").trim();

    let unit = "";

    const m = t.match(/\(([^)]+)\)/);

    if (m) {

        unit = upperTR(m[1]);

        t = t.replace(m[0], "").trim();

    } else {

        const m2 = t.match(/\b(\d+\s*(KG|GR|G|LT|L|ML|ADET|PKT))$/i);

        if (m2) {

            unit = upperTR(m2[1]);

            t = t.replace(m2[0], "").trim();

        }

    }

    return {

        name: upperTR(t),

        unit

    };

}

export function drawProductInfo(ctx, deal) {

    const box = Layout.title;

    // ===========================
    // GLASS PANEL
    // ===========================

    ctx.save();

    rr(
        ctx,
        box.x - 20,
        box.y - 25,
        box.w + 40,
        270,
        30
    );

    const glass = ctx.createLinearGradient(
        0,
        box.y,
        0,
        box.y + 270
    );

    glass.addColorStop(0, "rgba(255,255,255,.05)");
    glass.addColorStop(.5, "rgba(255,255,255,.02)");
    glass.addColorStop(1, "rgba(255,255,255,.01)");

    ctx.fillStyle = glass;

    ctx.fill();

    ctx.strokeStyle = "rgba(255,212,0,.15)";
    ctx.lineWidth = 2;

    ctx.stroke();

    ctx.restore();

    // ===========================
    // CATEGORY
    // ===========================

    ctx.textAlign = "left";

    ctx.fillStyle = C.gold;

    ctx.font = "700 26px Arial";

    ctx.fillText(
        categoryLabel(deal.category),
        box.x,
        box.y
    );

    // GOLD LINE

    ctx.strokeStyle = C.gold;

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(box.x, box.y + 18);

    ctx.lineTo(box.x + 120, box.y + 18);

    ctx.stroke();

    // ===========================
    // TITLE
    // ===========================

    const parsed = parseTitle(deal.title);

    let font = 86;

    let lines = [];

    while (font > 52) {

        lines = wrapLines(
            ctx,
            parsed.name,
            box.w,
            font,
            "Arial Black",
            3
        );

        if (lines.length <= 3)
            break;

        font -= 4;

    }

    ctx.fillStyle = "#FFFFFF";

    ctx.strokeStyle = "rgba(0,0,0,.70)";
    ctx.lineWidth = 8;

    ctx.shadowColor = "rgba(0,0,0,.35)";
    ctx.shadowBlur = 14;

    ctx.font = `900 ${font}px Arial Black`;

    let y = box.y + 78;

    for (const line of lines) {

        ctx.strokeText(
            line,
            box.x,
            y
        );

        ctx.fillText(
            line,
            box.x,
            y
        );

        y += font + 6;

    }

    ctx.shadowBlur = 0;

    // ===========================
    // UNIT
    // ===========================

    if (parsed.unit) {

        ctx.fillStyle = C.gold;

        ctx.font = "700 34px Arial";

        ctx.fillText(
            "(" + parsed.unit + ")",
            box.x,
            y + 10
        );

    }

    // ===========================
    // SLOGAN
    // ===========================

    ctx.fillStyle = "rgba(255,255,255,.55)";

    ctx.font = "600 22px Arial";

    ctx.fillText(
        "Kaliteli • Ekonomik • Güvenilir",
        box.x,
        y + 52
    );

}
