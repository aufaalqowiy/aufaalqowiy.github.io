# Aufa Alqowiy — Portfolio

## Stack
- Static HTML + Tailwind CSS
- Custom include system (`scripts/build-html.js`) compiles `src/*.html` and `src/projects/*.html` into root `index.html` and `projects/*.html`, replacing `<!-- @include: partials/x.html -->` markers

## Structure
```
partials/          shared nav and footer includes
src/                source HTML (edit here) and Tailwind input CSS
src/projects/       source project pages
images/             project images and videos
dist/               compiled CSS output
index.html          compiled homepage
projects/           compiled project pages
```

## Commands
```
npm run build       build HTML + CSS
npm run build:html  build HTML only
npm run build:css   build CSS only
npm run watch        watch and rebuild on change
```

## Contact
aufaalqowiy@gmail.com
