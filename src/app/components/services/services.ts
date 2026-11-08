import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { StrapiBlocks } from '../strapi-blocks/strapi-blocks';
import { ServicesPricingService } from '../../services/services-pricing/services-pricing-service';

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
}
