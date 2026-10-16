# Paginator

## Purpose

The Paginator component divides the content into separate, manageable pages. It prevents overwhelming the user with too much content on a single page.

## Usage rules

Use it:
- Use it when a search query returns a significant number of results.
- Use it when data tables have many rows.

Do not use it:
- Do not use it for a small number of records.
- Do not use it if the user wants to see all the records together.

General:
- Allow users to choose how many items they want to see per page ("Page size" option).
- Annotate in Figma to which UI element the Paginator has been assigned, so developers can correctly apply semantic structure and ARIA information.

## How to use

This is only a redesign of the Angular Material "Paginator" component.

The API definition is available on the Angular Material site: [Paginator- opens in a new tab](https://v17.material.angular.io/components/paginator/api)

## Related

- components/stepper
