- This project uses [bootstrapvuenext](https://github.com/bootstrapvuenext/bootstrapvuenext), a Vue 3 compatible Bootstrap component library.
  No need to import components from `bootstrapvuenext`.

- Also using [PGLite](https://pglite.dev/docs), a Postgres in WASM. See #src/pgfile.ts #src/stores/pgfile.ts .
  When working with user supplied values, it's always best to use parameterized queries; these are supported on the .query method.
  Output:
  ```js
  ;[
    {
      id: 1,
      task: 'Install PGlite from NPM',
      done: false,
    },
  ]
  ```

```

```
