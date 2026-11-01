import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog/blog-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-blog-details',
  styleUrl: './blog-details.scss',
  template: `
    <a routerLink="/blog">← Back to list</a>

    @if (post(); as p) {
      <article>
        <h1>{{ p.Title }}</h1>
        <p><small>Published {{ p.publishedAt }}</small></p>

        <!-- Simple rendering of Strapi blocks - expand as needed -->
        @for (block of p.Content; track $index) {
          @if (block.type === 'paragraph') {
            <p>
              @for (child of block.children; track $index) {
                {{ child.text }}
              }
            </p>
          }
        }
      </article>
    } @else {
      <p>Loading or post not found…</p>
    }
  `
  // templateUrl: './blog-details.html',
})
export class BlogDetails {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  // Route param → fetch → signal
  // This runs during prerender (slug is already known) and is transfer-cached for the client
  post = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('slug') ?? ''),
      switchMap(slug => this.blogService.getPost(slug))
    ),
    { initialValue: null }
  );
}
