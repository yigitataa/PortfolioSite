# PORTFOLIO_MASTER_SPEC.md

> **Amaç:** Yiğit Ata için, Apple’ın Liquid Glass tasarım felsefesinden ilham alan; modern, premium, etkileşimli, erişilebilir ve performanslı bir kişisel portföy sitesi oluşturmak.
>
> **Bu dosya bir “tasarım önerisi” değil, Codex için uygulanabilir ana teknik/tasarım spesifikasyonudur.**
>
> **Tarih:** 25 Eylül 2026  
> **Proje durumu:** Tasarım sistemi + altyapı + animasyon mimarisi hazırlanacak. Gerçek projeler daha sonra aynı Codex sohbetinde ayrı görevlerle eklenecek.

---

# 0. CODEX İÇİN ANA TALİMAT

Bu dokümanı projenin **source of truth** belgesi olarak kabul et.

Projeyi geliştirirken:

1. Bu dokümanda tanımlanan tasarım dili, mimari, animasyon sistemi, erişilebilirlik ve performans kurallarından sapma.
2. Gerçek proje içeriklerini şu an ekleme.
3. Proje/portfolio work alanlarının **altyapısını ve veri modelini hazırla**, ancak gerçek proje verilerini boş bırak.
4. Daha sonra verilecek proje ekleme görevleri global tasarım sistemini değiştirmeden yapılabilmeli.
5. Apple arayüzünü birebir kopyalama. Ama Liquid Glass’ın:
   - katmanlama,
   - içerik önceliği,
   - ışık,
   - transparanlık,
   - adaptif renk,
   - optik derinlik,
   - fluid morph,
   - spring fiziği,
   - kontrollü motion
   ilkelerini web ortamına aktar.
6. “Glassmorphism template” görünümünden kaçın.
7. Her bölüme blur uygulanmış kartlar kullanma.
8. Liquid Glass sadece anlamlı **functional / interactive layers** üzerinde yoğunlaşmalı.
9. İçerik layer’ı okunaklı, sakin ve güçlü olmalı.
10. Animasyonları dekorasyon olarak değil, hiyerarşi ve etkileşimi anlatmak için kullan.
11. `prefers-reduced-motion`, `prefers-contrast`, klavye navigasyonu ve dokunmatik cihaz davranışları ilk günden itibaren uygulanmalı.
12. Desktop tasarımı mobile küçültme yaklaşımı kullanma. Mobile, tablet ve desktop davranışları bilinçli şekilde yeniden düzenlenmeli.
13. Bir özellik tarayıcı tarafından desteklenmiyorsa progressive enhancement uygula; site hiçbir zaman bozulmamalı.
14. Gereksiz dependency ekleme.
15. Aynı işi üç farklı animasyon kütüphanesiyle çözme.
16. Kodda magic number kullanımını azalt; motion, spacing, radius ve color değerleri token olarak tanımlansın.
17. Her ana UI primitive reusable olmalı.
18. Animasyonlarda React state ile her frame render yaptırma.
19. Pointer tabanlı efektlerde CSS custom properties, MotionValue, Web Animations API veya doğrudan DOM transform kullan.
20. Tasarım tamamlandığında site “template satın alınmış gibi” değil, özel tasarlanmış bir dijital ürün gibi görünmeli.

---

# 1. TASARIM VİZYONU

## 1.1 Ana fikir

Site şu üç kavramın birleşimi gibi hissettirmeli:

**Liquid Glass × Digital Workshop × Editorial Portfolio**

Site ilk bakışta:

- premium,
- sakin,
- teknolojik,
- modern,
- deneysel ama kullanılabilir,
- kişisel,
- güçlü tipografiye sahip,
- fiziksel tepki veren,
- fakat gösteriş için gösteriş yapmayan

bir deneyim olmalı.

Ana hedef:

> Kullanıcı siteye girdiğinde “güzel bir portföy template’i” değil, arayüzün kendisi üzerinde düşünülmüş bir yazılım ürünü görmeli.

---

# 2. LIQUID GLASS FELSEFESİNİN WEB’E ÇEVRİLMESİ

Apple Liquid Glass yaklaşımından alınacak fikirler:

## 2.1 Content-first

İçerik ana katmandır.

Glass:

- navigasyon,
- floating controls,
- dock,
- mode switch,
- filtreler,
- menüler,
- transient actions,
- modal/sheet gibi

işlevsel elemanlarda kullanılmalıdır.

Yanlış yaklaşım:

```text
[ glass card ]
[ glass card ]
[ glass card ]
[ glass card ]
[ glass card ]
```

Doğru yaklaşım:

```text
CONTENT
CONTENT
CONTENT

                [ floating glass navigation ]
                [ transient glass control   ]
```

---

## 2.2 Gerçek katman hissi

UI üç temel derinlik katmanına sahip olsun:

### Layer 0 — Environment

Arka plan atmosferi.

İçerir:

- ana background,
- çok hafif ambient gradients,
- noise/grain,
- soft color field,
- isteğe bağlı çok hafif animated caustic field.

### Layer 1 — Content

Asıl içerik.

İçerir:

- typography,
- about,
- experience,
- future project surfaces,
- text,
- headings,
- visuals.

### Layer 2 — Functional Glass

İçeriğin üzerinde yüzen işlevsel katman.

İçerir:

- navbar,
- floating dock,
- theme/mode switch,
- quick actions,
- dialog,
- popover,
- project filters,
- context menu.

---

## 2.3 Glass sadece blur değildir

Bir glass yüzey aşağıdaki optik bileşenlerin kombinasyonuyla oluşturulmalı:

- transparency,
- backdrop blur,
- backdrop saturation,
- soft inner border,
- outer edge highlight,
- subtle refraction illusion,
- specular highlight,
- environment tint,
- depth shadow,
- pointer-reactive lighting,
- state-based fluid deformation.

Bir element sadece:

```css
background: rgba(...);
backdrop-filter: blur(...);
```

kullanıyorsa bu projedeki Liquid Glass standardını karşılamaz.

---

# 3. GENEL ESTETİK

## 3.1 Kaçınılacak görsel klişeler

KULLANMA:

- hacker terminal ana tema,
- Matrix yeşili,
- neon cyberpunk,
- sürekli glowing border,
- her kartta glassmorphism,
- devasa gradient blobs,
- rastgele bento grid sadece trend olduğu için,
- aşırı 3D,
- sürekli dönen objeler,
- kullanıcının cursor’unu tamamen değiştiren özel cursor,
- scroll hijacking,
- her metnin scroll ile tek tek uçması,
- parallax’ın her yerde kullanılması,
- gereksiz loading screen,
- sahte terminal yazısı,
- büyük “HELLO WORLD” klişesi.

---

## 3.2 Hedef his

Anahtar kelimeler:

```text
calm
precise
fluid
spatial
soft
responsive
editorial
technical
premium
human
minimal
dimensional
```

---

# 4. TEKNOLOJİ YIĞINI

Temel stack:

```text
React
TypeScript
Vite
CSS / Tailwind CSS
Motion for React
GSAP + ScrollTrigger (yalnızca gerektiği yerde)
```

Tercih:

- React’in güncel stable sürümü.
- TypeScript strict mode.
- Vite güncel stable.
- Tailwind kullanılacaksa güncel stable sürüm.
- Motion:
  - component animations,
  - layout transitions,
  - gestures,
  - spring physics,
  - shared layout.
- GSAP:
  - yalnızca karmaşık pinned storytelling,
  - scrubbed timeline,
  - özel scroll choreography gereken birkaç sahne için.
- Native Web APIs:
  - View Transition API,
  - Web Animations API,
  - IntersectionObserver,
  - ResizeObserver,
  - CSS Scroll-driven animations,
  - Pointer Events.

Önemli:

> Motion ile çözülebilen basit bir animasyon için GSAP kullanma.

---

# 5. MODERN WEB ÖZELLİKLERİ

Progressive enhancement yaklaşımıyla aşağıdakileri değerlendir:

```text
View Transition API
CSS Scroll-driven Animations
@supports
container queries
CSS @property
color-mix()
oklch()
backdrop-filter
mask-image
clip-path
CSS custom properties
native popover
pointer media queries
hover media queries
prefers-reduced-motion
prefers-contrast
prefers-color-scheme
```

Tarayıcı desteği olmayan özellikler siteyi bozmayacak.

---

# 6. DOSYA MİMARİSİ

Önerilen yapı:

