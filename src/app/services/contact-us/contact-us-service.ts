import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactUsPage } from '../../models/title-content-page';
import { StrapiResponse } from '../../models/services-pricing';

@Injectable({ providedIn: 'root' })
export class ContactUsService {
  private http = inject(HttpClient);
  private strapiUrl = environment.strapiApiUrl;

  getContactUs(): Observable<ContactUsPage | null> {
    return this.http
      .get<StrapiResponse<ContactUsPage>>(`${this.strapiUrl}/contact-us`, {
        params: { populate: '*' }
      })
      .pipe(map(res => res.data ?? null));
  }
}
