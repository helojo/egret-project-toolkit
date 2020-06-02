import { projectData, Target_Type } from './data';

export namespace manager {

    export function copyToLibs() {
        // let moduleDir = projectData.getLibraryFolder();
        // FileUtil.remove(moduleDir);
        // projectData.getModulesConfig("web").forEach(m => {
        //     FileUtil.copy(m.sourceDir, projectData.getFilePath(m.targetDir));
        // })
    }
    export function generateManifest(gameFileList: string[], options: { debug: boolean, platform: "web" | "native" }): { initial: string[], game: string[] }
    export function generateManifest(gameFileList: string[], options: { debug: boolean, platform: "web" | "native" }, manifestPath?: string): void
    export function generateManifest(gameFileList: string[], options: { debug: boolean, platform: "web" | "native" }, manifestPath?: string) {
        let initial: string[] = [];
        let game: string[] = [];
        projectData.getModulesConfig(options.platform).forEach(m => {
            m.target.forEach(m => {
                initial.push(options.debug ? m.debug : m.release);
            });
        });
        if (options.debug) {
            gameFileList.forEach(m => {
                game.push("bin-debug/" + m);
            });
        }
        else {
            game.push("main.min.js");
        }

        let manifest = { initial, game };
        if (manifestPath) {
            // FileUtil.save(manifestPath, JSON.stringify(manifest, undefined, "\t"));
        }
        else {
            return manifest;
        }

    }

    export function copyLibsForPublish(target: Target_Type, mode: "debug" | "release" = 'debug'): string[] {
        const result: string[] = [];
        projectData.getModulesConfig(target).forEach(m => {
            m.target.forEach(m => {
                const filename = mode == 'debug' ? m.debug : m.release;
                result.push(filename);
            });
        });
        // if (projectData.isWasmProject()) {
        //     let arr = [
        //         "egret.asm.js",
        //         "egret.asm.js.mem",
        //         "egret.webassembly.js",
        //         "egret.webassembly.wasm"
        //     ];
        //     arr.forEach(function (item) {
        //         result.push(FileUtil.joinPath("libs", item));
        //     });
        // }
        return result;
    }

    export function copyManifestForNative(toPath: string): void {
        // let options = egret.args;
        // let manifest = JSON.parse(FileUtil.read(FileUtil.joinPath(options.projectDir, "manifest.json")));
        // let fileLength = manifest.initial.length;
        // for (let i = 0; i < fileLength; i++) {
        //     if (manifest.initial[i].indexOf(".web.") != -1) {
        //         manifest.initial[i] = manifest.initial[i].replace(".web.", ".native.");
        //     }
        // }
        // FileUtil.save(toPath, JSON.stringify(manifest));
    }

    export function modifyIndex(manifestPath: string, indexPath: string) {
        // if (!projectData.useTemplate) {
        //     let manifest = JSON.parse(FileUtil.read(manifestPath, true));
        //     let libs = manifest.initial;
        //     var libsScriptsStr = "";
        //     libs.forEach(m => {
        //         libsScriptsStr += getScript("lib", m);
        //     });
        //     let game = manifest.game;
        //     var gameStr = "";
        //     game.forEach(m => {
        //         gameStr += getScript("lib", m);
        //     });
        //     var reg = /<!--(\s)*modules_files_start(\s)*-->[\s\S]*<!--(\s)*modules_files_end(\s)*-->/;
        //     var replaceStr = '<!--modules_files_start-->\n' + libsScriptsStr + '\t<!--modules_files_end-->';
        //     var htmlContent = FileUtil.read(indexPath, true);
        //     htmlContent = htmlContent.replace(reg, replaceStr);
        //     var reg = /<!--(\s)*game_files_start(\s)*-->[\s\S]*<!--(\s)*game_files_end(\s)*-->/;
        //     var replaceStr = '<!--game_files_start-->\n' + gameStr + '\t<!--game_files_end-->';
        //     htmlContent = htmlContent.replace(reg, replaceStr);
        //     var reg = /<!--(\s)*other_libs_files_start(\s)*-->[\s\S]*<!--(\s)*other_libs_files_end(\s)*-->/;
        //     var replaceStr = '';
        //     htmlContent = htmlContent.replace(reg, replaceStr);
        //     FileUtil.save(indexPath, htmlContent);
        // }
    }

    function getScript(type: 'lib' | 'game', src: string) {
        switch (type) {
            case 'lib':
                return `\t<script egret="${type}" src="${src}"></script>\n`
                break;
            case 'game':
                return `\t<script egret="${type}" src="${src}"></script>\n`;
                break;
        }
    }
}