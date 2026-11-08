import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ServicesPricing, StrapiResponse } from '../../models/services-pricing';

@Injectable({ providedIn: 'root' })
export class ServicesPricingService {
  private http = inject(HttpClient);
  private strapiUrl = environment.strapiApiUrl;

  getServicesPricing(): Observable<ServicesPricing | null> {
    // Single type - adjust the API ID below to match your Strapi content-type route
    return this.http
      .get<StrapiResponse<ServicesPricing>>(`${this.strapiUrl}/services-and-pricing-2`, {
        params: { populate: '*' }
      })
      .pipe(map(res => res.data ?? null));
  }
}
