"use strict";
const rimraf = require("rimraf");
const config_1 = require("../config");
const binary_1 = require("./binary");
/**
 * The appium binary.
 */
class Appium extends binary_1.Binary {
    constructor(alternateCDN) {
        super(alternateCDN || config_1.Config.cdnUrls().appium);
        this.name = 'appium';
        this.versionCustom = Appium.versionDefault;
        this.prefixDefault = 'appium-';
        this.suffixDefault = '';
    }
    id() {
        return Appium.id;
    }
    versionDefault() {
        return Appium.versionDefault;
    }
    executableSuffix() {
        return '';
    }
    remove(sdkPath) {
        rimraf.sync(sdkPath);
    }
}
Appium.os = [binary_1.OS.Windows_NT, binary_1.OS.Linux, binary_1.OS.Darwin];
Appium.id = 'appium';
Appium.versionDefault = config_1.Config.binaryVersions().appium;
Appium.isDefault = false;
Appium.shortName = ['appium'];
exports.Appium = Appium;
//# sourceMappingURL=appium.js.map