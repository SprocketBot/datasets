import { Database } from 'duckdb-async';

export const sprocketDb = async (manifestUrl?: string) => {
  manifestUrl = manifestUrl ??
    "https://sprocket-public-datasets.nyc3.cdn.digitaloceanspaces.com/datasets/public/pages/assets/manifest.json";

  const manifest = await fetch(manifestUrl).then(r => r.json())

  const db = await Database.create(":memory:");

  await db.connect()

  const importTables = async (manifest: Record<string, any | string>, parentPath: string = "") => {
    for (const [k, v] of Object.entries(manifest)) {
      if (typeof v === "string") {
        let viewName = k
        if (parentPath) viewName = `${parentPath}_${k}`
        // create view
        await db.exec(`CREATE VIEW "${viewName}" AS 
          (SELECT * FROM read_parquet('${v}'));`)
      } else {
        await importTables(v)
      }
    }
  }

  await importTables(manifest);

  return (q: string) => db.all(q)
}
