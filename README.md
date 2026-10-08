# sandbox

Practice and experiment repository. Each project uses a separate orphan branch. Not for production code.

## Branch rules

- `main` holds only this README.
- One project = one orphan branch (no shared history).
- Branch names use a prefix:
  - `proj/<name>` for a full project, for example `proj/todo-api`
  - `exp/<name>` for a short experiment, for example `exp/auth-flow`

## Start a new project

```sh
git switch --orphan proj/<name>
# add files
git add .
git commit -m "chore: init <name>"
git push -u origin proj/<name>
```

## Open an existing project

```sh
git fetch origin
git branch -r
git switch proj/<name>
```

## Delete a finished project

```sh
git push origin --delete proj/<name>
git branch -D proj/<name>
```

## License

MIT
