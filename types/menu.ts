// types/menu.ts

export interface Menu {
  id: number;
  title: string;
  newTab: boolean;
  path?: string;
  submenu?: Menu[];
  icon?: string;
  logo?: string; // For submenu
  details?: string; // For submenu
}

