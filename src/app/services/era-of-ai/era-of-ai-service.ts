import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EraOfAiPage } from '../../models/title-content-page';
import { StrapiResponse } from '../../models/services-pricing';

@Injectable({ providedIn: 'root' })
export class EraOfAiService {
  private http = inject(HttpClient);
  private strapiUrl = environment.strapiApiUrl;

  getEraOfAi(): Observable<EraOfAiPage | null> {
    return this.http
      .get<StrapiResponse<EraOfAiPage>>(`${this.strapiUrl}/era-of-ai`, {
        params: { populate: '*' }
      })
      .pipe(map(res => res.data ?? null));
  }
}
