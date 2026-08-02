import {C, upperTR, wrapLines, rr} from "./utils.js";

const CATEGORY_LABELS={
  manav:"MANAV", kasap:"KASAP", sut:"SÜT ÜRÜNLERİ",
  bakliyat:"BAKLİYAT", cay:"ÇAY & KAHVE",
  temizlik:"TEMİZLİK", kisisel:"KİŞİSEL BAKIM"
};

function categoryLabel(cat){
  return CATEGORY_LABELS[String(cat||"").toLowerCase()]||upperTR(cat||"FIRSAT");
}

function parseTitle(title){
  let t=String(title||"").trim();
  let unit="";
  const m=t.match(/\(([^)]+)\)/);
  if(m){ unit=upperTR(m[1]); t=t.replace(m[0],"").trim(); }
  else{
    const m2=t.match(/\b(\d+\s*(KG|GR|G|LT|L|ML|LİTRE|LITRE|ADET|PKT))$/i);
    if(m2){ unit=upperTR(m2[1]); t=t.replace(m2[0],"").trim(); }
  }
  return { name:upperTR(t), unit:unit };
}

export function drawProductInfo(ctx, deal){
  const parsed=parseTitle(deal.title);
  const cardX=28;
  const cardY=170;
  const cardW=490;
  const cardH=580;

  // Glassmorphism kart
  ctx.save();
  ctx.shadowColor="rgba(255,180,0,0.18)";
  ctx.shadowBlur=32;
  rr(ctx,cardX,cardY,cardW,cardH,28);

  // Kart arka planı
  const cardGrad=ctx.createLinearGradient(cardX,cardY,cardX+cardW,cardY+cardH);
  cardGrad.addColorStop(0,"rgba(30,20,5,0.82)");
  cardGrad.addColorStop(1,"rgba(10,8,0,0.88)");
  ctx.fillStyle=cardGrad;
  ctx.fill();

  // Kart border (altın)
  ctx.strokeStyle="rgba(255,200,40,0.55)";
  ctx.lineWidth=1.8;
  ctx.stroke();
  ctx.restore();

  // Kart üst altın çizgi
  ctx.save();
  ctx.strokeStyle=C.gold;
  ctx.lineWidth=3;
  ctx.beginPath();
  ctx.moveTo(cardX+28,cardY+62);
  ctx.lineTo(cardX+cardW-28,cardY+62);
  ctx.stroke();
  ctx.restore();

  // Kategori
  ctx.save();
  ctx.textAlign="left";
  ctx.fillStyle=C.gold;
  ctx.font="700 26px Arial";
  ctx.fillText(categoryLabel(deal.category),cardX+32,cardY+46);
  ctx.restore();

  // Ürün adı
  ctx.save();
  ctx.textAlign="left";
  let titleSize=92;
  let lines=[];
  const maxTitleW=cardW-56;

  while(titleSize>=52){
    lines=wrapLines(ctx,parsed.name,maxTitleW,titleSize,"Impact, Arial Black, Arial",3);
    ctx.font="900 "+titleSize+"px Impact, Arial Black, Arial";
    let ok=true;
    for(let i=0;i<lines.length;i++){
      if(ctx.measureText(lines[i]).width>maxTitleW) ok=false;
    }
    if(ok) break;
    titleSize-=4;
  }

  ctx.font="900 "+titleSize+"px Impact, Arial Black, Arial";
  ctx.shadowColor="rgba(0,0,0,0.95)";
  ctx.shadowBlur=12;

  let ty=cardY+148;
  for(let i=0;i<lines.length;i++){
    ctx.strokeStyle="rgba(0,0,0,0.70)";
    ctx.lineWidth=5;
    ctx.strokeText(lines[i],cardX+32,ty);
    ctx.fillStyle="#FFFFFF";
    ctx.fillText(lines[i],cardX+32,ty);
    ty+=titleSize+6;
  }
  ctx.restore();

  // Birim (KG vs.)
  if(parsed.unit){
    ctx.save();
    ctx.textAlign="left";
    ctx.fillStyle="rgba(255,255,255,0.85)";
    ctx.font="700 38px Arial";
    ctx.fillText("("+parsed.unit+")",cardX+32,ty+18);
    ctx.restore();
    ty+=60;
  }

  // Kaliteli • Ekonomik • Güvenilir
  ctx.save();
  ctx.textAlign="left";
  ctx.fillStyle="rgba(255,255,255,0.55)";
  ctx.font="500 22px Arial";
  ctx.fillText("Kaliteli  •  Ekonomik  •  Güvenilir",cardX+32,ty+30);
  ctx.restore();
}
