import { ActiveItem } from "../Container/Container";

export interface AsideProps {
  activeItem: ActiveItem;
  selectActiveItem: (active: ActiveItem) => void;
}

export interface DataItem {
  [key: string]: string | number | null;
}

export type KeyData = Array<{
  id: ActiveItem;
  nameEn: string;
  nameUa: string;
}>;
