// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'http://localhost:6868',
  bookings_url: '/api/bookings',
  booking_view_url: '/api/bookings/view',
  autos_url: '/api/autos',
  clients_url: '/api/clients',
  add_auto_url: '/addAuto',
  repairs_url: '/api/repairs',
  add_repair_url: '/api/repairs/add',
  images_url: '/images',
  auto_images_url: '/images/setAutoImg',
  user_images_url: '/images/setUserImg',
  users_url: '/users',
  stats_url: '/api/stats',
  auth_url: '/auth/login'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
