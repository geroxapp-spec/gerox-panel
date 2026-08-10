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

export const CARD_X = 55;
export const CARD_Y = 205;
export const CARD_W = 560;
export const CARD_R = 40;
export const PAD_X  = 46;
export const PLATE_H = 190;

export function drawProductInfo(ctx, deal){
  const parsed = parseTitle(deal.title);

  // ---------- 1) İÇERİK AKIŞINI ÖNCE HESAPLA ----------
  const categoryY   = CARD_Y + 54;
  const underlineY  = categoryY + 18;
  const titleStartY = underlineY + 78;

  const maxTitleW = CARD_W - PAD_X*2;
  let titleSize = 96;
  let lines = [];

  while(titleSize>=52){
    lines = wrapLines(ctx, parsed.name, maxTitleW, titleSize, "Arial Black, Arial", 2);
    ctx.font = "900 "+titleSize+"px Arial Black, Arial, sans-serif";
    let ok = true;
    for(let i=0;i<lines.length;i++){
      if(ctx.measureText(lines[i]).width > maxTitleW) ok=false;
    }
    if(ok) break;
    titleSize -= 4;
  }

  const titleLineH = titleSize + 12;
  let cursorY = titleStartY + (lines.length-1)*titleLineH;

  let unitY = null;
  if(parsed.unit){
    unitY = cursorY + 72;
    cursorY = unitY;
  }

  const taglineY   = cursorY + 52;
  const oldPriceRowY = taglineY + 88;      // içerikten hemen sonra, sabit boşluk
  const plateY     = oldPriceRowY + 62;    // fiyat sırasından hemen sonra plaka başlar
  const plateH     = PLATE_H;
  const cardBottomY = plateY + 44;         // kart, plakanın üstüne 44px biner (kaynaşma efekti)
  const cardH       = cardBottomY - CARD_Y;

  // ---------- 2) DIŞ KART ----------
  ctx.save();
  ctx.shadowColor = "rgba(255,180,0,0.16)";
  ctx.shadowBlur = 30;
  rr(ctx, CARD_X, CARD_Y, CARD_W, cardH, CARD_R);
  const cardGrad = ctx.createLinearGradient(CARD_X, CARD_Y, CARD_X, cardBottomY);
  cardGrad.addColorStop(0, "rgba(32,22,4,0.88)");
  cardGrad.addColorStop(1, "rgba(6,4,0,0.94)");
  ctx.fillStyle = cardGrad;
  ctx.fill();
  ctx.strokeStyle = "rgba(255,200,40,0.45)";
  ctx.lineWidth = 1.8;
  ctx.stroke();
  ctx.restore();

  // ---------- 3) İÇERİK ----------
  ctx.textAlign = "left";

  ctx.fillStyle = C.gold;
  ctx.font = "700 27px Arial";
  ctx.fillText(categoryLabel(deal.category), CARD_X+PAD_X, categoryY);

  ctx.strokeStyle = "rgba(255,200,40,0.55)";
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(CARD_X+PAD_X, underlineY);
  ctx.lineTo(CARD_X+CARD_W-PAD_X, underlineY);
  ctx.stroke();

  ctx.font = "900 "+titleSize+"px Arial Black, Arial, sans-serif";
  ctx.shadowColor = "rgba(0,0,0,0.9)";
  ctx.shadowBlur = 10;

  let ty = titleStartY;
  for(let i=0;i<lines.length;i++){
    ctx.strokeStyle = "rgba(0,0,0,0.55)";
    ctx.lineWidth = 4;
    ctx.strokeText(lines[i], CARD_X+PAD_X, ty);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(lines[i], CARD_X+PAD_X, ty);
    ty += titleLineH;
  }
  ctx.shadowBlur = 0;

  if(parsed.unit){
    ctx.fillStyle = "rgba(255,255,255,0.82)";
    ctx.font = "700 40px Arial";
    ctx.fillText("("+parsed.unit+")", CARD_X+PAD_X, unitY);
  }

  ctx.fillStyle = "rgba(255,255,255,0.52)";
  ctx.font = "500 22px Arial";
  ctx.fillText("Kaliteli  •  Ekonomik  •  Güvenilir", CARD_X+PAD_X, taglineY);

  return {
    cardX: CARD_X,
    cardY: CARD_Y,
    cardW: CARD_W,
    cardH,
    cardBottomY,
    oldPriceRowY,
    plateY,
    plateH,
    padX: PAD_X,
    cardR: CARD_R
  };
}