```text
src/
│
├── app/
│   ├── App.tsx
│   ├── routes.tsx
│   └── providers.tsx
│
├── components/
│   ├── glass/
│   │   ├── GlassSurface.tsx
│   │   ├── GlassButton.tsx
│   │   ├── GlassPill.tsx
│   │   ├── GlassDock.tsx
│   │   ├── GlassPopover.tsx
│   │   ├── GlassSheet.tsx
│   │   └── GlassLens.tsx
│   │
│   ├── motion/
│   │   ├── Reveal.tsx
│   │   ├── Stagger.tsx
│   │   ├── Magnetic.tsx
│   │   ├── Parallax.tsx
│   │   ├── SharedTransition.tsx
│   │   └── ScrollProgress.tsx
│   │
│   ├── layout/
│   │   ├── SiteHeader.tsx
│   │   ├── FloatingNav.tsx
│   │   ├── PageShell.tsx
│   │   ├── Section.tsx
│   │   ├── Container.tsx
│   │   └── Footer.tsx
│   │
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── IconButton.tsx
│   │   ├── Badge.tsx
│   │   ├── Tooltip.tsx
│   │   └── Divider.tsx
│   │
│   └── effects/
│       ├── AmbientField.tsx
│       ├── GrainOverlay.tsx
│       ├── PointerLight.tsx
│       └── RefractionField.tsx
│
├── sections/
│   ├── Hero/
│   ├── Intro/
│   ├── About/
│   ├── Capabilities/
│   ├── Work/
│   ├── Experience/
│   ├── Contact/
│   └── Footer/
│
├── projects/
│   ├── ProjectGrid.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectDetail.tsx
│   ├── ProjectHero.tsx
│   ├── ProjectMedia.tsx
│   └── ProjectEmptyState.tsx
│
├── data/
│   ├── site.ts
│   ├── navigation.ts
│   └── projects.ts
│
├── hooks/
│   ├── useReducedMotion.ts
│   ├── usePointerPosition.ts
│   ├── useMediaQuery.ts
│   ├── useScrollDirection.ts
│   └── usePerformanceTier.ts
│
├── lib/
│   ├── motion.ts
│   ├── glass.ts
│   ├── capabilities.ts
│   └── utils.ts
│
├── styles/
│   ├── reset.css
│   ├── tokens.css
│   ├── base.css
│   ├── glass.css
│   ├── motion.css
│   └── utilities.css
│
└── types/
    └── project.ts
```

---

# 7. PROJE VERİLERİ İÇİN BAĞIMSIZ MİMARİ

Gerçek projeler **şu anda eklenmeyecek**.

`src/data/projects.ts`:

```ts
import type { Project } from "@/types/project";

export const projects: Project[] = [];
```

Project model:

```ts
export interface Project {
  id: string;
  slug: string;

  title: string;
  shortTitle?: string;
  subtitle: string;
  description: string;

  year: number;
  status?: "shipped" | "active" | "archive";

  role?: string;
  stack: string[];
  tags: string[];

  cover: {
    type: "image" | "video" | "interactive";
    src?: string;
    alt: string;
  };

  links?: {
    live?: string;
    github?: string;
  };

  caseStudy?: {
    context?: string;
    problem?: string;
    solution?: string;
    architecture?: string;
    challenges?: string[];
    decisions?: string[];
    result?: string;
  };

  gallery?: Array<{
    type: "image" | "video";
    src: string;
    alt: string;
  }>;

  featured?: boolean;
  order?: number;
}
```

Kurallar:

- Project UI `projects.ts` dosyasından beslensin.
- Project component’leri proje isimleri hakkında hard-code içermesin.
- Yeni proje eklemek için global component değiştirmek gerekmemeli.
- Project sıralama `order` ile kontrol edilsin.
- `featured` ana sayfadaki görünürlüğü belirlesin.
- Gerçek projeler daha sonra eklenecek.
- Şimdilik project alanı dev mode’da empty-state gösterebilir.
- Production için `projects.length === 0` ise ilgili nav linki/section otomatik gizlenebilir.

---

# 8. DESIGN TOKENS

Tüm temel değerler CSS variables üzerinden yönetilsin.

## 8.1 Color system

Hard-coded onlarca hex yerine semantic token kullan.

Örnek:

```css
:root {
  --bg: oklch(0.975 0.008 255);
  --bg-elevated: oklch(0.992 0.004 255);

  --text-primary: oklch(0.16 0.018 255);
  --text-secondary: oklch(0.43 0.018 255);
  --text-tertiary: oklch(0.58 0.014 255);

  --accent: oklch(0.66 0.17 250);
  --accent-soft: oklch(0.88 0.07 245);

  --hairline: color-mix(in oklch, var(--text-primary) 12%, transparent);

  --glass-fill: color-mix(in oklch, white 48%, transparent);
  --glass-fill-strong: color-mix(in oklch, white 66%, transparent);
  --glass-border: rgba(255,255,255,.46);

  --shadow-soft: 0 18px 50px rgba(20, 24, 40, .10);
}
```

Dark:

```css
[data-theme="dark"] {
  --bg: oklch(0.145 0.016 255);
  --bg-elevated: oklch(0.185 0.018 255);

  --text-primary: oklch(0.96 0.006 255);
  --text-secondary: oklch(0.75 0.012 255);
  --text-tertiary: oklch(0.60 0.012 255);

  --accent: oklch(0.73 0.15 245);

  --glass-fill: rgba(30, 34, 44, .38);
  --glass-fill-strong: rgba(30, 34, 44, .58);
  --glass-border: rgba(255,255,255,.15);

  --shadow-soft: 0 22px 70px rgba(0,0,0,.28);
}
```

Bunlar başlangıç tokenlarıdır; görsel test sırasında küçük ayarlar yapılabilir.

---

# 9. TYPOGRAPHY

## 9.1 Genel yaklaşım

Typography dekorasyon değil, tasarımın ana elemanlarından biri.

Başlıklar:

- geniş,
- güçlü,
- temiz,
- yüksek contrast,
- kontrollü tracking.

Body:

- maksimum okunabilirlik,
- 60–75 karakter satır uzunluğu.

## 9.2 Font

Tercih sırası:

1. Geist
2. Inter
3. modern system sans stack

Monospace:

1. Geist Mono
2. JetBrains Mono
3. system monospace

SF Pro font dosyalarını projeye dahil etme.

Apple cihazlarında system stack gerekiyorsa:

```css
font-family:
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

## 9.3 Fluid type

`clamp()` kullan.

Örnek:

```css
--text-hero: clamp(4rem, 11vw, 10rem);
--text-h1: clamp(3rem, 7vw, 7rem);
--text-h2: clamp(2.2rem, 5vw, 4.8rem);
--text-body-lg: clamp(1.15rem, 1.7vw, 1.45rem);
```

---

# 10. SPACING

4px tabanlı sistem:

```text
4
8
12
16
24
32
48
64
96
128
160
```

Section spacing desktop:

```text
120–180px
```

Tablet:

```text
96–128px
```

Mobile:

```text
72–96px
```

---

# 11. RADIUS / CONCENTRICITY

Liquid Glass yaklaşımında şekiller rastgele radius değerlerine sahip olmamalı.

Tokenlar:

```css
--radius-xs: 10px;
--radius-sm: 14px;
--radius-md: 20px;
--radius-lg: 28px;
--radius-xl: 36px;
--radius-pill: 999px;
```

Nested element radius:

```text
outer radius
↓
inner radius = outer radius - spacing
```

Bu yaklaşım UI boyunca görsel ritim oluşturmalı.

---

# 12. GLASS ENGINE

## 12.1 GlassSurface

Bütün glass component’lerinin temeli.

Props örneği:

```ts
type GlassVariant = "regular" | "clear" | "strong";
type GlassShape = "rounded" | "pill";

