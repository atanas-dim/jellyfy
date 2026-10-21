Jellyfy Design System

- Soft controls...[brief description]

Material

- noise img background (current ones are ok) - diff version for light and dark theme
- transparency
- 3 base thicknesses achieved with inset shadows - thinest surface, mid for inputs, thicker for buttons. should we structure them by size sm md lg? to make them reusable and not stuck to component names? shuodl thick be realised like this in the cs - thickness-sm thickness-md thickness-lg? is this appropriate or not? what would the best be?
- small components eg checkboxes, radio btns, slider handlers etc use a diff inset shadow due to their small size in all size levels we provide - the current css call this shadow-inset-mark
- press effect achieved with the use of radial gradients positioned absolute close to top edge and to bottom edge of element/componnets - the bottom one is the light/highlight, the top one is the shadow - they are derived colors fromm the solid applied to the component
- the material opacity should be consistent for all components and should originate from one single css var, same is for the blur level
- drop-shadows - they are diff for normal state, for hover and for press - so describe the logic for them please and are we also use -sm, -md, -lg pattern for them is is this not the case?
- secondary controls like the dialog close button use the bump-like effect achieved again with radial gradients - this needs to be explain and also the exact values of tone/color mixes etc have to be defined in the appropriate part of this doc if it's not this Material section

The intention

- we are a css library for the jelly theme, we are inspured by TW and DaisyUI but we are not dependent on TW as a goal for the usage of the library - but we should always be TW compatible because TW is the most widely used solution these days, that's why we use TW color vars defaults with fallbacks if use doenst use TW, same is for the spacinig var/levels

Colors

- 8 color slots/vars - 4 utility colors and 4 theme/visual related
- dark theme uses same defaults except a diff default neutral shade to maintain same visual principles
- shall we provide foreground color var slot for each color? how is foreground contrast achieved for diff color darkness/lightness? we should maintain AA or even AAA standard
- plain elements wihtout selected color applied to them have base tones - they differ slightly from the neutral default colors - add the exact tones here
- we provide neutral palette in full although only some vars are used - this is for consistency
- when u explain colors and derived tones we need rules/definition of the levels used in the defualt theme - eg shade-strenght, highgligh-strenght, they differ for btns and inputs for example due to the diff color sthrenght of these. We need proper rule for how many diff values/vars are needed for these derivatives and solid rule for which ones aplly where and why they have to be diff vars and not the same one where there's a solid true reason for it.

Typography

- we currently don't have a font for the library - should we and which one?
- text sizes respond to the size of component eg sm, regular(doesnt need size class), lg

Spacing

- based on the tailwind spacing values - we use --spacing var and fallbacks and provide override option in user customisation contract

Radius

- radius surface
- radius control (currnetly this is the buttons i think)
- are these 2 the ones we need or we need more? are the var names ok

Focus

- ring with offset distance taking the color of the component - currently it's correct visually
- offset gap has 50% opacity white or black depending on the current light/dark theme
- all elements have the focus applied if they can be focused by the keyboard tab button
- some elements like inputs use the focus ring on focus so that expected to appear not only on tab press from keyboard - currently i think this whole focus par tis workin gand is at least visually correct

Components

- list the ones we've built here
- the surface elements vs inputs vs buttons/controls have diff levels/strenght of the solid color. this is core logic in the visual system. currently they are correct especially in the light theme. so we need to define the rule for these derived strenghts. then dark theme shoudld strictly follow same rules if it currently doesnt
- all components use the jelly material including slider tracks, slider fills, switch handles, swithc tracks etc. - if any is missing if u shuold flag this, only the radio button bullet is allow to look solid at the moment althought it would be good for it to have the noise at least

Effects

- sqush effect - describe it and the logic for pixel based scale on press - the logic of scale x and then y and then go back to initial state
- loading lights - 2 options - one for reg buttons and one for icon buttons - they use gradients - the animation is correct atm for both, just needs describing here. i think currentl gradient colros are from white and black - could we also derive them from the selected solid like for the press effect gradients for example? these are diff strenghts so dont get confused and dont just use the press effect gradients

Sizes

- small, refular and large. regular is the default so it doesnt need special size classes like sm and lg
- all components have these 3 sizes, there maybe rare exceptions but currently i dont see any. list/explain them here if any dont have sizes

Light and Dark Themes

- the currect light theme is visually correct in browser - use as reference if i have missed to describe anything.
- both themes follow same exact rules as default eg opacity, color derivative logic (eg the amount of black , white or transparent we mix with a solid) etc, we manipulate/adapt based on color shades mainly. only very small exceptions are allowed and should be asked for permission wehn describing this system and them when implementing (such instructions shoudl not be left in the final design system doc - it's for WIP and for orientation in the work process)

Customisation

- color slots for 8 mian colors (I assume for foreground colros as well if we add this to the system)
- radius
- noise size?
- transparency on jelly material
- blur of jelly material
- font? - do we use default library font or let it use/adapt to users app font?
- could we also allow user in the official contract to adjust shade/highlight strenghts?
- drop shadow levels?

Ignore current app files and old design system page, they are not entirely correct, we define the system from scratch now, and then improve the existing code

Overall this oc shoudl becode the design system definitions/rules/principles. We currently talk about css in it etc. IN the final variant it doesn't have to mention technicalities of the coding implementations. So when u update sections make sure the technical comments and advice is not mixed with the design definition/rules parts. so in each section maybe include any technical specifics and comments as a second part which cna later easily be split/removed if needed
