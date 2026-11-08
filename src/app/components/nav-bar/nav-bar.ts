import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-nav-bar',
  styleUrl: './nav-bar.scss',
  templateUrl: './nav-bar.html'
})
export class NavBar {
  protected menuOpen = signal(false);

  protected readonly links = [
    // { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Era of AI', path: '/era-of-ai' },
    { label: 'Contact Us', path: '/contact-us' }
  ];

  protected toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