interface GlassSurfaceProps {
  variant?: GlassVariant;
  shape?: GlassShape;
  interactive?: boolean;
  tint?: string;
  children: React.ReactNode;
}
```

---

## 12.2 Temel CSS

```css
.glass {
  position: relative;
  isolation: isolate;

  background:
    linear-gradient(
      180deg,
      rgba(255,255,255,.16),
      rgba(255,255,255,.06)
    ),
    var(--glass-fill);

  backdrop-filter:
    blur(22px)
    saturate(155%);

  -webkit-backdrop-filter:
    blur(22px)
    saturate(155%);

  border: 1px solid var(--glass-border);

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.32),
    inset 0 -1px 0 rgba(255,255,255,.06),
    0 18px 60px rgba(15,20,35,.12);
}
```

Bu sadece başlangıçtır.

---

# 13. SPECULAR HIGHLIGHT

Glass yüzeylerde pointer’a göre çok hafif ışık hareketi olsun.

CSS variables:

```text
--pointer-x
--pointer-y
```

Pseudo-element:

```css
.glass::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;

  background:
    radial-gradient(
      180px circle at var(--pointer-x) var(--pointer-y),
      rgba(255,255,255,.26),
      transparent 62%
    );

  opacity: var(--glass-highlight-opacity, .55);
}
```

Kurallar:

- sadece `hover: hover` ve `pointer: fine` cihazlarda.
- mousemove başına React render yapılmasın.
- CSS custom property doğrudan element üzerinde güncellensin.
- mobilde devre dışı.

---

# 14. REFRACTION / LENS EFFECT

Gerçek optik kırılmanın web üzerinde birebir üretimi zor ve maliyetlidir.

Bu yüzden üç seviye tanımla.

## Tier 1 — Standard

```text
blur
saturation
highlight
border
shadow
```

Bütün cihazlarda temel görünüm.

## Tier 2 — Enhanced

Ek olarak:

```text
mask gradients
subtle chromatic edge
pointer-reactive highlight
micro scale
light distortion
```

Modern desktop cihazlar.

## Tier 3 — Experimental

Opsiyonel:

```text
SVG displacement
WebGL shader
dynamic refraction
```

Yalnızca:

- hero glass element,
- özel bir navigation transition,
- büyük bir showcase interaction

gibi 1–2 noktada kullanılabilir.

Tüm sayfayı WebGL canvas içine alma.

---

# 15. AMBIENT BACKGROUND

Glass yüzeyin optik olarak algılanabilmesi için arkada tamamen düz renk yerine çok hafif bir environment oluştur.

`AmbientField`:

- 2–4 geniş, blur edilmiş renk alanı.
- düşük saturation.
- çok yavaş hareket.
- cursor’u takip etmez.
- sürekli dikkat çekmez.
- dark/light mode’a göre değişir.

Animasyon:

```text
20–35 saniye cycle
1–3% movement
çok düşük amplitude
```

`prefers-reduced-motion`:

```text
static
```

---

# 16. GRAIN

Çok hafif film/noise katmanı kullanılabilir.

Opacity:

```text
0.015–0.035
```

Amaç:

- gradient banding azaltmak,
- dijital yüzeyi biraz daha organik yapmak.

Grain:

- pointer events none.
- fixed olabilir.
- büyük base64 texture kullanma.
- mümkünse küçük tekrar eden texture veya CSS tabanlı çözüm.

---

# 17. ANA NAVIGATION

## 17.1 Desktop

Floating glass capsule.

Başlangıç:

```text
────────────────────────────────────
Yiğit Ata        Work About Contact
────────────────────────────────────
```

Scroll sonrası daha kompakt:

```text
┌─────────────────────────────┐
│ YA   Work About Contact  ● │
└─────────────────────────────┘
```

Navbar:

- viewport’un üstünde yüzer.
- page content edge-to-edge devam eder.
- scroll direction aşağı ise hafif küçülebilir.
- yukarı scroll’da tekrar genişleyebilir.
- kaybolmamalı veya tamamen gizlenmemeli.

## 17.2 Morph

Hero konumunda:

```text
width: large
radius: 24–28
```

Scroll sonrası:

```text
width: intrinsic
radius: pill
```

Motion spring ile layout morph.

---

# 18. MOBILE NAVIGATION

Mobile’da desktop navbar küçültülmemeli.

Tercih:

```text
bottom floating glass dock
```

Örnek:

```text
┌───────────────────────────┐
│ Home   Work   About   +   │
└───────────────────────────┘
```

Artılar:

- başparmak erişimi,
- Liquid Glass functional layer mantığı,
- modern native app hissi.

Safe-area:

```css
padding-bottom: env(safe-area-inset-bottom);
```

---

# 19. HERO

Hero sıradan:

```text
Hello, I'm Yiğit.
```

formatına sıkışmamalı.

Önerilen yapı:

```text
YİĞİT ATA

Software /
Engineering /
Interactive Web

A short positioning statement.

[ explore work ] [ about ]
```

Ancak metin `site.ts` config üzerinden kolay değiştirilebilir olmalı.

Hero:

- yaklaşık `100svh`.
- içerik vertically centered ama optik merkez kullanılmalı.
- desktop’ta asimetrik editorial grid.
- mobile’da doğal reading order.

---

# 20. HERO MOTION

Page load:

### Stage 1

Background environment ortaya çıkar.

```text
opacity 0 → 1
700ms
```

### Stage 2

Navigation glass materialize olur.

```text
opacity
blur
scale .96 → 1
```

### Stage 3

Hero typography mask içinden çıkar.

```text
y: 14–28px
opacity
clip/mask
```

### Stage 4

Secondary elements stagger.

Toplam intro:

```text
yaklaşık 900–1300ms
```

Ama kullanıcı siteyi kullanmak için intro’nun bitmesini beklemek zorunda kalmamalı.

---

# 21. TEXT REVEALS

Metin animasyonlarında her harfi ayrı animate etmek çoğu yerde kullanılmasın.

Tercih sırası:

1. line reveal
2. word group reveal
3. block fade/translate
4. özel durumda character animation

Örnek motion:

```text
opacity 0 → 1
translateY 18px → 0
blur 8px → 0
```

Blur sadece küçük alanlarda ve kısa süreli.

---

# 22. SCROLL MOTION STRATEJİSİ

3 kategori:

## A — Scroll triggered

Element viewport’a girince.

Örnek:

- heading reveal,
- stat,
- metadata.

Motion `whileInView` veya IntersectionObserver.

## B — Scroll linked

Scroll progress ile değer bağlı.

Örnek:

- progress indicator,
- ambient background offset,
- image scale 1.04 → 1,
- hero typography parallax.

CSS Scroll-driven Animations veya Motion `useScroll`.

## C — Choreographed

Bir bölümün scroll boyunca anlatı oluşturması.

Sadece birkaç yerde.

GSAP ScrollTrigger.

---

# 23. SCROLL KURALI

Her şey hareket etmemeli.

Bir viewport içerisinde eş zamanlı olarak:

```text
maksimum 2–3 belirgin hareket
```

Ana içerik okunurken arka plandaki hareket dikkat çekmemeli.

---

# 24. VIEW TRANSITIONS

Sayfa geçişleri modern Web View Transition yaklaşımını desteklemeli.

Özellikle:

```text
home → project detail
project card → project hero
about → home
```

Shared element geçişi.

Destek varsa native View Transition API.

Fallback:

```text
Motion AnimatePresence / AnimateView / layout animations
```

Transition hiçbir zaman route değişimini yavaşlatmamalı.

---

# 25. SHARED ELEMENT TRANSITION

Gelecekte proje kartına tıklanınca:

```text
CARD THUMBNAIL
      ↓
      morph
      ↓
PROJECT HERO MEDIA
```

Aynı görsel:

- ölçeklenmeli,
- radius yumuşakça değişmeli,
- konum değişmeli.

Sayfayı crossfade etmek yerine spatial continuity oluştur.

---

# 26. MAGNETIC CONTROLS

Desktop fine-pointer için önemli CTA/button’larda çok hafif magnetism.

Mouse button center’a yaklaştığında:

```text
translateX max ±5px
translateY max ±5px
```

İç ikon/metin:

```text
max ±2px
```

Pointer ayrıldığında spring ile geri dön.

YAPMA:

```text
20px hareket
```

Bu bir oyun efekti olmamalı.

---

# 27. BUTTON PHYSICS

Hover:

```text
scale 1 → 1.015
glass highlight ↑
tint subtle ↑
```

Press:

```text
scale 1.015 → .985
```

Release:

spring.

Motion öneri:

```ts
{
  type: "spring",
  stiffness: 420,
  damping: 32,
  mass: 0.7
}
```

Değerler visual tuning sırasında değiştirilebilir.

---

# 28. GLASS MORPH

Liquid Glass hissinin önemli animasyonlarından biri.

Örneğin:

```text
icon button
    ↓ click
expanded control
```

Element:

- aynı fiziksel yüzeymiş gibi genişlesin.
- yeni DOM elemanı birden belirmesin.
- radius interpolate olsun.
- content stagger ile ortaya çıksın.

Motion `layout` / `layoutId`.

---

# 29. HOVER LENS

Future project preview veya önemli linklerde:

- pointer’ın bulunduğu noktada hafif lens highlight.
- content 1–2px optik displacement hissi.
- edge highlight.
- `scale: 1.005–1.015`.

Hover state bitince spring ile tamamen reset.

---

# 30. CURSOR YAKLAŞIMI

Custom cursor replacement YOK.

İsteğe bağlı:

```text
subtle pointer halo
```

Sadece:

```css
@media (hover: hover) and (pointer: fine)
```

Halo:

- 12–24px.
- düşük opacity.
- interactive element üstünde genişleyebilir.
- site cursor’un gerçek konumunu geciktirmemeli.
- native cursor kalmalı.

---

# 31. SCROLL PROGRESS

İnce klasik progress bar yerine:

Navbar içindeki küçük liquid indicator kullanılabilir.

Örnek:

```text
●
```

scroll ile dolum/ışık değişimi.

Alternatif:

capsule arka planında çok ince progress fill.

---

# 32. PAGE TRANSITION

Route transition:

```text
old page
opacity 1 → .96
scale 1 → .995

