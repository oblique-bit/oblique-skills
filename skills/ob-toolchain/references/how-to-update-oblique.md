# How to Update Oblique

Source: Oblique update guidance.

Oblique applications must move through each major version between the current
version and the target. Do not skip majors.

## Oblique 12.1 and newer

1. Determine the next Oblique major version.
2. Run the versioned update command:

   ```shell
   npx @oblique/cli@<oblique-version> update
   ```

3. Review every schematic change.
4. Check the Oblique changelog for manual adjustments.
5. Run the application's lint and test commands.
6. Verify that the application still works.
7. Repeat for the next major until the target version is installed.

The update command supports `--force`, `--verbose`, and `--allow-dirty`.
Prefer a clean working tree so the schematic diff is easy to review, and keep
unrelated changes separate.

## Unsupported layouts

Oblique schematics do not support standalone applications, SSR applications, or
applications outside the `src` directory. Update these projects manually by
following the migration guidance for their installed versions. Do not force a
schematic into an unsupported layout.

## Oblique 12.0 and older

Update Angular and its matching Angular CLI one major at a time, then update
Angular Material, then Oblique. Review the changelog and run lint and tests at
each step before continuing.
