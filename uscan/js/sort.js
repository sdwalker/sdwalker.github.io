"use strict";
var i;
var areas = ["packageBoot", "packageDevel", "packageFirmware", "packageKernel",
             "packageKernelLantiq", "packageLibs", "packageNetworkConfig",
             "packageNetworkIpv6", "packageNetworkServices",
             "packageNetworkUtils", "packageSystem", "packageUtils",
             "packageFeedsDesktop", "packageFeedsEfl", "packageFeedsLxde",
             "packageFeedsManagement", "packageFeedsOldpackages",
             "packageFeedsPackages", "packageFeedsPhone", "packageFeedsRouting",
             "packageFeedsTelephony", "packageFeedsXfce", "packageFeedsXorg",
             "toolchain", "tools"];

for (i in areas) {
  if (areas.hasOwnProperty(i)) {
    if (areas[i] === "packageFeedsEfl" ||
        areas[i] === "packageFeedsPhone" ||
        areas[i] === "packageKernelLantiq" ||
        areas[i] === "packageNetworkUtils") {
      var TSort_Data = [areas[i] + "Table", "s", "s", "s", "s", "s", "s", "s", "", "", "s", "s"];
    } else if (areas[i] === "packageFeedsLxde" ||
               areas[i] === "packageFeedsXfce" ||
               areas[i] === "toolchain" ||
               areas[i] === "tools") {
      var TSort_Data = [areas[i] + "Table", "s", "s", "s", "s", "s", "s", "", "", "s", "s"];
    } else {
      var TSort_Data = [areas[i] + "Table", "s", "s", "s", "s", "s", "s", "s", "s", "", "", "s", "s"];
    }

    var TSort_Initial = ["0D"];
    tsRegister();
  }
}
