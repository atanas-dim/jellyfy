# Jellyfy Design System

## 1. Principles

Jellyfy is a soft control material. A control looks poured, not painted: it is translucent, it carries a fine grain, and its edge is thick enough to catch light.

Depth has three separate jobs.

- Thickness is the inset depth of the material. It says what kind of thing the object is.
- Elevation is the drop shadow. It says how far the object sits off the page.
- Press light is the pair of radial washes that appear while a control is pressed, or while a field is focused. It says the object is being acted on.

Color is quiet on surfaces and fields, and stronger on controls. That difference is the hierarchy. A custom theme changes the solids. It does not flatten the hierarchy.

The typeface belongs to the app. Jellyfy inherits it.

Small marks use a shallower inset than buttons, because the button inset collapses at checkbox and handle size. The radio bullet is jelly with the grain. It is opaque, and it has no blur and no thickness.

### Implementation notes

Jellyfy is a CSS component library. It is inspired by Tailwind and daisyUI. It does not require Tailwind. It stays compatible with Tailwind by reading Tailwind color and spacing variables and supplying hex and length fallbacks when those variables are absent.

## 2. Roles

Every object uses one role. Custom components use the same roles. Size and role are different axes: a large input is still a field.

| Role    | What it is                                                                                        | Thickness | Color strength                                                     | Radius                                         |
| ------- | ------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------ | ---------------------------------------------- |
| Surface | A container: card, alert, modal panel, badge                                                      | Thin      | Surface tone. Wash with a slot.                                    | Surface                                        |
| Field   | A place to type or choose: input, textarea, select                                                | Mid       | Surface tone. Wash with a slot.                                    | Field                                          |
| Control | A press that takes an action: button, icon button                                                 | Thick     | Surface tone. Control fill with a slot.                            | Control                                        |
| Mark    | A small indicator: checkbox box, radio ring, toggle track, toggle thumb, range track, range thumb | Mark      | Surface tone. Control fill when selected or filled.                | Control. The checkbox box uses the mark radius |
| Overlay | Modal panel, select menu                                                                          | Thin      | Modal panel uses the surface fill. Select menu uses the menu tone. | Surface                                        |

A modal panel follows the surface fill rules. A select menu uses the menu tone for its panel. A hovered option and a selected option mix the solid into that menu tone at the menu mixes.

The bump button, used to close a modal, is not a fifth thickness. It is a transparent control with the bump light, no fill, and no drop shadow.

A custom component picks a role the way it picks the squish behavior. The thickness classes are `thickness-surface`, `thickness-field`, `thickness-control`, and `thickness-mark`. Squish is one utility, because it is one behavior.

### Implementation notes

The thickness classes are `thickness-surface`, `thickness-field`, `thickness-control`, and `thickness-mark`. The squish class is `squish`. Size classes stay `sm` and `lg`.

## 3. Color

### Slots

Eight slots. Four are the theme, four are status.

| Slot      | Default solid | Fallback  |
| --------- | ------------- | --------- |
| Primary   | Indigo 600    | `#4f46e5` |
| Secondary | Pink 600      | `#db2777` |
| Tertiary  | Teal 600      | `#0d9488` |
| Neutral   | Neutral 600   | `#525252` |
| Success   | Green 600     | `#16a34a` |
| Warning   | Amber 600     | `#d97706` |
| Error     | Red 600       | `#dc2626` |
| Info      | Sky 600       | `#0284c7` |

The neutral ramp is available in full, from 50 through 950, even where a component uses only some steps.

| Step | Fallback  |
| ---- | --------- |
| 50   | `#fafafa` |
| 100  | `#f5f5f5` |
| 200  | `#e5e5e5` |
| 300  | `#d4d4d4` |
| 400  | `#a3a3a3` |
| 500  | `#737373` |
| 600  | `#525252` |
| 700  | `#404040` |
| 800  | `#262626` |
| 900  | `#171717` |
| 950  | `#0a0a0a` |

An object with no slot uses the base tones. A slot replaces the solid. The user applies a slot, including Error, with their own logic. Error does not add a second invalid style.

Every slot, including Neutral, uses the same wash, control fill, content color, press light, and menu mixes. A component with no slot uses those same mixes, with the surface tone as its solid. No slot has a mix of its own.

### Base tones

| Tone                | Step               |
| ------------------- | ------------------ |
| Surface fill        | Neutral 50         |
| Menu                | Neutral 100        |
| Field focus ground  | Neutral 100        |
| Text on a surface   | Neutral 800        |
| Start and end icons | Neutral 400        |
| Disabled fill       | Neutral 400 at 60% |
| Disabled text       | Neutral 50 at 70%  |
| Shadow color        | Neutral 950        |

Black and white are shared values, stored once and reused by every mix that needs them. They are not color slots.

### Content color

