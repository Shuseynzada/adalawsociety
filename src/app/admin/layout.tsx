import React from 'react'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='p-3'>
      {children}
    </div>
  );
}