new page
opacity .96 → 1
translateY 8 → 0
```

Duration:

```text
300–500ms
```

Daha sinematik proje detail geçişleri shared element ile yapılabilir.

---

# 33. MICROINTERACTIONS

Uygulanacak örnekler:

### Nav link

- hover underline değil,
- glass indicator link altına fluid şekilde kayabilir.

### Theme toggle

Sun/moon crossfade yerine:

- glass knob position değiştirir,
- environment renkleri interpolate olur.

### Copy email

Click:

```text
Copy
↓
Copied ✓
```

Yüzey kısa süre accent tint alır.

### External link

Arrow:

```text
↗
```

hover’da:

```text
translate(2px,-2px)
```

### Accordion

height jump yok.

Smooth layout animation.

---

# 34. SECTION MİMARİSİ

Ana sayfa:

```text
01 Hero
02 Short Intro
03 Selected Work placeholder
04 Capabilities
05 Experience / Journey
06 About teaser
07 Contact
08 Footer
```

Ancak “Work” bölümü şu an project data olmadığı için altyapı düzeyinde hazırlanacak.

---

# 35. INTRO SECTION

Hero’dan sonra sitenin sesini belirleyen kısa editorial alan.

Layout:

desktop:

```text
small label               large statement
                          large statement
                          large statement
```

Örnek yapı:

```text
01 / ABOUT

I build thoughtful digital
experiences where engineering
and interaction meet.
```

Metin daha sonra `site.ts` üzerinden değiştirilebilir.

---

# 36. CAPABILITIES

Skill badge wall yapma.

Yani:

```text
React React React Node Mongo ...
```

görselinden kaçın.

Bunun yerine capability groups:

```text
Frontend Engineering
Backend & APIs
Interface Systems
Tools & Experiments
```

Her grup:

- 2–4 satır açıklama.
- küçük stack metadata.

Skill listesi destekleyici unsur.

---

# 37. EXPERIENCE / JOURNEY

Timeline olabilir ancak klasik dikey çizgi + bullet olmak zorunda değil.

Öneri:

```text
2026 ───────────────────── Current
         item
         item

2025 ─────────────────────
         item
```

Scroll ile year indicator yumuşak hareket edebilir.

Glass burada sadece aktif yıl indicator gibi functional elementte kullanılmalı.

---

# 38. ABOUT PAGE

About sayfası CV kopyası olmamalı.

Yapı:

```text
Large statement

Profile / philosophy

What I care about

How I work

Technology

Now / currently

Contact
```

Opsiyonel kişisel detaylar sonradan eklenebilir.

---

# 39. CONTACT

Contact bölümünün amacı form doldurtmak değil, iletişimi kolaylaştırmak.

Ana CTA:

```text
Let's build something.
```

veya kişiselleştirilebilir.

Glass action group:

```text
Email
GitHub
LinkedIn
CV
```

Email copy interaction.

---

# 40. FOOTER

Minimal.

İçerik:

```text
Yiğit Ata
Local time
GitHub
LinkedIn
Email
Back to top
```

Local time client side üretilebilir.

Footer arka planında dramatik ama düşük motion ambient gradient olabilir.

---

# 41. PROJECT GRID ALTYAPISI

Project data geldiğinde layout otomatik çalışmalı.

Desktop:

- monoton 3-column card grid yerine editorial rhythm.
- bazı featured project’ler full width olabilir.
- layout metadata üzerinden kontrol edilebilir.

Örneğin modele ileride:

```ts
layout?: "wide" | "standard" | "portrait";
```

eklenebilir.

Ancak şimdiden ProjectCard responsive layout sistemi bu genişlemeyi desteklemeli.

---

# 42. PROJECT CARD TASARIMI

Card:

- content-layer surface.
- aşırı glass kullanılmamalı.
- media ön planda.
- typography sade.

Hover:

```text
media scale: 1 → 1.025
surface lift: 0 → -3px
title: subtle movement
glass action: fade in
```

Kartın üzerinde hover sırasında küçük functional GlassPill belirebilir:

```text
View project ↗
```

---

# 43. PROJECT DETAIL TEMPLATE

Gerçek proje olmadan template hazırlanabilir.

Route:

```text
/work/:slug
```

Structure:

```text
Project Hero
Metadata
Context
Problem
Solution
Architecture
Challenges
Decisions
Gallery
Result
Next project
```

Ama veri yokken route render edilmeyecek.

---

# 44. DARK MODE

Dark mode sadece renkleri ters çevirmek değildir.

Dark mode’da:

- background çok saf siyah olmasın.
- glass highlight farklı hesaplanmalı.
- border opacity düşebilir.
- colored background luminosity kontrollü.
- text contrast yeterli olmalı.

Theme seçenekleri:

```text
system
light
dark
```

Preference `localStorage` ile persist.

---

# 45. RESPONSIVE TASARIM

## Mobile

```text
< 640px
```

- stacked layout,
- bottom dock,
- minimal parallax,
- no pointer effects,
- shorter animations,
- larger tap target.

## Tablet

```text
640–1024px
```

- hybrid layout,
- reduced cursor interactions,
- floating nav adaptation.

## Desktop

```text
> 1024px
```

- full motion,
- editorial grids,
- pointer interactions,
- optional enhanced refraction.

## Large Desktop

```text
> 1440px
```

Container unlimited büyümemeli.

Max text/container widths korunmalı.

---

# 46. TOUCH

Touch cihazlarda hover simüle etme.

Buttons:

```text
min 44x44px
```

Tercihen:

```text
48px
```

Press feedback:

```text
scale .98
tint
```

---

# 47. ACCESSIBILITY

Bu proje yüksek görsel kalite nedeniyle accessibility’den taviz vermemeli.

Zorunlu:

- semantic HTML,
- heading hierarchy,
- keyboard navigation,
- visible focus,
- focus trap modal,
- `aria-*` doğru kullanım,
- meaningful alt text,
- accessible names,
- reduced motion,
- sufficient contrast.

---

# 48. REDUCED MOTION

```css
@media (prefers-reduced-motion: reduce)
```

Devre dışı veya azalt:

- parallax,
- ambient motion,
- magnetic effect,
- large morph travel,
- scroll scrub,
- cursor halo,
- floating loops.

Korunabilir:

- 100–150ms opacity transition,
- state change feedback.

Reduced motion bir “bozuk tasarım modu” gibi görünmemeli.

---

# 49. REDUCED TRANSPARENCY FALLBACK

Web’de sistem seviyesinde her ortamda aynı preference API olmayabilir.

Bu nedenle:

- `@supports(backdrop-filter)` kontrolü.
- backdrop-filter yoksa daha opaque surface.
- contrast düşükse glass opacity otomatik artırılabilir.

Fallback:

```css
background: var(--bg-elevated);
border: 1px solid var(--hairline);
```

---

# 50. PERFORMANCE HEDEFLERİ

Hedef:

```text
LCP < 2.5s
INP < 200ms
CLS < 0.1
```

İyi bağlantı/modern cihaz ölçümlerinde mümkün olduğunca daha iyi.

---

# 51. ANIMATION PERFORMANCE

Tercih:

```text
transform
opacity
filter (kısıtlı)
```

Kaçın:

```text
top
left
width
height
margin
```

per-frame animasyonlarda.

`will-change` her yerde kullanılmayacak.

Sadece animasyon öncesi/geçici.

---

# 52. BACKDROP FILTER BÜTÇESİ

Backdrop blur pahalıdır.

Aynı viewport’ta:

```text
çok sayıda büyük blur surface oluşturma.
```

Özellikle mobile:

- blur radius düşür.
- glass surface sayısını azalt.
- large fixed blur surfaces kullanma.

Performance tier düşükse:

```text
blur → lower blur
refraction → disabled
ambient animation → static
```

---

# 53. PERFORMANCE TIER

Basit bir capability sistemi oluşturulabilir.

```ts
type PerformanceTier = "low" | "standard" | "high";
```

Belirleme sinyalleri:

- `prefers-reduced-motion`,
- touch/fine pointer,
- device memory destekleniyorsa,
- viewport,
- render capability.

Bu bir fingerprinting mekanizmasına dönüşmemeli.

Amaç sadece pahalı efektleri azaltmak.

---

# 54. LAZY LOADING

Project medyaları ileride:

- below fold lazy load.
- responsive image sizes.
- modern formats.
- poster image.
- video autoplay sadece gerekli ise.

Hero’nun kritik içeriği lazy load olmamalı.

---

# 55. IMAGE / VIDEO

İleride:

```text
AVIF
WebP
```

responsive `<picture>`.

Video:

```text
muted
playsInline
loop
```

sadece anlamlı olduğu durumlarda.

`prefers-reduced-motion` durumunda autoplay kapatılabilir.

---

# 56. MOTION TOKEN SYSTEM

`src/lib/motion.ts`

Örnek:

```ts
export const duration = {
  instant: 0.12,
  fast: 0.18,
  base: 0.32,
  slow: 0.52,
  cinematic: 0.8,
};

