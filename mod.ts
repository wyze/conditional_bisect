import { readJson, writeJson } from "https://deno.land/std@v0.40.0/fs/mod.ts";

async function run() {
  const config = (await readJson("./bsconfig.json")) as Record<string, any>;

  await writeJson(
    "./bsconfig.json",
    {
      ...config,
      "bs-dependencies": [...(config["bs-dependencies"] ?? []), "bisect_ppx"],
      "ppx-flags": [...(config["ppx-flags"] ?? []), "bisect_ppx/ppx"],
    },
    { spaces: 2 },
  );
}

run();
