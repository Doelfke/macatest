# website-app
## Web UI for website

### Setup And Running
`yarn`
`yarn start`

### Getting The Latest API DTO Definitions
Make sure you have website-api cloned, and updated
`yarn generate-api-types`

### Optional Setup
In VS Code add these configs to make your life easier:
```
"editor.codeActionsOnSave": {
    "source.fixAll": true
}
"typescript.preferences.importModuleSpecifier": "non-relative",
```


### Adding icons
We use [feather icons](https://feathericons.com/) download one and put it in src/components/icon.  When running the project, it will automatically add the new type for you.

### Navigating The Project / Practices
Take a look around and see how it's organized.  Overall, we try to keep things as simple as humanly possible.  Simple = maintainable.  

We create logical "modules" under the src folder.  They are somewhat arbitrary, but help us keep things organized.

See the dashboard to see how pages are setup.  A "page" handles the title and grabs any info from the route, a component fetches data and maintains state, and a component display data.  It's as simple as that.

No redux, ever.  It's a waste of time and effort.

If there is an ESlint that gets in your way, remove it.

We are on the latest React, so we use hooks.  If they don't work for you, don't use them.

Format code in a way that makes sense.  The goal should be make code as clear as possible.  There are no hard and fast rules.  Be nice to others, so you aren't the one responsible for that piece of code forever :)

Be smart about dependencies.  Bloat makes for long loading times, customers lose.

Use some sort of BEM like setup and CSS modules / SCSS for styles, so we don't have to worry about collisions.

If something is too hard, make it better.  If something gets in your way, fix it.