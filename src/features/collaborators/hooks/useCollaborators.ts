/**
 * @file useCollaborators.ts
 * @description Custom hook for collaborator management
 * @author Kindy
 * @created 2025-11-16
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CollaboratorRank } from '../types/collaborator.types';
import type {
    ICollaborator,
    ICollaboratorFilter,
    ICollaboratorListParams,
    IPaginatedResponse,
} from '../types/collaborator.types';

interface UseCollaboratorsOptions {
    initialFilter?: ICollaboratorFilter;
    initialPage?: number;
    initialPageSize?: number;
}

interface UseCollaboratorsReturn {
    collaborators: ICollaborator[];
    total: number;
    totalPages: number;
    isLoading: boolean;
    isFetching: boolean;
    error: Error | null;
    page: number;
    pageSize: number;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    filter: ICollaboratorFilter;
    setFilter: (filter: ICollaboratorFilter) => void;
    setSearch: (search: string) => void;
    setRank: (rank: CollaboratorRank | undefined) => void;
    resetFilter: () => void;
    refetch: () => void;
}

const mockCollaborators: ICollaborator[] = [
    {
        id: '1',
        code: 'KBAK1837',
        name: 'Nguyễn Văn Tân',
        avatar: undefined,
        totalOrders: 1839,
        totalOrderValue: 13289339,
        commissionPercent: 15,
        rank: CollaboratorRank.GOLD,
        commissionReceived: 1381240,
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
    },
    {
        id: '2',
        code: 'AOQ8215',
        name: 'Trần Minh Hiếu',
        avatar: undefined,
        totalOrders: 1839,
        totalOrderValue: 13289339,
        commissionPercent: 15,
        rank: CollaboratorRank.SILVER,
        commissionReceived: 1381240,
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
    },
    {
        id: '3',
        code: 'NXLA7294',
        name: 'Hồ Nhật Thiên',
        avatar: undefined,
        totalOrders: 1839,
        totalOrderValue: 13289339,
        commissionPercent: 15,
        rank: CollaboratorRank.BRONZE,
        commissionReceived: 1381240,
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
    },
    {
        id: '4',
        code: 'NXYQ8103',
        name: 'Nguyễn Thị Cẩm Lệ',
        avatar: undefined,
        totalOrders: 242,
        totalOrderValue: 13289339,
        commissionPercent: 15,
        rank: CollaboratorRank.BRONZE,
        commissionReceived: 1381240,
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
    },
    {
        id: '5',
        code: 'NAOWY173',
        name: 'Lê Trần Minh Dũng',
        avatar: undefined,
        totalOrders: 1839,
        totalOrderValue: 13289339,
        commissionPercent: 15,
        rank: CollaboratorRank.SILVER,
        commissionReceived: 1381240,
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
    },
    {
        id: '6',
        code: 'LCNEU244',
        name: 'Nguyễn Thị Hoài Thương',
        avatar: undefined,
        totalOrders: 1839,
        totalOrderValue: 13289339,
        commissionPercent: 15,
        rank: CollaboratorRank.GOLD,
        commissionReceived: 1381240,
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
    },
    {
        id: '7',
        code: 'PAKWIM29',
        name: 'Trần Duy Nhất',
        avatar: undefined,
        totalOrders: 1839,
        totalOrderValue: 13289339,
        commissionPercent: 15,
        rank: CollaboratorRank.SILVER,
        commissionReceived: 1381240,
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
    },
    {
        id: '8',
        code: 'MZKAO242',
        name: 'Vũ Văn Minh Giáp',
        avatar: undefined,
        totalOrders: 1839,
        totalOrderValue: 13289339,
        commissionPercent: 15,
        rank: CollaboratorRank.BRONZE,
        commissionReceived: 1381240,
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
    },
    {
        id: '9',
        code: 'MZKAO243',
        name: 'Vũ Văn Minh Giáp',
        avatar: undefined,
        totalOrders: 1839,
        totalOrderValue: 13289339,
        commissionPercent: 15,
        rank: CollaboratorRank.SILVER,
        commissionReceived: 1381240,
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
    },
    {
        id: '10',
        code: 'MZKAO244',
        name: 'Trần Minh Hùng Bá',
        avatar: undefined,
        totalOrders: 102,
        totalOrderValue: 13289339,
        commissionPercent: 15,
        rank: CollaboratorRank.BRONZE,
        commissionReceived: 1381240,
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
    },
];

const fetchCollaborators = async (params: ICollaboratorListParams): Promise<IPaginatedResponse<ICollaborator>> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = [...mockCollaborators];

    if (params.filter?.search) {
        const search = params.filter.search.toLowerCase();
        filtered = filtered.filter(c =>
            c.name.toLowerCase().includes(search) ||
            c.code.toLowerCase().includes(search)
        );
    }

    if (params.filter?.rank) {
        filtered = filtered.filter(c => c.rank === params.filter?.rank);
    }

    const total = filtered.length;
    const start = (params.page - 1) * params.pageSize;
    const data = filtered.slice(start, start + params.pageSize);

    return {
        data,
        total,
        page: params.page,
        pageSize: params.pageSize,
        totalPages: Math.ceil(total / params.pageSize),
    };
};

const DEFAULT_FILTER: ICollaboratorFilter = {};
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export function useCollaborators(options: UseCollaboratorsOptions = {}): UseCollaboratorsReturn {
    const {
        initialFilter = DEFAULT_FILTER,
        initialPage = DEFAULT_PAGE,
        initialPageSize = DEFAULT_PAGE_SIZE,
    } = options;

    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [filter, setFilter] = useState<ICollaboratorFilter>(initialFilter);

    const queryParams = useMemo<ICollaboratorListParams>(() => ({
        page,
        pageSize,
        filter,
    }), [page, pageSize, filter]);

    const {
        data,
        isLoading,
        isFetching,
        error,
        refetch,
    } = useQuery({
        queryKey: ['collaborators', queryParams],
        queryFn: () => fetchCollaborators(queryParams),
        staleTime: 5 * 60 * 1000,
    });

    useEffect(() => {
        setPage(1);
    }, [filter]);

    const setSearch = useCallback((search: string) => {
        setFilter(prev => ({ ...prev, search: search || undefined }));
    }, []);

    const setRank = useCallback((rank: CollaboratorRank | undefined) => {
        setFilter(prev => ({ ...prev, rank }));
    }, []);

    const resetFilter = useCallback(() => {
        setFilter(DEFAULT_FILTER);
        setPage(DEFAULT_PAGE);
    }, []);

    return {
        collaborators: data?.data ?? [],
        total: data?.total ?? 0,
        totalPages: data?.totalPages ?? 0,
        isLoading,
        isFetching,
        error: error as Error | null,
        page,
        pageSize,
        setPage,
        setPageSize,
        filter,
        setFilter,
        setSearch,
        setRank,
        resetFilter,
        refetch,
    };
}
