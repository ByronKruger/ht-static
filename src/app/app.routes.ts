import { Routes } from '@angular/router';
import { BlogList } from './components/blog-list/blog-list';
import { BlogDetails } from './components/blog-details/blog-details';

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
    }
];
