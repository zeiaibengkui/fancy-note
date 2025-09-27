import { PGlite } from '@electric-sql/pglite'
import { live, type PGliteWithLive } from '@electric-sql/pglite/live'

const db = new PGlite('idb://pgdata', { extensions: { live } }) as unknown as PGliteWithLive &
  PGlite

const init = await db.exec(/*sql*/ `
  CREATE TABLE IF NOT EXISTS files (
    id SERIAL PRIMARY KEY,
    dir TEXT unique,
    content TEXT
  );
  INSERT INTO files (dir,content)
  SELECT '/example', 'Hello world!'
  WHERE NOT EXISTS (SELECT 1 FROM files WHERE dir = '/example');
`)

if (init) console.log('PGLite Loaded')

export { db }