Each slot has a content color, stored explicitly. Replacing a solid does not recalculate the content color. A custom theme sets both.

Two recipes produce the defaults.

- On a control fill, the content color is 94% white and 6% of the solid.
- On a wash, the content color is 62% of the solid and 38% black. The dark theme uses 38% white. The 62% stays the same.

Text with no slot uses the surface text tone, Neutral 800.

Text on a control or a wash meets WCAG AA, 4.5:1, against the painted fill. The focus outline meets 3:1 against the ground next to it. A saturated solid that cannot reach 4.5:1 with either the control or the wash recipe needs a hand-set content color. The library does not pick black or white at runtime.

### Color strength

Strength is separate from the solid. The same solid is quiet on a surface or field and firm on a control.

| Application   | Mix                                                                                  |
| ------------- | ------------------------------------------------------------------------------------ |
| Surface tone  | Neutral 50 at the material opacity, 60%                                              |
| Wash, resting | 86% surface tone and 14% solid, shown at 80% opacity [DARK ADAPTATION MAY BE NEEDED] |
| Wash, focused | 78% surface tone and 22% solid, shown at 80% opacity [DARK ADAPTATION MAY BE NEEDED] |
| Control fill  | Solid at the material opacity, 60%                                                   |

The control fill is still jelly. The slot color is at 60% opacity, with the shared blur and the shared grain. Surfaces and fields use the wash with a slot. Buttons, icon buttons, badges, selected checkbox boxes, selected toggle tracks, range fills, and colored range thumbs use the control fill.

### Menu mixes

[DARK ADAPTATION MAY BE NEEDED]

These mixes are internal. They are not part of the customization contract.

| State                     | Mix into the menu tone |
| ------------------------- | ---------------------- |
| Hovered or focused option | 14% of the solid       |
| Selected option           | 28% of the solid       |

Option text stays the surface text color.

### Implementation notes

Slot classes are `primary`, `secondary`, `tertiary`, `neutral`, `success`, `warning`, `error`, and `info`. They set the solid. Content colors are paired variables, named with the daisyUI suffix `content` (`primary-content`, and the same for the other slots).

Defaults read Tailwind color variables first: `--color-primary`, `--color-indigo-600`, `--color-neutral-50`, and the rest of the ramp. The fallbacks above apply when Tailwind is absent.

Black and white are `--color-black` and `--color-white`. Wash, press light, bump light, and loading light read those variables. Content colors are stored results of the recipes above. The dark theme sets the wash content recipe's endpoint to `--color-white`.

Wash percentages, wash opacity, and the menu mixes are variables. The dark theme can override a variable marked `[DARK ADAPTATION MAY BE NEEDED]`.

## 4. Material

Every part of a checkbox, radio, switch, and slider is jelly. The radio bullet keeps the grain and is opaque, with no blur and no thickness. Every other part has the grain, the blur, and its thickness.

### Grain

The grain is fractal noise, tiled. The tile is 22.5rem. The light theme uses a dark grain. The dark theme uses a lighter, fainter grain so the same texture stays visible on a dark ground. The turbulence is the same in both.

### Opacity and blur

Material opacity is 60% for every object. Blur is 4px for every object. Both are single values. Components do not invent their own.

The 80% wash amount in the color section is a color mix. It is not a second material opacity.

### Thickness

[DARK ADAPTATION MAY BE NEEDED]

Thickness is an inset shadow in Neutral 950. The shadow falls upward, so the bottom edge reads as the thick part of the pour.

| Thickness      | Shadow                                   | Used by                                                                                    |
| -------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------ |
| Surface        | `inset 0 -6px 8px`, Neutral 950 at 12%   | Card, alert, modal panel, badge, select menu                                               |
| Field, resting | `inset 0 -10px 16px`, Neutral 950 at 20% | Input, textarea, select                                                                    |
| Field, focused | `inset 0 -6px 10px`, Neutral 950 at 15%  | Input, textarea, select while focused                                                      |
| Control        | `inset 0 -16px 16px`, Neutral 950 at 50% | Button, icon button                                                                        |
| Mark           | `inset 0 -1px 5px`, Neutral 950 at 35%   | Checkbox box, radio ring, toggle track, toggle thumb, range track, range fill, range thumb |

The track and the fill of a slider are both jelly. Only the color differs. The same is true of a switch track and thumb, and of a radio ring.

### Press light

[DARK ADAPTATION MAY BE NEEDED]

Press light is a pair of soft ellipses, derived from the solid. The lower ellipse is the highlight. The upper ellipse is the shade. They are not the loading sheen.

**Control light** is hidden at rest and fully visible while the control is pressed. The transition is 300ms.

