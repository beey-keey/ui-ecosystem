export interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
}
export interface TabsProps {
  tabs: TabItem[];
  label?: string;
}
