import { loadImage } from "./utils.js";

export async function renderTheme({
  ctx,
  themeName,
  deal,
  business,
  productImg,
  logoImg
}) {

  const bg = await loadImage(
    `/themes/${themeName}/background.png`
  );

  const fg = await loadImage(
    `/themes/${themeName}/foreground.png`
  );

  const config = await fetch(
    `/themes/${themeName}/config.json`
  ).then(r => r.json());


  // =====================================================
  // 1. ARKA PLAN
  // =====================================================

  ctx.drawImage(
    bg,
    0,
    0,
    1080,
    1080
  );


  // =====================================================
  // 2. ÜRÜN PNG
  // =====================================================

  if (productImg) {

    const p = config.productImage;

    ctx.drawImage(
      productImg,
      p.x,
      p.y,
      p.width,
      p.height
    );
  }


  // =====================================================
  // 3. LOGO
  // =====================================================

  if (logoImg) {

    const l = config.logo;

    ctx.drawImage(
      logoImg,
      l.x,
      l.y,
      l.width,
      l.height || logoImg.height
    );
  }


  // =====================================================
  // 4. YAZILAR
  // =====================================================

  drawThemeText(
    ctx,
    deal,
    config
  );


  // =====================================================
  // 5. FOREGROUND PNG
  // =====================================================

  ctx.drawImage(
    fg,
    0,
    0,
    1080,
    1080
  );
}


// =======================================================
// DİNAMİK YAZILAR
// =======================================================

function drawThemeText(
  ctx,
  deal,
  config
) {

  // -----------------------------------------------------
  // KATEGORİ
  // -----------------------------------------------------

  if (deal.category) {

    ctx.save();

    ctx.fillStyle = "#FFFFFF";

    ctx.font =
      "900 28px Arial Black, Arial";

    ctx.fillText(
      String(deal.category)
        .toLocaleUpperCase("tr-TR"),
      config.category.x,
      config.category.y
    );

    ctx.restore();
  }


  // -----------------------------------------------------
  // ÜRÜN ADI
  // -----------------------------------------------------

  if (deal.title) {

    ctx.save();

    ctx.fillStyle = "#111111";

    ctx.font =
      "900 96px Arial Black, Arial";

    ctx.fillText(
      String(deal.title)
        .toLocaleUpperCase("tr-TR"),
      config.title.x,
      config.title.y
    );

    ctx.restore();
  }


  // -----------------------------------------------------
  // ESKİ FİYAT
  // -----------------------------------------------------

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

    ctx.save();

    ctx.fillStyle = "#666666";

    ctx.font =
      "700 40px Arial";

    ctx.fillText(
      oldPrice + " ₺",
      config.oldPrice.x,
      config.oldPrice.y
    );

    // Üzeri çizgi

    const textWidth =
      ctx.measureText(oldPrice + " ₺").width;

    ctx.strokeStyle = "#E30613";

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(
      config.oldPrice.x,
      config.oldPrice.y - 10
    );

    ctx.lineTo(
      config.oldPrice.x + textWidth,
      config.oldPrice.y - 10
    );

    ctx.stroke();

    ctx.restore();
  }


  // -----------------------------------------------------
  // YENİ FİYAT
  // -----------------------------------------------------

  if (
    deal.new_price !== undefined &&
    deal.new_price !== null &&
    deal.new_price !== ""
  ) {

    const newPrice =
      Number(deal.new_price)
        .toLocaleString("tr-TR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

    ctx.save();

    ctx.fillStyle = "#FFFFFF";

    ctx.font =
      "900 100px Arial Black, Arial";

    ctx.fillText(
      newPrice,
      config.newPrice.x,
      config.newPrice.y
    );

    const priceWidth =
      ctx.measureText(newPrice).width;

    ctx.font =
      "900 52px Arial Black, Arial";

    ctx.fillText(
      "₺",
      config.newPrice.x +
        priceWidth +
        15,
      config.newPrice.y - 8
    );

    ctx.restore();
  }


  // -----------------------------------------------------
  // İNDİRİM ORANI
  // -----------------------------------------------------

  if (
    deal.old_price &&
    deal.new_price
  ) {

    const oldPrice =
      Number(deal.old_price);

    const newPrice =
      Number(deal.new_price);

    if (
      oldPrice > 0 &&
      newPrice < oldPrice
    ) {

      const discount =
        Math.round(
          ((oldPrice - newPrice) /
            oldPrice) * 100
        );

      const cx = 875;
      const cy = 185;

      ctx.save();

      ctx.textAlign = "center";

      // Yüzde

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


  // -----------------------------------------------------
  // TARİH
  // -----------------------------------------------------

  if (deal.date_text) {

    ctx.save();

    ctx.fillStyle = "#FFFFFF";

    ctx.font =
      "700 24px Arial";

    ctx.fillText(
      String(deal.date_text),
      config.date.x,
      config.date.y
    );

    ctx.restore();
  }
}
