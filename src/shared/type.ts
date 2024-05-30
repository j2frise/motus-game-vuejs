import type { Color } from '@/shared/colors';

export type MenuItem = {
  color?: Color;
  icon?: string;
  label: string;
  isDesktopNoLabel?: boolean;
  href?: string;
  to?: string | object;
  target?: string;
  isDivider?: boolean;
  onClick?: () => void;
};
