'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function claimLocalDeal(formData: FormData) {
  const supabase = createClient()
  
  // Verify user is logged in
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login?message=You must be logged in to claim a local deal.')
  }

  const deal_id = formData.get('deal_id') as string
  const shop_slug = formData.get('shop_slug') as string
  
  if (!deal_id) throw new Error('Deal ID missing')

  // Insert click record securely referencing user
  const { error } = await supabase.from('local_deal_clicks').insert([
    {
      local_deal_id: deal_id,
      user_id: user.id,
      contact_shared: true 
    }
  ])

  if (error) {
    console.error('Error claiming deal:', error)
    throw new Error('Failed to claim deal')
  }

  revalidatePath(`/local/${shop_slug}`)
  
  // Actually, we can return success state to UI or redirect with a success flag
  redirect(`/local/${shop_slug}?claimed=${deal_id}`)
}
