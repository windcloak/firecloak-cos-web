import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'App Home Page',
    loadComponent: () => import('./home/home').then(m => m.Home),
  },  
  {
    path: 'about',
    title: 'About Page',
    loadComponent: () => import('./about/about').then(m => m.About),
  }, 
  {
    path: 'cosplay',
    title: 'Cosplay Page',
    loadComponent: () => import('./cosplay/cosplay').then(m => m.Cosplay),
  }, 
  {
    path: 'cosplay/:id',
    title: 'Cosplay Details Page',
    loadComponent: () => import('./cosplay-details/cosplay-details').then(m => m.CosplayDetails),
  },
  {
    path: 'tutorials',
    title: 'Tutorials Page',
    loadComponent: () => import('./tutorials/tutorials').then(m => m.Tutorials),
  }, 
  {
    path: 'tutorials/:id',
    title: 'Tutorial Details Page',
    loadComponent: () => import('./tutorial-details/tutorial-details').then(m => m.TutorialDetails),
  }, 
  {
    path: 'contact',
    title: 'Contact',
    loadComponent: () => import('./contact/contact').then(m => m.Contact),
  },
  {
    path: 'reviews',
    title: 'Reviews Page',
    loadComponent: () => import('./reviews/reviews').then(m => m.Reviews),
  },
  {
    path: 'links',
    title: 'Links Page',
    loadComponent: () => import('./links/links').then(m => m.Links),
  },
  {
    path: '**',
    title: 'Not Found',
    loadComponent: () => import('./not-found/not-found').then(m => m.NotFound),
  },
];