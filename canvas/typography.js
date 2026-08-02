import {C, upperTR, wrapLines, rr} from "./utils.js";

const CATEGORY_LABELS={
  manav:"MANAV",
  kasap:"KASAP",
  sut:"SÜT ÜRÜNLERİ",
  bakliyat:"BAKLİYAT",
  cay:"ÇAY & KAHVE",
  temizlik:"TEMİZLİK",
  kisisel:"KİŞİSEL BAKIM"
};

function categoryLabel(cat){
  return CATEGORY_LABELS[String(cat||"").toLowerCase()]||upperTR(cat||"FIRSAT");
}

function parseTitle(title){
  let t=String(title||"").trim();
  let unit="";
  const m=t.match(/\(([^)]+)\)/);
  if(m){
    unit=upperTR(m[1]);
    t=t.replace(m[0],"").trim();
  }else{
    const m2=t.match(/\b(\d+\s*(KG|GR|G|LT|L|ML|LİTRE|LITRE|ADET|PKT))$/i);
    if(m2){
      unit=upperTR(m2[1]);
      t=t.replace(m2[0],"").trim();
    }
  }
  return { name:upperTR(t), unit:unit };
}

export const CARD_X = 28;
export const CARD_Y = 170;
export const CARD_W = 490;
export const CARD_R = 28;
export const PAD_X  = 34;
export const PRICE_AREA_H = 168;

export function drawProductInfo(ctx, deal){
  const parsed = parseTitle(deal.title);

  // ---------- 1) ÖLÇÜM (henüz çizmiyoruz) ----------
  const maxTitleW = CARD_W - PAD_X*2;
  let titleSize = 88;
  let lines = [];

  while(titleSize>=50){
    lines = wrapLines(ctx, parsed.name, maxTitleW, titleSize, "Impact, Arial Black, Arial", 3);
    ctx.font = "900 "+titleSize+"px Impact, Arial Black, Arial";
    let ok = true;
    for(let i=0;i<lines.length;i++){
      if(ctx.measureText(lines[i]).width > maxTitleW) ok=false;
    }
    if(ok) break;
    titleSize -= 4;
  }

  const titleLineH   = titleSize + 10;
  const categoryY    = CARD_Y + 48;
  const underlineY   = categoryY + 16;
  const titleStartY  = underlineY + 66;
  const titleBlockH  = lines.length * titleLineH;

  let cursorY = titleStartY + titleBlockH - titleLineH;

  let unitY = null;
  if(parsed.unit){
    unitY   = cursorY + 62;
    cursorY = unitY;
  }

  const taglineY   = cursorY + 46;
  const infoBottomY = taglineY + 26;

  const cardH = Math.max(400, (infoBottomY - CARD_Y) + PRICE_AREA_H + 26);

  // ---------- 2) DIŞ KART (koyu cam) ----------
  ctx.save();
  ctx.shadowColor = "rgba(255,180,0,0.16)";
  ctx.shadowBlur = 30;
  rr(ctx, CARD_X, CARD_Y, CARD_W, cardH, CARD_R);
  const cardGrad = ctx.createLinearGradient(CARD_X, CARD_Y, CARD_X, CARD_Y+cardH);
  cardGrad.addColorStop(0, "rgba(32,22,4,0.86)");
  cardGrad.addColorStop(1, "rgba(8,6,0,0.92)");
  ctx.fillStyle = cardGrad;
  ctx.fill();
  ctx.strokeStyle = "rgba(255,200,40,0.45)";
  ctx.lineWidth = 1.6;
  ctx.stroke();
  ctx.restore();

  // ---------- 3) İÇERİK ----------
  ctx.textAlign = "left";

  // Kategori
  ctx.fillStyle = C.gold;
  ctx.font = "700 26px Arial";
  ctx.fillText(categoryLabel(deal.category), CARD_X+PAD_X, categoryY);

  // Kategori altı çizgi
  ctx.strokeStyle = "rgba(255,200,40,0.55)";
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(CARD_X+PAD_X, underlineY);
  ctx.lineTo(CARD_X+CARD_W-PAD_X, underlineY);
  ctx.stroke();

  // Ürün adı
  ctx.font = "900 "+titleSize+"px Impact, Arial Black, Arial";
  ctx.shadowColor = "rgba(0,0,0,0.9)";
  ctx.shadowBlur = 10;

  let ty = titleStartY;
  for(let i=0;i<lines.length;i++){
    ctx.strokeStyle = "rgba(0,0,0,0.65)";
    ctx.lineWidth = 5;
    ctx.strokeText(lines[i], CARD_X+PAD_X, ty);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(lines[i], CARD_X+PAD_X, ty);
    ty += titleLineH;
  }
  ctx.shadowBlur = 0;

  // Birim
  if(parsed.unit){
    ctx.fillStyle = "rgba(255,255,255,0.82)";
    ctx.font = "700 36px Arial";
    ctx.fillText("("+parsed.unit+")", CARD_X+PAD_X, unitY);
  }

  // Tagline
  ctx.fillStyle = "rgba(255,255,255,0.50)";
  ctx.font = "500 21px Arial";
  ctx.fillText("Kaliteli  •  Ekonomik  •  Güvenilir", CARD_X+PAD_X, taglineY);

  return {
    cardX: CARD_X,
    cardY: CARD_Y,
    cardW: CARD_W,
    cardH,
    cardBottomY: CARD_Y + cardH,
    priceAreaH: PRICE_AREA_H,
    padX: PAD_X,
    cardR: CARD_R
  };
}
