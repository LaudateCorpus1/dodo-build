import * as core from '@actions/core'
import { build } from "./build";

async function run(): Promise<void> {
    try {
        const branch = core.getInput("branch", { required: false });
        const project = core.getInput("project", { required: true });
        const scalaVersion = core.getInput("scala-version", { required: true });
        const publishM2 = core.getInput("publish-m2", { required: false });
        const verbose = core.getInput("verbose", { required: false });
        console.log(`Running Dodo branch '${branch}', project '${project}', scalaVersion '${scalaVersion}'`);
        await build("", branch, project, scalaVersion, publishM2, "false", verbose);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()
