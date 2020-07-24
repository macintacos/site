---
name: Deploy to production
about: Create an issue to create a release and then deploy to production
title: "\U0001F6A2 Create a new release and deploy to production"
labels: "\U0001F574 Administration"
assignees: macintacos

---

## Tasks

- [ ] Create a new branch: `git checkout -b GH-<this_issue_number> && git push --set-upstream origin GH-<this_issue_number>`
- [ ] Run the following script (fill out the relevant information, edit the CHANGELOG so that it's appropriate): `yarn run release`
- [ ] After pushing, create a PR opened against `develop`. It should have the same naming convention. Squash/merge that PR as normal.
- [ ] In your local repo, do the following:

```
$ git checkout develop && git pull # Get latest changes from develop
$ git checkout master && git pull # Get latest changes from master
$ git rebase develop && git push # Take all of the commits from develop, put them onto master; this maintains history
```

- [ ] Comment with a link to the release and then close the issue
