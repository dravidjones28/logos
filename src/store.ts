import { IconType } from "react-icons";
import { create } from "zustand";
import { BlogData } from "./hooks/blogs/useBlogs";
import { FamilyMembers } from "./hooks/retreatBookings/useAddRetreatBookings";
export interface ModalContainer {
  icon: IconType | null;
  name: string;
}

interface RetreatBookings {
  pageSize?: number;
  page?: number;
  searchDate?: string;
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

interface UsersData {
  pageSize?: number;
  page?: number;
  searchDate?: string;
  searchEmail?: string;
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
  setRetreatBookingPageSize: (pageSize: number) => void;
  setRetreatBookingPage: (
    page: number,
    totalPages: number | undefined,
    prevOrNext: string
  ) => void;
  setRetreatBookingDate: (searchDate: string) => void;

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

  usersData: UsersData;
  setUsersDataPageSize: (pageSize: number) => void;
  setUsersDataPage: (
    page: number,
    totalPages: number | undefined,
    prevOrNext: string
  ) => void;
  setUsersDataDate: (searchDate: string) => void;
  setUsersEmail: (searchEmail: string) => void;

  retreatBookingsDashboard: FamilyMembers[];
  setRetreatBookingsDashboard: (booking: FamilyMembers[]) => void;
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
  retreatBookings: { page: 1, pageSize: 10 },
  setRetreatBookingPageSize: (pageSize) => {
    return set((state) => ({
      retreatBookings: { ...state.retreatBookings, pageSize },
      ...(({ searchDate, ...rest }) => rest)(state.retreatBookings),
    }));
  },
  setRetreatBookingPage: (page, totalPages, prevOrNext) => {
    let result = 0;

    if (prevOrNext === "next")
      result = Math.min(page + 1, totalPages ? totalPages : 0);
    if (prevOrNext === "prev") result = Math.max(page - 1, 1);

    return set((state) => ({
      retreatBookings: { ...state.retreatBookings, page: result },
      ...(({ searchDate, ...rest }) => rest)(state.retreatBookings),
    }));
  },

  setRetreatBookingDate: (searchDate) =>
    set(() => ({
      retreatBookings: { searchDate },
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

  usersData: { page: 1, pageSize: 10 },
  setUsersDataPageSize: (pageSize) => {
    return set((state) => ({
      usersData: { ...state.usersData, pageSize },
      ...(({ searchDate, ...rest }) => rest)(state.usersData),
    }));
  },
  setUsersDataPage: (page, totalPages, prevOrNext) => {
    let result = 0;

    if (prevOrNext === "next")
      result = Math.min(page + 1, totalPages ? totalPages : 0);
    if (prevOrNext === "prev") result = Math.max(page - 1, 1);

    return set((state) => ({
      usersData: { ...state.usersData, page: result },
      ...(({ searchDate, ...rest }) => rest)(state.usersData),
    }));
  },

  setUsersDataDate: (searchDate) =>
    set(() => ({
      usersData: { searchDate },
    })),
  setUsersEmail: (searchEmail) =>
    set(() => ({
      usersData: { searchEmail },
    })),

  retreatBookingsDashboard: [],

  setRetreatBookingsDashboard: (booking) =>
    set(() => ({
      retreatBookingsDashboard: [...booking],
    })),
}));

export default store;
