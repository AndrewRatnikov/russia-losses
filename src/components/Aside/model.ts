import { ActiveItem } from "../Container/Container";

export interface AsideProps {
  activeItem: ActiveItem;
  selectActiveItem: (active: ActiveItem) => void;
}

export interface DataItem {
  date: string;
  personnel: number | null;
  tanks: number | null;
  apv: number | null;
  artillerySystems: number | null;
  mlrs: number | null;
  aaws: number | null;
  aircraft: number | null;
  helicopters: number | null;
  vehicles: number | null;
  boatsCutters: number | null;
  fuelTanks: number | null;
  uav: number | null;
  specialEquipment: number | null;
  srbmSystem: number | null;
  cruiseMissiles?: number | null;
}

export type KeyData = Array<{
  id: ActiveItem;
  nameEn: string;
  nameUa: string;
}>;