- Highlight: white mixed at 75% into the solid, then shown at 22%.
- Shade: black mixed at 45% into the solid, then shown at 40%.
- Both ellipses are 90% of the control width, centered, and fade out at 60% of the gradient radius.
- The highlight starts at 60% of the height, is 60% tall, and is shifted up by 40% of its own height.
- The shade starts at 42% of the height, is 50% tall, and is shifted up by 75% of its own height.

**Field light** uses a different strength, because a field is a recess. It is hidden at rest and fully visible while the field is focused, including when focus arrives by click. The transition is 300ms. [DARK ADAPTATION MAY BE NEEDED]

- Highlight: white mixed at 80% into the solid, then shown at 70%.
- Shade: black mixed at 80% into the solid, then shown at 12%.
- The highlight is 70% of the field width, 1.75rem tall, and sits 1rem below the bottom edge so only the top of it shows.
- The shade is 90% of the field width, 2.1rem tall, and starts 1.4rem from the top.

An object with no slot builds the same mixes from the surface tone.

### Bump

[DARK ADAPTATION MAY BE NEEDED]

The bump button is always lit. It uses the mark light, not the control light.

- Highlight: white mixed at 78% into the solid, then shown at 22%.
- Shade: black mixed at 78% into the solid, then shown at 34%.
- Each ellipse is 1.75rem wide and 1rem tall, centered, fading out at 70% of the gradient radius.
- The highlight sits 0.15rem from the top. The shade sits 0.85rem from the top.
- While pressed, the two ellipses exchange places. The exchange takes 200ms.

### Implementation notes

Light grain: an SVG turbulence filter, `baseFrequency` 1.34, 4 octaves, stitched, drawn at 20% opacity. Dark grain: the same filter, white, drawn at 6% opacity. Tile size is `--noise-size: 22.5rem`.

Material opacity is one variable. Blur is `backdrop-filter: blur(4px)`.

Thickness, control light, field light, and bump light are variables. The dark theme can override a variable marked `[DARK ADAPTATION MAY BE NEEDED]`. Press-light and bump strengths are not customization tokens.

## 5. Elevation

[DARK ADAPTATION MAY BE NEEDED]

Elevation is the drop shadow. It is independent from thickness. The shadow color is Neutral 950. The default theme has one multiplier, `1`, which scales every shadow together. Rest stays quieter than hover. The multiplier does not let those two cross.

| Level    | Shadow                                  | Where it is used                       |
| -------- | --------------------------------------- | -------------------------------------- |
| Rest     | `0 12px 16px -14px`, Neutral 950 at 55% | Buttons, fields, cards, alerts         |
| Hover    | `0 16px 36px -14px`, Neutral 950 at 55% | Buttons and icon buttons while hovered |
| Mark     | `0 4px 6px -3px`, Neutral 950 at 45%    | Marks                                  |
| Overlay  | The hover shadow                        | Modal panel, select menu               |
| Disabled | `0 12px 12px -12px`, Neutral 950 at 25% | Disabled buttons and fields            |

Overlay is its own level. In the default theme it uses the same shadow as hover.

A pressed control keeps the shadow it already has. The press is the press light and the squish.

Buttons and icon buttons also rise 2px on hover. The rise takes 200ms, eased out. A disabled control does not rise.

Cards, alerts, and fields do not rise on hover.

Focus adds the focus gap and keeps the elevation the object already has.

### Implementation notes

Rest, hover, mark, disabled, and overlay are separate variables. Overlay's default value is the hover shadow.

The dark theme can override the shadow opacity. That override is marked `[DARK ADAPTATION MAY BE NEEDED]`.

## 6. Shape

Four radius tokens. The names are roles. A product can change the values.

| Token   | Default | Used by                                                                                                          |
| ------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| Surface | 1rem    | Card, alert, modal panel, select menu                                                                            |
| Field   | 1rem    | Input, textarea, select                                                                                          |
| Control | 999px   | Button, icon button, bump button, toggle track, toggle thumb, range track, range thumb, radio ring, radio bullet |
| Mark    | 0.5rem  | Checkbox box                                                                                                     |

Field and surface both default to 1rem. They stay separate so a field inside a card can be tightened without changing the card. A nested corner should be smaller than the corner that contains it.

The control value is a capsule. Lowering it makes buttons, switches, tracks, and handles more rectangular together. There is no square class and no circle class. An icon button becomes a circle when the control radius is at least half its height, and a rounded rectangle when it is less.

The checkbox box uses the mark radius at every size.

Select options use a 0.65rem corner. That is inside the menu, so it is tighter than the 1rem surface radius.

### Implementation notes

The variables are `--radius-surface`, `--radius-field`, `--radius-control`, and `--radius-mark`.

## 7. Typography

Jellyfy does not ship a typeface and does not set one. Text, icons, and form controls inherit the app font.

Weight, case, and size are still specified, because they are part of the material.

