import { C, upperTR, fitFont, wrapLines, rr } from "./utils.js";
import { Layout } from "./layout.js";

// =========================
// CATEGORY LABEL
// =========================

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
    return CATEGORY_LABELS[String(cat || "").toLowerCase()] ||
        upperTR(cat || "FIRSAT");
}

// =========================
// TITLE PARSER
// =========================

function parseTitle(title) {

    let t = String(title || "").trim();
    let unit = "";

    const m = t.match(/\(([^)]+)\)/);

    if (m) {
        unit = upperTR(m[1]);
        t = t.replace(m[0], "").trim();
    } else {
        const m2 = t.match(/\b(\d+\s*(KG|GR|G|LT|L|ML|LİTRE|LITRE|ADET|PKT))$/i);

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

// =========================
// MAIN TEXT BLOCK
// =========================

export function drawProductInfo(ctx, deal) {

    const panel = Layout.infoPanel;

    // =========================
    // BACK PANEL
    // =========================

    ctx.save();

    rr(ctx, panel.x, panel.y, panel.w, panel.h, panel.radius);

    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.fill();

    ctx.strokeStyle = "rgba(255,212,0,0.10)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();

    // =========================
    // CATEGORY
    // =========================

    ctx.textAlign = "left";
    ctx.fillStyle = C.gold;
    ctx.font = "900 26px Arial Black, Arial";

    ctx.fillText(
        categoryLabel(deal.category),
        Layout.category.x,
        Layout.category.y
    );

    // =========================
    // TITLE
    // =========================

    const parsed = parseTitle(deal.title);

    let size = 86;
    let lines = [];

    while (size >= 52) {

        lines = wrapLines(
            ctx,
            parsed.name,
            panel.w - 60,
            size,
            "Impact, Arial Black, Arial",
            3
        );

        ctx.font = `900 ${size}px Impact, Arial Black, Arial`;

        const ok = lines.every(l => ctx.measureText(l).width <= panel.w - 60);

        if (ok) break;

        size -= 4;
    }

    ctx.fillStyle = C.white;
    ctx.shadowColor = "rgba(0,0,0,0.85)";
    ctx.shadowBlur = 12;

    let y = Layout.title.y;

    for (const line of lines) {
        ctx.font = `900 ${size}px Impact, Arial Black, Arial`;
        ctx.fillText(line, Layout.title.x, y);
        y += size + 6;
    }

    ctx.shadowBlur = 0;

    // =========================
    // UNIT
    // =========================

    if (parsed.unit) {

        ctx.fillStyle = C.gold;
        ctx.font = "900 64px Impact, Arial Black, Arial";

        ctx.fillText(parsed.unit, Layout.unit.x, y + 20);

        ctx.strokeStyle = C.gold;
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.moveTo(Layout.unit.x, y + 55);
        ctx.lineTo(Layout.unit.x + 140, y + 55);
        ctx.stroke();

    } else {

        ctx.strokeStyle = C.gold;
        ctx.lineWidth = 4;

        ctx.beginPath();
        ctx.moveTo(Layout.unit.x, y + 20);
        ctx.lineTo(Layout.unit.x + 140, y + 20);
        ctx.stroke();
    }
}
