import { loadImage } from "./utils.js";

export async function renderTheme({
  ctx,
  themeName,
  deal,
  business,
  productImg,
  logoImg
}) {

  // =====================================================
  // AYARLAR
  // =====================================================

  const W = 1080;
  const H = 1080;

  const bg = await loadImage(
    `/themes/${themeName}/background.png`
  );

  const fg = await loadImage(
    `/themes/${themeName}/foreground.png`
  );

  const config = await fetch(
    `/themes/${themeName}/config.json?v=${Date.now()}`
  ).then(r => r.json());


  // =====================================================
  // 1 - TEMEL BEYAZ ZEMİN
  // =====================================================

  // Canvas şeffaf kalmasın.
  // Önce tamamen beyaz zemin oluşturuyoruz.

  ctx.clearRect(0, 0, W, H);

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, W, H);


  // =====================================================
  // 2 - BACKGROUND
  // =====================================================

  ctx.drawImage(
    bg,
    0,
    0,
    W,
    H
  );


  // =====================================================
  // 3 - ÜRÜN
  // =====================================================

  if (productImg) {

    const p = config.productImage;

    ctx.save();

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      productImg,
      p.x,
      p.y,
      p.width,
      p.height
    );

    ctx.restore();
  }


  // =====================================================
  // 4 - FOREGROUND
  // =====================================================
  //
  // ÇOK ÖNEMLİ:
  //
  // foreground artık yazılardan ÖNCE çiziliyor.
  //
  // Böylece:
  //
  // kırmızı fiyat kutusu
  // sarı fiyat plakası
  // üst logo alanı
  // MANAV etiketi
  // indirim rozeti
  // alt kırmızı bant
  //
  // önce hazırlanıyor.
  //
  // Daha sonra yazılar bunların üzerine basılıyor.
  // =====================================================

  ctx.drawImage(
    fg,
    0,
    0,
    W,
    H
  );


  // =====================================================
  // 5 - LOGO
  // =====================================================

  if (logoImg) {

    const l = config.logo;

    ctx.save();

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const logoRatio = Math.min(
      l.width / logoImg.width,
      (l.height || 100) / logoImg.height
    );

    const logoWidth = logoImg.width * logoRatio;
    const logoHeight = logoImg.height * logoRatio;

    const logoX =
      l.x + (l.width - logoWidth) / 2;

    const logoY =
      l.y + ((l.height || 100) - logoHeight) / 2;

    ctx.drawImage(
      logoImg,
      logoX,
      logoY,
      logoWidth,
      logoHeight
    );

    ctx.restore();
  }


  // =====================================================
  // 6 - METİNLER
  // =====================================================

  drawThemeText(
    ctx,
    deal,
    config
  );
}


// =========================================================
// METİNLER
// =========================================================

function drawThemeText(ctx, deal, config) {

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";


  // =====================================================
  // MANAV
  // =====================================================

  if (deal.category) {

    ctx.save();

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "900 28px Arial Black, Arial";

    ctx.fillText(
      String(deal.category).toLocaleUpperCase("tr-TR"),
      config.category.x,
      config.category.y
    );

    ctx.restore();
  }


  // =====================================================
  // ÜRÜN ADI
  // =====================================================

  if (deal.title) {

    let title = String(deal.title)
      .toLocaleUpperCase("tr-TR");

    // Örn:
    // Karpuz (KG)
    //
    // KG kısmını başlıktan ayırıyoruz.

    let unit = "";

    const unitMatch = title.match(/\(([^)]+)\)/);

    if (unitMatch) {

      unit = unitMatch[1];

      title = title
        .replace(unitMatch[0], "")
        .trim();
    }


    // ---------------------------------------------------
    // KARPUZ
    // ---------------------------------------------------

    ctx.save();

    ctx.fillStyle = "#111111";

    ctx.font =
      "900 96px Arial Black, Arial";

    ctx.fillText(
      title,
      config.title.x,
      config.title.y
    );

    ctx.restore();


    // ---------------------------------------------------
    // KG
    // ---------------------------------------------------

    if (unit) {

      ctx.save();

      ctx.fillStyle = "#555555";

      ctx.font =
        "700 38px Arial";

      ctx.fillText(
        unit,
        config.title.x,
        config.title.y + 48
      );

      ctx.restore();
    }
  }


  
  // =====================================================
  // ESKİ FİYAT
  // =====================================================

  if (
    deal.old_price !== undefined &&
    deal.old_price !== null &&
    deal.old_price !== ""
  ) {

    const oldPrice =
      Number(deal.old_price)
        .toLocaleString("tr-TR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

    const oldText =
      oldPrice + " ₺";


    ctx.save();

    ctx.fillStyle = "#555555";

    ctx.font =
      "700 40px Arial";

    ctx.fillText(
      oldText,
      config.oldPrice.x,
      config.oldPrice.y
    );


    // Üzeri çizgi

    const width =
      ctx.measureText(oldText).width;

    ctx.strokeStyle = "#E30613";
    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(
      config.oldPrice.x - 5,
      config.oldPrice.y - 12
    );

    ctx.lineTo(
      config.oldPrice.x + width + 5,
      config.oldPrice.y - 12
    );

    ctx.stroke();

    ctx.restore();
  }


  // =====================================================
// YENİ FİYAT
// =====================================================

if (
  deal.new_price !== undefined &&
  deal.new_price !== null &&
  deal.new_price !== ""
) {

  const newPrice = Number(deal.new_price)
    .toLocaleString("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  ctx.save();

  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  ctx.font = "900 100px Arial Black, Arial";

  ctx.fillText(
    newPrice,
    config.newPrice.x,
    config.newPrice.y
  );

  const priceWidth = ctx.measureText(newPrice).width;

  ctx.font = "900 52px Arial Black, Arial";

  ctx.fillText(
    "₺",
    config.newPrice.x + priceWidth + 15,
    config.newPrice.y - 8
  );

  ctx.restore();
}


  // =====================================================
  // İNDİRİM ORANI
  // =====================================================

  if (
    deal.old_price &&
    deal.new_price
  ) {

    const oldPrice =
      Number(deal.old_price);

    const newPrice =
      Number(deal.new_price);

    if (oldPrice > 0 && newPrice < oldPrice) {

      const discount =
        Math.round(
          ((oldPrice - newPrice) / oldPrice) * 100
        );


      // Rozetin konumu

      const cx = 875;
      const cy = 185;


      ctx.save();

      ctx.textAlign = "center";


      // %50

      ctx.fillStyle = "#FFFFFF";

      ctx.font =
        "900 42px Arial Black, Arial";

      ctx.fillText(
        "%" + discount,
        cx,
        cy
      );


      // İNDİRİM

      ctx.fillStyle = "#FFE000";

      ctx.font =
        "900 22px Arial Black, Arial";

      ctx.fillText(
        "İNDİRİM",
        cx,
        cy + 30
      );


      ctx.restore();
    }
  }


  // =====================================================
  // ALT TARİH
  // =====================================================

  if (deal.date_text) {

    ctx.save();

    ctx.textAlign = "left";

    ctx.fillStyle = "#FFFFFF";

    ctx.font =
      "700 28px Arial";

    ctx.fillText(
      deal.date_text,
      config.date.x,
      config.date.y
    );

    ctx.restore();
  }
}
