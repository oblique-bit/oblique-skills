# Stepper

## Purpose

The Stepper component gives an orientation to the user by displaying the steps needed to accomplish a goal.

## Usage rules

Use it:
- Use it to lead the user to complete a task in a specific sequence.
- Use it to simplify and break down a complex task into shorter steps.

Do not use it:
- Do not use it for simple tasks, e.g., if there are only two steps (consider [Expansion Panel](/components/expansion-panel/examples) for this).
- Do not use it for repetitive processes of advanced users. It will slow them down.

General:
- The stepper works best for processes with approximately 3&ndash;5 steps.
- Use concise and clear language for labels.
- Keep the text length of the labels consistent and roughly within 30 characters.
- If you need to describe a step more extensively, use the page title or add a description outside the stepper.
- Reduce the number of links on the page, which can lead the user outside of the stepper.

## How to use

This is only a redesign of the Angular Material "Stepper" component, limited to the linear mode.

The API definition is available on the Angular Material site: [Stepper - opens in a new tab](https://v17.material.angular.io/components/stepper/api)

 

Note: To use the "Stepper" component with Oblique the matStepperIcon's need to be overwritten as shown in the example.

## Additional info

## Types

- **Horizontal**: standard type, suitable for a few steps

- **Vertical**: alternative type, when there is a risk of having too many steps or step names that are too long

- **Linear**: It requires the user to complete previous steps before proceeding to the following step. It is enabled by default.

- **Non-linear**: The user can navigate between steps in any order.

## Related

- /components/expansion-panel
