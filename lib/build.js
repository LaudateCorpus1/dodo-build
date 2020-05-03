"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const shell = __importStar(require("shelljs"));
const path = __importStar(require("path"));
const homedir = require("os").homedir();
const dodoUrl = `https://raw.githubusercontent.com/twitter/dodo/develop/bin/build`;
function build(dryrun, dir, branch, project, scalaVersion, publishM2, verbose) {
    return __awaiter(this, void 0, void 0, function* () {
        setEnvironmentVariableCI();
        installAndRunDodo(dryrun, dir, branch, project, scalaVersion, publishM2, verbose);
    });
}
exports.build = build;
function setEnvironmentVariableCI() {
    core.exportVariable("CI", "true");
}
function installAndRunDodo(dryrun, dir, branch, project, scalaVersion, publishM2, verbose) {
    var bin = path.join(homedir, "bin");
    if (dir != "") {
        bin = path.join(dir, "bin");
    }
    core.startGroup("Install Dodo");
    core.addPath(bin);
    var _project = project;
    if (project === "all") {
        _project = "--all";
    }
    var _scalaVersion = "";
    if (scalaVersion != "all") {
        _scalaVersion = " --scala-version " + scalaVersion;
    }
    var _publishM2 = "";
    if (publishM2 === "true") {
        _publishM2 = " --publish-m2";
    }
    var _verbose = "";
    if (verbose === "true") {
        _verbose = " --verbose";
    }
    var _dryrun = "";
    if (dryrun === "true") {
        _dryrun = " --dry-run";
    }
    const exists = shell.ls(bin);
    if (exists.code > 0) {
        shell.mkdir(bin);
    }
    const dodo = path.join(bin, "dodo");
    shell.set("-ev");
    shell.exec(`curl -sL -o ${dodo} ${dodoUrl}`, { silent: true });
    shell.chmod(755, dodo);
    console.log(`Running Dodo`);
    const result = shell.exec(`${dodo} --no-test${_scalaVersion}${_publishM2}${_dryrun}${_verbose} ${_project}`);
    if (result.code > 0) {
        core.setFailed(`Failed to run Dodo: ${result.stderr}`);
        return;
    }
    core.endGroup();
}
function curl(url, outputFile) {
    shell.exec(`curl -sL ${url}`, { silent: true }).to(outputFile);
    shell.chmod(755, outputFile);
    shell.cat(outputFile);
    console.log(`Downloaded '${path.basename(outputFile)}' to ${outputFile}`);
}
