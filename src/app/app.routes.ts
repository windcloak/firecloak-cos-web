import {Routes} from '@angular/router';
import {Home} from './home/home';
import {About} from './about/about';
import {Cosplay} from './cosplay/cosplay';
import {CosplayDetails} from './cosplay-details/cosplay-details';
import {Tutorials} from './tutorials/tutorials';
import {TutorialDetails} from './tutorial-details/tutorial-details';
import {Contact} from './contact/contact';
import {Reviews} from './reviews/reviews';
import {NotFound} from './not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    title: 'App Home Page',
    component: Home,
  },  
  {
    path: '',
    title: 'About Page',
    component: About,
  }, 
  {
    path: 'cosplay',
    title: 'Cosplay Page',
    component: Cosplay,
  }, 
  {
    path: 'cosplay/:id',
    title: 'Cosplay Details Page',
    component: CosplayDetails,
  },
  {
    path: 'tutorials',
    title: 'Tutorials Page',
    component: Tutorials,
  }, 
  {
    path: 'tutorials/:id',
    title: 'Tutorial Details Page',
    component: TutorialDetails,
  }, 
  {
    path: 'contact',
    title: 'Contact',
    component: Contact,
  },
  {
    path: 'reviews',
    title: 'Reviews Page',
    component: Reviews,
  },
  {
    path: '**',
    title: 'Not Found',
    component: NotFound,
  },
];