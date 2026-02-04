/**
 * @file ui.store.ts
 * @description Global UI state management with Zustand
 * @author HoangPhuc
 * @created 04-02-2026
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
    sidebarCollapsed: boolean;
    theme: 'light' | 'dark';
    language: 'vi' | 'en';
    toggleSidebar: () => void;
    setSidebarCollapsed: (collapsed: boolean) => void;
    setTheme: (theme: 'light' | 'dark') => void;
    setLanguage: (language: 'vi' | 'en') => void;
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            sidebarCollapsed: false,
            theme: 'light',
            language: 'vi',
            toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
            setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
            setTheme: (theme) => set({ theme }),
            setLanguage: (language) => set({ language }),
        }),
        {
            name: 'ui-storage',
        }
    )
);
