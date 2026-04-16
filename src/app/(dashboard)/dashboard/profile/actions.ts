'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const name = formData.get('name') as string
  
  if (!name) {
    throw new Error('Name is required')
  }

  const { error } = await supabase
    .from('profiles')
    .update({ 
      name,
      // avatar_url could be added here later if we implement upload
    })
    .eq('id', user.id)

  if (error) {
    console.error('Error updating profile:', error)
    throw new Error('Failed to update profile')
  }

  revalidatePath('/dashboard', 'layout')
  revalidatePath('/dashboard/profile')
  
  return { success: true }
}