| Text                                   | Size, medium | Weight    | Case and tracking |
| -------------------------------------- | ------------ | --------- | ----------------- |
| Button label                           | 0.875rem     | 600       | Uppercase, 0.04em |
| Icon button icon                       | 1.5rem       | —         | —                 |
| Field value                            | 1rem         | Inherited | —                 |
| Field label, resting in an empty field | 1rem         | 400       | Color at 70%      |
| Field label, floated                   | 10px         | 500       | 0.04em            |
| Checkbox, radio, and toggle label      | 0.875rem     | 500       | —                 |
| Range label                            | 0.875rem     | 500       | —                 |
| Message                                | 0.75rem      | Inherited | —                 |
| Alert and card                         | 1rem         | Inherited | Line height 1.5   |
| Badge                                  | 10px         | 600       | Uppercase, 0.04em |

Line height is 1 on buttons and floated labels, and 1.5 on field values, resting labels, alerts, and cards.

### Implementation notes

Do not set `font-family` on the library root. Docs may set a font on the docs page. Components use `font: inherit`.

There is no font token in the customization contract.

## 8. Spacing

Interior spacing uses one unit. The default unit is 0.25rem. When Tailwind is present, the unit is Tailwind's spacing variable, so the library follows the app's spacing scale.

Component padding, gaps, and icon insets in the component section are multiples of that unit. The medium button is 12 units tall. The medium field label sits 3 units from the top when floated.

Jellyfy does not define a page grid.

### Implementation notes

Read `--spacing` and fall back to `0.25rem`. Author component lengths as multiples of that variable so an app that changes the spacing scale changes Jellyfy with it.

## 9. Motion

Motion is feedback. It is short, it eases out of the gesture, and it turns off when the person prefers reduced motion. Reduced motion removes squish, loading lights, and state transitions.

### Squish

Squish is the press deformation. It is measured in pixels so a radio and a wide button move by the same physical amount.

The pointer triggers it. Keyboard focus does not. A disabled control does not squish.

The press lasts 480ms. It has three shapes. Release lasts 300ms and returns from the scale already on screen to the normal size.

| Pose                                   | Width                   | Height                     |
| -------------------------------------- | ----------------------- | -------------------------- |
| Normal                                 | The control's own size  | The control's own size     |
| Peak, at 42% of the press              | 8px wider               | 2/7 of 8px shorter, 16/7px |
| Settle, held while the pointer is down | 1/7 of 8px wider, 8/7px | 2/7 of 8px taller, 16/7px  |

The 8px is the total change on that axis, stored as one value. Scale is centered, so the peak adds 4px on the left and 4px on the right. The height uses a smaller distance because a control is shorter than it is wide: an equal pixel cut on the height would collapse it. That height ratio is 2/7 of the 8px. The settle width is 1/7 of the 8px. The settle height uses the same 2/7, outward. These three numbers are named constants.

The way to the peak eases out. The way from the peak to the settle eases in and out. Release eases out.

Squish applies to the button, the icon button, the bump button, the field, the checkbox box, the radio ring, the toggle track, and the range thumb. Any other element can opt in.

### Hover rise

Buttons and icon buttons rise 2px on hover over 200ms, eased out, and return on press release or when disabled.

### Label

The floating label moves and changes size over 300ms, eased out.

### Loading lights

[DARK ADAPTATION MAY BE NEEDED]

Loading light is derived from the solid. It is not the press light.

- The light sheen is white mixed into the solid, shown at 40% opacity.
- The shade sheen is black mixed into the solid, shown at 40% opacity.

A button carries three sheens that sweep across it. Two are lights and one is a shade. Each sheen is a capsule, 30% of the button width and 40% of its height, blurred by 12px. It travels from fully off the left side to three widths past the right, vertically centered. The sweep is linear and repeats.

| Sheen | Duration | Delay |
| ----- | -------- | ----- |
| Light | 1.35s    | 0     |
| Shade | 1.65s    | 0.36s |
| Light | 1.5s     | 0.78s |

Opacity along that sweep is 0 at the start, 0.55 at 8%, 0.30 at 55%, 0.42 at 78%, and 0 at the end.

An icon button keeps the icon the product placed inside it and shows three orbiting dots. The library does not supply a loading icon. The dots fade in over 400ms, eased out. Each dot is 0.875rem, blurred by 4px, and sits 0.125rem from the top edge of the button.

| Dot | Tone  | Start angle | Duration | Opacity |
| --- | ----- | ----------- | -------- | ------- |
| 1   | Light | 0°          | 1.35s    | 0.15    |
| 2   | Shade | 130°        | 2.2s     | 0.10    |
| 3   | Light | 240°        | 1.6s     | 0.15    |

The orbit is linear and repeats. The light and shade tones use the loading mix above. The opacities stay as listed, so the orbit stays quieter than the button sweep.

### Other transitions

Color, shadow, and outline changes take 300ms, eased out. The select chevron turns 180° over 200ms, eased out, when the list is open. The checkbox glyph and the radio bullet scale over 300ms, eased out.

