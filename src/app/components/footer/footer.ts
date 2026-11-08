import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-footer',
  styleUrl: './footer.scss',
  templateUrl: './footer.html'
})
export class Footer {
  protected readonly year = new Date().getFullYear();

  protected readonly links = [
    // { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Era of AI', path: '/era-of-ai' },
    { label: 'Contact Us', path: '/contact-us' }
  ];
}
