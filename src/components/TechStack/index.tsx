import { techGroups } from '@/utils/constants/tech-stack-constatns';
import { TechStackItem } from '../TechStackItem';

export function TechStack() {
  return (
    <div className='w-full max-w-2xl mx-auto flex flex-col gap-6'>
      <p className='text-xs text-slate-500 uppercase tracking-widest text-center'>
        Stack que utilizamos
      </p>

      {techGroups.map((group, i) => (
        <div key={group.label}>
          {i > 0 && <div className='h-px bg-white/5 mb-6' />}
          <p className='text-xs text-indigo-300 uppercase tracking-widest mb-3'>
            {group.label}
          </p>
          <div className='grid grid-cols-4 sm:grid-cols-5 gap-3'>
            {group.techs.map(tech => (
              <TechStackItem
                key={tech.name}
                name={tech.name}
                icon={tech.icon}
                color={tech.color}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
