'use client'

import Link from 'next/link'

const LINKS = [
  { label: 'Playground', href: '#' },
  { label: 'Labs', href: '#' },
]

export default function NavMenu({ open, onNavigate }) {
  return (
    <div
      className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out ${
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}
    >
      <nav
        id='nav-menu'
        aria-label='Site'
        inert={!open ? true : undefined}
        aria-hidden={!open}
        className={`min-h-0 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onNavigate}
      >
        <ul className='flex flex-col px-3 pb-[1vw] max-md:pb-[3vw]'>
          {LINKS.map((link) => (
            <li
              key={link.label}
              className='flex items-center border-t border-current/10 pl-[1vw] first:border-t-0 max-md:pl-[3vw]'
            >
              <span
                className='block size-[.5vw] rounded-xs bg-background max-md:size-[1.5vw]'
                aria-hidden='true'
              />
              <div className='py-[1vw] max-md:py-[3vw]'>
                <Link
                  href={link.href}
                  tabIndex={open ? 0 : -1}
                  className='text16 group flex items-center gap-4 px-[1vw] tracking-wide opacity-90 transition-opacity hover:opacity-100 max-md:px-[3vw]'
                >
                  <span>{link.label}</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
