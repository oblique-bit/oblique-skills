# Table HTML

## Purpose

The HTML Table component allows users to interactively browse, sort, and filter large data sets in a tabular format. It is the fallback solution when the Angular Material table is not available.

## Usage rules

Use it:
- Use it in projects that use Oblique but not Angular.

Do not use it:
- Do not use it in projects that use Angular. Instead, consider the default table component [Material Table](/components/material-table).

## How to use

** Styles are applied by setting the following classes on the** `` **element:**

- `ob-table`: will apply Oblique's styles, this is a precondition for all other Oblique styles

- `ob-table-plain`: will remove the grey background on odd lines

- `ob-table-disable-hover-style`: disables the hover on table rows

- `ob-table-sm`: will reduce the cell `padding`

- `ob-table-lg`: will increase the cell `padding`

- `ob-table-collapse`: will display the table in a condensed form as soon as the layout collapses (< 905px). The header of each cell is to be provided through the `data-title` attribute.

- `ob-table-collapse-sm`: same as `ob-table-collapse`, but on a breakpoint lower than 600px

_ *Also note the existence of_ `ob-table-scrollable` _that has to be applied to a table's parent to add a scrollbar if the table's width is greater than the available space._

## Additional info

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

- /components/material-table