### Implementation notes

Squish is applied in script to the painted face of the control, not to the invisible input inside a checkbox, radio, toggle, or range. The opt-in class is `squish`. The named constants are the total width change `8`, the height ratio `2/7`, the settle-width ratio `1/7`, the press `480ms`, the release `300ms`, and the peak at `0.42`. Scale on an axis is `1 + pixels / size` on that axis.

Loading light and loading shade are variables that read `--color-white` and `--color-black`. The dark theme can override them. That override is marked `[DARK ADAPTATION MAY BE NEEDED]`.

Reduced motion is `prefers-reduced-motion: reduce`.

## 10. Interaction states

States stack. A selected, focused control shows both treatments. Disabled wins over hover, press, and squish.

### Rest

The role's fill, thickness, elevation, and content color. Press light is hidden. The bump button's lights stay visible.

### Hover

Buttons and icon buttons use the hover elevation and rise 2px. Select options use the 14% menu mix. Other objects do not change on hover.

### Press

Buttons and icon buttons show the control press light and squish. A field squishes and shows the field light: the radial highlight along the bottom and the shade along the top, at the field strengths. It does not use the control press light. The field light stays while the field is focused, including after a click. The bump button exchanges its highlight and shade. Keyboard activation does not squish.

### Focus

The focus mark is a 1px outline in the object's solid, 2px outside the object, with a 2px gap. In the light theme the gap is white at 50%. In the dark theme the gap is Neutral 950 at 50%. The gap separates the outline from the jelly edge.

An object with no slot uses the surface text color for the outline.

Buttons, icon buttons, the bump button, marks, and the range thumb show this on keyboard focus only. Fields show it whenever they contain focus, including after a click, and they also show the field light and the focused thickness. The modal shell itself has no focus outline.

### Selected

Selected means the value is on. It is not the press.

- A checked checkbox draws its glyph and, when a slot is applied, fills the box with the control fill.
- A checked radio shows its bullet.
- An on toggle moves the thumb to the end of the track. A slotted track uses the control fill. The thumb becomes white.
- A selected select option uses the 28% menu mix.

A normal button has no selected style.

### Disabled

A disabled button or icon button replaces its fill with the disabled fill and its text with the disabled text. It keeps the control thickness, uses the disabled elevation, loses the hover rise, and does not squish or show press light. The cursor shows that it cannot be used.

A disabled field keeps its fill and is drawn at 60% opacity, with the disabled elevation. It keeps the field thickness.

### Error

Error is the Error slot, applied by the product. It uses the same wash, content recipe, and field light as any other slot. The field and its message choose slots independently. A message may use Error while the field has no slot. A field may use Error while the message uses another slot.

### Loading

A button or icon button with loading shows the loading lights from the motion section. The button keeps its fill, thickness, and label. The icon button keeps the icon the product placed inside it. The library does not add an icon.

### Implementation notes

Keyboard focus is `:focus-visible`. Field focus is `:focus-within`. Disabled buttons are `:disabled`. Disabled fields are a disabled control inside the field. Selected checks are `:checked`. The select option selected style is `:checked` on the option.

The focus gap is a 2px spread shadow drawn before the thickness and the drop shadow. The outline is a 1px transparent outline that takes the solid color when focused, with a 2px offset.

## 11. Themes

The dark theme uses the same mixes, the same thicknesses, the same elevations, the same motion, and the same opacity and blur. Every slot, including Neutral, keeps those mixes. A plain element, one with no slot, keeps them too, and uses the surface tone as its solid.

Dark changes only the neutral step fed into a recipe, the wash-text endpoint, the focus-gap tone, and the grain.

The Neutral slot is one of the eight colors. Light uses Neutral 600 as its solid. Dark uses Neutral 300. It then uses the same wash, control fill, and content mix as primary.

The plain element uses the surface tone, the menu tone, the field focus ground, and the surface text. Those are not a second color and not the Neutral slot.

Disabled is a state. The fade stays 60% for the fill and 70% for the text. Dark changes the ramp step that is faded.

The wash-text endpoint, the focus gap, and the grain apply to every component, with a slot and without one.

| Token              | What it is                    | Light          | Dark               |
| ------------------ | ----------------------------- | -------------- | ------------------ |
| Neutral slot       | One of the eight colors       | Neutral 600    | Neutral 300        |
| Surface tone       | Plain element fill            | Neutral 50     | Neutral 700        |
| Menu tone          | Plain menu fill               | Neutral 100    | Neutral 800        |
| Field focus ground | Plain field while focused     | Neutral 100    | Neutral 600        |
| Surface text       | Plain element text            | Neutral 800    | Neutral 100        |
| Disabled fill      | Disabled state, 60% fade      | Neutral 400    | Neutral 600        |
| Disabled text      | Disabled state, 70% fade      | Neutral 50     | Neutral 300        |
| Wash text endpoint | Shared by every wash          | Black          | White              |
| Focus gap          | Shared by every focus ring    | White at 50%   | Neutral 950 at 50% |
| Grain              | Shared by every jelly surface | Dark, stronger | Light, fainter     |

