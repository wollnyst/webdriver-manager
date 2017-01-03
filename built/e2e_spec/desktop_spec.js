"use strict";
const os = require("os");
const webdriver = require("selenium-webdriver");
let browsers = require('./target_browsers')[os.type()];
describe('desktop browser smoke tests', () => {
    browsers.forEach((browserName) => {
        it('should be able to boot up ' + browserName, (done) => {
            let driver = new webdriver.Builder()
                .usingServer('http://localhost:4444/wd/hub')
                .withCapabilities({ browserName: browserName })
                .build();
            driver.get('http://localhost:4444/selenium-server/driver/?cmd=getLogMessages')
                .then(() => {
                return driver.getPageSource();
            })
                .then((source) => {
                expect(source).toContain('OK');
                return driver.quit();
            })
                .then(() => {
                done();
            });
        }, 60 * 1000);
    });
});
//# sourceMappingURL=desktop_spec.js.map