export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
};

export const spring = {
  responsive: {
    type: "spring",
    stiffness: 420,
    damping: 34,
    mass: 0.72,
  },
  soft: {
    type: "spring",
    stiffness: 260,
    damping: 28,
    mass: 0.9,
  },
};
```

Bütün motion component’leri bu tokenları kullansın.

---

# 57. MOTION INTENSITY

Animasyonlar üç yoğunlukta düşünülsün:

```text
micro
structural
cinematic
```

### Micro

Button, icon, focus.

```text
100–250ms
```

### Structural

Menu, accordion, card layout.

```text
250–500ms
```

### Cinematic

Hero, route transition, project transition.

```text
500–900ms
```

Cinematic animasyon aynı anda çok sayıda kullanılmamalı.

---

# 58. SPRING-FIRST

Interactive motion:

- fixed easing yerine çoğunlukla spring.

Özellikle:

- hover return,
- press,
- magnetic,
- morph,
- drag,
- glass controls.

Scroll-tied motion spring olmak zorunda değil.

---

# 59. SCROLL SMOOTHING

Default olarak browser native scrolling korunmalı.

Global smooth-scroll library zorunlu değil.

KULLANMA:

```text
scroll hijacking
aşırı inertia
wheel input değiştirme
```

GSAP ScrollTrigger native scroll ile çalışabilir.

Smooth scroll yalnızca anchor navigation’da CSS:

```css
scroll-behavior: smooth;
```

Reduced motion’da:

```css
scroll-behavior: auto;
```

---

# 60. HERO BACKGROUND ETKİSİ

Yeni nesil görünüm için hero’da optional `RefractionField`.

Ama:

- kullanıcı input’una sürekli aşırı tepki vermesin.
- siteyi WebGL demo’ya dönüştürmesin.

Öneri:

```text
ambient gradient field
+
subtle moving light
+
glass navbar
+
large typography
```

Bu kombinasyon yeterince modern olacaktır.

---

# 61. OPTIONAL WEBGL

Three.js / React Three Fiber yalnızca şu durumda eklenmeli:

> Gerçekten başka teknikle üretilemeyen tek bir güçlü interaction belirlenirse.

Default dependency olarak ekleme.

Eğer eklenirse:

- code split.
- lazy load.
- reduced motion fallback.
- mobile fallback.
- static poster fallback.
- low performance tier disable.

---

# 62. ANIMATION MATRIX

| Element | Load | Hover | Scroll | Press | Route |
|---|---|---|---|---|---|
| Navbar | materialize | highlight | morph | — | persistent |
| Hero title | reveal | — | subtle parallax | — | fade |
| CTA | reveal | magnetic | — | spring | — |
| Content heading | — | — | reveal | — | — |
| Project card | — | lens/lift | reveal | scale | shared |
| Glass dock | materialize | highlight | compact | spring | persistent |
| About text | — | — | line reveal | — | — |
| Contact CTA | — | magnetic | reveal | spring | — |

---

# 63. NAV INDICATOR

Aktif section indicator:

Bir linkten diğerine teleport etmesin.

Shared `layoutId` ile:

```text
Home → Work → About
```

fluid olarak kaymalı/morph olmalı.

Glass indicator:

- subtle.
- text readability bozmamalı.

---

# 64. SECTION REVEAL

Default reusable `Reveal`:

Props:

```ts
interface RevealProps {
  delay?: number;
  amount?: number;
  once?: boolean;
  direction?: "up" | "down" | "none";
}
```

Default:

```text
opacity: 0 → 1
y: 18 → 0
duration ~ 500ms
```

Her elemente farklı random animation verme.

---

# 65. STAGGER

Stagger sadece ilişkili gruplarda.

Örnek:

navigation links:

```text
35–50ms
```

capability rows:

```text
60ms
```

Her kelimeye 100ms stagger uygulama.

---

# 66. MASK TRANSITIONS

Büyük başlıklarda:

```css
overflow: clip;
```

Child:

```text
translateY(110%) → 0
```

veya `clip-path`.

Bu site genelindeki signature animation’lardan biri olabilir.

---

# 67. BLUR TRANSITIONS

Blur reveal:

```text
8px → 0
```

maksimum kısa süre.

Çok sayıda büyük element aynı anda filter blur animate etme.

Mobile’da opacity + transform fallback tercih et.

---

# 68. IMAGE REVEAL

Project medyaları geldiğinde:

```text
container clip
image scale 1.06 → 1
mask top/bottom
```

White flash / skeleton shimmer gereksiz.

---

# 69. LOADING EXPERIENCE

Tam ekran preloader default olarak YOK.

İlk content mümkün olduğunca hızlı görüntülensin.

Fonts:

- `font-display: swap`,
- kritik font sayısı düşük.

Site kullanıcıyı yapay bir intro ekranında bekletmemeli.

---

# 70. SKELETON

Sadece gerçek async content varsa.

Statik portfolio içeriğinde skeleton oluşturma.

---

# 71. THEME TRANSITION

Theme switch:

View Transition API destekleniyorsa:

- click origin’den radial reveal düşünülebilir.

Ama dramatik olmayan:

```text
250–450ms
```

Fallback:

CSS color transitions.

Reduced motion:

instant.

---

# 72. THEME TRANSITION DETAIL

İleri seviye opsiyon:

Theme toggle konumundan başlayan circular clip reveal:

```text
circle(0 at x y)
→
circle(maxRadius at x y)
```

View Transition pseudo elements üzerinde.

Bu signature interaction olabilir.

---

# 73. LIQUID GLASS STATE MODEL

Her interactive glass element:

```text
idle
hover
pressed
focused
expanded
disabled
```

Bu state’lerin görsel davranışı tanımlı olmalı.

### Idle

```text
neutral transparency
```

### Hover

```text
highlight increases
subtle tint
scale 1.01
```

### Pressed

```text
scale .985
surface feels denser
```

### Focus

```text
high-contrast focus ring
```

### Expanded

```text
surface morph
```

### Disabled

```text
no glass motion
lower contrast
```

---

# 74. GLASS HIGHLIGHT PHYSICS

Pointer yakınlığıyla highlight strength değişebilir.

Ama pointer’ın tam peşinden gecikmeli “goo” efekti yapma.

Hedef:

```text
fast response
soft decay
```

---

# 75. COLOR ADAPTATION

Glass yüzey bulunduğu background’a göre gerçekten pixel sampling yapmak zorunda değil.

Web’de daha güvenilir yöntem:

Section context:

```html
<section data-environment="cool">
<section data-environment="neutral">
<section data-environment="warm">
```

Glass ilgili section’a göre küçük tint token alabilir.

---

# 76. LIGHT / DARK ADAPTATION

Glass component:

```ts
variant
environment
theme
interactionState
```

üzerinden görünüm hesaplayabilir.

Hard-coded:

```text
white glass always
```

kullanma.

---

# 77. CONTENT WIDTH

Large desktop:

```text
max-width: 1440–1600px
```

Body text:

```text
max-width: 65ch
```

Large editorial statement:

```text
max-width: 18–24ch
```

---

# 78. GRID

Desktop:

```text
12-column grid
```

Tablet:

```text
8
```

Mobile:

```text
4
```

Ama CSS grid class’ları tasarımın görünür parçası olmak zorunda değil.

---

# 79. HERO GRID

Desktop örnek:

```text
| title title title title title title title title |
|             meta        statement               |
|             meta        actions                 |
```

Asimetrik ama dengeli.

---

# 80. SECTION LABELS

Section labels küçük monospace olabilir:

```text
01 / WORK
02 / CAPABILITIES
03 / ABOUT
```

Bunlar teknik/editorial kimliği destekler.

Ana başlık monospace olmamalı.

---

# 81. ICONOGRAPHY

İkonlar:

- basit,
- stroke-based,
- tutarlı weight.

Lucide kullanılabilir.

İkon sayısını azalt.

Arrow / external / theme / menu / close gibi gerçek ihtiyaçlarda kullan.

---

# 82. ICON ANIMATION

Hover:

- stroke morph gerekiyorsa çok sınırlı.
- çoğunlukla transform yeterli.

Menu icon → close icon morph yapılabilir.

---

# 83. FOCUS DESIGN

Browser outline tamamen kaldırılmayacak.

Custom focus:

```css
:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 4px;
}
```

Glass üzerinde focus ring yeterince görünür olmalı.

---

# 84. SELECTION

Text selection özelleştirilebilir:

```css
::selection {
  background: var(--accent-soft);
  color: var(--text-primary);
}
```

---

# 85. SCROLLBAR

Aşırı custom scrollbar yapma.

Gerekirse minimal.

Firefox ve WebKit uyumlu.

Scrollbar usability bozulmasın.

---

# 86. EMPTY PROJECT STATE

Development ortamında:

```text
Work system ready.
Projects will be injected from projects.ts.
```

Production’da gerçek proje yoksa section tamamen gizlenebilir.

Bu davranış config ile kontrol edilsin.

---

# 87. SITE CONFIG

`src/data/site.ts`

Örnek:

```ts
export const site = {
  name: "Yiğit Ata",
  title: "Software Developer",
  location: "Eskişehir, Türkiye",

  description:
    "I build thoughtful digital experiences where engineering and interaction meet.",

  email: "",
  github: "",
  linkedin: "",

  availability: true,
};
```

Sensitive veya bilinmeyen verileri uydurma.

---

# 88. NAVIGATION CONFIG

```ts
export const navigation = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work", requiresProjects: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];
```

`requiresProjects` runtime’da kontrol edilebilir.

---

# 89. URL / ROUTING

Öneri:

```text
/
/about
/work/:slug
```

Ek route’lar ihtiyaç oluşmadan eklenmesin.

---

# 90. SEO

Zorunlu:

- title,
- description,
- canonical,
- Open Graph,
- Twitter/X cards,
- structured metadata gerektiğinde,
- sitemap,
- robots,
- project detail unique metadata.

Project data daha sonra geldiğinde metadata otomatik üretilsin.

---

# 91. SOCIAL PREVIEW

Default OG visual daha sonra üretilebilir.

Şimdilik yapı hazır olsun.

OG:

```text
name
role
site URL
subtle liquid environment
```

---

# 92. SEMANTIC HTML

Örnek:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Div soup oluşturma.

---

# 93. ANCHOR NAVIGATION

Section anchors:

```text
#work
#about
#contact
```

Floating navbar sticky/fixed olduğundan:

```css
scroll-margin-top
```

kullan.

---

# 94. MOTION + ACCESSIBILITY TESTLERİ

Test scenarios:

1. Mouse + desktop.
2. Keyboard only.
3. Touch iPhone-size.
4. Tablet landscape.
5. `prefers-reduced-motion`.
6. Dark mode.
7. 200% zoom.
8. Slow CPU throttling.
9. backdrop-filter unsupported fallback.
10. JS temporarily delayed.

---

# 95. BROWSER TESTLERİ

Minimum:

```text
Safari current
Chrome current
Firefox current
Edge current
iOS Safari
Android Chrome
```

Modern feature’ler progressive enhancement.

---

# 96. PERFORMANCE TESTLERİ

Lighthouse sadece skor almak için optimize edilmemeli.

Özellikle kontrol:

- main thread long tasks,
- layout shifts,
- excessive layer count,
- large blur regions,
- unused JS,
- image payload,
- font payload.

---

# 97. GLASS DEBUG MODE

Development için opsiyonel debug class:

```text
?debugGlass=1
```

veya dev-only flag.

Göstersin:

- glass bounds,
- active backdrop surfaces,
- performance tier,
- reduced motion state.

Production’da kapalı.

---

# 98. MOTION DEBUG MODE

Dev-only:

```text
motion speed x0.25
motion speed x2
disable motion
```

gibi test toggle’ları yararlı olabilir.

Production UI’a koyma.

---

# 99. COMPONENT API KURALI

Görsel component’e rastgele class string geçip design system’ı delme.

Örnek:

```tsx
<GlassButton variant="primary" size="md">
```

Tercih edilir.

Şundan kaçın:

```tsx
<GlassButton className="bg-white/80 blur-[37px] rounded-[31px] ...">
```

---

# 100. CSS STRATEJİSİ

Tailwind kullanılsa bile karmaşık Liquid Glass ve animation stilleri ayrı CSS layer’larında tutulabilir.

Öneri:

```text
tokens.css
glass.css
motion.css
```

Utility class içine yüzlerce custom arbitrary value doldurma.

---

# 101. DESIGN TOKEN KATEGORİLERİ

Tanımlanacak:

```text
colors
spacing
radius
typography
shadow
blur
z-index
motion
container width
breakpoints
```

---

# 102. Z-INDEX

Örnek:

```css
--z-base: 0;
--z-content: 10;
--z-sticky: 30;
--z-nav: 50;
--z-popover: 70;
--z-modal: 90;
--z-toast: 100;
```

Rastgele `z-index: 99999` kullanma.

---

# 103. ELEVATION

Elevation sadece shadow miktarı değil.

Kombinasyon:

```text
position
blur
border
contrast
shadow
movement
```

Glass functional layer content’ten açıkça ayrılmalı.

---

# 104. SHADOW

Apple-like softness için birden fazla düşük opacity shadow kullanılabilir.

Ama aşırı diffuse shadow siteyi bulanık yapmasın.

---

# 105. BORDERS

Glass edge:

- 1px.
- light mode’da üst edge daha aydınlık.
- dark mode’da daha düşük opacity.

Gradient border kullanılabilir fakat çok sınırlı.

---

# 106. LIQUID EDGE

Experimental pseudo-element:

```text
upper specular edge
lower darker edge
```

Glass’ın kalınlığı varmış hissi verir.

---

# 107. AMBIENT LIGHT TOKEN

```css
--ambient-x
--ambient-y
--ambient-strength
```

İleride global pointer light için kullanılabilir.

Bütün elementler aynı anda pointer takip etmemeli.

---

# 108. INTERACTION PRIORITY

En fazla attention:

1. Hero CTA.
2. Navigation.
3. Project cards.
4. Contact CTA.

Diğer her UI bunlardan daha sakin.

---

# 109. SCROLL STORYTELLING

Eğer özel bir section oluşturulacaksa örnek:

```text
Capabilities
```

Scroll sırasında sticky left label ve sağda capabilities geçebilir.

Ama tüm site “sticky scroll presentation” olmamalı.

---

# 110. CONTENT MOTION

Scroll sırasında text’i skew/rotate yapmak sadece büyük decorative headinglerde kullanılabilir.

Body text asla okunurken deform olmamalı.

---

# 111. DEPTH

Hafif 3D perspective:

```text
perspective: 1000px
rotateX/Y <= 1.5deg
```

Project preview’da opsiyonel.

Mobile disable.

---

# 112. TILT

Classic 15 derece card tilt YOK.

Varsa:

```text
max 1–2deg
```

ve sadece large preview.

---

# 113. SCROLL VELOCITY

Velocity reactive motion kullanılacaksa yalnızca decorative heading veya background elementte.

Örneğin:

```text
rotation ±1deg
translate ±8px
```

Body veya nav’da kullanma.

---

# 114. MARQUEE

Sürekli kayan teknoloji logosu marquee’si kullanma.

Bu trend portföyleri birbirine benzetiyor.

---

# 115. BENTO

Bento sadece içerik doğal olarak farklı boyutlu modüller gerektiriyorsa.

Capabilities için kullanılabilir ama zorunlu değil.

---

# 116. CAROUSEL

Project listesi carousel olmak zorunda değil.

Mouse drag gerektiren horizontal carousel ana work navigasyonu yapılmasın.

Content discoverability korunmalı.

---

# 117. FOLD

Hero ilk viewport’u tamamen kaplayabilir.

Ancak altta içerik olduğuna dair hafif bir visual cue ver:

```text
scroll indicator
partial next-section reveal
```

---

# 118. SCROLL INDICATOR

Klasik bouncing mouse icon kullanma.

Daha sade:

```text
Scroll
↓
```

veya ince liquid dot.

---

# 119. CONTACT CTA SIGNATURE

Contact section’da büyük bir CTA yüzeyi:

Content layer büyük typography.

Glass action yüzeyi cursor yaklaşınca aktive olur.

Bu section sitenin ikinci signature interaction’ı olabilir.

---

# 120. SIGNATURE INTERACTIONS

Siteyi benzersiz yapan en fazla 3 imza davranış:

## Signature 1
Adaptive floating Liquid Glass navigation.

## Signature 2
Theme transition / environment transition.

## Signature 3
Project card → detail shared-element transition.

Dördüncü, beşinci “wow effect” zorunlu değil.

---

# 121. GÖRSEL DENGE

Bir ekran:

```text
80% sakin
20% dikkat çekici
```

olmalı.

Tersi değil.

---

# 122. APPLE'DAN ALINACAK, KOPYALANMAYACAK ŞEYLER

Al:

- content focus,
- spatial hierarchy,
- layered materials,
- responsive interaction,
- spring feel,
- restraint,
- clarity,
- adaptive glass,
- edge-to-edge content,
- concentric geometry.

Kopyalama:

- Apple.com page sections,
- Apple navigation birebiri,
- Apple product hero,
- Apple logos,
- Apple icon assets,
- proprietary type assets.

---

# 123. LIGHT MODE MOOD

```text
mist / pearl / soft blue
```

Background beyaz değil, hafif soğuk neutral.

Accent küçük oranlarda.

---

# 124. DARK MODE MOOD

```text
graphite / midnight / deep blue
```

Saf #000 kullanma.

Glass highlight daha kontrollü.

---

# 125. COLOR RATIO

Yaklaşık:

```text
80% neutral
15% secondary environment
5% accent
```

Accent her yerde kullanılmamalı.

---

# 126. DESIGN QA SORULARI

Her component için sor:

1. Bu gerçekten glass olmalı mı?
2. Bu animasyon anlam taşıyor mu?
3. Motion kapatılırsa UX hâlâ iyi mi?
4. Hover olmayan cihazda çalışıyor mu?
5. Klavyeyle kullanılabiliyor mu?
6. Bu effect content’i geri plana itiyor mu?
7. Performans maliyeti değer mi?
8. Template hissi veriyor mu?
9. Aynı görev için zaten başka primitive var mı?
10. Daha sade yapılabilir mi?

---

# 127. IMPLEMENTATION PHASES

Codex projeyi şu sırayla uygulasın.

## Phase 1 — Foundation

Kur:

```text
React
TypeScript
Vite
routing
base CSS
font strategy
tokens
theme
```

Henüz ağır animasyon ekleme.

Acceptance:

- responsive shell,
- light/dark,
- semantic page layout.

---

## Phase 2 — Layout System

Kur:

```text
Container
Section
PageShell
grid
responsive behavior
```

Acceptance:

- tüm breakpoint’lerde stabil layout.
- CLS olmamalı.

---

## Phase 3 — Glass Primitives

Kur:

```text
GlassSurface
GlassButton
GlassPill
GlassDock
GlassPopover
```

Acceptance:

- light/dark.
- fallback.
- keyboard focus.
- touch.
- fine pointer highlight.

---

## Phase 4 — Motion Foundation

Kur:

```text
motion tokens
Reveal
Stagger
Magnetic
layout transition helpers
reduced motion
```

Acceptance:

- motion central config.
- component bazında rastgele değer yok.

---

## Phase 5 — Navigation

Desktop floating nav.

Mobile glass dock.

Acceptance:

- active indicator morph.
- scroll behavior.
- keyboard.
- safe area.
- reduced motion.

---

## Phase 6 — Hero

Kur:

```text
hero typography
ambient field
CTA
intro choreography
```

Acceptance:

- mobile layout.
- no forced loader.
- intro interruptible.
- reduced motion.

---

## Phase 7 — Main Sections

Kur:

```text
Intro
Capabilities
Experience
About teaser
Contact
Footer
```

Gerçek project content yok.

---

## Phase 8 — Project Infrastructure

Kur:

```text
Project type
empty projects data
ProjectGrid
ProjectCard
ProjectDetail template
route skeleton
shared-transition hooks
```

Acceptance:

- `projects=[]` ile hata yok.
- fake project oluşturma.

---

## Phase 9 — Advanced Motion

Ekle:

- scroll-linked effects,
- nav morph,
- theme transition,
- pointer specular highlights,
- optional light refraction.

Her feature ayrı ölçülmeli.

---

## Phase 10 — Performance Pass

Kontrol:

- bundle,
- blur surfaces,
- animation frame cost,
- mobile,
- LCP,
- CLS,
- INP.

---

## Phase 11 — Accessibility Pass

Keyboard + reduced motion + contrast + screen reader.

---

## Phase 12 — Polish

Sadece temel UX tamamen bittikten sonra:

- grain,
- tiny lighting details,
- microinteractions,
- subtle optical effects.

---

# 128. CODEX ÇALIŞMA KURALI

Her phase sonrasında:

1. değişen dosyaları listele.
2. yapılanları kısa özetle.
3. varsa technical debt yaz.
4. build/test çalıştır.
5. hata varsa düzeltmeden diğer phase’e geçme.

Ancak kullanıcı açıkça “tek seferde uygula” derse tüm phase’ler aynı görev içinde tamamlanabilir.

---

# 129. LINT / FORMAT / TYPES

Zorunlu:

```text
TypeScript strict
ESLint
Prettier veya eşdeğer format
```

`any` yalnızca gerçekten zorunlu ise.

---

# 130. TEST

Minimum:

- component smoke tests,
- nav interaction,
- theme persistence,
- project empty state,
- reduced motion logic.

E2E:

- home render,
- navigation,
- about,
- contact action,
- mobile dock.

---

# 131. VISUAL REGRESSION

Mümkünse Playwright screenshots:

```text
mobile light
mobile dark
desktop light
desktop dark
reduced motion
```

---

# 132. NO-JS GRACEFULNESS

Site React uygulaması olduğundan tam no-JS deneyimi zorunlu değil.

Fakat:

- core content server/static output ile mümkün olduğunca erişilebilir olsun.
- animation failure content’i görünmez bırakmasın.

Örneğin JS yüklenmezse `opacity:0` kalan element olmamalı.

---

# 133. ERROR HANDLING

Project slug bulunamazsa:

```text
404 / graceful not found
```

Broken media siteyi patlatmamalı.

---

# 134. CONSOLE

Production:

- console errors yok.
- React warnings yok.
- missing key yok.
- hydration issue yok (SSR kullanılacaksa).

---

# 135. PACKAGE BÜTÇESİ

Bir dependency eklemeden önce:

```text
Bunu native CSS/Web API ile yapabilir miyiz?
```

sor.

Örnek:

- tooltip için dev kütüphane zorunlu değil.
- simple intersection için animation library gerekmeyebilir.

---

# 136. GSAP KULLANIM KURALI

GSAP sadece:

- complex timeline,
- pin,
- scrub,
- sequence choreography

gerekirse.

Simple button hover GSAP ile yapılmayacak.

---

# 137. MOTION KULLANIM KURALI

Motion:

- UI state,
- layout,
- spring,
- gesture,
- enter/exit,
- shared element

için ana araç.

---

# 138. CSS ANIMATION KULLANIMI

CSS:

- ambient subtle loops,
- simple hover,
- scroll-driven native effect,
- pseudo-element highlight

için ideal.

---

# 139. VIEW TRANSITION FEATURE DETECTION

Pseudo:

```ts
const supportsViewTransitions =
  typeof document !== "undefined" &&
  "startViewTransition" in document;