A recipe marked `[DARK ADAPTATION MAY BE NEEDED]` uses the value in this document in both themes. That value is a CSS variable. The dark theme may override it.

### Implementation notes

`color-scheme` follows the theme so native controls match it.

## 12. Components

Every component has three sizes: small, medium, and large. Medium is the default and has no size name.

The component list is Button, Icon Button, Bump Button, Input, Textarea, Select, Checkbox, Radio, Toggle, Range, Alert, Badge, Card, Modal, and Message.

### Button

A control. Control thickness, control radius, control fill when a slot is applied, rest elevation, control press light, squish, and the hover rise.

|                | Small   | Medium   | Large  |
| -------------- | ------- | -------- | ------ |
| Height         | 2.5rem  | 3rem     | 3.5rem |
| Minimum width  | 8rem    | 10rem    | 12rem  |
| Inline padding | 1.25rem | 1.5rem   | 2rem   |
| Label size     | 0.75rem | 0.875rem | 1rem   |
| Content gap    | 0.5rem  | 0.5rem   | 0.5rem |

The label is uppercase, weight 600, tracking 0.04em. Text has a 6px shadow of Neutral 950 at 40%, so it sits in the pour.

### Icon Button

A button with no label. Its box is square. Width, height, and icon size:

|      | Small   | Medium | Large   |
| ---- | ------- | ------ | ------- |
| Box  | 2.5rem  | 3rem   | 3.5rem  |
| Icon | 1.25rem | 1.5rem | 1.75rem |

The shape comes from the control radius. There is no square variant and no circle variant.

While loading, the icon stays and the orbit from the motion section is shown.

### Bump Button

The close control on a modal. Transparent, no elevation, bump light, control radius. It sits 0.75rem from the top and the trailing edge of the panel.

|      | Small  | Medium  | Large  |
| ---- | ------ | ------- | ------ |
| Box  | 1.5rem | 2rem    | 2.5rem |
| Icon | 1rem   | 1.25rem | 1.5rem |

On a tinted surface, its icon uses the wash content color.

### Input

A field. Field thickness, field radius, field light while focused, squish. The value is transparent and inherits the field color.

|                            | Small               | Medium                 | Large                   |
| -------------------------- | ------------------- | ---------------------- | ----------------------- |
| Value size                 | 0.875rem            | 1rem                   | 1.25rem                 |
| Padding, filled or focused | 1rem 0.75rem 0.5rem | 1.375rem 1rem 0.625rem | 1.75rem 1.25rem 0.75rem |
| Padding, empty and blurred | 0.75rem vertical    | 1rem vertical          | 1.25rem vertical        |

The label is a separate element. When the field is empty and not focused, the label sits in the value line at the value size, weight 400, in the current color at 70%. When the field is focused or has a value, the label floats.

|                        | Small                                         | Medium                                    | Large                                         |
| ---------------------- | --------------------------------------------- | ----------------------------------------- | --------------------------------------------- |
| Floated label position | 0.375rem from the top, 0.75rem from the start | 0.75rem from the top, 1rem from the start | 0.875rem from the top, 1.25rem from the start |
| Floated label size     | 0.625rem                                      | 10px                                      | 0.75rem                                       |

**Start and end icons** sit in the field, in the current icon tone, Neutral 400. They do not receive pointer events. The value padding and the label's start edge grow to clear a start icon.

|                            | Small     | Medium  | Large     |
| -------------------------- | --------- | ------- | --------- |
| Icon box                   | 0.875rem  | 1rem    | 1.25rem   |
| Distance from the top      | 0.9375rem | 1.25rem | 1.5625rem |
| Inset from the edge        | 0.75rem   | 1rem    | 1.25rem   |
| Value padding on that side | 2rem      | 2.5rem  | 3rem      |

### Textarea

The same field as the input, including the floating label, the start icon, and the end icon. It grows vertically and does not grow horizontally. The empty resting state only reduces the top padding. The bottom padding stays.

|                            | Small                | Medium                | Large                |
| -------------------------- | -------------------- | --------------------- | -------------------- |
| Minimum height             | 5rem                 | 7rem                  | 9rem                 |
| Padding, filled or focused | 1rem 0.75rem 0.75rem | 1.375rem 1rem 0.75rem | 1.75rem 1.25rem 1rem |

### Select

A field with a library chevron and a menu. The closed control matches the input's padding, label, and focus light. The label stays floated, because a select always shows a value. The chevron is 1.25rem at medium, 1rem at small, and 1.5rem at large. It sits on the trailing edge, ignores pointer events, and turns 180° while the menu is open.

