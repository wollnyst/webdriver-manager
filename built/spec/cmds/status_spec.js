"use strict";
const path = require("path");
const logger_1 = require("../../lib/cli/logger");
const update_1 = require("../../lib/cmds/update");
const config_1 = require("../../lib/config");
const utils_1 = require("../../lib/utils");
function getVersions(line) {
    return line.split(':')[3].split(',');
}
describe('status', () => {
    logger_1.Logger.writeTo = logger_1.WriteTo.NONE;
    let argv;
    let tmpDir = path.resolve('selenium_test');
    // chrome 2.20[last], 2.24
    // geckodriver {{config version}} [last] [default]
    // standalone 2.24 [last], {{config version}} [default]
    beforeAll((done) => {
        config_1.Config.osType_ = 'Linux';
        config_1.Config.osArch_ = 'x64';
        argv = {
            '_': ['update'],
            'versions': { 'chrome': '2.24', 'standalone': '2.44.0' },
            'out_dir': tmpDir
        };
        update_1.program.run(JSON.parse(JSON.stringify(argv)))
            .then(() => {
            argv['versions']['chrome'] = '2.20';
            update_1.program.run(JSON.parse(JSON.stringify(argv))).then(() => {
                done();
            });
        })
            .catch(err => {
            done.fail();
        });
    });
    it('should show the version number of the default and latest versions', () => {
        let lines = utils_1.spawnSync(process.execPath, ['built/lib/webdriver.js', 'status', '--out_dir', 'selenium_test'], 'pipe')
            .output[1]
            .toString()
            .split('\n');
        let seleniumLine = null;
        let chromeLine = null;
        let geckodriverLine = null;
        let androidSdkLine = null;
        let appiumLine = null;
        for (let line of lines) {
            if (line.indexOf('selenium') >= 0) {
                seleniumLine = line;
            }
            else if (line.indexOf('chrome') >= 0) {
                chromeLine = line;
            }
            else if (line.indexOf('geckodriver') >= 0) {
                geckodriverLine = line;
            }
            else if (line.indexOf('android-sdk') >= 0) {
                androidSdkLine = line;
            }
            else if (line.indexOf('appium') >= 0) {
                appiumLine = line;
            }
        }
        expect(seleniumLine).not.toBeNull();
        expect(seleniumLine).not.toContain('[default]');
        expect(getVersions(seleniumLine).length).toEqual(1);
        expect(getVersions(seleniumLine)[0]).toContain('2.44.0 [last]');
        expect(chromeLine).not.toBeNull();
        expect(chromeLine).not.toContain('[default]');
        expect(getVersions(chromeLine).length).toEqual(2);
        expect(getVersions(chromeLine)[0]).toContain('2.20 [last]');
        expect(getVersions(chromeLine)[1]).toContain('2.24');
        expect(geckodriverLine).not.toBeNull();
        expect(geckodriverLine).toContain('[default]');
        expect(geckodriverLine).toContain('[last]');
        expect(getVersions(geckodriverLine).length).toEqual(1);
        expect(androidSdkLine).not.toBeNull();
        expect(androidSdkLine).toContain('not present');
        expect(appiumLine).not.toBeNull();
        expect(appiumLine).toContain('not present');
    });
});
//# sourceMappingURL=status_spec.js.map