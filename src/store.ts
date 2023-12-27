import { IconType } from "react-icons";
import { create } from "zustand";
import { BlogData } from "./hooks/blogs/useBlogs";
export interface ModalContainer {
  icon: IconType | null;
  name: string;
}

interface RetreatBookings {
  pageSize?: number;
  page?: number;
  startDate?: string;
  title?: string;
  searchQuery?: string;
  orderId?: string;
}

interface MassBookings {
  limit?: number;
  page?: number;
  searchDate?: string;
}

interface PrayerRequest {
  pageSize?: number;
  page?: number;
  searchDate?: string;
}

interface Props {
  // Landing page navbar open
  isNavBarOpen: boolean;
  setIsNavBarOpen: () => void;
  setIsNavBarClose: () => void;

  scrollToSection: (sectionId: string) => void;

  blogs: BlogData;
  isNavIcon: boolean;
  setIsNavIconClose: () => void;
  setIsNavIconOpen: () => void;

  retreatBookings: RetreatBookings;
  setPageSize: (pageSize: number) => void;
  setPage: (page: number) => void;
  setStartDate: (startDate: string) => void;
  setTitle: (title: string) => void;
  setSearchQuery: (searchQuery: string) => void;
  setOrderId: (orderId: string) => void;

  massBookings: MassBookings;
  setMassPageSize: (pageSize: number) => void;
  setMassPage: (
    page: number,
    totalPages: number | undefined,
    prevOrNext: string
  ) => void;
  setMassDate: (searchDate: string) => void;

  prayerRequest: PrayerRequest;
  setPrayerRequestPageSize: (pageSize: number) => void;
  setPrayerRequestPage: (
    page: number,
    totalPages: number | undefined,
    prevOrNext: string
  ) => void;
  setPrayerRequestDate: (searchDate: string) => void;
}
const store = create<Props>((set) => ({
  isNavBarOpen: false,
  setIsNavBarOpen: () => set(() => ({ isNavBarOpen: true })),
  setIsNavBarClose: () => set(() => ({ isNavBarOpen: false })),

  blogs: {},

  scrollToSection: (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  },

  isNavIcon: false,
  setIsNavIconClose: () => set(() => ({ isNavIcon: false })),
  setIsNavIconOpen: () => set(() => ({ isNavIcon: true })),

  // Retreat Bookings
  retreatBookings: {},
  setPageSize: (pageSize) =>
    set((state) => ({
      retreatBookings: { ...state.retreatBookings, pageSize },
    })),
  setPage: (page) =>
    set((state) => ({
      retreatBookings: { ...state.retreatBookings, page },
    })),
  setStartDate: (startDate) =>
    set((state) => ({
      retreatBookings: { ...state.retreatBookings, startDate },
    })),
  setTitle: (title) =>
    set((state) => ({
      retreatBookings: { ...state.retreatBookings, title },
    })),
  setSearchQuery: (searchQuery) =>
    set((state) => ({
      retreatBookings: { ...state.retreatBookings, searchQuery },
    })),
  setOrderId: (orderId) =>
    set((state) => ({
      retreatBookings: { ...state.retreatBookings, orderId },
    })),

  massBookings: { page: 1, limit: 10 },
  setMassPageSize: (limit) => {
    return set((state) => ({
      massBookings: { ...state.massBookings, limit },
      ...(({ searchDate, ...rest }) => rest)(state.massBookings),
    }));
  },
  setMassPage: (page, totalPages, prevOrNext) => {
    let result = 0;

    if (prevOrNext === "next")
      result = Math.min(page + 1, totalPages ? totalPages : 0);
    if (prevOrNext === "prev") result = Math.max(page - 1, 1);

    return set((state) => ({
      massBookings: { ...state.massBookings, page: result },
      ...(({ searchDate, ...rest }) => rest)(state.massBookings),
    }));
  },

  setMassDate: (searchDate) =>
    set(() => ({
      massBookings: { searchDate },
    })),

  prayerRequest: { page: 1, pageSize: 10 },
  setPrayerRequestPageSize: (pageSize) => {
    return set((state) => ({
      prayerRequest: { ...state.prayerRequest, pageSize },
      ...(({ searchDate, ...rest }) => rest)(state.prayerRequest),
    }));
  },
  setPrayerRequestPage: (page, totalPages, prevOrNext) => {
    let result = 0;

    if (prevOrNext === "next")
      result = Math.min(page + 1, totalPages ? totalPages : 0);
    if (prevOrNext === "prev") result = Math.max(page - 1, 1);

    return set((state) => ({
      prayerRequest: { ...state.prayerRequest, page: result },
      ...(({ searchDate, ...rest }) => rest)(state.prayerRequest),
    }));
  },

  setPrayerRequestDate: (searchDate) =>
    set(() => ({
      prayerRequest: { searchDate },
    })),
}));

export default store;