The menu is an overlay: menu tone, surface radius, surface thickness, overlay elevation. It opens 0.35rem below the field and pads 0.35rem. Options pad 0.55rem by 0.75rem, with a 0.65rem corner and 4px between them. Hover and selected mixes are the menu mixes from the color section.

The closed control reserves trailing space for the chevron: 2.25rem at small, 2.5rem at medium, 3rem at large.

### Checkbox

A mark plus a label. The box uses mark thickness, the mark elevation, and the mark radius. The gap between box and label is 0.75rem at medium, 0.5rem at small, and 1rem at large. The box is the hit target: 24px at medium and 20px at small.

|       | Small   | Medium   | Large |
| ----- | ------- | -------- | ----- |
| Box   | 1.25rem | 1.5rem   | 2rem  |
| Label | 0.75rem | 0.875rem | 1rem  |

The check is two strokes of the current color, 2px thick, 46% of the box wide and 22% tall, rotated −45°. It is invisible and scaled to 0.4 when off, and fully visible at scale 1 when on. A slotted checked box uses the control fill and the control content color.

### Radio

A mark plus a label. The ring is jelly: grain, blur, and mark thickness. It matches the checkbox sizes, including the 24px medium and 20px small hit target, and uses the control radius, so it is a circle in the default theme. The bullet is jelly with the grain. It is opaque, with no blur and no thickness. It is 0.75rem, 0.875rem, and 1.25rem at small, medium, and large. It scales from 0 to 1 when selected. With no slot, the bullet is the surface text color. With a slot, the bullet is the control fill.

### Toggle

A mark plus a label. The track and the thumb are both jelly: grain, blur, and mark thickness. Only the color differs. Both use the control radius.

|                | Small            | Medium          | Large          |
| -------------- | ---------------- | --------------- | -------------- |
| Track          | 2.5rem by 1.5rem | 3rem by 1.75rem | 3.5rem by 2rem |
| Thumb          | 1rem             | 1.25rem         | 1.5rem         |
| Thumb inset    | 0.25rem          | 0.25rem         | 0.25rem        |
| Travel when on | 1rem             | 1.15rem         | 1.5rem         |

The resting thumb is Neutral 500 mixed at 55% into white. The on thumb is white. A slotted on track uses the control fill. The thumb moves over 300ms, eased out.

### Range

A mark. The track, the fill, and the thumb are jelly: grain, blur, and mark thickness. Only the color differs. The fill is clipped to the track. With no slot, the track uses the surface tone and the fill uses the surface text tone, both at the material opacity. A slot sets the fill to the control fill. The thumb uses the fill's color. All three use the control radius.

The thumb position and the fill width follow the current value between the minimum and the maximum.

|              | Small   | Medium  | Large  |
| ------------ | ------- | ------- | ------ |
| Lane height  | 1.75rem | 2rem    | 2.5rem |
| Track height | 0.5rem  | 0.75rem | 1rem   |
| Thumb        | 1.25rem | 1.5rem  | 2rem   |

The default lane is at most 24rem wide. Label size and the gap above the lane match the toggle.

### Alert

A surface. Surface thickness, surface radius, rest elevation. A slot uses the wash and the wash content color. An optional icon is vertically centered on the first line.

|         | Small          | Medium       | Large        |
| ------- | -------------- | ------------ | ------------ |
| Padding | 0.5rem 0.75rem | 0.75rem 1rem | 1rem 1.25rem |
| Gap     | 0.5rem         | 0.75rem      | 1rem         |
| Text    | 0.875rem       | 1rem         | 1.25rem      |
| Icon    | 1rem           | 1.25rem      | 1.5rem       |

### Badge

A compact surface. Surface thickness, mark elevation, control radius, so the default badge is a capsule. A slot uses the control fill and the control content color, not the wash. The label is uppercase, weight 600, tracking 0.04em.

|         | Small           | Medium           | Large            |
| ------- | --------------- | ---------------- | ---------------- |
| Padding | 0.125rem 0.5rem | 0.25rem 0.625rem | 0.375rem 0.75rem |
| Text    | 0.5rem          | 10px             | 0.75rem          |

### Card

A surface. Surface thickness, surface radius, rest elevation. A slot uses the wash.

|         | Small        | Medium       | Large          |
| ------- | ------------ | ------------ | -------------- |
| Padding | 0.75rem 1rem | 1rem 1.25rem | 1.25rem 1.5rem |
| Text    | 0.875rem     | 1rem         | 1.25rem        |

### Modal

An overlay. The shell covers the viewport and centers the panel. The veil is Neutral 950 at 40%. The shell has no fill and no focus outline.

The panel is a surface with surface thickness, surface radius, and the overlay elevation. It is at most 28rem wide, with 1rem of space on each side of the viewport. A slot uses the wash. The bump button sits in the panel.

