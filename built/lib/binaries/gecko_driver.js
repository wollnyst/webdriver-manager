"use strict";
const semver = require("semver");
const config_1 = require("../config");
const binary_1 = require("./binary");
/**
 * The gecko driver binary.
 */
class GeckoDriver extends binary_1.Binary {
    constructor(alternateCDN) {
        super(alternateCDN || config_1.Config.cdnUrls().gecko);
        this.name = 'geckodriver';
        this.versionCustom = GeckoDriver.versionDefault;
        this.prefixDefault = 'geckodriver-';
    }
    id() {
        return GeckoDriver.id;
    }
    versionDefault() {
        return GeckoDriver.versionDefault;
    }
    suffix(ostype, arch) {
        if (!GeckoDriver.suffixes[ostype][arch]) {
            throw new Error('GeckoDriver doesn\'t support ${ostype} ${arch}!');
        }
        let version = this.version();
        // No 32-bit builds before 0.10.0
        if (semver.lte(version, '0.10.0')) {
            if (arch === 'x64') {
                throw new Error('GeckoDriver doesn\'t support ${ostype} ${arch}!');
            }
        }
        // Special case old versions on Mac for the name change.
        if (semver.lte(version, '0.9.0')) {
            if (ostype === 'Darwin') {
                return '-mac.tar.gz';
            }
        }
        return GeckoDriver.suffixes[ostype][arch];
    }
    static supports(ostype, arch) {
        return !!GeckoDriver.suffixes[ostype][arch];
    }
    url(ostype, arch) {
        let urlBase = this.cdn + this.version() + '/';
        let filename = this.prefix() + this.version() + this.suffix(ostype, arch);
        return urlBase + filename;
    }
}
GeckoDriver.os = [binary_1.OS.Windows_NT, binary_1.OS.Linux, binary_1.OS.Darwin];
GeckoDriver.id = 'gecko';
GeckoDriver.versionDefault = config_1.Config.binaryVersions().gecko;
GeckoDriver.isDefault = true;
GeckoDriver.shortName = ['gecko'];
GeckoDriver.suffixes = {
    'Darwin': { 'x64': '-macos.tar.gz' },
    'Linux': { 'x64': '-linux64.tar.gz', 'ia32': '-linux32.tar.gz' },
    'Windows_NT': {
        'x64': '-win64.zip',
        'ia32': '-win32.zip',
    }
};
exports.GeckoDriver = GeckoDriver;
//# sourceMappingURL=gecko_driver.js.map