import { IconType } from 'react-icons';

export type Tech = {
  name: string;
  icon: IconType;
};

export type TechGroup = {
  label: string;
  techs: Tech[];
};
