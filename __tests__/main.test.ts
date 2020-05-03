import { build } from "../src/build";

test("build project", async () => {
  await build("/tmp", "develop", "finatra", "2.12.8", "false", "true", "true");
});

test("build all", async () => {
  await build("/tmp", "develop", "all", "2.12.8", "false", "true", "true");
});

