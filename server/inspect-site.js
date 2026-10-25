async function main() {
  const jsRes = await fetch('https://taklifnomaa.pages.dev/assets/index-JlYYWdr6.js');
  const jsText = await jsRes.text();
  const assets = jsText.match(/\/assets\/[a-zA-Z0-9_\-\.]+\.(?:png|jpg|jpeg|webp|svg|mp3)/g);
  console.log("JS ASSETS:", [...new Set(assets)]);

  const cssRes = await fetch('https://taklifnomaa.pages.dev/assets/index-BGTxhFmp.css');
  const cssText = await cssRes.text();
  const cssAssets = cssText.match(/url\(['"]?([^'"\)]+)['"]?\)/g);
  console.log("CSS ASSETS:", [...new Set(cssAssets)]);
}
main();
