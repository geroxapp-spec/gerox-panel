import { loadImage } from "./utils.js";
import { renderTheme } from "./themeRenderer.js";

export async function renderPoster({ deal, business }) {

  const canvas = document.createElement("canvas");

  canvas.width = 1080;
  canvas.height = 1080;

  const ctx = canvas.getContext("2d");

  // =====================================================
  // ÜRÜN PNG
  // =====================================================

  let productImg = null;

  /*
   * Şimdilik sistemi test ediyoruz.
   *
   * Karpuz PNG'si kesin olarak buradan okunacak:
   *
   * /public/products/karpuz.png
   *
   * Tarayıcı tarafındaki gerçek adres:
   *
   * /products/karpuz.png
   */

  try {

    productImg = await loadImage(
      "/products/karpuz.png"
    );

    console.log(
      "GEROX: Karpuz PNG başarıyla yüklendi.",
      productImg
    );

  } catch (error) {

    console.error(
      "GEROX HATA: Karpuz PNG yüklenemedi.",
      error
    );

    productImg = null;
  }


  // =====================================================
  // MARKET LOGOSU
  // =====================================================

  let logoImg = null;

  if (business && business.logo_url) {

    try {

      logoImg = await loadImage(
        business.logo_url
      );

    } catch (error) {

      console.warn(
        "GEROX: Market logosu yüklenemedi.",
        error
      );

      logoImg = null;
    }
  }


  // =====================================================
  // PNG TABANLI AFİŞ RENDER
  // =====================================================

  await renderTheme({

    ctx: ctx,

    themeName: "premium",

    deal: deal,

    business: business,

    productImg: productImg,

    logoImg: logoImg

  });


  return canvas;
}
