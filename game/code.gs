function doGet(e) {
  var faviconUrl = 'https://codehs.com/uploads/a736b49fbbf896473042eb4528755ff3';
  
  var page = e.parameter.page;
  if (page) {
    try {
      return HtmlService.createTemplateFromFile(page)
        .evaluate()
        .setTitle('BRICK BREAKER - ' + page.toUpperCase())
        .setFaviconUrl(faviconUrl)
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    } catch (err) {
      return HtmlService.createHtmlOutput('<h3>Error: File "' + page + '.html" was not found in this Apps Script.</h3><p><a href="' + getScriptUrl() + '" target="_top">Return to Home</a></p>')
        .setTitle('File Not Found');
    }
  }
  
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('BRICK BREAKER')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}

function getScriptUrl() {
  return ScriptApp.getService().getUrl();
}
