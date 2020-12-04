// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

import { EnvironmentConfig } from '../typings';

export const environment: EnvironmentConfig = {
  production: false,
  observerGuideUrl:
    'https://fiecarevot.ro/wp-content/uploads/2020/12/Manual-observatori-FV-parlamentare2020.pdf',
  apiUrl: 'https://api.votemonitor.org/',
};
