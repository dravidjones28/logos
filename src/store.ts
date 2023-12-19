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
  pageSize?: number;
  page?: number;
  massDate?: string;
}

interface PrayerRequest {
  pageSize?: number;
  page?: number;
  searchDate?: Date;
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
  setMassPage: (page: number) => void;
  setMassDate: (date: string) => void;

  prayerRequest: PrayerRequest;
  setPrayerRequestPageSize: (pageSize: number) => void;
  setPrayerRequestPage: (page: number) => void;
  setPrayerRequestDate: (searchDate: Date) => void;
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

  massBookings: {},
  setMassPageSize: (pageSize) =>
    set((state) => ({
      massBookings: { ...state.massBookings, pageSize },
    })),
  setMassPage: (page) =>
    set((state) => ({
      massBookings: { ...state.massBookings, page },
    })),

  setMassDate: (massDate) =>
    set((state) => ({
      massBookings: { ...state.massBookings, massDate },
    })),

  prayerRequest: {},
  setPrayerRequestPageSize: (pageSize) =>
    set((state) => ({
      prayerRequest: { ...state.prayerRequest, pageSize },
    })),
  setPrayerRequestPage: (page) =>
    set((state) => ({
      prayerRequest: { ...state.prayerRequest, page },
    })),

  setPrayerRequestDate: (searchDate) =>
    set((state) => ({
      prayerRequest: { ...state.prayerRequest, searchDate },
    })),
}));

export default store;
