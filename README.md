# 🎨 Artify — Digital Art Gallery Frontend

> **Where Art Meets Innovation** — A visually rich, single-page Angular application for discovering, browsing, and celebrating digital creativity.

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Live Preview & Screenshots](#-live-preview--screenshots)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Folder Structure](#-folder-structure)
- [Core Modules & Configuration](#-core-modules--configuration)
- [Components (Deep Dive)](#-components-deep-dive)
  - [AppComponent (Root)](#1-appcomponent--root)
  - [NavbarComponent](#2-navbarcomponent)
  - [HeroSectionComponent](#3-herosectioncomponent)
  - [ArtworkCarouselComponent](#4-artworkcarouselcomponent)
  - [ArtistSpotlightComponent](#5-artistspotlightcomponent)
  - [CommunitySectionComponent](#6-communitysectioncomponent)
  - [ArtworkModalComponent](#7-artworkmodalcomponent)
  - [FooterComponent](#8-footercomponent)
- [Data Layer: Models & Services](#-data-layer-models--services)
  - [Artwork Model](#artwork-model)
  - [Artist Model](#artist-model)
  - [ArtworkService](#artworkservice)
- [Styling System](#-styling-system)
  - [Global Design Tokens (CSS Variables)](#global-design-tokens-css-variables)
  - [Key Global CSS Classes](#key-global-css-classes)
  - [Dark Mode / Light Mode](#dark-mode--light-mode)
  - [Animation System (AOS)](#animation-system-aos)
- [Third-Party Libraries](#-third-party-libraries)
- [Assets](#-assets)
- [Build Configuration](#-build-configuration)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Building for Production](#building-for-production)
- [Available Scripts](#-available-scripts)
- [Known Limitations & Future Improvements](#-known-limitations--future-improvements)

---

## 🖼️ About the Project

**Artify** is a front-end single-page application (SPA) built with **Angular 17**. It simulates a premium digital art gallery platform where users can:

- **Browse featured artworks** in an auto-playing, interactive carousel
- **Discover artists** through a spotlight section with profile cards
- **View artist collections** via a modal gallery
- **Join the community** by submitting their email via a reactive form
- **Switch between Dark Mode and Light Mode** with their preference persisted in `localStorage`

The app uses a deep-space aesthetic (dark purple/violet gradient background) by default, with smooth scroll navigation between sections, glassmorphism-style cards, neon accent buttons, and scroll-triggered animations via the AOS (Animate On Scroll) library.

There is **no backend or API** — all data (artworks, artists) is declared as in-memory arrays inside the Angular service, making the app entirely self-contained and deployable as a static site.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Angular** | ~17.3.0 | Core SPA framework |
| **TypeScript** | ~5.3.3 | Statically typed language |
| **SCSS (Sass)** | ^1.93.3 | Component & global styling |
| **Bootstrap** | ^5.3.3 | Grid system, utility classes, responsive layout |
| **Bootstrap Icons** | ^1.13.1 | Icon font (sun, moon, discord, twitter, instagram) |
| **ng-bootstrap** | ^16.0.0 | Angular-native Bootstrap modals (`NgbModal`, `NgbActiveModal`) |
| **ngx-toastr** | ^17.0.2 | Toast notification pop-ups |
| **AOS (Animate On Scroll)** | ^2.3.4 | Scroll-triggered entry animations |
| **RxJS** | ~7.8.1 | Reactive programming (`Observable`, `of`) |
| **Zone.js** | ~0.14.0 | Angular change detection |
| **Google Fonts (Poppins)** | — | Typography |

---

## 🏗️ Project Architecture

Artify follows the **standard Angular Module-based architecture** (NgModule pattern, not standalone components). The application has a single root module (`AppModule`) that declares all components and imports all required third-party modules.

```
Browser
  └── index.html  ← SPA shell
        └── <app-root>  ← AppComponent bootstrap target
              ├── <app-navbar>       ← Fixed top navigation + dark/light toggle
              └── <main>
                    ├── <section id="home">
                    │     └── <app-hero-section>
                    ├── <section id="artworks">
                    │     └── <app-artwork-carousel>
                    ├── <section id="artists">
                    │     └── <app-artist-spotlight>
                    └── <section id="community">
                          └── <app-community-section>
              └── <app-footer>
```

**Data flow:**
- `ArtworkService` holds all in-memory artwork and artist data
- Components call service methods that return `Observable<T>` (using RxJS `of()`)
- Components subscribe to observables and bind data to templates
- `NgbModal` is used to display artist collection galleries as overlays
- Theme state is managed in `AppComponent` and communicated to `NavbarComponent` via Angular `@Input`/`@Output`

---

## 📁 Folder Structure

```
Artify_Frontend/
│
├── angular.json                    # Angular CLI workspace configuration
├── package.json                    # npm dependencies and scripts
├── package-lock.json               # Locked dependency tree
├── tsconfig.json                   # Base TypeScript compiler options
├── tsconfig.app.json               # App-specific TypeScript overrides
│
└── src/
    ├── index.html                  # SPA HTML shell (mounts <app-root>)
    ├── main.ts                     # Angular bootstrap entry point
    ├── polyfills.ts                # Browser polyfills
    ├── styles.scss                 # GLOBAL styles, CSS variables, dark mode, animations
    ├── README.txt                  # Minimal legacy note
    │
    ├── assets/
    │   └── images/                 # All image assets (32 files)
    │       ├── Ava Sinclair.png    # Artist portrait
    │       ├── Leo Nakamura.png    # Artist portrait
    │       ├── Maya Rios.png       # Artist portrait
    │       ├── Noah Vale.png       # Artist portrait
    │       ├── horaizon.png        # Carousel artwork - "Neon Dreams"
    │       ├── dream.png           # Carousel artwork - "Digital Horizon"
    │       ├── tree.png            # Carousel artwork - "Ethereal Bloom"
    │       ├── ai1.png / ai2.png / ai3.png       # Ava Sinclair's collection
    │       ├── tec1.png / tec2.png / tec3.png    # Leo Nakamura's collection
    │       ├── digi1.png / digi2.png / digi3.png # Maya Rios's collection
    │       ├── sim1.png / sim2.png / sim3.png    # Noah Vale's collection
    │       ├── art1.jpg .. art4.jpg              # Service artwork images
    │       └── art1_thumb.jpg .. art4_thumb.jpg  # Thumbnail variants
    │
    └── app/
        ├── app.module.ts           # Root NgModule — declarations + imports
        ├── app.component.ts        # Root component: theme control, AOS init
        ├── app.component.html      # Root template: page layout scaffolding
        ├── app.component.scss      # Root component scoped styles
        │
        ├── models/
        │   ├── artwork.model.ts    # Artwork TypeScript interface
        │   └── artist.model.ts     # Artist TypeScript interface
        │
        ├── services/
        │   └── artwork.service.ts  # In-memory data provider (artworks + artists)
        │
        └── components/
            ├── navbar/
            │   ├── navbar.component.ts
            │   ├── navbar.component.html
            │   └── navbar.component.scss
            ├── hero-section/
            │   ├── hero-section.component.ts
            │   ├── hero-section.component.html
            │   └── hero-section.component.scss
            ├── artwork-carousel/
            │   ├── artwork-carousel.component.ts
            │   ├── artwork-carousel.component.html
            │   └── artwork-carousel.component.scss
            ├── artist-spotlight/
            │   ├── artist-spotlight.component.ts
            │   ├── artist-spotlight.component.html
            │   └── artist-spotlight.component.scss
            ├── community-section/
            │   ├── community-section.component.ts
            │   ├── community-section.component.html
            │   └── community-section.component.scss
            ├── artwork-modal/
            │   ├── artwork-modal.component.ts
            │   ├── artwork-modal.component.html
            │   └── artwork-modal.component.scss
            └── footer/
                ├── footer.component.ts
                ├── footer.component.html
                └── footer.component.scss
```

---

## ⚙️ Core Modules & Configuration

### `src/main.ts` — Bootstrap Entry Point

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

if (false) { enableProdMode(); }
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

- The `if (false)` guard around `enableProdMode()` means the app currently **always runs in development mode**, even after `ng build`. To enable production optimisations, change this to `if (environment.production)`.
- `platformBrowserDynamic()` compiles the Angular module in the browser (JIT compilation used via the `browser` builder).

---

### `src/app/app.module.ts` — Root NgModule

This is the heart of the Angular application. It:

- **Declares** all 7 components that belong to the app
- **Imports** all required Angular and third-party modules:
  - `BrowserModule` — DOM rendering
  - `BrowserAnimationsModule` — enables Angular animations (required by ngx-toastr)
  - `ReactiveFormsModule` — powers the community email subscription form
  - `NgbModule` — ng-bootstrap components (modals)
  - `ToastrModule.forRoot({ positionClass: 'toast-bottom-right' })` — toast notifications anchored to the bottom-right corner
  - `RouterModule.forRoot([], { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })` — router configured with **no routes** (single page), but with anchor scrolling and scroll restoration enabled for in-page `href="#section"` navigation

---

### `angular.json` — CLI Workspace Config

Key configurations:
- **Project name:** `artify`
- **Source root:** `src/`
- **Output path:** `dist/artify/`
- **Global styles loaded (in order):**
  1. `src/styles.scss` — custom design system
  2. `bootstrap/dist/css/bootstrap.min.css` — Bootstrap grid + utilities
  3. `aos/dist/aos.css` — AOS animation base styles
  4. `bootstrap-icons/font/bootstrap-icons.css` — icon font
  5. `ngx-toastr/toastr.css` — toast styles
- **Build budget:** warning at 500 KB initial bundle, error at 1 MB
- **Production:** uses file replacement for `environment.ts` → `environment.prod.ts` and enables output hashing

---

### `tsconfig.json` — TypeScript Configuration

- **Target:** `ES2020` (modern JavaScript output)
- **Module:** `es2020` with `bundler` module resolution
- **Decorators:** `experimentalDecorators: true` (required for Angular `@Component`, `@Injectable`, etc.)
- **Source maps:** enabled (`sourceMap: true`) for debugging
- **Libs:** `es2020`, `dom` — gives access to browser APIs and modern JS features

---

## 🧩 Components (Deep Dive)

### 1. `AppComponent` — Root

**Files:** `app.component.ts`, `app.component.html`, `app.component.scss`

**Responsibilities:**
- **Application shell** — lays out the full page: Navbar → Main content sections → Footer
- **AOS initialisation** — calls `AOS.init({ once: true, duration: 700 })` in `ngOnInit`, so scroll animations play once per page load with a 700ms transition duration
- **Global Dark/Light mode controller** — owns the `dark: boolean` state and exposes it to child components

**Template layout (`app.component.html`):**

```html
<app-navbar (toggleDark)="toggleDark()" [dark]="dark"></app-navbar>
<main>
  <section id="home">      <app-hero-section></app-hero-section>      </section>
  <section id="artworks">  <app-artwork-carousel></app-artwork-carousel></section>
  <section id="artists">   <app-artist-spotlight></app-artist-spotlight></section>
  <section id="community"> <app-community-section></app-community-section></section>
</main>
<app-footer></app-footer>
```

Each section is wrapped with a unique `id` so anchor links (`href="#artworks"`) and smooth-scroll navigation work correctly.

**Dark Mode Logic (`app.component.ts`):**

```typescript
dark = false;

toggleDark() {
  this.dark = !this.dark;
  document.body.classList.toggle('light-mode', !this.dark);
  localStorage.setItem('artify-dark', JSON.stringify(this.dark));
}

syncTheme() {
  const stored = localStorage.getItem('artify-dark');
  if (stored !== null) {
    this.dark = JSON.parse(stored);
    document.body.classList.toggle('light-mode', !this.dark);
  } else {
    this.dark = true;
    document.body.classList.remove('light-mode'); // default: dark
  }
}
```

- Default theme is **dark mode** (deep-space gradient)
- The theme is toggled by adding/removing the `light-mode` class on `document.body`
- The preference is **persisted in `localStorage`** under the key `artify-dark`, so the user's choice survives page refreshes

---

### 2. `NavbarComponent`

**Files:** `navbar.component.ts`, `navbar.component.html`, `navbar.component.scss`

**Purpose:** Fixed top navigation bar with brand, navigation links, and a dark/light mode toggle button.

**Inputs/Outputs:**

| Decorator | Name | Type | Description |
|---|---|---|---|
| `@Input()` | `dark` | `boolean` | Receives current theme state from `AppComponent` |
| `@Output()` | `toggleDark` | `EventEmitter<void>` | Emits when the toggle button is clicked |

**Template features:**
- Brand: `"Artify"` displayed with a neon gradient (`brand-gradient` class)
- Navigation links: **Home**, **Artists**, **Community** — using anchor `href` values (`#home`, `#artists`, `#community`)
- Responsive: uses Bootstrap's `navbar-toggler` for hamburger menu on mobile (`navbar-expand-lg`)
- **Theme toggle button:** shows a `bi-sun` icon when in dark mode (click → switch to light) or `bi-moon` icon in light mode (click → switch to dark), using Bootstrap Icons and `[ngClass]` binding

```html
<button class="btn btn-sm btn-outline-light" (click)="onToggle()">
  <i class="bi" [ngClass]="dark ? 'bi-sun' : 'bi-moon'"></i>
</button>
```

The `aria-pressed` attribute is dynamically set for accessibility.

---

### 3. `HeroSectionComponent`

**Files:** `hero-section.component.ts`, `hero-section.component.html`, `hero-section.component.scss`

**Purpose:** The full-height landing banner that greets the user.

**Template features:**
- Full-viewport section (`min-height: 80vh`) using the animated `hero-bg` class
- Headline: `"Where Art Meets Innovation"`
- Subheading: `"Discover, collect, and celebrate digital creativity."`
- Two call-to-action buttons:
  - **"Explore Artworks"** → scrolls to `#artworks` section
  - **"Join Community"** → scrolls to `#community` section

**Smooth scroll method:**

```typescript
scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
```

Uses the native `scrollIntoView` browser API with `behavior: 'smooth'` for a polished scrolling experience. The `?.` optional chaining prevents errors if the element is not found.

---

### 4. `ArtworkCarouselComponent`

**Files:** `artwork-carousel.component.ts`, `artwork-carousel.component.html`, `artwork-carousel.component.scss`

**Purpose:** A custom-built, auto-playing artwork showcase carousel — the centrepiece of the app.

**Featured Artworks (hardcoded in `ngOnInit`):**

| ID | Title | Artist | Image |
|---|---|---|---|
| 1 | Neon Dreams | Ava Sinclair | `horaizon.png` |
| 2 | Digital Horizon | Leo Nakamura | `dream.png` |
| 3 | Ethereal Bloom | Maya Rios | `tree.png` |

**State Properties:**

| Property | Type | Default | Description |
|---|---|---|---|
| `artworks` | `Artwork[]` | `[]` | Array of artwork objects loaded in `ngOnInit` |
| `activeIndex` | `number` | `0` | Index of the currently visible slide |
| `autoPlayIntervalId` | `any` | `null` | Reference to the `setInterval` timer |
| `autoPlayMs` | `number` | `4000` | Auto-play interval (4 seconds per slide) |

**Key Methods:**

| Method | Description |
|---|---|
| `ngOnInit()` | Loads artwork data; starts auto-play after a 100ms delay to avoid race conditions |
| `ngOnDestroy()` | Calls `stopAutoPlay()` to clear the interval and prevent memory leaks |
| `startAutoPlay()` | Starts the `setInterval`; guard prevents duplicate timers |
| `stopAutoPlay()` | Clears the interval and sets `autoPlayIntervalId` to `null` |
| `next()` | Advances to next slide with circular wrap-around |
| `prev()` | Goes to previous slide with circular wrap-around |
| `goTo(index)` | Jumps directly to a specific slide by index (with bounds checking) |
| `openPreview(index)` | Placeholder — currently triggers a browser `alert()` with artwork info |

**Template features:**
- `*ngFor` renders all slides; only the slide with `[class.active]="i === activeIndex"` is shown (CSS sets non-active slides to `display: none`)
- Each slide shows: artwork image + title + artist name + description + "View Artwork" / Prev / Next buttons
- **Thumbnail strip** at the bottom: clickable thumbnail buttons for each artwork, with `(mouseenter)="stopAutoPlay()"` and `(mouseleave)="startAutoPlay()"` — hovering the thumbnails pauses the auto-play
- Fallback `<ng-template #noArt>` shown if the artworks array is empty

**SCSS Animation (`artwork-carousel.component.scss`):**
- Slides use `position: absolute; inset: 0` stacking, with `opacity` and `translateY` transitions for smooth fade-in effect
- Thumbnail images scale up (`scale(1.06)`) and gain a purple border when active
- Responsive breakpoints: on screens ≤ 767px, image height is capped and thumbnails shrink

---

### 5. `ArtistSpotlightComponent`

**Files:** `artist-spotlight.component.ts`, `artist-spotlight.component.html`, `artist-spotlight.component.scss`

**Purpose:** Showcases featured artists in a grid of profile cards. Clicking "View Collection" opens a modal gallery of their artworks.

**Featured Artists (hardcoded in `ngOnInit`):**

| ID | Name | Bio | Collection images |
|---|---|---|---|
| 1 | Ava Sinclair | Digital visionary blending color and AI expression | `ai1.png`, `ai2.png`, `ai3.png` |
| 2 | Leo Nakamura | Tech-inspired artist merging futurism with emotion | `tec1.png`, `tec2.png`, `tec3.png` |
| 3 | Maya Rios | Exploring human emotion through digital texture | `digi1.png`, `digi2.png`, `digi3.png` |
| 4 | Noah Vale | Minimalist designer finding art in simplicity | `sim1.png`, `sim2.png`, `sim3.png` |

**Local `Artist` interface (defined inline in the component file):**
```typescript
interface Artist {
  id: number;
  name: string;
  bio: string;
  photoUrl: string;
  collection: string[]; // array of image URL strings for the modal gallery
}
```

> **Note:** This is a *local* interface separate from the `Artist` model in `src/app/models/artist.model.ts`. The local one adds a `collection: string[]` field that the global model does not have.

**Modal integration:**
- Uses `NgbModal` from `@ng-bootstrap/ng-bootstrap`
- `openCollection(modalTemplate, artist)` stores the clicked artist in `selectedArtist`, then opens the inline `<ng-template #collectionModal>` at size `lg`, centered
- The modal renders a 3-column grid (`col-md-4`) of the artist's collection images

**SCSS highlights (`artist-spotlight.component.scss`):**
- Artist cards lift on hover: `translateY(-5px)` with a strong drop shadow
- Artist photo border glows **magenta/fuchsia** (`#ff00ff`) on card hover
- "View Collection" button has a neon purple-to-magenta gradient and a glow `box-shadow` on hover
- Modal uses `backdrop-filter: blur(20px)` for a frosted-glass effect
- `data-aos="fade-up"` on each card triggers AOS scroll animations

---

### 6. `CommunitySectionComponent`

**Files:** `community-section.component.ts`, `community-section.component.html`, `community-section.component.scss`

**Purpose:** An email subscription section with a reactive form and social media links.

**Form setup (Angular Reactive Forms):**

```typescript
form = this.fb.group({
  email: ['', [Validators.required, Validators.email]]
});
```

- The form has a single `email` control with two validators: `required` (field cannot be empty) and `email` (must match a valid email format)
- Built using `FormBuilder` from `ReactiveFormsModule`

**Submit logic:**

```typescript
submit() {
  if (this.form.invalid) return this.form.markAllAsTouched();
  this.toastr.success('Thanks for joining the Artify community!');
  this.form.reset();
}
```

- If the form is **invalid**, it calls `markAllAsTouched()` to surface validation errors in the UI (the input gains the `is-invalid` Bootstrap class)
- If **valid**, it shows a success toastr notification at the bottom-right, then resets the form

**Template features:**
- `[formGroup]="form"` binding connects the template to the reactive form instance
- `formControlName="email"` binds the input to the email control
- `[class.is-invalid]` and `*ngIf` on `div.invalid-feedback` provide inline error messaging
- Social media buttons: Discord, Twitter, Instagram icons using Bootstrap Icons (`bi-discord`, `bi-twitter`, `bi-instagram`)

---

### 7. `ArtworkModalComponent`

**Files:** `artwork-modal.component.ts`, `artwork-modal.component.html`, `artwork-modal.component.scss`

**Purpose:** A reusable ng-bootstrap modal component for displaying a full-size artwork view with navigation between artworks.

> **Note:** This component is declared in `AppModule` and integrated with `NgbActiveModal`, but in the current codebase it is **not actively opened** anywhere — the carousel's `openPreview()` method uses a browser `alert()` instead. This component is prepared infrastructure for future programmatic modal integration.

**Inputs:**

| Decorator | Name | Type | Description |
|---|---|---|---|
| `@Input()` | `artworks` | `Artwork[]` | List of artworks to navigate through |
| `@Input()` | `index` | `number` | Starting artwork index |

**Methods:**

| Method | Description |
|---|---|
| `get current()` | Computed getter — returns `artworks[index]` |
| `next()` | Increments `index` (bounded by array length) |
| `prev()` | Decrements `index` (bounded at 0) |

**Template features:**
- Modal header: artwork title + close button (`activeModal.close()`)
- Modal body: full-size artwork image + artist name + description
- Modal footer: Previous/Next navigation buttons (disabled at boundaries) + "Close" neon button

---

### 8. `FooterComponent`

**Files:** `footer.component.ts`, `footer.component.html`, `footer.component.scss`

**Purpose:** Simple, minimal site footer.

**Template features:**
- Social icon links: Twitter, Instagram, Discord (Bootstrap Icons)
- Copyright notice: `© Artify. All rights reserved.`
- Styled with `site-footer` class: 95% opacity, transparent background, 2rem padding

---

## 📦 Data Layer: Models & Services

### Artwork Model

**File:** `src/app/models/artwork.model.ts`

```typescript
export interface Artwork {
  id: number;           // Unique identifier
  title: string;        // Artwork title
  artistId: number;     // Foreign key to Artist
  artistName: string;   // Denormalised artist name for display
  imageUrl: string;     // Path to the full-size image
  thumbUrl?: string;    // Optional thumbnail image path
  description?: string; // Optional artwork description
  year?: number;        // Optional creation year
}
```

---

### Artist Model

**File:** `src/app/models/artist.model.ts`

```typescript
export interface Artist {
  id: number;
  name: string;
  photoUrl: string;
  bio: string;
  social?: {
    twitter?: string;
    instagram?: string;
    discord?: string;
  };
}
```

The `social` field is optional and typed as an object with optional platform-specific string URLs, allowing flexible social profile linking.

---

### ArtworkService

**File:** `src/app/services/artwork.service.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class ArtworkService { ... }
```

Provided at the **root injector level** (`providedIn: 'root'`), making it a singleton available throughout the app without explicit module registration.

**In-memory data:**

- **4 Artists:** Luna Vega, Kai Nova, Mira Sol, Orin Pax
- **4 Artworks:** Neon Bloom, Deep City, Chromatic Wave, Echo Realm

**Available methods (all return Observables):**

| Method | Return Type | Description |
|---|---|---|
| `getFeaturedArtworks()` | `Observable<Artwork[]>` | Returns all artworks |
| `getArtworkById(id)` | `Observable<Artwork \| undefined>` | Finds artwork by ID |
| `getArtists()` | `Observable<Artist[]>` | Returns all artists |
| `getArtistById(id)` | `Observable<Artist \| undefined>` | Finds artist by ID |

All methods use RxJS `of()` to wrap static data into observables, making them swap-in-ready for real HTTP API calls via `HttpClient` in the future.

> **Note:** The `ArtworkService` data (4 artists/artworks) is currently not used by the carousel or spotlight components — those components define their own inline data arrays in `ngOnInit`. The service is ready infrastructure for a future refactor.

---

## 🎨 Styling System

### Global Design Tokens (CSS Variables)

Defined in `src/styles.scss` under `:root`:

| Variable | Value | Usage |
|---|---|---|
| `--bg-1` | `#0f0c29` | Dark background start (deep navy) |
| `--bg-2` | `#302b63` | Dark background end (deep purple) |
| `--accent-1` | `#ff2d95` | Hot pink / magenta accent |
| `--accent-2` | `#7b2ff7` | Electric violet accent |
| `--light-bg` | `#f8fafc` | Light mode page background |
| `--light-text` | `#0b1220` | Light mode text colour |

### Key Global CSS Classes

| Class | Effect |
|---|---|
| `.hero-bg` | Animated gradient background with continuous hue-shift (`hueShift` keyframe, 12s loop) |
| `.glass-card` | Frosted glass card: `backdrop-filter: blur(8px)`, semi-transparent white border, purple-tinted shadow |
| `.btn-neon` | Gradient button: violet → pink, with glow shadow |
| `.section-padding` | `padding: 6rem 0` (3rem on mobile) — consistent vertical section spacing |
| `.brand-gradient` | Transparent text with gradient fill (CSS gradient-clip trick) |
| `.artwork-thumb` | Rounded artwork image with hover lift animation (`translateY(-6px)`) |
| `.artist-photo` | Circular avatar image (96×96px) |
| `.artist-card` | Card with hover lift and shadow deepening |
| `.modal-artwork` | Full-width modal image capped at 70% of viewport height |
| `.site-footer` | Transparent footer with 95% opacity |

### Dark Mode / Light Mode

**Default state:** Dark mode — deep-space gradient background (`--bg-1` to `--bg-2`), light text (`#e9eefb`)

**Light mode** is activated by adding `light-mode` to `document.body`:
- Body background switches to `var(--light-bg)` (`#f8fafc`)
- Body text switches to `var(--light-text)` (`#0b1220`)
- `.glass-card` gets solid white background and no shadow
- `.slide-meta` text switches to dark `#111`
- Thumbnail borders adapt for light backgrounds

AOS transition styles are globally applied:
```scss
[data-aos] { opacity: 0; transition-property: opacity, transform; }
[data-aos].aos-animate { opacity: 1; }
```

### Animation System (AOS)

**AOS (Animate On Scroll)** is initialised in `AppComponent.ngOnInit()`:
```typescript
AOS.init({ once: true, duration: 700 });
```

- `once: true` — each element animates only once (on first entry into viewport)
- `duration: 700` — 700ms animation duration

Usage in templates: add `data-aos="fade-up"` (or other AOS animation names) as an HTML attribute. The Artist Spotlight cards all use `data-aos="fade-up"` for staggered card reveal.

---

## 📚 Third-Party Libraries

### Bootstrap 5.3
The industry-standard CSS framework providing the responsive 12-column grid system, utility classes, and component styles. Imported both as:
- CSS: `bootstrap/dist/css/bootstrap.min.css` (loaded globally via `angular.json`)
- SCSS: `@import "bootstrap/scss/bootstrap"` (in `styles.scss`, enabling SCSS variable overrides)

### ng-bootstrap 16
Angular-native implementation of Bootstrap components — eliminates the need for jQuery or Bootstrap's bundled JavaScript. Used specifically for:
- `NgbModal` service — programmatically opening modal dialogs
- `NgbActiveModal` — injected into modal components to control close/dismiss

### ngx-toastr 17
Non-blocking notification toasts. Configured with:
```typescript
ToastrModule.forRoot({ positionClass: 'toast-bottom-right' })
```
Used in `CommunitySectionComponent` to show a success message on form submission.

### AOS 2.3.4
Lightweight scroll animation library. Adds CSS classes to elements when they scroll into the viewport. Zero JavaScript animations — all transitions are driven by CSS, making it performant.

### Bootstrap Icons 1.13.1
An SVG icon library delivered as a font. Icons are used via `<i class="bi bi-{name}"></i>` syntax throughout the navbar, community section, and footer.

### Google Fonts — Poppins
Loaded via CSS `@import` in `styles.scss`. Used as the global body font:
- Weights: 300 (light), 400 (regular), 600 (semi-bold), 700 (bold)

---

## 🖼️ Assets

All images are stored in `src/assets/images/` and served as static files by the Angular dev server.

### Artist Portraits (for Spotlight section)
| File | Artist |
|---|---|
| `Ava Sinclair.png` | Ava Sinclair's profile photo (~1.3 MB) |
| `Leo Nakamura.png` | Leo Nakamura's profile photo (~1.4 MB) |
| `Maya Rios.png` | Maya Rios's profile photo (~2.2 MB) |
| `Noah Vale.png` | Noah Vale's profile photo (~1.3 MB) |

### Carousel Hero Images
| File | Used for |
|---|---|
| `horaizon.png` | "Neon Dreams" — slide 1 (~1.9 MB) |
| `dream.png` | "Digital Horizon" — slide 2 (~1.9 MB) |
| `tree.png` | "Ethereal Bloom" — slide 3 (~1.9 MB) |

### Artist Collection Galleries
| Files | Artist |
|---|---|
| `ai1.png`, `ai2.png`, `ai3.png` | Ava Sinclair's AI-themed works |
| `tec1.png`, `tec2.png`, `tec3.png` | Leo Nakamura's tech-futurist works |
| `digi1.png`, `digi2.png`, `digi3.png` | Maya Rios's digital texture works |
| `sim1.png`, `sim2.png`, `sim3.png` | Noah Vale's minimalist works |

### Legacy Service Images
| Files | Purpose |
|---|---|
| `art1.jpg` – `art4.jpg` | Artwork images for `ArtworkService` data |
| `art1_thumb.jpg` – `art4_thumb.jpg` | Thumbnail variants |
| `artist1.jpg` – `artist4.jpg` | Artist photos for `ArtworkService` data |

> ⚠️ **Performance note:** Several PNG assets are very large (2–3 MB). Consider compressing them with tools like [Squoosh](https://squoosh.app/) or converting to WebP format for faster page load times.

---

## 🔧 Build Configuration

### Development Build
- Uses `@angular-devkit/build-angular:browser` builder
- Source maps enabled
- `enableProdMode()` is NOT called (development mode)

### Production Build (`ng build --configuration production`)
- File replacements: `environment.ts` → `environment.prod.ts`
- Output hashing: all files get content hashes for cache busting
- Bundle budgets:
  - Warning at **500 KB** initial bundle
  - Error at **1 MB** initial bundle
- Output directory: `dist/artify/`

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** — v18 or higher recommended ([Download](https://nodejs.org/))
- **npm** — comes with Node.js (v9+)
- **Angular CLI** — v17 (installed as a project dev dependency, can also install globally)

Verify your setup:
```bash
node --version   # Should be v18+
npm --version    # Should be v9+
```

### Installation

1. **Clone the repository** (or navigate to the project folder):
   ```bash
   git clone <your-repo-url>
   cd Artify_Frontend
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```
   This installs all packages listed in `package.json` including Angular, Bootstrap, AOS, ng-bootstrap, ngx-toastr, and their transitive dependencies (totalling ~450 KB in `package-lock.json`).

### Running Locally

Start the Angular development server:
```bash
npm start
```
or equivalently:
```bash
npx ng serve
```

The app will be available at **`http://localhost:4200/`**.

The dev server supports **Hot Module Replacement (HMR)** — changes to component files are reflected in the browser automatically without a full page reload.

### Building for Production

```bash
npm run build
```

The compiled, optimised output will be placed in `dist/artify/`. You can serve this directory with any static web server (Nginx, Apache, GitHub Pages, Netlify, Vercel, Firebase Hosting, etc.).

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| `start` | `ng serve` | Start the local development server on port 4200 |
| `build` | `ng build` | Compile the app for production into `dist/artify/` |
| `test` | `ng test` | Run unit tests with Karma |
| `lint` | `ng lint` | Run ESLint/TSLint on the TypeScript source files |

---

## ⚠️ Known Limitations & Future Improvements

1. **No real backend:** All artwork and artist data is hardcoded in component `ngOnInit` methods and the `ArtworkService`. A real deployment would connect to a REST API or GraphQL backend.

2. **`ArtworkService` not fully wired:** The `ArtworkService` contains a separate dataset (4 different artworks/artists) that is not used by the UI components, which define their own inline data. Future refactor should centralize all data through the service.

3. **`ArtworkModalComponent` not invoked:** The component is declared but the carousel's `openPreview()` method uses `alert()` instead of opening the modal. Future work: use `NgbModal.open(ArtworkModalComponent)` with `componentRef.instance.artworks = ...`.

4. **Production mode disabled:** `main.ts` has `if (false) { enableProdMode(); }` — should use `environment.production` flag.

5. **Large unoptimized images:** PNG assets range from 1.3 MB to 3.3 MB each. These should be optimized (compressed, converted to WebP) for real-world performance.

6. **No routing:** The app is a single view with no Angular routes. Adding multi-page navigation (Artist detail page, Artwork detail page, Gallery page) would require setting up `RouterModule` routes and creating new page components.

7. **Community form doesn't send data:** The email subscription form validates and shows a toast notification but doesn't submit to any API or mailing list service. Integration with Mailchimp, SendGrid, or a custom backend endpoint is needed.

8. **No unit tests:** The `ng test` script is configured but no spec files exist in the project. Adding `*.component.spec.ts` files with Jasmine/Karma tests is recommended.

---

## 📄 License

This project is currently unlicensed. Add a `LICENSE` file (e.g., MIT, Apache 2.0) if you plan to open-source it.

---

> Made with ❤️ by the Artify team. Built with Angular 17 + Bootstrap 5 + AOS.
