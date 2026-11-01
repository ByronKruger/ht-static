// import { Service } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { map, Observable } from "rxjs";

// @Service()
// export class BlogService {}

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);
  private strapiUrl = environment.strapiApiUrl;

  getPosts(): Observable<any> {
    // <StrapiResponse>
    return this.http.get<any>(`${this.strapiUrl}/blogs`).pipe(
        map(res => res.data ?? [])
    );
  }

  getPost(slugOrId: string): Observable<any> {
    //   getPost(slugOrId: string): Observable<BlogPost | null> {
    // Prefer slug if you add a UID field; otherwise filter by documentId
    const url = `${this.strapiUrl}/blogs`;
    const params = {
        'filters[documentId][$eq]': slugOrId,   // or filters[slug][$eq] once you have a slug
        // populate: '*'   // if you need relations/media
    };

    //   return this.http.get<{ data: BlogPost[] }>(url, { params }).pipe(
    return this.http.get<{ data: any }>(url, { params }).pipe(
        map(res => res.data?.[0] ?? null)
    );
  }
}