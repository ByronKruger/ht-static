import { StrapiBlockNode } from './strapi-blocks';

export interface ServicePlan {
  id: number;
  ServiceDetailsTitle: string;
  ServiceDetails: StrapiBlockNode[];
  BaseCost: number | null;
  extraCost: number | null;
  ExtraCostDescription: string | null;
  baseCostDescription: string | null;
}

export interface ServicesPricing {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Title: string;
  Description: StrapiBlockNode[] | null;
  ServicePlan: ServicePlan[];
}

export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}
