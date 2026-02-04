'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function Home() {
  return (
    <div className='flex items-center justify-center gap-4 p-8'>
      <ModeToggle />
      <Button onClick={() => toast.success('Success message!', { richColors: true })}>Click me</Button>
    </div>
  )
}
