"use strict";
var i;
var areas = ["packageBoot", "packageDevel", "packageFirmware", "packageKernel",
             "packageKernelLantiq", "packageLibs", "packageNetworkConfig",
             "packageNetworkIpv6", "packageNetworkServices",
             "packageNetworkUtils", "packageSystem", "packageUtils",
             "packageFeedsPackages", "packageFeedsRouting",
             "packageFeedsTelephony", "toolchain", "tools"];

for (i in areas) {
  if (areas.hasOwnProperty(i)) {
    if (areas[i] === "packageDevel" ||
        areas[i] === "packageKernelLantiq") {
      var TSort_Data = [areas[i] + "Table", "s", "s", "s", "s", "s", "s", "s", "", "", "s", "s"];
    } else if (areas[i] === "toolchain") {
      var TSort_Data = [areas[i] + "Table", "s", "s", "s", "s", "s", "", "", "s", "s"];
    } else if (areas[i] === "tools") {
      var TSort_Data = [areas[i] + "Table", "s", "s", "s", "s", "s", "s", "", "", "s", "s"];
    } else {
      var TSort_Data = [areas[i] + "Table", "s", "s", "s", "s", "s", "s", "s", "s", "", "", "s", "s"];
    }

    var TSort_Initial = ["0D"];
    tsRegister();
  }
}
