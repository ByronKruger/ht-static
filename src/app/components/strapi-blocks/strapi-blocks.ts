import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StrapiBlockNode, StrapiListItemNode, StrapiListNode } from '../../models/strapi-blocks';

export interface StrapiBlocksLinkify {
  /** Phrase to turn into a link, matched case-insensitively. */
  phrase: string;
  routerLink: string;
}

/**
 * Recursively renders a Strapi "blocks" rich-text field (paragraphs,
 * headings, and ordered/unordered lists). Nested sub-lists are stored by
 * Strapi as a sibling of the preceding list-item (flagged with
 * `indentLevel`) rather than nested inside it, so `groupListChildren`
 * re-nests them for valid, properly indented HTML output.
 *
 * Pass `linkify` to turn a specific phrase (e.g. "contact us") into a
 * routerLink wherever it appears in the rendered text.
 */
@Component({
  selector: 'app-strapi-blocks',
  imports: [StrapiBlocks, NgTemplateOutlet, RouterLink],
  template: `
    <ng-template #textChildren let-children="children">
      @for (child of children; track $index) {
        @for (segment of splitForLink(child.text); track $index) {
          @if (segment.isLink) {
            <a
              [routerLink]="linkify()!.routerLink"
              class="font-medium text-sky-600 underline underline-offset-2 hover:text-sky-700"
              >{{ segment.text }}</a
            >
          } @else {
            <span
              [class.font-semibold]="child.bold"
              [class.italic]="child.italic"
              [class.underline]="child.underline"
              [class.line-through]="child.strikethrough"
              >{{ segment.text }}</span
            >
          }
        }
      }
    </ng-template>

    @for (node of nodes(); track $index) {
      @switch (node.type) {
        @case ('paragraph') {
          <p class="text-sm leading-relaxed text-slate-600">
            <ng-container [ngTemplateOutlet]="textChildren" [ngTemplateOutletContext]="{ children: node.children }" />
          </p>
        }
        @case ('heading') {
          @switch (node.level) {
            @case (1) {
              <h1 class="text-2xl font-bold text-slate-900">
                <ng-container [ngTemplateOutlet]="textChildren" [ngTemplateOutletContext]="{ children: node.children }" />
              </h1>
            }
            @case (2) {
              <h2 class="text-xl font-bold text-slate-900">
                <ng-container [ngTemplateOutlet]="textChildren" [ngTemplateOutletContext]="{ children: node.children }" />
              </h2>
            }
            @case (3) {
              <h3 class="text-lg font-semibold text-slate-900">
                <ng-container [ngTemplateOutlet]="textChildren" [ngTemplateOutletContext]="{ children: node.children }" />
              </h3>
            }
            @case (4) {
              <h4 class="text-base font-semibold text-slate-900">
                <ng-container [ngTemplateOutlet]="textChildren" [ngTemplateOutletContext]="{ children: node.children }" />
              </h4>
            }
            @default {
              <h5 class="text-sm font-semibold text-slate-900">
                <ng-container [ngTemplateOutlet]="textChildren" [ngTemplateOutletContext]="{ children: node.children }" />
              </h5>
            }
          }
        }
        @case ('list') {
          <ul
            class="ms-4 list-outside space-y-1.5 text-sm leading-relaxed text-slate-600 marker:text-sky-500"
            [class.list-disc]="node.format !== 'ordered'"
            [class.list-decimal]="node.format === 'ordered'"
          >
            @for (group of groupListChildren(node.children); track $index) {
              <li>
                <ng-container [ngTemplateOutlet]="textChildren" [ngTemplateOutletContext]="{ children: group.item.children }" />

                @if (group.nested.length) {
                  <app-strapi-blocks class="mt-1 block" [nodes]="group.nested" [linkify]="linkify()" />
                }
              </li>
            }
          </ul>
        }
      }
    }
  `
})
export class StrapiBlocks {
  nodes = input<StrapiBlockNode[]>([]);
  linkify = input<StrapiBlocksLinkify | null>(null);

  protected groupListChildren(
    children: Array<StrapiListItemNode | StrapiListNode>
  ): Array<{ item: StrapiListItemNode; nested: StrapiListNode[] }> {
    const groups: Array<{ item: StrapiListItemNode; nested: StrapiListNode[] }> = [];

    for (const child of children) {
      if (child.type === 'list-item') {
        groups.push({ item: child, nested: [] });
      } else if (groups.length) {
        groups[groups.length - 1].nested.push(child);
      }
    }

    return groups;
  }

  protected splitForLink(text: string): Array<{ text: string; isLink: boolean }> {
    const config = this.linkify();
    if (!config) {
      return [{ text, isLink: false }];
    }

    const escapedPhrase = config.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(escapedPhrase, 'gi');
    const segments: Array<{ text: string; isLink: boolean }> = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text))) {
      if (match.index > lastIndex) {
        segments.push({ text: text.slice(lastIndex, match.index), isLink: false });
      }
      segments.push({ text: match[0], isLink: true });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      segments.push({ text: text.slice(lastIndex), isLink: false });
    }

    return segments.length ? segments : [{ text, isLink: false }];
  }
}
