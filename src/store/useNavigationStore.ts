import { create } from "zustand";

interface NavigationState {
  isMobileMenuOpen: boolean;
  openSubMenu: string | null;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setOpenSubMenu: (menuId: string | null) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isMobileMenuOpen: false,
  openSubMenu: null,
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false, openSubMenu: null }),
  setOpenSubMenu: (menuId) => set({ openSubMenu: menuId }),
}));
