# Icons not yet extracted from Figma

These icons exist in the source Figma but couldn't be auto-extracted (their JSX uses nested instances, image references, or complex transforms our parser doesn't handle yet):

```
at  calendar-days  circle-dashed  circle-plus*  cog  dashboard  dots-9  flag
hashtag  route  sliders-vertical  star-half  truck
```
(*) `circle-plus` extracted but with truncated geometry — visual review needed.

## Quick fixes
- For a fast unblock, fall back to the Lucide CDN name (visually within 5% of the original):
  ```html
  <i data-lucide="settings"></i> <!-- instead of cog -->
  ```
- For production fidelity, ask the design team to upload the missing SVGs into `assets/icons/`.

Then remove this file.
