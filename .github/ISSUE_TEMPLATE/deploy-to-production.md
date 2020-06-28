---
name: Deploy to production
about: Create an issue to create a release and then deploy to production
title: "\U0001F6A2 Create a new release and deploy to production"
labels: "\U0001F574 Administration"
assignees: macintacos

---

## Tasks

- [ ] Create a new branch: `git checkout -b GH-<this_issue_number>`
- [ ] Run the following script (fill out the relevant information, edit the CHANGELOG so that it's appropriate): `yarn run release`
- [ ] After pushing, create a PR opened against `develop`. It should have the same naming convention. Squash/merge that PR as normal.
- [ ] Open a PR from `develop` -> `master`. Perform a _rebase_ merge, **not a squash merge**.
- [ ] Close this issue once all of the above is completed.
