import { Routes } from '@angular/router';
import { BlogList } from './components/blog-list/blog-list';
import { BlogDetails } from './components/blog-details/blog-details';
import { Services } from './components/services/services';
import { AboutUs } from './components/about-us/about-us';
import { ContactUs } from './components/contact-us/contact-us';
import { EraOfAi } from './components/era-of-ai/era-of-ai';

export const routes: Routes = [
    {
        path: '',
        component: BlogList
    },
    {
        path: 'blogs',
        component: BlogList
    },
    {
        path: 'blog/:slug',
        component: BlogDetails
    },
    {
        path: 'services',
        component: Services
    },
    {
        path: 'about-us',
        component: AboutUs
    },
    {
        path: 'contact-us',
        component: ContactUs
    },
    {
        path: 'era-of-ai',
        component: EraOfAi
    }
];
