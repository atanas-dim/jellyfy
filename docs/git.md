# Git

A change starts on a feature branch. Open a pull request into `dev`. Accept it with Squash and merge, then delete the branch. A small change can be committed straight onto `dev`.

`main` takes `dev` by fast-forward. Check out `main` and run:

```bash
git merge --ff-only dev
```

`main` then points at the same commits as `dev`.

The command stops when `main` holds a commit that `dev` does not. Put the branches back on one line, then run it again.

A package version is tagged on the commit that contains the version bump. That commit is on `main`, so the tag stays on `main`.
