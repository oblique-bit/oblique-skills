# Toolchain Logger

Source: Directus content version `oui-4570`, Toolchain page `logger`.

Use the Toolchain logger factories instead of instantiating a logger directly:

- `obCreateLogger()` writes structured messages through the global console.
- `obCreateSchematicsLogger(context)` writes through an Angular
  `SchematicContext` logger.

Both factories support a silent option. Group related work, mark steps, and
end the group so durations and success status are emitted consistently.
