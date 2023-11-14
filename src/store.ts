import { IconType } from "react-icons";
import { create } from "zustand";
import { BlogData } from "./hooks/blogs/useBlogs";
export interface ModalContainer {
  icon: IconType | null;
  name: string;
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
}));

export default store;
