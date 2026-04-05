```markdown
# Design System Specification: The Curated Tactile

This design system is built to transform a standard e-commerce interface into a high-end editorial experience. It rejects the "template" aesthetic in favor of a signature visual identity rooted in tonal depth, intentional asymmetry, and sophisticated layering. We do not just build layouts; we curate digital spaces.

---

## 1. Creative North Star: The Curated Tactile
The guiding philosophy of this design system is **The Curated Tactile**. We treat the screen as a physical gallery space where items are placed on high-quality surfaces rather than flat digital planes. 

The goal is to break the rigid, "boxed-in" grid. We achieve this through:
*   **Intentional Asymmetry:** Overlapping images and typography to create a sense of motion.
*   **Bespoke Air:** Utilizing extreme white space to signal luxury and exclusivity.
*   **Physicality:** Using tonal shifts and glassmorphism to imply weight and material quality.

---

## 2. Color & Surface Architecture

Our palette is grounded in the organic `background: #fbf9f2` and the authoritative `primary: #005440`. We avoid the clinical coldness of pure whites and greys.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Boundaries must be defined solely through background color shifts or subtle tonal transitions.
*   Use `surface-container-low` to define a sidebar against a `surface` background.
*   Use `surface-container-highest` to draw focus to a featured editorial block.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked physical layers (like fine cardstock or frosted glass).
*   **Base:** `surface` (#fbf9f2)
*   **Nested Elements:** Place a `surface-container-lowest` card inside a `surface-container-low` section to create a soft, natural lift without a shadow.
*   **Surface Tints:** Utilize `surface_tint` (#086b53) at 5-10% opacity for interactive overlays to maintain brand warmth.

### The Glass & Gradient Rule
To achieve a "bespoke" feel, floating elements (Navigation bars, Modals) must use **Glassmorphism**:
*   **Fill:** `surface` at 80% opacity.
*   **Effect:** 20px - 40px Backdrop Blur.
*   **CTAs:** Primary buttons should use a subtle linear gradient from `primary` (#005440) to `primary_container` (#0f6e56) at 135 degrees to provide a "soul" and polish that flat fills lack.

---

## 3. Typography: Editorial Authority

We use a high-contrast pairing to distinguish between the "Voice" of the brand and the "Utility" of the shop.

| Level | Font Family | Usage |
| :--- | :--- | :--- |
| **Display (L/M/S)** | Plus Jakarta Sans | Hero sections, high-end editorial headers. Use `display-lg` (3.5rem) for impact. |
| **Headline (L/M/S)** | Plus Jakarta Sans | Section titles and storytelling. |
| **Title (L/M/S)** | Inter | Product names and card headers. |
| **Body (L/M/S)** | Inter | Descriptions, specs, and reviews. |
| **Label (M/S)** | Inter | Small functional text, tags, and micro-copy. |

**The Identity Gap:** High-end design lives in the contrast. Pair a massive `display-lg` headline with a tiny, tracked-out `label-md` for a sophisticated, magazine-style layout.

---

## 4. Elevation & Depth

We convey hierarchy through **Tonal Layering** rather than structural lines.

*   **The Layering Principle:** Stacking surface-container tiers (Lowest to Highest) creates depth. A `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f6f4ec) section creates an effortless, organic lift.
*   **Ambient Shadows:** When a float is required (e.g., a cart drawer), use extra-diffused shadows.
    *   **Shadow Color:** Use `on_surface` (#1b1c18) at 4-8% opacity.
    *   **Blur:** Minimum 12px for `md` shadows to mimic natural light.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the **Ghost Border**: `outline-variant` (#bec9c3) at **15% opacity**. Never use 100% opaque, high-contrast borders.

---

## 5. Components

### Buttons
*   **Primary:** `primary` gradient fill, `on_primary` text, 8px radius.
*   **Secondary:** `surface` fill, "Ghost Border" (15% `outline-variant`), `primary` text.
*   **Tertiary:** No background. Underline on hover only.
*   **States:** Focus state must be a 2px `primary_container` outline with a 2px offset.

### Cards & Lists
*   **Rules:** Forbid the use of divider lines.
*   **Separation:** Separate content using the spacing scale (e.g., 24px/32px gutters) or a subtle background shift to `surface-container-high`.
*   **Radius:** 12px for standard cards; 1.5rem (`xl`) for large editorial containers.

### Input Fields
*   **Styling:** `surface-container-lowest` fill, 8px radius. 
*   **Focus:** Transition the background to `surface` and apply the 2px Teal focus ring.
*   **Error:** Use `error` (#ba1a1a) for the "Ghost Border" and `on_error_container` for the helper text.

### Selection Chips & Tags
*   **Shape:** Pill (full roundedness).
*   **Color:** Use `secondary_fixed` (#ffddb7) for accent tags (Sale, New) to create a warm, high-end amber highlight.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts where product imagery overlaps a background color block or a display headline.
*   **Do** prioritize vertical whitespace. If a section feels crowded, double the padding.
*   **Do** use `primary_fixed_dim` for subtle decorative elements to add depth to the deep teal brand.

### Don't:
*   **Don't** use 1px #D3D1C7 borders to separate list items. Use whitespace or tonal blocks.
*   **Don't** use standard black (#000000) for shadows. Use a tinted `on_surface` at low opacity.
*   **Don't** align everything to a rigid center grid. Experiment with left-aligned headlines and right-aligned body copy for an editorial feel.
*   **Don't** use high-contrast "Danger" colors for non-critical errors. Keep the coral `tertiary` (#892600) reserved for intentional urgency.

---

## 7. Spacing Scale
Maintain a strict 8px-based grid for functional elements, but feel free to break into "Editorial Spacing" (using 64px, 80px, or 120px gaps) for high-level page sectioning. This breadth of space is what differentiates a "discount shop" from a "high-end boutique."```