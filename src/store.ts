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
  setPageSize: (pageSize) => set(() => ({ retreatBookings: { pageSize } })),
  setPage: (page) => set(() => ({ retreatBookings: { page } })),
  setStartDate: (startDate) => set(() => ({ retreatBookings: { startDate } })),
  setTitle: (title) => set(() => ({ retreatBookings: { title } })),
  setSearchQuery: (searchQuery) =>
    set(() => ({ retreatBookings: { searchQuery } })),
  setOrderId: (orderId) => set(() => ({ retreatBookings: { orderId } })),
}));

export default store;
