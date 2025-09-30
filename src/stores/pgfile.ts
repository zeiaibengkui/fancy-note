import type { PGlite } from '@electric-sql/pglite'
import { db } from '@/stores/pglite'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

//File Class
class PGFile {
  db: PGlite
  dir: string

  constructor(dir: string) {
    this.db = db
    this.dir = dir
    console.log(this)
    // 如果已存在则更新，否则插入
    this.db.query(
      `INSERT INTO files (dir, content)
       VALUES ($1, $2)
       ON CONFLICT(dir) DO UPDATE SET content = EXCLUDED.content`,
      [this.dir, null],
    )
  }

  async read(): Promise<string | null> {
    const result = await this.db.query<{ content: string }>(
      'SELECT content FROM files WHERE dir = $1',
      [this.dir],
    )
    if (result.rows && result.rows.length > 0 && result.rows[0].content !== undefined) {
      return result.rows[0].content
    }
    return null
  }

  async write(content: string): Promise<void> {
    // 如果已存在则更新，否则插入
    await this.db.query(
      `INSERT INTO files (dir, content)
       VALUES ($1, $2)
       ON CONFLICT(dir) DO UPDATE SET content = EXCLUDED.content`,
      [this.dir, content],
    )
  }

  async delete(): Promise<void> {
    await this.db.query('DELETE FROM files WHERE dir = $1', [this.dir])
  }
}

//Pinia Store
const useFileStore = defineStore('file', () => {
  const selectedDirs: Ref<string[]> = ref([])

  return { selectedDirs }
})

export { PGFile, useFileStore }
