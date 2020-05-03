import { build } from "../src/build";

test("build: branch=develop,project=fintara,scala-version=2.12.8,verbose=true", async () => {
  await build("true", "/tmp", "develop", "finatra", "2.12.8", "false", "true");
});

test("build: branch=develop,project=finatra,scala-version=all,verbose=true", async () => {
  await build("true", "/tmp", "develop", "finatra", "all", "false", "true");
});

test("build: branch=develop,project=fintara,scala-version=all,verbose=false", async () => {
  await build("true", "/tmp", "develop", "finatra", "all", "false", "false");
});

test("build: branch=master,project=fintara,scala-version=2.12.8,verbose=true", async () => {
  await build("true", "/tmp", "master", "finatra", "2.12.8", "false", "true");
});

test("build: branch=master,project=finatra,scala-version=all,verbose=true", async () => {
  await build("true", "/tmp", "master", "finatra", "all", "false", "true");
});

test("build: branch=master,project=fintara,scala-version=all,verbose=false", async () => {
  await build("true", "/tmp", "master", "finatra", "all", "false", "false");
});

test("build: branch=develop,project=all,scala-version=2.12.8,verbose=true", async () => {
  await build("true", "/tmp", "develop", "all", "2.12.8", "false", "true");
});

test("build: branch=develop,project=all,scala-version=all,verbose=true", async () => {
  await build("true", "/tmp", "develop", "all", "all", "false", "true");
});

test("build: branch=develop,project=all,scala-version=all,verbose=false", async () => {
  await build("true", "/tmp", "develop", "all", "all", "false", "false");
});

test("build: branch=master,project=all,scala-version=2.12.8,verbose=true", async () => {
  await build("true", "/tmp", "master", "all", "2.12.8", "false", "true");
});

test("build: branch=master,project=all,scala-version=all,verbose=true", async () => {
  await build("true", "/tmp", "master", "all", "all", "false", "true");
});

test("build: branch=master,project=all,scala-version=all,verbose=false", async () => {
  await build("true", "/tmp", "master", "all", "all", "false", "false");
});



