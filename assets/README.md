# assets/

## Logo

Real 转转通 brand assets — uploaded by user.

| File | Use |
|---|---|
| `logo-zhuanzhuan.svg` | Full lockup. Black `转转通` wordmark + red `ZZ` chip (`#FF0F27`). Default. 1386 × 315 native, scales freely. |
| `logo-zhuanzhuan-dark.svg` | Same lockup, wordmark inverted to white for dark surfaces. The red chip stays red. |
| `logo-mark.svg` | Chip only (`ZZ` symbol). Square 372 × 315. Use in collapsed sidebars, favicons, and app icons. |

**Brand red:** `#FF0F27` — reserved for the logo chip. Do NOT use as a UI color (the system semantic-red is `#FF383C`).

Place the wordmark at the canonical heights: **24 px** (compact app bar), **32 px** (default), **44 px** (marketing).

## Iconography — 124 SVGs from Figma

`assets/icons/*.svg` — every file is a single-path line icon (1.5 px stroke), uses `fill="currentColor"`, sized at the icon's native viewBox.

### Two equally-valid usage patterns

**A) Mask + currentColor (recommended)**
```css
.icon { display:inline-block; width: 16px; height: 16px;
        background: currentColor;
        -webkit-mask: var(--src) center / contain no-repeat;
                mask: var(--src) center / contain no-repeat; }
```
```html
<span class="icon" style="--src: url(/assets/icons/box.svg); color: var(--zzt-accent-500)"></span>
```

**B) Inline `<svg>` paste**
Open the .svg, paste the inner contents into a React component; the path already uses `fill="currentColor"`.

### Inventory

```
alert-triangle  archive          arrow-down       arrow-left       arrow-right
arrow-up        ban              bell             bolt             bookmark
box             boxes            building         calendar         camera
caret-down      caret-up         chart-bar        chart-column     chart-line
chart-pie       check            check-2          chevron-down     chevron-left
chevron-right   chevron-up       circle           circle-alert     circle-check
circle-minus    circle-small     circle-x         clock            close
comment         comments         copy             credit-card      crown
delete          diamond          download         edit             equal
external        external-link    eye              eye-off          file
filter          flame            folder           folder-open      folders
gear            gift             globe            grip             hammer
headphones      heart            help             home             image
info            key              keyboard         laptop           link
lock            lock-open        mail             map-pin          medal
megaphone       microphone       minus            moon             more-horizontal
more-vertical   paperclip        pause            percent          person
pin             play             plus             printer          qr-code
receipt         refresh          rocket           save             scan
search          share            shield           shield-check     shopping-bag
shopping-cart   sliders          smartphone       square           star
stop            sun              tag              tags             target
thumbs-down     thumbs-up        ticket           triangle-down    triangle-up
trolley         upload           user-plus        user-x           users
video           wallet           wrench           zap
```

### Missing (not yet extracted)

These exist in the Figma but resist single-file extraction (nested instances or non-standard transforms). Either upload them, or use the Lucide equivalent — visual delta is negligible.

| Wanted | Closest substitute (Lucide) |
|---|---|
| `cog` | `settings` (we already mapped `gear`) |
| `dashboard` | `layout-dashboard` |
| `calendar-days` | use `calendar` |
| `circle-dashed` | `circle-dashed` from Lucide |
| `dots-9` | `grid-3x3` |
| `route` | `route` from Lucide |
| `flag` | `flag` from Lucide |
| `truck` | `truck` from Lucide (we mapped `car` but it didn't extract) |
| `sliders-vertical` | `sliders-vertical` Lucide |
| `star-half` | Lucide |
| `hashtag` | Lucide |
| `at` | Lucide |

## Sizes — when to use what
| px | use |
|---|---|
| **12** | inside tags / pills |
| **14** | inside button-md |
| **16** | table rows, default body icon |
| **20** | sidebar / topbar nav |
| **24** | drawer / modal headers |
| **32** | empty-state hero |
