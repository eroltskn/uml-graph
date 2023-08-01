/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router'
import { DiagramPlugin } from '@syncfusion/ej2-vue-diagrams';

export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router).
     use(DiagramPlugin)
}
