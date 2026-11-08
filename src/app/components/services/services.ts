import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { StrapiBlocks } from '../strapi-blocks/strapi-blocks';
import { ServicesPricingService } from '../../services/services-pricing/services-pricing-service';

interface ServicePlanTheme {
  background: string;
  accent: string;
  text?: string;
}

// Keyed by a lowercase substring of ServiceDetailsTitle to match against.
// Plans not listed here fall back to the default card styling.
const PLAN_THEMES: Record<string, ServicePlanTheme> = {
  'no vibes': { background: '#FE88D2', accent: '#AD026D', text: '#FFFFFF' },
  startup: { background: '#DC8AFF', accent: '#7300A4', text: '#FFFFFF' },
  basic: { background: '#FFAA77', accent: '#B84400', text: '#FFFFFF' }
};

@Component({
  imports: [CurrencyPipe, StrapiBlocks],
  selector: 'app-services',
  styleUrl: './services.scss',
  templateUrl: './services.html'
})
export class Services {
  private servicesPricingService = inject(ServicesPricingService);

  // Adjust to match the currency your pricing is quoted in
  protected readonly currencyCode = 'ZAR';

  protected readonly descriptionLinkify = { phrase: 'contact us', routerLink: '/contact-us' };

  // Fetched during prerender (build time) via RenderMode.Prerender on the
  // 'services' route - the resulting HTML is what ships as the static page
  pricing = toSignal(this.servicesPricingService.getServicesPricing(), { initialValue: null });

  protected getPlanTheme(title: string): ServicePlanTheme | null {
    const lowerTitle = title.toLowerCase();
    const key = Object.keys(PLAN_THEMES).find(k => lowerTitle.includes(k));
    return key ? PLAN_THEMES[key] : null;
  }
}
