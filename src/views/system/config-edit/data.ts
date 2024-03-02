import { FormSchema } from '@/components/Form';

export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const baseSetschemas: FormSchema[] = [
];
