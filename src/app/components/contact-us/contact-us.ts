import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { StrapiBlocks } from '../strapi-blocks/strapi-blocks';
import { ContactUsService } from '../../services/contact-us/contact-us-service';

@Component({
  imports: [StrapiBlocks],
  selector: 'app-contact-us',
  styleUrl: './contact-us.scss',
  templateUrl: './contact-us.html'
})
export class ContactUs {
  private contactUsService = inject(ContactUsService);

  // Fetched during prerender (build time) via RenderMode.Prerender on the
  // 'contact-us' route - the resulting HTML is what ships as the static page
  page = toSignal(this.contactUsService.getContactUs(), { initialValue: null });
}
