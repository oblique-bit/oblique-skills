# Toolchain `exec`

Source: Directus content version `oui-4570`, Toolchain page `exec-16`.

Toolchain 16 executes commands with `spawnSync`, avoiding the command
execution vulnerability of the older `execSync` implementation. It exports
`obExecWithLogging`, `obExecWithLoggingOrExit`, and `obSpawnCommand`.

Toolchain 16 uses an options object:

```typescript
obExecWithLogging({logger: group, command: 'npm run build'});
obExecWithLoggingOrExit({logger: group, command: 'npm run build'});
```

When migrating from Toolchain 15, replace positional calls such as
`obExecWithLogging(logger, command, options)` with the options object. Pass
command arguments through the optional `args` array. The helpers capture output,
log the command within a logger step, trim successful output, and use a default
60-second timeout.
