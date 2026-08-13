import { loadImage } from "./utils.js";
import { renderTheme } from "./themeRenderer.js";

export async function renderPoster({ deal, business }) {

  const canvas = document.createElement("canvas");

  canvas.width = 1080;
  canvas.height = 1080;

  const ctx = canvas.getContext("2d");

  // =====================================================
  // ÜRÜN PNG'SİNİ BUL
  // =====================================================

  let productImg = null;

  function createFileName(title) {

    return String(title || "")
      .toLocaleLowerCase("tr-TR")
      .replace(/\([^)]*\)/g, "")
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ş/g, "s")
      .replace(/ü/g, "u")
      .replace(/\s+/g, "_")
      .trim() + ".png";
  }

  const fileName = createFileName(deal.title);

  /*
   * ÖNEMLİ:
   *
   * Ürünler artık:
   *
   * /public/products/
   *
   * klasöründen okunuyor.
   */

  const localPath = `/products/${fileName}`;

  try {

    productImg = await loadImage(localPath);

  } catch (error) {

    console.error(
      "Ürün PNG bulunamadı:",
      localPath
    );

    /*
     * ARTIK internetten ürün fotoğrafı çekmiyoruz.
     *
     * Photoshop'ta hazırladığımız PNG kullanılacak.
     */

    productImg = null;
  }


  // =====================================================
  // MARKET LOGOSU
  // =====================================================

  let logoImg = null;

  if (business?.logo_url) {

    try {

      logoImg = new Image();

      logoImg.crossOrigin = "anonymous";

      logoImg.src = business.logo_url;

      await new Promise((resolve, reject) => {

        logoImg.onload = resolve;

        logoImg.onerror = reject;

      });

    } catch (error) {

      console.warn(
        "Market logosu yüklenemedi."
      );

      logoImg = null;
    }
  }


  // =====================================================
  // PNG TABANLI TEMA
  // =====================================================

  await renderTheme({

    ctx,

    themeName: "premium",

    deal,

    business,

    productImg,

    logoImg

  });


  return canvas;
}
