"use strict";
const binaries_1 = require("../../lib/binaries");
const gecko_driver_1 = require("../../lib/binaries/gecko_driver");
const config_1 = require("../../lib/config");
const files_1 = require("../../lib/files");
describe('file manager', () => {
    describe('setting up for windows', () => {
        let osType = 'Windows_NT';
        it('should find correct binaries', () => {
            expect(files_1.FileManager.checkOS_(osType, binaries_1.ChromeDriver)).toBe(true);
            expect(files_1.FileManager.checkOS_(osType, binaries_1.IEDriver)).toBe(true);
            expect(files_1.FileManager.checkOS_(osType, binaries_1.StandAlone)).toBe(true);
            expect(files_1.FileManager.checkOS_(osType, binaries_1.AndroidSDK)).toBe(true);
            expect(files_1.FileManager.checkOS_(osType, binaries_1.Appium)).toBe(true);
        });
        it('should return the binary array', () => {
            let binaries = files_1.FileManager.compileBinaries_(osType);
            expect(binaries[binaries_1.StandAlone.id].name).toBe((new binaries_1.StandAlone()).name);
            expect(binaries[binaries_1.ChromeDriver.id].name).toBe((new binaries_1.ChromeDriver()).name);
            expect(binaries[binaries_1.IEDriver.id].name).toBe((new binaries_1.IEDriver()).name);
            expect(binaries[binaries_1.AndroidSDK.id].name).toBe((new binaries_1.AndroidSDK()).name);
            expect(binaries[binaries_1.Appium.id].name).toBe((new binaries_1.Appium()).name);
        });
    });
    describe('setting up for linux', () => {
        let osType = 'Linux';
        it('should find correct binaries', () => {
            expect(files_1.FileManager.checkOS_(osType, binaries_1.ChromeDriver)).toBe(true);
            expect(files_1.FileManager.checkOS_(osType, binaries_1.IEDriver)).toBe(false);
            expect(files_1.FileManager.checkOS_(osType, binaries_1.StandAlone)).toBe(true);
            expect(files_1.FileManager.checkOS_(osType, binaries_1.AndroidSDK)).toBe(true);
            expect(files_1.FileManager.checkOS_(osType, binaries_1.Appium)).toBe(true);
        });
        it('should return the binary array', () => {
            let binaries = files_1.FileManager.compileBinaries_(osType);
            expect(binaries[binaries_1.StandAlone.id].name).toBe((new binaries_1.StandAlone()).name);
            expect(binaries[binaries_1.ChromeDriver.id].name).toBe((new binaries_1.ChromeDriver()).name);
            expect(binaries[binaries_1.AndroidSDK.id].name).toBe((new binaries_1.AndroidSDK()).name);
            expect(binaries[binaries_1.Appium.id].name).toBe((new binaries_1.Appium()).name);
            expect(binaries[binaries_1.IEDriver.id]).toBeUndefined();
        });
    });
    describe('setting up for mac', () => {
        let osType = 'Darwin';
        it('should find correct binaries', () => {
            expect(files_1.FileManager.checkOS_(osType, binaries_1.ChromeDriver)).toBe(true);
            expect(files_1.FileManager.checkOS_(osType, binaries_1.IEDriver)).toBe(false);
            expect(files_1.FileManager.checkOS_(osType, binaries_1.StandAlone)).toBe(true);
            expect(files_1.FileManager.checkOS_(osType, binaries_1.AndroidSDK)).toBe(true);
            expect(files_1.FileManager.checkOS_(osType, binaries_1.Appium)).toBe(true);
        });
        it('should return the binary array', () => {
            let binaries = files_1.FileManager.compileBinaries_(osType);
            expect(binaries[binaries_1.StandAlone.id].name).toBe((new binaries_1.StandAlone()).name);
            expect(binaries[binaries_1.ChromeDriver.id].name).toBe((new binaries_1.ChromeDriver()).name);
            expect(binaries[binaries_1.IEDriver.id]).toBeUndefined();
            expect(binaries[binaries_1.AndroidSDK.id].name).toBe((new binaries_1.AndroidSDK()).name);
            expect(binaries[binaries_1.Appium.id].name).toBe((new binaries_1.Appium()).name);
        });
    });
    describe('downloaded version checks', () => {
        let existingFiles;
        let selenium = new binaries_1.StandAlone();
        let chrome = new binaries_1.ChromeDriver();
        let android = new binaries_1.AndroidSDK();
        let appium = new binaries_1.Appium();
        let ie = new binaries_1.IEDriver();
        let ostype;
        let arch;
        function setup(osType) {
            ostype = osType;
            arch = 'x64';
            existingFiles = [
                selenium.prefix() + '2.51.0' + selenium.executableSuffix(),
                selenium.prefix() + '2.52.0' + selenium.executableSuffix()
            ];
            existingFiles.push(chrome.prefix() + '2.20' + chrome.suffix(ostype, arch));
            existingFiles.push(chrome.prefix() + '2.20' + chrome.executableSuffix(ostype));
            existingFiles.push(chrome.prefix() + '2.21' + chrome.suffix(ostype, arch));
            existingFiles.push(chrome.prefix() + '2.21' + chrome.executableSuffix(ostype));
            existingFiles.push(android.prefix() + '24.1.0' + android.suffix(ostype));
            existingFiles.push(android.prefix() + '24.1.0' + android.executableSuffix());
            existingFiles.push(android.prefix() + '24.1.1' + android.suffix(ostype));
            existingFiles.push(android.prefix() + '24.1.1' + android.executableSuffix());
            existingFiles.push(appium.prefix() + '1.6.0' + appium.suffix(ostype));
            if (ostype == 'Windows_NT') {
                existingFiles.push(ie.prefix() + '_Win32_2.51.0' + ie.suffix());
                existingFiles.push(ie.prefix() + '_Win32_2.51.0' + ie.executableSuffix(ostype));
                existingFiles.push(ie.prefix() + '_x64_2.51.0' + ie.suffix());
                existingFiles.push(ie.prefix() + '_x64_2.51.0' + ie.executableSuffix(ostype));
                existingFiles.push(ie.prefix() + '_Win32_2.52.0' + ie.suffix());
                existingFiles.push(ie.prefix() + '_Win32_2.52.0' + ie.executableSuffix(ostype));
                existingFiles.push(ie.prefix() + '_x64_2.52.0' + ie.suffix());
                existingFiles.push(ie.prefix() + '_x64_2.52.0' + ie.executableSuffix(ostype));
            }
        }
        describe('versions for selenium', () => {
            it('should find the correct version for windows', () => {
                setup('Windows_NT');
                let downloaded = files_1.FileManager.downloadedVersions_(selenium, ostype, arch, existingFiles);
                expect(downloaded.versions.length).toBe(2);
                expect(downloaded.versions[0]).toBe('2.51.0');
                expect(downloaded.versions[1]).toBe('2.52.0');
            });
            it('should find the correct version for mac', () => {
                setup('Darwin');
                let downloaded = files_1.FileManager.downloadedVersions_(selenium, ostype, arch, existingFiles);
                expect(downloaded.versions.length).toBe(2);
                expect(downloaded.versions[0]).toBe('2.51.0');
                expect(downloaded.versions[1]).toBe('2.52.0');
            });
            it('should find the correct version for mac', () => {
                setup('Linux');
                let downloaded = files_1.FileManager.downloadedVersions_(selenium, ostype, arch, existingFiles);
                expect(downloaded.versions.length).toBe(2);
                expect(downloaded.versions[0]).toBe('2.51.0');
                expect(downloaded.versions[1]).toBe('2.52.0');
            });
        });
        describe('versions for chrome', () => {
            it('should find the correct version for windows', () => {
                setup('Windows_NT');
                let downloaded = files_1.FileManager.downloadedVersions_(chrome, ostype, arch, existingFiles);
                expect(downloaded.versions.length).toBe(2);
                expect(downloaded.versions[0]).toBe('2.20');
                expect(downloaded.versions[1]).toBe('2.21');
            });
            it('should find the correct version for mac', () => {
                setup('Darwin');
                let downloaded = files_1.FileManager.downloadedVersions_(chrome, ostype, arch, existingFiles);
                expect(downloaded.versions.length).toBe(2);
                expect(downloaded.versions[0]).toBe('2.20');
                expect(downloaded.versions[1]).toBe('2.21');
            });
            it('should find the correct version for linux', () => {
                setup('Linux');
                let downloaded = files_1.FileManager.downloadedVersions_(chrome, ostype, arch, existingFiles);
                expect(downloaded.versions.length).toBe(2);
                expect(downloaded.versions[0]).toBe('2.20');
                expect(downloaded.versions[1]).toBe('2.21');
            });
        });
        describe('versions for android', () => {
            it('should find the correct version for windows', () => {
                setup('Windows_NT');
                let downloaded = files_1.FileManager.downloadedVersions_(android, ostype, arch, existingFiles);
                expect(downloaded.versions.length).toBe(2);
                expect(downloaded.versions[0]).toBe('24.1.0');
                expect(downloaded.versions[1]).toBe('24.1.1');
            });
            it('should find the correct version for mac', () => {
                setup('Darwin');
                let downloaded = files_1.FileManager.downloadedVersions_(android, ostype, arch, existingFiles);
                expect(downloaded.versions.length).toBe(2);
                expect(downloaded.versions[0]).toBe('24.1.0');
                expect(downloaded.versions[1]).toBe('24.1.1');
            });
            it('should find the correct version for linux', () => {
                setup('Linux');
                let downloaded = files_1.FileManager.downloadedVersions_(android, ostype, arch, existingFiles);
                expect(downloaded.versions.length).toBe(2);
                expect(downloaded.versions[0]).toBe('24.1.0');
                expect(downloaded.versions[1]).toBe('24.1.1');
            });
        });
        describe('versions for appium', () => {
            it('should find the correct version for windows', () => {
                setup('Windows_NT');
                let downloaded = files_1.FileManager.downloadedVersions_(appium, ostype, arch, existingFiles);
                expect(downloaded.versions.length).toBe(1);
                expect(downloaded.versions[0]).toBe('1.6.0');
            });
            it('should find the correct version for mac', () => {
                setup('Darwin');
                let downloaded = files_1.FileManager.downloadedVersions_(appium, ostype, arch, existingFiles);
                expect(downloaded.versions.length).toBe(1);
                expect(downloaded.versions[0]).toBe('1.6.0');
            });
            it('should find the correct version for linux', () => {
                setup('Linux');
                let downloaded = files_1.FileManager.downloadedVersions_(appium, ostype, arch, existingFiles);
                expect(downloaded.versions.length).toBe(1);
                expect(downloaded.versions[0]).toBe('1.6.0');
            });
        });
        describe('versions for ie on windows', () => {
            it('should find the correct version for windows', () => {
                setup('Windows_NT');
                let downloaded = files_1.FileManager.downloadedVersions_(ie, ostype, arch, existingFiles);
                expect(downloaded.versions.length).toBe(4);
                expect(downloaded.versions[0]).toBe('Win32_2.51.0');
                expect(downloaded.versions[1]).toBe('x64_2.51.0');
                expect(downloaded.versions[2]).toBe('Win32_2.52.0');
                expect(downloaded.versions[3]).toBe('x64_2.52.0');
            });
        });
    });
    describe('configuring the CDN location', () => {
        describe('when no custom CDN is specified', () => {
            let defaults = config_1.Config.cdnUrls();
            let binaries = files_1.FileManager.compileBinaries_('Windows_NT');
            it('should use the default configuration for Android SDK', () => {
                expect(binaries[binaries_1.AndroidSDK.id].cdn).toEqual(defaults[binaries_1.AndroidSDK.id]);
            });
            it('should use the default configuration for Appium', () => {
                expect(binaries[binaries_1.Appium.id].cdn).toEqual(defaults[binaries_1.Appium.id]);
            });
            it('should use the default configuration for Chrome Driver', () => {
                expect(binaries[binaries_1.ChromeDriver.id].cdn).toEqual(defaults[binaries_1.ChromeDriver.id]);
            });
            it('should use the default configuration for Gecko Driver', () => {
                expect(binaries[gecko_driver_1.GeckoDriver.id].cdn).toEqual(defaults[gecko_driver_1.GeckoDriver.id]);
            });
            it('should use the default configuration for IE Driver', () => {
                expect(binaries[binaries_1.IEDriver.id].cdn).toEqual(defaults[binaries_1.IEDriver.id]);
            });
            it('should use the default configuration for Selenium Standalone', () => {
                expect(binaries[binaries_1.StandAlone.id].cdn).toEqual(defaults['selenium']);
            });
        });
        describe('when custom CDN is specified', () => {
            it('should configure the CDN for each binary', () => {
                let customCDN = 'https://my.corporate.cdn/';
                let binaries = files_1.FileManager.compileBinaries_('Windows_NT', customCDN);
                forEachOf(binaries, binary => expect(binary.cdn).toEqual(customCDN, binary.name));
            });
        });
        function forEachOf(binaries, fn) {
            for (var key in binaries) {
                fn(binaries[key]);
            }
        }
    });
    // TODO(cnishina): download binaries for each os type / arch combination
});
//# sourceMappingURL=fileManager_spec.js.map