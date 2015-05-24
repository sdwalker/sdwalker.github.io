function rgb2Hex(rgb) {
  "use strict";
  var parts = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  var i;

  delete (parts[0]);
  for (i = 1; i <= 3; i += 1) {
    parts[i] = parseInt(parts[i], 10).toString(16);
    if (parts[i].length === 1) {
      parts[i] += "0";
    }
  }

  return parts.join("");
}

function generateCharts(areas) {
  "use strict";
  var bodyBackgroundColor = rgb2Hex(document.defaultView.
                                    getComputedStyle(document.body, null).
                                    getPropertyValue("background-color"));
  var table = document.getElementById(areas + "Table");
  var tHead = table.tHead;
  var tHeadCellsLength = tHead.rows[0].cells.length;
  var tBody = table.tBodies[0];
  var rowsLength = tBody.rows.length;
  if (rowsLength) {
    var i;
    var areasTitle = areas.replace(/([A-Z])/g, ",$1").split(",").pop().
                           toLowerCase();
    var statuses = ["current", "notCurrent", "variable", "notApplicable",
                    "indeterminable", "noWatchFile"];
    var statusesLength = statuses.length;
    var upstreamCellIndex = tBody.rows[0].getElementsByClassName("upstream")[0].
                            cellIndex;
    var statusChartValuesArray = [];
    var statusChartLabelsArray = [];
    var statusChartLegendArray = [];
    var statusChartColorsArray = [];
    var statusChartImgAltArray = [];

    for (i = 0; i < statusesLength; i += 1) {
      var status = tBody.getElementsByClassName(statuses[i]);
      var statusLength = status.length;
      if (statusLength) {
        var statusFloat = (statusLength / rowsLength * 100).toFixed(1);
        var statusPercent = "+(" + statusFloat + "%)";
        var statusTitle = encodeURIComponent(status[0].title.
                                             replace(/%20/g, "+").
                          split(";", 1));
        var statusBackgroundColor = rgb2Hex(document.defaultView.
                                            getComputedStyle(status[0].cells[upstreamCellIndex], null).
                                            getPropertyValue("color"));
        statusChartValuesArray.push(statusFloat);
        statusChartLabelsArray.push(statusLength + statusPercent);
        statusChartLegendArray.push(statusTitle);
        statusChartColorsArray.push(statusBackgroundColor);
        statusChartImgAltArray.push(statusTitle + ": " + statusLength +
                                    statusPercent);
      }
    }

    var chartBaseUrl = "https://chart.googleapis.com/chart?";
    var chartWidth = "600";
    var chartHeight = "240";
    var chartDimensions = "chs=" + chartWidth + "x" + chartHeight;
    var chartType = "&cht=p3";
    var chartBackground = "&chf=bg,s," + bodyBackgroundColor;

    var statusChartValues = "&chd=t:" + statusChartValuesArray;
    var statusChartLabels = "&chl=" +  statusChartLabelsArray.join("|");
    var statusChartTitle = "&chtt=Status+breakdown+for+the+" + rowsLength +
                           ((rowsLength === 1) ? "+package" : "+packages") +
                           "+in+" + areasTitle;
    var statusChartLegend = "&chdl=" + statusChartLegendArray.join("|");
    var statusChartColors = "&chco=" + statusChartColorsArray.join("|");

    var chartParams = chartDimensions + chartType + chartBackground +
                      statusChartValues + statusChartLabels + statusChartTitle +
                      statusChartLegend + statusChartColors;

    var p = document.createElement("p");
    var img = document.createElement("img");
    img.setAttribute("id", areas + "StatusChart");
    img.setAttribute("src", chartBaseUrl + chartParams);
    img.setAttribute("width", chartWidth);
    img.setAttribute("height", chartHeight);
    img.setAttribute("alt", statusChartTitle.substr(6).replace(/\+/g, " ") + " " +
                            statusChartImgAltArray.join(" ").replace(/%20/g, " ").
                                                   replace(/\+/g, " "));
    table.parentNode.appendChild(p);
    p.appendChild(img);

    var statusChartLink = document.getElementById(areas + "StatusChartLink");
    var statusChartLinkImg = img.cloneNode(true);
    statusChartLinkImg.removeAttribute("id");
    statusChartLink.appendChild(statusChartLinkImg);

    for (i = 0; i < tHeadCellsLength; i += 1) {
      var maintained = tBody.getElementsByClassName("maintainer");
      var maintainedLength = maintained.length;
      var maintainerChartTitle = "&chtt=Maintainer+breakdown+for+the+" +
                                 rowsLength +
                                 ((rowsLength === 1) ? "+package" : "+packages") +
                                 "+in+" + areasTitle;
      var maintainerChartLegend = "&chdl=";
      var maintainerChartColors = "&chco=";
      var maintainerChartValues = "&chd=t:";
      var maintainerChartLabels = "&chl=";
      var maintainerChartImgAlt;

      if (maintainedLength !== 0) {
        var maintainedFloat = (maintainedLength / rowsLength * 100).toFixed(1);
        var maintainedPercent = "+(" + maintainedFloat + "%)";
        maintainerChartLegend += "Maintained";
        maintainerChartColors += "00ff00";
        maintainerChartValues += maintainedFloat;
        maintainerChartLabels += maintainedLength +
                                 maintainedPercent;
        maintainerChartImgAlt += " Maintained: " + maintainedLength +
                                 maintainedPercent;
      }

      var unmaintainedLength = rowsLength - maintainedLength;
      if (unmaintainedLength !== 0) {
        var unmaintainedFloat = (unmaintainedLength / rowsLength * 100).toFixed(1);
        var unmaintainedPercent = "+(" + unmaintainedFloat + "%)";
        if (maintainedLength !== 0) {
          maintainerChartLegend += "|";
          maintainerChartColors += "|";
          maintainerChartValues += ",";
          maintainerChartLabels += "|";
        }
        maintainerChartLegend += "Unmaintained";
        maintainerChartColors += "ff0000";
        maintainerChartValues += unmaintainedFloat;
        maintainerChartLabels += unmaintainedLength +
                                 unmaintainedPercent;
        maintainerChartImgAlt += " Unmaintained: " + unmaintainedLength +
                                 unmaintainedPercent;
      }

      chartParams = chartDimensions + chartType + chartBackground +
                    maintainerChartValues + maintainerChartLabels +
                    maintainerChartTitle + maintainerChartLegend +
                    maintainerChartColors;

      var br = document.createElement("br");
      img = document.createElement("img");
      img.setAttribute("id", areas + "MaintainerChart");
      img.setAttribute("src", chartBaseUrl + chartParams);
      img.setAttribute("width", chartWidth);
      img.setAttribute("height", chartHeight);
      img.setAttribute("alt", maintainerChartTitle.substr(6).replace(/\+/g, " ").
                              replace(/%20/g, " ") +
                              maintainerChartImgAlt.replace(/\+/g, " "));
      var statusChart = document.getElementById(areas + "StatusChart");
      statusChart.parentNode.appendChild(br);
      statusChart.parentNode.appendChild(img);
      var maintainerChartLink = document.getElementById(areas + "MaintainerChartLink");
      var maintainerChartLinkImg = img.cloneNode(true);
      maintainerChartLinkImg.removeAttribute("id");
      maintainerChartLink.appendChild(maintainerChartLinkImg);
      break;
    }
  }
}

function init() {
  "use strict";
  var i;

  for (i in areas) {
    if (areas.hasOwnProperty(i)) {
      generateCharts(areas[i]);
    }
  }
}

if (window.addEventListener) {
  window.addEventListener("load", init, false);
}