```

Unsupported ise normal route + Motion fallback.

---

# 140. FINE POINTER FEATURE DETECTION

CSS:

```css
@media (hover: hover) and (pointer: fine) {
  /* magnetic/specular pointer enhancements */
}
```

Touch’ta JS hover hack kullanma.

---

# 141. SAFE AREA

Mobile dock:

```css
padding-bottom:
  calc(10px + env(safe-area-inset-bottom));
```

---

# 142. MOBILE VH

Hero:

```text
100svh
```

gibi modern viewport units değerlendir.

Klasik `100vh` adres bar sorunlarına dikkat.

---

# 143. CONTAINER QUERIES

Reusable components viewport yerine kendi container’ına göre adapte olabilir.

Özellikle:

- project card,
- capability module,
- contact block.

---

# 144. DESIGN SYSTEM STORY

Component’leri ayrı bir `/lab` route’unda development sırasında göstermek faydalı olabilir.

Örnek:

```text
/lab
```

Production build’de gizlenebilir.

İçerir:

- GlassSurface variants.
- buttons.
- motion.
- type scale.
- colors.
- states.

---

# 145. LAB SAYFASI

Dev-only visual test alanı:

```text
Glass Regular
Glass Clear
Glass Strong
Hover
Pressed
Focus
Dark
Light
Reduced Motion
```

Bu Liquid Glass tuning’i hızlandırır.

---

# 146. ENVIRONMENT SYSTEM

Background environment component API:

```ts
<AmbientField
  mood="cool"
  intensity="subtle"
