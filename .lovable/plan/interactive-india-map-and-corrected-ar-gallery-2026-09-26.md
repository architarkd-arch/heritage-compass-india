# Interactive India map and corrected AR gallery

## What will change
- Use the uploaded India zones-and-states image as the map background.
- Position the existing heritage markers over the correct places, keep filtering, and make selection clear on both the map and list.
- Improve the selected-place panel with direct access to full heritage details and map directions.
- Remove the astronaut model from Harvest Dance.
- Give every gallery item an AR option using a matching lightweight 3D presentation, with a normal interactive 3D fallback when device AR is unavailable.
- Keep artwork titles, stories, creator/community credits, and scanner behavior intact.

## Technical details
- Store the uploaded map through the project asset service and import its pointer in the map page.
- Replace the stylised SVG silhouette with the image while preserving accessible marker buttons.
- Create four small local GLB scenes tailored to Warli dance, Gond tree, Madhubani fish, and Pithora horses; no unrelated third-party demo models.
- Update gallery data so every artwork points to its corresponding local model.
- Verify map filtering/selection, all AR dialogs, mobile layout, and preview errors.
