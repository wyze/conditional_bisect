import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std/testing/asserts.ts";
import { readJson, writeJson } from "https://deno.land/std/fs/mod.ts";

async function setup(contents: Record<string, any>) {
  const filename = "bsconfig.json";

  await assertThrowsAsync(
    async (): Promise<void> => {
      await writeJson(filename, contents);
      throw new Error("should write success");
    },
    Error,
    "should write success",
  );

  const p = Deno.run({
    cmd: [Deno.execPath(), "--allow-read", "--allow-write", "mod.ts"],
  });

  assertEquals(await p.status(), { code: 0, success: true });

  p.close();

  const json = await readJson(filename);

  await Deno.remove(filename);

  return json;
}

Deno.test("it works with an empty json file", async function () {
  const json = await setup({});

  assertEquals(json, {
    "bs-dependencies": ["bisect_ppx"],
    "ppx-flags": ["bisect_ppx/ppx"],
  });
});

Deno.test("it works with different keys", async function () {
  const json = await setup({ name: "some-fixture" });

  assertEquals(json, {
    "name": "some-fixture",
    "bs-dependencies": ["bisect_ppx"],
    "ppx-flags": ["bisect_ppx/ppx"],
  });
});

Deno.test("it works with existing bs-dependencies", async function () {
  const json = await setup({ "bs-dependencies": ["some-library"] });

  assertEquals(json, {
    "bs-dependencies": ["some-library", "bisect_ppx"],
    "ppx-flags": ["bisect_ppx/ppx"],
  });
});

Deno.test("it works with existing ppx-flags", async function () {
  const json = await setup({ "ppx-flags": ["some-library/ppx"] });

  assertEquals(json, {
    "bs-dependencies": ["bisect_ppx"],
    "ppx-flags": ["some-library/ppx", "bisect_ppx/ppx"],
  });
});
