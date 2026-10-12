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

Push the project branch before using GitButler. See [GitButler setup](#gitbutler-setup).

## Open an existing project

```sh
git fetch origin
git branch -r
git switch proj/<name>
```

## GitButler setup

`but setup` picks the remote HEAD as the default target branch. Since HEAD is `main` and
project branches are orphans, no merge-base exists. Workaround: point `origin/HEAD` at the
project branch first:

```sh
git fetch origin
git switch proj/<name>                    # leave detached HEAD
git remote set-head origin proj/<name>    # local change only
but setup
but config target                         # confirm: origin/proj/<name>
```

If the check prints `origin/main`, set it manually:
```sh
but config target origin/proj/<name>
```

Use `but push` to push branches. Setting `remote.origin.push` makes a plain `git push` push the workspace commit instead of the project branch.

## Delete a finished project

```sh
git push origin --delete proj/<name>
git branch -D proj/<name>
```

## License

MIT