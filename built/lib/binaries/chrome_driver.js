"use strict";
const semver = require("semver");
const config_1 = require("../config");
const binary_1 = require("./binary");
/**
 * The chrome driver binary.
 */
class ChromeDriver extends binary_1.Binary {
    constructor(alternateCDN) {
        super(alternateCDN || config_1.Config.cdnUrls().chrome);
        this.name = 'chromedriver';
        this.versionCustom = ChromeDriver.versionDefault;
        this.prefixDefault = 'chromedriver_';
        this.suffixDefault = '.zip';
    }
    id() {
        return ChromeDriver.id;
    }
    versionDefault() {
        return ChromeDriver.versionDefault;
    }
    suffix(ostype, arch) {
        if (ostype === 'Darwin') {
            let version = this.version();
            if (version.split('.').length === 2) {
                // we need to make the version valid semver since there is only a major and a minor
                version = `${version}.0`;
            }
            if (semver.gt(version, '2.23.0')) {
                // after chromedriver version 2.23, the name of the binary changed
                // They no longer provide a 32 bit binary
                return 'mac64' + this.suffixDefault;
            }
            else {
                return 'mac32' + this.suffixDefault;
            }
        }
        else if (ostype === 'Linux') {
            if (arch === 'x64') {
                return 'linux64' + this.suffixDefault;
            }
            else {
                return 'linux32' + this.suffixDefault;
            }
        }
        else if (ostype === 'Windows_NT') {
            return 'win32' + this.suffixDefault;
        }
    }
    url(ostype, arch) {
        let urlBase = this.cdn + this.version() + '/';
        let filename = this.prefix() + this.suffix(ostype, arch);
        return urlBase + filename;
    }
}
ChromeDriver.os = [binary_1.OS.Windows_NT, binary_1.OS.Linux, binary_1.OS.Darwin];
ChromeDriver.id = 'chrome';
ChromeDriver.versionDefault = config_1.Config.binaryVersions().chrome;
ChromeDriver.isDefault = true;
ChromeDriver.shortName = ['chrome'];
exports.ChromeDriver = ChromeDriver;
//# sourceMappingURL=chrome_driver.js.map