'use client'

import Link from 'next/link'

const LINKS = [
  { label: 'Playground', href: '#' },
  { label: 'Carrers', href: '#' },
]

export default function NavMenu({ open, onNavigate }) {
  return (
    <div
      className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
    >
      <nav
        className={`min-h-0 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onNavigate}
      >
        <ul className="flex flex-col px-3 pb-[1vw] max-md:pb-[3vw]">
          {LINKS.map((link) => (
            <li key={link.label} className="border-t flex items-center pl-[1vw] max-md:pl-[3vw] border-current/10 first:border-t-0">
              <span className='size-[.5vw] max-md:size-[1.5vw] rounded-xs bg-background block' />
              <div className="py-[1vw] max-md:py-[3vw]">
                <Link
                  href={link.href}
                  className="group flex items-center gap-4 px-[1vw] max-md:px-[3vw] tracking-wide transition-opacity text16 opacity-90 hover:opacity-100"
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