/>
```

Mood ileride section bazlı değişebilir.

---

# 147. SECTION ENVIRONMENT TRANSITION

Bir section’dan diğerine geçerken background renkleri birden değişmesin.

Scroll progress ile:

```text
neutral → cool → neutral
```

çok hafif interpolate olabilir.

Reduced motion’da section boundary’de statik switch.

---

# 148. GLASS TINT

Accent tint yalnızca:

- selected item,
- primary action,
- success feedback

gibi semantik state’lerde.

Dekoratif her glass elemanı mavi yapma.

---

# 149. STATUS PILL

Hero veya nav içinde opsiyonel:

```text
Available / Building / Open to opportunities
```

GlassPill kullanılabilir.

Pulse animation:

- sürekli yanıp sönme YOK.
- en fazla çok hafif breathing opacity.
- reduced motion static.

---

# 150. LOCAL TIME

Footer’da küçük:

```text
ESK 14:32
```

veya daha açık:

```text
Local time — 14:32
```

JS ile Europe/Istanbul timezone kullanılabilir.

---

# 151. COPY EMAIL

Clipboard API.

Başarılı:

```text
Copied
```

1.5–2 sn sonra normal state.

Clipboard unavailable fallback:

email link.

---

# 152. CONTACT FORM

İlk sürümde zorunlu değil.

Simple email CTA daha iyi.

Form sonradan eklenebilir.

---

# 153. CV

CV linki daha sonra `site.ts` config’e eklensin.

Dosya bilinmiyorsa fake link oluşturma.

---

# 154. ANALYTICS

Varsayılan olarak analytics ekleme.

Kullanıcı daha sonra isterse privacy-friendly analytics seçilebilir.

---

# 155. COOKIES

Analytics/trackers olmadığı sürece gereksiz cookie banner ekleme.

---

# 156. SECURITY

External links:

```text
rel="noopener noreferrer"
```

User-generated HTML render etme.

---

# 157. CONTENT SECURITY

İleride external embed eklenirse CSP planla.

Şimdilik gereksiz complexity ekleme.

---

# 158. SOURCE MAP / PROD

Production build standart güvenli config.

Secrets frontend’e konulmaz.

---

# 159. DEPLOYMENT READY

Proje:

```text
npm run dev
npm run build
npm run preview
npm run lint
npm run test
```

komutlarıyla çalışmalı.

Vercel/Netlify/static hosting uyumlu olması tercih edilir.

---

# 160. README

Proje README’sinde:

- setup,
- commands,
- architecture,
- project adding guide,
- design system notes,
- animation guidelines

olsun.

Bu master spec’in tamamını README’ye kopyalama.

---

# 161. PROJECT EKLEME REHBERİ

README içinde ayrı bölüm:

```text
Adding a project
```

Sadece:

1. assets ekle.
2. `projects.ts` içine object ekle.
3. gerekli case study alanlarını doldur.
4. build.
5. accessibility alt text kontrol.

Global layout değiştirmek gerekmemeli.

---

# 162. GELECEKTE CODEX’E VERİLECEK PROJE PROMPT ŞABLONU

Daha sonra şu format kullanılabilir:

```text
Mevcut PORTFOLIO_MASTER_SPEC.md kurallarını değiştirme.

