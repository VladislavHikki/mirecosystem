import { defineStore } from 'pinia';

export const useSidebarStore = defineStore({
  id: 'sidebar-store',
  state: () => {
    return {
      visible: {
        visitor: false,
        user: false,
        admin: false,
        guest: false,
      },
    };
  },
  actions: {
    show_sidebar(sidebar_name) {
        this.visible[sidebar_name] = true;
    },
    close_sidebar(sidebar_name) {
        this.visible[sidebar_name] = false;
    },
    close_all_sidebar() {
        Object.keys(this.visible).map(key => this.visible[key] = false);
    }
  },
});
