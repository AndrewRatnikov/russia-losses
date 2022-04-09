export interface AsideProps {
  activeItem: string,
  selectActiveItem: (active: string) => void;
}

export interface DataItem {
  [key: string]: string | number | null;
}
