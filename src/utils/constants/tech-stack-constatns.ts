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
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'Tailwind', icon: SiTailwindcss, color: '#38BDF8' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    ],
  },
  {
    label: 'Backend',
    techs: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#539E43' },
      { name: 'Nest.js', icon: SiNestjs, color: '#E0234E' },
      { name: 'Prisma', icon: SiPrisma, color: '#a5b4fc' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
    ],
  },
  {
    label: 'Infra & Deploy',
    techs: [
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      {
        name: 'GCP - Google',
        icon: DiGoogleCloudPlatform,
        color: '#4285F4',
      },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'GitHub', icon: SiGithub, color: '#f0f0f0' },
    ],
  },
];
