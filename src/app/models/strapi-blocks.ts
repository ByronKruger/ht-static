// Minimal typings for Strapi's "blocks" rich-text field format.
// Covers the node types actually produced by the content used in this app
// (paragraphs, ordered/unordered lists with nested sub-lists, and text leaves).

export interface StrapiTextNode {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export interface StrapiListItemNode {
  type: 'list-item';
  children: StrapiTextNode[];
}

export interface StrapiListNode {
  type: 'list';
  format: 'ordered' | 'unordered';
  indentLevel?: number;
  children: Array<StrapiListItemNode | StrapiListNode>;
}

export interface StrapiParagraphNode {
  type: 'paragraph';
  children: StrapiTextNode[];
}

export interface StrapiHeadingNode {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: StrapiTextNode[];
}

export type StrapiBlockNode = StrapiParagraphNode | StrapiListNode | StrapiHeadingNode;
