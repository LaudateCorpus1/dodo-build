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
const build_1 = require("./build");
const dryrun = "false";
const dir = "";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const branch = core.getInput("branch", { required: false });
            const project = core.getInput("project", { required: true });
            const scalaVersion = core.getInput("scala-version", { required: true });
            const publishM2 = core.getInput("publish-m2", { required: false });
            const verbose = core.getInput("verbose", { required: false });
            console.log(`Running Dodo branch '${branch}', project '${project}', scalaVersion '${scalaVersion}'`);
            yield build_1.build(dryrun, dir, branch, project, scalaVersion, publishM2, verbose);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
