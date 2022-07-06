const unparse = require("papaparse").unparse;
const Blob = require('buffer').Blob;

const exportcsv = (headers, items = sampledata, fileTitle) => {

    fileTitle = fileTitle ?? 'download';
    
    let csvHeader = unparse({
      fields: [...headers.map(item => item.name)],
      data: [],
    })

    let csvVal = unparse(items, {
      header: false,
      columns: [...headers.map(item => item.key)]
    })

    let csv = csvHeader + csvVal
    
    var exportedFilename = fileTitle + '.csv' || 'download.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    // if (global.navigator.msSaveBlob) { // IE 10+
    //     global.navigator.msSaveBlob(blob, exportedFilename);
    // } else {
    // }
    let link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
  }


  module.exports = exportcsv;