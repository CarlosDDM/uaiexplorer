import { techGroups } from '@/utils/constants/tech-stack-constants';
import { TechStackItem } from '../TechStackItem';

export function TechStack() {
  return (
    <section className='mx-auto flex w-full max-w-5xl flex-col gap-8 text-left'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-bold text-indigo-50 md:text-3xl'>
          Tecnologias que usamos
        </h2>
        <p className='text-indigo-300'>
          Ferramentas modernas, escolhidas pelo que cada projeto precisa.
        </p>
      </div>

      <div className='grid gap-8 md:grid-cols-3'>
        {techGroups.map(group => (
          <div key={group.label} className='flex flex-col gap-3'>
            <h3 className='text-sm font-semibold text-indigo-50'>
              {group.label}
            </h3>
            <ul role='list' className='flex flex-col gap-3'>
              {group.techs.map(tech => (
                <TechStackItem
                  key={tech.name}
                  name={tech.name}
                  icon={tech.icon}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
