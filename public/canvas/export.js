import {renderPoster} from "./template.js";

function cleanFileName(name){
  return String(name||"kampanya")
    .replace(/[^a-zA-Z0-9ğüşöçıİĞÜŞÖÇ ]/g,"")
    .replace(/\s+/g,"-");
}

async function download({deal,business}){
  const canvas=await renderPoster({deal,business});

  const link=document.createElement("a");
  link.download=cleanFileName(deal.title)+".png";
  link.href=canvas.toDataURL("image/png");
  link.click();
}

window.GeroxPoster={
  download,
  renderPoster
};
