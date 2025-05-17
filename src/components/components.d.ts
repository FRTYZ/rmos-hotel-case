import { ReactElement } from "react";

// Drawer
type classNameTypes = {
    right: string;
    left: string;
    top: string;
    bottom: string;
}

export type drawerClassNameType = {
    open: classNameTypes;
    close: classNameTypes;
    main: classNameTypes;
}

export interface DrawerProps {
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    backgroundColor?: string;
    width?: string;
    padding?: string;
    margin?: string;
    side: string;
    hiddenCloseIcon?: boolean;
    colorCloseIcon?: string;
    buttonContent: ReactElement | null;
    children: ReactNode;
}

// Chart
type DataItem = {
  Tarih: string;
  Free: number;
  Mevcut: number;
};

export interface ChartProps {
  data: DataItem[];
}