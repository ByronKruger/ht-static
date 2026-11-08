import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { StrapiBlocks } from '../strapi-blocks/strapi-blocks';
import { EraOfAiService } from '../../services/era-of-ai/era-of-ai-service';

@Component({
  imports: [StrapiBlocks],
  selector: 'app-era-of-ai',
  styleUrl: './era-of-ai.scss',
  templateUrl: './era-of-ai.html'
})
export class EraOfAi {
  private eraOfAiService = inject(EraOfAiService);

  // Fetched during prerender (build time) via RenderMode.Prerender on the
  // 'era-of-ai' route - the resulting HTML is what ships as the static page
  page = toSignal(this.eraOfAiService.getEraOfAi(), { initialValue: null });
}
