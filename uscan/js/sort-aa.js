"use strict";
var i;
var areas = ["package", "packageFeedsPackages", "packageFeedsRouting", "toolchain", "tools"];

for (i in areas) {
  if (areas.hasOwnProperty(i)) {
    if (areas[i] === "toolchain" ||
        areas[i] === "tools") {
      var TSort_Data = [areas[i] + "Table", "s", "s", "s", "s", "s", "s", "", "", "s", "s"];
    } else {
      var TSort_Data = [areas[i] + "Table", "s", "s", "s", "s", "s", "s", "s", "s", "", "", "s", "s"];
    }

    var TSort_Initial = ["0D"];
    tsRegister();
  }
}
