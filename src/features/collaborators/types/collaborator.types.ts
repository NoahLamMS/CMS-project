/**
 * @file collaborator.types.ts
 * @description Collaborator type definitions
 * @author Kindy
 * @created 2025-11-16
 */

export enum CollaboratorRank {
    GOLD = 'gold',
    SILVER = 'silver',
    BRONZE = 'bronze',
}

export interface ICollaborator {
    id: string;
    code: string;
    name: string;
    avatar?: string;
    totalOrders: number;
    totalOrderValue: number;
    commissionPercent: number;
    rank: CollaboratorRank;
    commissionReceived: number;
    createdAt: string;
    updatedAt: string;
}

export interface ICollaboratorFilter {
    search?: string;
    rank?: CollaboratorRank;
}

export interface IPaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface ICollaboratorListParams {
    page: number;
    pageSize: number;
    filter?: ICollaboratorFilter;
    sortBy?: keyof ICollaborator;
    sortOrder?: 'asc' | 'desc';
}

export type Collaborator = ICollaborator;
export type CollaboratorFilter = ICollaboratorFilter;
