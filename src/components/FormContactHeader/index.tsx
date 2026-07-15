import { IoMdMail } from 'react-icons/io';

export function FormContactHeader() {
  return (
    <div className='flex flex-col items-center gap-2 my-6'>
      <div className='bg-blue-600 p-3 rounded-full'>
        <IoMdMail className='text-white w-6 h-6' aria-hidden='true' />
      </div>
      <h3 className='text-2xl font-bold text-indigo-50'>Entre em contato</h3>
      <p className='text-indigo-300 text-sm text-center'>
        Preencha o formulário abaixo e respondemos em até 24h.
      </p>
      <div className='flex items-center gap-2 w-full max-w-md'>
        <div className='flex-1 h-px bg-indigo-800' />
        <span className='text-indigo-500 text-xs uppercase tracking-widest'>
          contato
        </span>
        <div className='flex-1 h-px bg-indigo-800' />
      </div>
    </div>
  );
}
