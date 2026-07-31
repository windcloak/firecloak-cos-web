# firecloak-cos-web

# View Site Live

[firecloak.net](https://firecloak.net/)

# Credits

- Angular 22 - framework
- [Angular Material](https://material.angular.dev/) - styling
- [Font Awesome](https://fontawesome.com/) - icons
- [fslightbox.js](https://fslightbox.com/) - lightbox for galleries
- Claude Code - AI assistant

# Angular Material Theme

Theme is available to view at [theme-colors-preview.html](theme-colors-preview.html)

# When Adding New Photos

Run this any time you add or change gallery photos. It's a plain Node script that scans public/cosplay/*/ (and public/tutorials/*/) and writes each folder's dimensions.json

`npm run generate:dimensions`

You do need a fresh ng build (and redeploy) each time — a previously built dist/ folder won't contain images you add to public/ afterward, since that copy only happens during build.