import React from 'react'

export default function SiteShell({ children }) {
    return (
        <main className='relative z-10'>
            {children}
        </main>
    )
}
