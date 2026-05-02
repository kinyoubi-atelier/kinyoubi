# vendor/aika-widget

Vendor copy of the Aika chat widget. Source of truth lives in a
separate repo:

- Repo: https://github.com/kinyoubi-atelier/aika
- Path inside repo: `packages/widget/src/`
- Last synced: 2026-05-02 (commit `273d4ba` on `feature/aika`)

## Why a vendor copy

Single-consumer (this site is the only consumer), iterating fast.
Vendoring avoids the operational overhead of a private git submodule
(GitHub Actions checkout would need a fine-scoped PAT in repo
secrets to clone the private aika repo at deploy time).

If we ever want to switch to submodule (single source of truth, no
manual sync), the path is:
1. Make `kinyoubi-atelier/aika` public, OR add a fine-scoped PAT
   as `SUBMODULE_TOKEN` in this repo's secrets.
2. Update `.github/workflows/deploy.yml` to checkout submodules.
3. Replace this directory with `git submodule add` and update the
   tsconfig path alias to point at `vendor/aika/packages/widget/src`.

## How to resync

```sh
cd /Volumes/My\ Passport/Project\ Aika
git pull origin feature/aika   # or main once merged
cp packages/widget/src/*.{ts,tsx,css} \
  ~/Desktop/KINYOUBI\ ATELIER\ \&\ CO./WEB\ Designing/Website\ KINYOUBI\ ATELIER/kinyoubi-website/vendor/aika-widget/
```

Then bump the `Last synced` line above with the new date and commit
SHA, and commit the change in the site repo.

Do not edit files inside this directory directly. Edit them in the
Aika repo, ship them there, then resync.
