import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { StrapiBlocks } from '../strapi-blocks/strapi-blocks';
import { AboutUsService } from '../../services/about-us/about-us-service';

@Component({
  imports: [StrapiBlocks],
  selector: 'app-about-us',
  styleUrl: './about-us.scss',
  templateUrl: './about-us.html'
})
export class AboutUs {
  private aboutUsService = inject(AboutUsService);

  // Fetched during prerender (build time) via RenderMode.Prerender on the
  // 'about-us' route - the resulting HTML is what ships as the static page
  page = toSignal(this.aboutUsService.getAboutUs(), { initialValue: null });
}