|               | Small | Medium | Large |
| ------------- | ----- | ------ | ----- |
| Panel padding | 1rem  | 1.5rem | 2rem  |

### Message

The caption under a field. It is not an error style. It has its own slot, independent of the field. With no slot, the color is the surface text color. With a slot, the color is the wash content color. The gap above the message is 0.375rem.

|      | Small    | Medium  | Large    |
| ---- | -------- | ------- | -------- |
| Text | 0.625rem | 0.75rem | 0.875rem |

### Implementation notes

Medium classes have no size suffix. Small and large use `-sm` and `-lg` on the component class: `btn-sm`, `input-lg`, `btn-bump-sm`.

The faces that receive squish, grain, and blur are `btn`, `btn-icon`, `input`, `textarea`, `select`, `checkbox-box`, `radio-ring`, `toggle-track`, `toggle-thumb`, `range-track`, `range-fill`, `range-thumb`, `alert`, `badge`, `card`, and `modal-panel`. The radio bullet, `radio-ring::after`, receives the grain only. It is opaque and has no blur and no inset.

Start and end slots are `input-start` and `input-end` inside both `input` and `textarea`. The select chevron is `picker-icon`. The built-in chevron is a masked element. A custom icon is an SVG with the same class.

## 13. Customization

A product may change:

- The eight solids.
- The eight content colors.
- The surface, field, control, and mark radii.
- The material opacity.
- The material blur.
- The noise tile size.
- The elevation multiplier.

A product may not change, through the public contract:

- The thickness recipes.
- The press-light, field-light, bump, and loading-light mixes.
- The wash percentages.
- The relationship between rest, hover, and disabled elevation. The multiplier scales them together.
- The typeface. The app's font is inherited.

Changing a solid without changing its content color leaves the previous content color in place.

### Implementation notes

Public custom properties: one solid and one content color per slot, `--radius-surface`, `--radius-field`, `--radius-control`, `--radius-mark`, one opacity, one blur, one noise size, and one shadow multiplier defaulting to `1`.

`--color-black` and `--color-white` are shared mix values. They are not part of this contract.

Shade, highlight, wash, menu mixes, thickness, and drop shadows stay internal variables. A variable marked `[DARK ADAPTATION MAY BE NEEDED]` can be overridden by the dark theme.

## 14. Library contract

Jellyfy styles its own components and anything that opts into a role or into squish. It does not set the page font, and it does not require Tailwind. Defaults follow Tailwind's color variables, spacing variable, and neutral ramp when they exist.

Class names are `btn`, `btn-icon`, `btn-bump`, `input`, `textarea`, `select`, `checkbox`, `radio`, `toggle`, `range`, `alert`, `badge`, `card`, `modal`, `modal-panel`, and `message`. Slots and sizes are extra classes on the same element.

## 15. Shipping

Jellyfy is not a Tailwind plugin. It stays compatible with Tailwind. Color and spacing read Tailwind's variables when those variables are defined, and use the fallbacks in this document when they are not.

The material recipes are variables in one material file: opacity, blur, grain, the four thicknesses, the press lights, and black and white. The dark theme overrides those variables. It does not restyle each component.

One rule in that file paints the jelly material. It sets the grain, the blur, and `box-shadow: var(--jelly-thickness)`. The selectors are the component faces and the thickness classes: `btn`, `btn-icon`, `btn-bump`, `input`, `textarea`, `select`, `checkbox-box`, `radio-ring`, `toggle-track`, `toggle-thumb`, `range-track`, `range-fill`, `range-thumb`, `alert`, `badge`, `card`, `modal-panel`, `thickness-surface`, `thickness-field`, `thickness-control`, and `thickness-mark`. The radio bullet is not in this rule. It uses the grain, it is opaque, and it has no blur and no thickness.

Each component is its own stylesheet. A product imports the components it uses. A component file that is not imported is not in the build. The material file ships once. A component name left in the shared selector does nothing when that component's file is absent.

A component file does not repeat the grain, the blur, or the shadow. It sets `--jelly-thickness` to the thickness for its role. `.btn` sets the control thickness, so `<button class="btn">` has the jelly material.

`thickness-surface`, `thickness-field`, `thickness-control`, and `thickness-mark` are for a custom element. They set `--jelly-thickness` to the matching thickness. The same class on a component replaces that component's thickness and nothing else. `class="btn thickness-surface"` keeps the button's size, radius, type, fill, and press light, and uses the surface thickness. The thickness classes sit in the utilities layer, after the component rules, so the tie goes to the thickness class.

### Implementation notes

The shared rule uses `:where(...)`, so it adds no specificity. Component files only assign `--jelly-thickness`. When browsers support native CSS mixins, that shared selector will be replaced by a mixin applied inside each component. The variables will stay.
