import * as ddb from "@duckdb/duckdb-wasm";

(async () => {
  const useEh = await ddb.getPlatformFeatures().then((x) => x.wasmExceptions);

  // @ts-ignore
  if (!window.spr) window.spr = {};

  //@ts-ignore
  let manifest_url: string =
    // @ts-ignore
    window.spr?.manifest_url ??
    "https://f004.backblazeb2.com/file/sprocket-artifacts/public/pages/assets/manifest.json"; // TODO: swap to public

  let res: CallableFunction = () => {};
  // @ts-ignore
  window.spr.ready = new Promise((r) => (res = r));

  const DUCKDB_CONFIG = useEh
    ? {
        mainModule: (
          await import("@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url")
        ).default,
        mainWorker: (
          await import(
            "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?worker"
          )
        ).default,
      }
    : {
        mainModule: (
          await import("@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url")
        ).default,
        mainWorker: (
          await import(
            "@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?worker"
          )
        ).default,
      };

  const logger = new ddb.VoidLogger();
  const worker = new DUCKDB_CONFIG.mainWorker();

  const db = new ddb.AsyncDuckDB(logger, worker);
  await db.instantiate(DUCKDB_CONFIG.mainModule);
  const conn = await db.connect();

  const manifest = await fetch(manifest_url).then((r) => r.json());

  let i = 0;
  while (
    !Object.values(manifest).every((t) => typeof t === "string") &&
    i++ < 10000
  ) {
    for (const [k, v] of Object.entries(manifest)) {
      if (typeof v === "object") {
        // @ts-expect-error
        for (const [k2, v2] of Object.entries(v)) {
          manifest[[k, k2].join("_")] = v2;
          // @ts-expect-error
          delete v[k2];
        }
      }
    }
  }

  const schema: Record<string, Record<string, string>> = {};

  for (const [k, v] of Object.entries(manifest)) {
    if (typeof v === "object") {
      delete manifest[k];
      continue;
    }
    await conn.query(
      `CREATE VIEW ${k} AS (SELECT * FROM read_parquet('${v}'));`
    );

    schema[k] = Object.fromEntries(
      await conn
        .query(`DESCRIBE ${k}`)
        .then((r) =>
          r
            .toArray()
            .map((r: Awaited<ReturnType<typeof conn.query>>) => [
              r.column_name,
              r.column_type,
            ])
        )
    );
    console.debug(`Created ddb view "${k}"`);
  }

  const spr = {
    query: (q: string) => conn.query(q).then((r) => JSON.parse(r.toString())),
    schema: schema,
  };

  // @ts-ignore
  window.spr.query = spr.query;
  // @ts-ignore
  window.spr.schema = spr.schema;

  res();
})();
