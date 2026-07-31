import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Firecloak',
    loadComponent: () => import('./home/home').then(m => m.Home),
  },  
  {
    path: 'about',
    title: 'Firecloak - About',
    loadComponent: () => import('./about/about').then(m => m.About),
  }, 
  {
    path: 'cosplay',
    title: 'Firecloak - Cosplay',
    loadComponent: () => import('./cosplay/cosplay').then(m => m.Cosplay),
  }, 
  {
    path: 'cosplay/:id',
    title: 'Firecloak - Cosplay Details',
    loadComponent: () => import('./cosplay-details/cosplay-details').then(m => m.CosplayDetails),
  },
  {
    path: 'tutorials',
    title: 'Firecloak - Tutorials',
    loadComponent: () => import('./tutorials/tutorials').then(m => m.Tutorials),
  }, 
  {
    path: 'tutorials/:id',
    title: 'Firecloak - Tutorial Details',
    loadComponent: () => import('./tutorial-details/tutorial-details').then(m => m.TutorialDetails),
  }, 
  {
    path: 'contact',
    title: 'Contact',
    loadComponent: () => import('./contact/contact').then(m => m.Contact),
  },
  {
    path: 'links',
    title: 'Firecloak - Links',
    loadComponent: () => import('./links/links').then(m => m.Links),
  },
  {
    path: '**',
    title: 'Firecloak - Not Found',
    loadComponent: () => import('./not-found/not-found').then(m => m.NotFound),
  },
];