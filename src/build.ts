import * as core from '@actions/core'

import * as shell from "shelljs";
import * as path from "path";

const homedir = require("os").homedir();

export async function build(outputDirectory: string, branch: string, project: string, scalaVersion: string, publishM2: string, dryRun: string, verbose: string) {
    setEnvironmentVariableCI();
    installAndRunDodo(outputDirectory, branch, project, scalaVersion, publishM2, dryRun, verbose);
}

function setEnvironmentVariableCI() {
    core.exportVariable("CI", "true");
}

function installAndRunDodo(outputDirectory: string, branch: string, project: string, scalaVersion: string, publishM2: string, dryRun: string, verbose: string) {
    var bin = path.join(homedir, "bin");
    if (outputDirectory != "") {
        bin = path.join(outputDirectory, "bin")
    }

    core.startGroup("Install Dodo");
    core.addPath(bin);
    var _project = project;
    if (project === "all") {
        _project = "--all";
    }
    var _publishM2 = "";
    if (publishM2 === "true") {
        _publishM2 = " --publish-m2";
    }
    var _verbose = "";
    if (verbose === "true") {
        _verbose = " --verbose"
    }
    var _dryRun = "";
    if (dryRun === "true") {
        _dryRun = " --dry-run"
    }
    const dodoUrl = `https://raw.githubusercontent.com/twitter/dodo/develop/bin/build`;
    const exists = shell.ls(bin)
    if (exists.code > 0) {
        shell.mkdir(bin);
    }
    const dodo = path.join(bin, "dodo");
    shell.set("-ev");
    shell.exec(`curl -sL -o ${dodo} ${dodoUrl}`, { silent: true });
    shell.chmod(755, dodo);
    console.log(`Running Dodo`);
    const result = shell.exec(`${dodo} --no-test --scala-version ${scalaVersion}${_publishM2}${_dryRun}${_verbose} ${_project}`);
    if (result.code > 0) {
        core.setFailed(`Failed to run Dodo: ${result.stderr}`);
        return;
    }
    core.endGroup();
}

function curl(url: string, outputFile: string) {
    shell.exec(`curl -sL ${url}`, { silent: true }).to(outputFile);
    shell.chmod(755, outputFile);
    shell.cat(outputFile);
    console.log(`Downloaded '${path.basename(outputFile)}' to ${outputFile}`);
}