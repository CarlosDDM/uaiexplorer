import { TechGroup } from '@/models/stack-list-model';
import { DiGoogleCloudPlatform } from 'react-icons/di';
import { FaAws } from 'react-icons/fa';
import {
  SiDocker,
  SiGithub,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

export const techGroups: TechGroup[] = [
  {
    label: 'Frontend',
    techs: [
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind', icon: SiTailwindcss },
      { name: 'TypeScript', icon: SiTypescript },
    ],
  },
  {
    label: 'Backend',
    techs: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Nest.js', icon: SiNestjs },
      { name: 'Prisma', icon: SiPrisma },
      { name: 'PostgreSQL', icon: SiPostgresql },
    ],
  },
  {
    label: 'Infra & deploy',
    techs: [
      { name: 'AWS', icon: FaAws },
      {
        name: 'Google Cloud',
        icon: DiGoogleCloudPlatform,
      },
      { name: 'Docker', icon: SiDocker },
      { name: 'GitHub', icon: SiGithub },
    ],
  },
];