Aşağıdaki projeyi mevcut Project veri modeline ekle:

Project:
...

Bu proje için:
- projects.ts kaydını oluştur,
- gerekli assetleri bağla,
- case study içeriğini ekle,
- mevcut ProjectCard ve ProjectDetail componentlerini kullan,
- global design system veya navigation mimarisini değiştirme,
- gerekiyorsa sadece project-specific interactive demo component oluştur.
```

---

# 163. GELECEKTE ÖZEL PROJECT DEMO

Bir proje için interactive preview istenirse:

```text
src/projects/demos/<slug>/
```

altında tutulabilir.

Bu demo:

- lazy loaded,
- isolated,
- project data tarafından referanslanabilir.

---

# 164. INTERACTIVE PREVIEW INTERFACE

İleride model:

```ts
interactivePreview?: {
  componentKey: string;
}
```

gibi genişletilebilir.

Dynamic component registry:

```ts
const previews = {
  ...
};
```

Bu şu anda boş kalmalı.

---

# 165. FINAL ACCEPTANCE CHECKLIST

Tasarım tamamlandığında aşağıdakilerin hepsi doğru olmalı:

- [ ] Site template gibi görünmüyor.
- [ ] Liquid Glass blur’dan ibaret değil.
- [ ] Content ve functional layer birbirinden ayrılıyor.
- [ ] Navbar gerçek bir floating glass surface.
- [ ] Mobile için ayrı navigation davranışı var.
- [ ] Light ve dark mode özenli.
- [ ] Motion token sistemi var.
- [ ] Reduced motion var.
- [ ] Fine-pointer efektleri touch’ta kapalı.
- [ ] View Transitions progressive enhancement.
- [ ] Project architecture data driven.
- [ ] Gerçek project data şu aşamada yok.
- [ ] Empty project state hata üretmiyor.
- [ ] Hero güçlü ama okunaklı.
- [ ] Typography tasarımın ana parçası.
- [ ] Accessibility kontrolleri tamam.
- [ ] Backdrop blur performans bütçesi korunuyor.
- [ ] Site mobile’da akıcı.
- [ ] Scroll hijacking yok.
- [ ] Fullscreen fake loader yok.
- [ ] Console error yok.
- [ ] TypeScript strict.
- [ ] Production build başarılı.

---

# 166. “BU SİTE NASIL HİSSETMELİ?” TESTİ

Son tasarım için beş soruluk test:

### 1.

Screenshot alındığında güzel mi?

**Evet olmalı.**

### 2.

Mouse hareket ettirildiğinde fiziksel tepki veriyor mu?

**Evet, fakat küçük ve kontrollü.**

### 3.

Scroll edildiğinde içerik anlatımı gelişiyor mu?

**Evet.**

### 4.

Bütün animasyonlar kapatıldığında hâlâ güçlü bir tasarım mı?

**Kesinlikle evet.**

### 5.

Başka bir developer portfolio template’ine benziyor mu?

**Hayır.**

---

# 167. REFERANS PRENSİPLER

Bu spesifikasyon aşağıdaki güncel yaklaşımları dikkate alır:

- Apple Human Interface Guidelines — Materials / Liquid Glass.
- Apple Developer — Liquid Glass technology overview.
- Apple WWDC — Meet Liquid Glass.
- Apple WWDC — Get to know the new design system.
- Apple 2026 Design Principles.
- MDN — View Transition API.
- MDN — CSS Scroll-driven Animations.
- Motion for React — gestures, springs, layout animation, AnimateView.
- GSAP ScrollTrigger — kompleks scroll choreography.

Bu kaynakların tasarım ilkelerini uygula; herhangi bir web sitesini veya Apple arayüzünü birebir kopyalama.

---

# 168. CODEX’E VERİLECEK BAŞLANGIÇ PROMPTU

Aşağıdaki metin ilk implementasyon görevinde doğrudan kullanılabilir:

```text
Repository içinde PORTFOLIO_MASTER_SPEC.md dosyasını tamamen oku ve bu dosyayı
projenin ana tasarım/teknik source-of-truth dokümanı olarak kabul et.

Bu dokümandaki bütün kuralları uygulayarak portföy sitesinin temel sürümünü oluştur.

Öncelikler:
1. React + TypeScript + Vite mimarisini kur.
2. Semantic, responsive layout oluştur.
3. Design token sistemini kur.
4. Light/dark theme sistemini oluştur.
5. Liquid Glass primitive componentlerini oluştur.
6. Floating desktop navigation ve mobile glass dock geliştir.
7. Hero, intro, capabilities, experience, about teaser, contact ve footer yapılarını oluştur.
8. Motion tokenları ve reusable animation primitives geliştir.
9. View Transition API'yi progressive enhancement olarak kullan.
10. Reduced motion ve accessibility kurallarını uygula.
11. Project altyapısını tamamen hazırla ancak gerçek proje ekleme.
12. projects.ts boş array olarak kalsın.
13. ProjectGrid, ProjectCard ve ProjectDetail template sistemini hazırla.
14. Proje olmadığı durumda production UI'ın bozulmamasını sağla.
15. Advanced glass ve pointer efektlerini performans bütçesine göre progressive enhancement ile uygula.
16. Build, lint ve mevcut testleri çalıştırıp bütün hataları düzelt.

Tasarım amacı:
Apple Liquid Glass yaklaşımından ilham alan ancak Apple UI'ını kopyalamayan;
content-first, spatial, fluid, premium, sakin ve yeni nesil bir web deneyimi.

Özellikle kaçın:
- klasik glassmorphism template,
- her yerde blur,
- hacker/terminal tema,
- neon cyberpunk,
- aşırı parallax,
- scroll hijacking,
- gereksiz loading screen,
- her elemente animasyon,
- gerçek project data uydurmak.

Uygulama sonunda:
- değiştirdiğin/oluşturduğun dosyaları özetle,
- kullanılan mimariyi açıkla,
- çalıştırdığın build/test sonuçlarını belirt,
- varsa bilinçli olarak ertelediğin optional efektleri listele.
```

---

# 169. SON TASARIM PRENSİBİ

Bu sitenin amacı “ne kadar fazla efekt yapılabildiğini” göstermek değildir.

Amaç:

> **Az sayıda iyi seçilmiş etkileşimle, arayüzün ışık, hareket, katman ve içerikle fiziksel bir nesneymiş gibi davranmasını sağlamak.**

Liquid Glass hissi:

```text
blur
```

değildir.

Liquid Glass hissi:

```text
content
+ hierarchy
+ material
+ light
+ depth
+ motion
+ interaction
+ restraint
```

bütünüdür.

Bu dokümandaki bütün teknik ve görsel kararlar bu ilkeye hizmet etmelidir.
