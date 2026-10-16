# Table Material

## Purpose

The Material Table component allows users to browse, sort, filter and edit large data sets in a tabular format.

## Usage rules

Use it:
- Use it as the default component for tables.

Do not use it:
- Do not use it for projects that use Oblique but not Angular. Instead, consider the alternative component [HTML Table](/components/html-table).

General:
- Use Inline Editing for quick, individual cell modifications within the table, where context is critical.
- Use Modal Editing for complex edits involving detailed data input, requiring a focused environment.
- When implementing a sortable table, one column should be sorted by default when the table is first loaded.

## How to use

This is only a redesign of the Angular Material "Table" component.

The API definition is available on the Angular Material site: [Table - opens in a new tab](https://v17.material.angular.io/components/table/api)

## Additional info

## Accessibility

When using global buttons within a table, make sure that they are in a `<th>`
rather than in a `<td>`.

## CSS classes

Class
What it does
Usage

`ob-table`
will apply Oblique's styles, this is a precondition for all other Oblique styles
Use it on all tables that should have Oblique styling. None of the subsequent classes will work correctly if this class is not applied.

`ob-table-plain`
will remove the grey background on odd lines
Use it for simple tables with few rows

`ob-table-disable-hover-style`
will disable the hover on table rows
Use it for small tables where a hover is not needed

`ob-table-sm`
will reduce the cell padding
Use it for high density tables

`ob-table-lg`
will increase the cell padding
Use it for low density tables

`ob-table-collapse`
will display the table in a condensed form as soon as the layout collapses (
Use it to enable mobile compatibility

`ob-table-collapse-sm`
same as ob-table-collapse, but on a breakpoint lower than 600px

## Related

- /components/html-table
