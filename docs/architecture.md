# Vitis Group: сайт-визитка, архитектура

Референс: https://www.vitis.ua (Wix, импортёр вина, Украина). Без админки, без БД, без CMS.

## Языки
Референс: ru (основной, по умолчанию), en, uk (поддомены Wix). У нас: `ru`, `en`, `uk` как сегмент пути `/ru`, `/en`, `/uk`. `/` редиректит на `/ru`.

## Страницы (многостраничный сайт, как vitis.ua)
`/[lang]` (главная), `/[lang]/product|projects|about|careers|contacts`.
- Главная: логотип по центру, ряд бутылочек, слоган, сетка 5 колонок: фото чередуются с серыми плитками (#eaeaea/#f4f4f4) с бордовой подписью-ссылкой раздела; на мобильном 2 колонки.
- Продукция: текст + логотипы производителей по странам (`lib/brands.ts`, `public/img/brands/*.webp`, alt = бренд) под серыми заголовками стран (якоря `#c0…#c10`); у «Субдистрибуции» логотипов нет, секция не выводится.
- Наши проекты: Vino.ua, Wine.ua, Wineinfo.com.ua (логотип, фото, текст, внешние ссылки из словаря). О компании: коллаж из 3 рядов, текст, фото команды. Карьера: вакансии списками без раскрытия. Контакты: адрес, отделы, филиалы, ссылка «Как добраться» на Google Maps (без iframe).
- Внутренние страницы: узкая колонка `.col` (max 60rem), заголовок h1 по центру, небольшой. Без тёмных блоков и крупных заставок.
- Шапка: меню по центру (Vitis Group, Продукция, Наши проекты, О компании, Карьера, Контакты), активный пункт на фоне `#ece9e4`, справа RU/EN/UK; на мобильном бургер на `<details>` без JS. Подвал светлый: логотип+адрес, колонки Продукция (страны) / Наши проекты / Контакты, соцсети, © 2008–год Vitis Group.

## i18n без зависимостей
- `app/[lang]/layout.tsx` и `page.tsx`; `generateStaticParams` возвращает ru/en/uk; `dynamicParams = false` (чужой язык = 404).
- `dictionaries/{ru,en,uk}.json`: одинаковая структура ключей (nav, hero, products, projects, about, careers, contacts, footer, meta). Ru является эталоном типов: `type Dict = typeof ru`.
- `lib/i18n.ts`: `locales`, `defaultLocale`, `getDict(lang)` через динамический `import()` (серверные компоненты, в клиент словари не уходят).
- Редирект `/` -> `/ru`: `redirect` в `app/page.tsx` (без middleware; Accept-Language не определяем, YAGNI).
- `<html lang={lang}>` в `[lang]/layout.tsx`; `generateMetadata` берёт title/description из `meta`, плюс `alternates.languages` (hreflang) и canonical.
- Переключатель языка: обычные `<Link href="/en">` (якорь не сохраняем).

## Структура
```
app/[lang]/{layout,page}.tsx + product|projects|about|careers|contacts/page.tsx
app/{sitemap,robots,globals.css}
components/  Header, Menu (client, активный пункт), LangSwitch (client), Footer
dictionaries/ ru.json en.json uk.json
lib/i18n.ts, lib/brands.ts
public/img/  logo, hero-bottles, tile-*, project-*, about-*, *-logo, social-*, brands/*.webp (всё с vitis.ua, суммарно < 2 МБ)
```
Клиентский JS только Menu и LangSwitch.

## Дизайн-токены (Tailwind v4, `@theme` в globals.css)
- Цвета: текст `#282828`, фон белый/`#fafafa` (подвал), плитки `#eaeaea`/`#f4f4f4`, активный пункт `#ece9e4`, бордо `#8b0000` только для подписей плиток, ссылок, focus; олива `#6f7d4b` (из логотипа).
- Шрифт: Jost 300/400 (`next/font/google`, latin+cyrillic), светлое начертание по умолчанию (аналог DIN Next Light оригинала).
- Адаптивность: mobile-first; плитки 2 колонки (<md) / 5; логотипы 2/3/5 колонок; без горизонтального скролла на 375px.
- Доступность: skip-link, `lang` на `<html>`, alt у логотипов, видимый focus, контраст AA.

## SEO
Метаданные на язык, hreflang, canonical, `sitemap.ts` со всеми тремя языками, `robots.ts`, Open Graph (title, description, картинка), JSON-LD Organization (по желанию, один скрипт).

## Сознательно НЕ делаем
Админку, CMS, БД, формы обратной связи и API, next-intl/i18next, определение языка по заголовкам/куки, тёмную тему, анимационные библиотеки, UI-кит, аналитику, каталог товаров/корзину.
