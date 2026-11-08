import { StrapiBlockNode } from './strapi-blocks';

export interface TitleContentEntry {
  id: number;
  Title: string;
  Content: StrapiBlockNode[];
}

export interface AboutUsPage {
  id: number;
  documentId: string;
  aboutUs: TitleContentEntry[];
}

export interface ContactUsPage {
  id: number;
  documentId: string;
  contactUs: TitleContentEntry[];
}

export interface EraOfAiPage {
  id: number;
  documentId: string;
  aiEra: TitleContentEntry[];
}
