import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog/blog-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-blog-list',
  styleUrl: './blog-list.scss',
  // templateUrl: './blog-list.html',
  // <a [routerLink]="['/blog', post.slug || post.documentId]">
  template: `
    <h1>Blog</h1>

    @if (posts(); as list) {
      @if (list.length === 0) {
        <p>No posts found.</p>
      } @else {
        <ul>
          @for (post of list; track post.documentId) {
            <li>
              <a href="/blog/{{ post.slug || post.documentId }}">
                {{ post.Title }}
              </a>
              <small> — {{ post.publishedAt | date }}</small>
            </li>
          }
        </ul>
      }
    } @else {
      <p>Loading…</p>
    }
  `
})
export class BlogList {
  private blogService = inject(BlogService);

  posts = toSignal(this.blogService.getPosts(), { initialValue: null });
}
