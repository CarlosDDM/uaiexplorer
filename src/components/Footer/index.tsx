export function Footer() {
  return (
    <footer className='py-4 text-center bg-background-black-default w-full text-xs/tight text-foreground'>
      <p>
        &copy; {new Date().getFullYear()} UAI Explorer. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}
