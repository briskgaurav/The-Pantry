import Logo from '../Navbar/Logo'
export default function Footer() {


  return (
    <footer
      id='footer'
      className='sticky bottom-0 z-0 flex h-[15vw] max-md:h-[35vh] w-full items-center justify-center bg-foreground'
    >
      <div
        id='footer-logo'
        className='size-[30vw] h-auto text-background max-md:size-[75vw]'
      >
        <Logo className='h-full w-full object-contain' />
      </div>
    </footer>
  )
}
