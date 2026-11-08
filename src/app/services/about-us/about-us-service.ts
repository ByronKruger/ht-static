import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AboutUsPage } from '../../models/title-content-page';
import { StrapiResponse } from '../../models/services-pricing';

@Injectable({ providedIn: 'root' })
export class AboutUsService {
  private http = inject(HttpClient);
  private strapiUrl = environment.strapiApiUrl;

  getAboutUs(): Observable<AboutUsPage | null> {
    return this.http
      .get<StrapiResponse<AboutUsPage>>(`${this.strapiUrl}/about-us`, {
        params: { populate: '*' }
      })
      .pipe(map(res => res.data ?? null));
  }
}
