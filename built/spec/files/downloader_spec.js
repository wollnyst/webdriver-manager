"use strict";
const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const config_1 = require("../../lib/config");
const files_1 = require("../../lib/files");
describe('downloader', () => {
    let fileUrlHttp = 'http://foobar.com';
    let fileUrlHttps = 'https://foobar.com';
    let argProxy = 'http://foobar.arg';
    let envNoProxy = 'http://foobar.com';
    let envHttpProxy = 'http://foobar.env';
    let envHttpsProxy = 'https://foobar.env';
    it('should return undefined when proxy arg is not used', () => {
        let proxy = files_1.Downloader.resolveProxy_(fileUrlHttp);
        expect(proxy).toBeUndefined();
    });
    describe('proxy arg', () => {
        let opt_proxy = 'http://bar.foo';
        it('should return the proxy arg', () => {
            let proxy = files_1.Downloader.resolveProxy_(fileUrlHttp, opt_proxy);
            expect(proxy).toBe(opt_proxy);
        });
        it('should always return the proxy arg with env var set', () => {
            config_1.Config.httpProxy_ = envHttpProxy;
            config_1.Config.httpsProxy_ = envHttpsProxy;
            config_1.Config.noProxy_ = envNoProxy;
            let proxy = files_1.Downloader.resolveProxy_(fileUrlHttp, opt_proxy);
            expect(proxy).toBe(opt_proxy);
        });
    });
    describe('environment variables', () => {
        beforeEach(() => {
            config_1.Config.httpProxy_ = undefined;
            config_1.Config.httpsProxy_ = undefined;
            config_1.Config.noProxy_ = undefined;
        });
        it('should return the HTTP env variable', () => {
            config_1.Config.httpProxy_ = envHttpProxy;
            let proxy = files_1.Downloader.resolveProxy_(fileUrlHttp);
            expect(proxy).toBe(envHttpProxy);
        });
        it('should return the HTTPS env variable for https protocol', () => {
            config_1.Config.httpProxy_ = envHttpsProxy;
            let proxy = files_1.Downloader.resolveProxy_(fileUrlHttps);
            expect(proxy).toBe(envHttpsProxy);
        });
        it('should return the HTTP env variable for https protocol', () => {
            config_1.Config.httpProxy_ = envHttpProxy;
            let proxy = files_1.Downloader.resolveProxy_(fileUrlHttps);
            expect(proxy).toBe(envHttpProxy);
        });
        describe('NO_PROXY environment variable', () => {
            beforeEach(() => {
                config_1.Config.noProxy_ = undefined;
            });
            it('should return undefined when the NO_PROXY matches the fileUrl', () => {
                config_1.Config.noProxy_ = envNoProxy;
                let proxy = files_1.Downloader.resolveProxy_(fileUrlHttp);
                expect(proxy).toBeUndefined();
            });
            it('should return undefined when the no_proxy matches the fileUrl', () => {
                config_1.Config.noProxy_ = envNoProxy;
                let proxy = files_1.Downloader.resolveProxy_(fileUrlHttp);
                expect(proxy).toBeUndefined();
            });
        });
    });
    describe('get file', () => {
        let fileUrl = 'https://selenium-release.storage.googleapis.com/3.0/selenium-server-standalone-3.0.0.jar';
        let fileName = 'foobar.jar';
        let outputDir = path.resolve('selenium_test');
        let actualContentLength = 22138949;
        let contentLength;
        beforeEach(() => {
            try {
                // if the folder does not exist, it will throw an error on statSync
                if (fs.statSync(outputDir).isDirectory()) {
                    rimraf.sync(outputDir);
                }
            }
            catch (err) {
            }
            fs.mkdirSync(outputDir);
        });
        it('should download a file with mismatch content length', (done) => {
            contentLength = 0;
            files_1.Downloader.getFile(null, fileUrl, fileName, outputDir, contentLength)
                .then(result => {
                expect(result).toBeTruthy();
                let file = path.resolve(outputDir, fileName);
                let stat = fs.statSync(file);
                expect(stat.size).toEqual(actualContentLength);
                rimraf.sync(file);
                done();
            })
                .catch(error => {
                console.log(error);
                done.fail();
            });
        });
        it('should not download a file if the content lengths match', (done) => {
            contentLength = actualContentLength;
            files_1.Downloader.getFile(null, fileUrl, fileName, outputDir, contentLength)
                .then(result => {
                expect(result).not.toBeTruthy();
                let file = path.resolve(outputDir, fileName);
                try {
                    let access = fs.accessSync(file);
                }
                catch (err) {
                    err.code === 'ENOENT';
                }
                done();
            })
                .catch(error => {
                console.log(error);
                done.fail();
            });
        });
    });
});
//# sourceMappingURL=downloader_spec.js.map