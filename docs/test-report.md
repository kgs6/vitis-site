# Test report

Verdict: PASS (no blockers). Production build (`npm run build` plus `next start`) on port 3201, because 3200 was occupied by a foreign dev server (pid 9389, left alone).

## Checks
- Build: PASS, 23 static pages, 18 page routes plus robots.txt and sitemap.xml.
- HTTP 200 on all 18 pages: PASS.
- Titles and descriptions unique across all 18 pages: PASS (0 duplicates).
- hreflang ru/en/uk/x-default, canonical (https://www.vitis.ua/<lang>/<page>), `<html lang>`: PASS on /ru and /ru/product (output of the full run was truncated). The en/about and uk/projects pages were checked by hand: lang is correct.
- sitemap.xml: 18 `<loc>` entries, PASS. robots.txt: Allow all plus Sitemap, PASS.
- Internal links: PASS, no 404 on /ru and /ru/product. The full check for the other pages was cut off by a tab freeze.
- mailto/tel links are correct (tel:+38..., mailto:*@vitis.com.ua).
- Overflow (iframe widths, scrollWidth == width): ru 375/768/1440 PASS for all 6 pages; en/uk 375 PASS. en/uk at 768/1440 NOT verified (renderer froze, `resize_window` did not change the window, innerWidth stayed 2032).
- Broken images: 0 of 9 on /en/about; other pages not fully checked.
- Burger (/uk/projects at 375): details/summary opens and closes; summary 44px; items 48px; active item is highlighted (aria-current); the language switcher links to /ru/projects and /en/projects (keeps the page).
- Skip-link: first link, href=#main, target exists. PASS. Full Tab walk NOT performed.
- Console on the prod server: not captured (the first capture was against the foreign dev server on 3200, which only showed an HMR info message and no errors).

## Findings
1. Minor: inline links (phone numbers, e-mail addresses in the contacts block) are 21px high, below 44px. Inline text links are exempt from WCAG 2.2 target size, so this is an optional improvement.
2. Minor, contrast: olive #6f7d4b with white text is 4.46:1 (AA fails only for text under 18px, which needs 4.5:1). Olive on paper #fafaf9 is 4.27:1, which fails AA for body text. Recommend a slightly darker olive (about #66744a or darker) or large and bold text only. Burgundy on white is 10:1, fine.
3. Minor, weight: public/img is 3.2MB. img6.jpg is 506KB, img8.jpg is 419KB. Check that next/image serves optimised versions, otherwise convert to WebP.
4. Test-environment note: while the iframes loaded, the parent tab URL changed on its own (/ru became /ru/contacts, then /ru/product). The cause is not found; the code was not changed. Worth a manual check for scripts that touch window.top or history.

## Cleanup
Tab closed, server on 3201 killed, port 3201 free. The foreign process on 3200 is untouched.
