import { C, upperTR, wrapLines, rr } from "./utils.js";

const CATEGORY_LABELS = {
  manav: "MANAV",
  kasap: "KASAP",
  sut: "SÜT ÜRÜNLERİ",
  bakliyat: "BAKLİYAT",
  cay: "ÇAY & KAHVE",
  temizlik: "TEMİZLİK",
  kisisel: "KİŞİSEL BAKIM"
};

function categoryLabel(cat){
  return CATEGORY_LABELS[String(cat || "").toLowerCase()] || upperTR(cat || "FIRSAT");
}

function parseTitle(title){
  let t = String(title || "").trim();
  let unit = "";

  const m = t.match(/\(([^)]+)\)/);

  if(m){
    unit = upperTR(m[1]);
    t = t.replace(m[0], "").trim();
  }else{
    const m2 = t.match(/\b(\d+\s*(KG|GR|G|LT|L|ML|LİTRE|LITRE|ADET|PKT))$/i);

    if(m2){
      unit = upperTR(m2[1]);
      t = t.replace(m2[0], "").trim();
    }
  }

  return {
    name: upperTR(t),
    unit
  };
}

export function drawProductInfo(ctx, deal){
  const parsed = parseTitle(deal.title);

  // Referans kart ölçüleri
  const cardX = 55;
  const cardY = 178;
  const cardW = 505;
  const cardH = 610;
  const padX = 52;

  // Sol cam kart
  ctx.save();

  ctx.shadowColor = "rgba(255,180,0,0.20)";
  ctx.shadowBlur = 34;

  rr(ctx, cardX, cardY, cardW, cardH, 34);

  const grad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
  grad.addColorStop(0, "rgba(26,18,4,0.84)");
  grad.addColorStop(0.58, "rgba(12,9,1,0.88)");
  grad.addColorStop(1, "rgba(8,6,0,0.94)");

  ctx.fillStyle = grad;
  ctx.fill();

  ctx.strokeStyle = "rgba(255,205,60,0.54)";
  ctx.lineWidth = 1.7;
  ctx.stroke();

  ctx.restore();

  // Kart üstünde hafif parlama çizgisi
  ctx.save();
  ctx.strokeStyle = "rgba(255,220,90,0.32)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cardX + 28, cardY + 1);
  ctx.quadraticCurveTo(cardX + 180, cardY - 10, cardX + cardW - 34, cardY + 28);
  ctx.stroke();
  ctx.restore();

  // Kategori
  ctx.save();
  ctx.textAlign = "left";
  ctx.fillStyle = C.gold;
  ctx.font = "800 34px Arial Black, Arial";
  ctx.fillText(categoryLabel(deal.category), cardX + padX, cardY + 72);

  // Alt çizgi
  ctx.strokeStyle = C.gold;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cardX + padX, cardY + 98);
  ctx.lineTo(cardX + padX + 170, cardY + 98);
  ctx.stroke();
  ctx.restore();

  // Ürün adı
  const titleMaxW = cardW - padX * 2;
  let titleSize = 86;
  let lines = [];

  while(titleSize >= 48){
    lines = wrapLines(ctx, parsed.name, titleMaxW, titleSize, "Impact, Arial Black, Arial", 3);
    ctx.font = "900 " + titleSize + "px Impact, Arial Black, Arial";

    let ok = true;

    for(let i = 0; i < lines.length; i++){
      if(ctx.measureText(lines[i]).width > titleMaxW){
        ok = false;
      }
    }

    if(ok) break;
    titleSize -= 4;
  }

  ctx.save();
  ctx.textAlign = "left";
  ctx.font = "900 " + titleSize + "px Impact, Arial Black, Arial";
  ctx.shadowColor = "rgba(0,0,0,0.95)";
  ctx.shadowBlur = 12;

  let y = cardY + 190;

  for(let i = 0; i < lines.length; i++){
    ctx.strokeStyle = "rgba(0,0,0,0.78)";
    ctx.lineWidth = 6;
    ctx.strokeText(lines[i], cardX + padX, y);

    ctx.fillStyle = "#F4F1EA";
    ctx.fillText(lines[i], cardX + padX, y);

    y += titleSize + 12;
  }

  ctx.restore();

  // Birim
  if(parsed.unit){
    ctx.save();
    ctx.textAlign = "left";
    ctx.fillStyle = C.gold;
    ctx.font = "900 48px Arial Black, Arial";
    ctx.fillText("(" + parsed.unit + ")", cardX + padX, y + 30);
    ctx.restore();

    y += 82;
  }

  // Tagline
  ctx.save();
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "500 26px Arial";
  ctx.fillText("Kaliteli", cardX + padX, y + 32);

  ctx.fillStyle = C.gold;
  ctx.beginPath();
  ctx.arc(cardX + padX + 118, y + 24, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.fillText("Ekonomik", cardX + padX + 140, y + 32);

  ctx.fillStyle = C.gold;
  ctx.beginPath();
  ctx.arc(cardX + padX + 278, y + 24, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.fillText("Güvenilir", cardX + padX + 300, y + 32);

  ctx.restore();

  return {
    cardX,
    cardY,
    cardW,
    cardH,
    padX,
    priceX: 55,
    priceY: 720,
    priceW: 560,
    priceH: 210
  };
}
