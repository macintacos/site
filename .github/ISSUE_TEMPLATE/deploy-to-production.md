---
name: Deploy to production
about: Create an issue to create a release and then deploy to production
title: "\U0001F6A2 Create a new release and deploy to production"
labels: "\U0001F574 Administration, 🚢 Release"
assignees: macintacos

---

## Tasks

- [ ] Create a new branch from the latest of `develop`:

```bash
$ git checkout develop && git pull # Get latest changes from develop
$ git checkout -b GH-<this_issue_number> && git push --set-upstream origin GH-<this_issue_number>
```

- [ ] Run the following script (fill out the relevant information, edit the CHANGELOG so that it's appropriate):

```bash
$ yarn run release -- --dry-run # This will let you run through the options without committing to anything.
$ yarn run release # When you're ready, run it with no options to actually create a release.
```

- [ ] Even after running `yarn run release`, you will need to look over the CHANGELOG and update the `package.json` manually. Do that now and push it to remote.
- [ ] After pushing, create a PR opened **against the `develop` branch**. It should have the same naming convention. Squash/merge that PR as normal.
- [ ] In your local repo, do the following:

```bash
$ git checkout develop && git pull # Get latest changes from develop, there will be new stuff since you updated the CHANGELOG/package.json
$ git checkout master && git pull # Get latest changes from master
$ git rebase develop && git push # Take all of the commits from develop, put them onto master; this maintains history
```

- [ ] Comment with a link to the release and then close this issue. The site should be deployed via Vercel and live.
