import type { PGlite } from '@electric-sql/pglite'
import { db } from '@/stores/pglite'
import { defineStore } from 'pinia'

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
const useFileStore = defineStore('file', {
  state: () => ({
    selectedDirs: new Set<string>(),
  }),
  actions: {
    async create(dir: string, content = '') {
      const fileClass = new PGFile(dir)
      await fileClass.write(content)
      this.selectedDirs.add(dir)
      return fileClass
    },
    async write(content = '') {
      const results = []
      for (const dir of this.selectedDirs) {
        const fileClass = new PGFile(dir)
        await fileClass.write(content)
        results.push(fileClass)
      }
      return results
    },
    async delete() {
      const results = []
      for (const dir of Array.from(this.selectedDirs)) {
        const fileClass = new PGFile(dir)
        await fileClass.delete()
        results.push(fileClass)
        this.selectedDirs.delete(dir)
      }
      return results
    },
    async read() {
      const results = []
      for (const dir of this.selectedDirs) {
        const fileClass = new PGFile(dir)
        const content = await fileClass.read()
        results.push({ fileClass, content })
      }
      return results
    },
  },
  getters: {
    selectedDirsArray: (state) => Array.from(state.selectedDirs),
  },
})

export { PGFile, useFileStore }
