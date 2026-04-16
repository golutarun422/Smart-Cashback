'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function addLocalShop(formData: FormData) {
  const supabase = createAdminClient()
  
  const rawFormData = {
    shop_name: formData.get('shop_name') as string,
    slug: (formData.get('shop_name') as string).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    owner_name: formData.get('owner_name') as string,
    phone: formData.get('phone') as string,
    city: formData.get('city') as string,
    category: formData.get('category') as string,
    address: formData.get('address') as string,
    commission_rate: Number(formData.get('commission_rate')),
    is_verified: formData.get('is_verified') === 'on'
  }

  const { error } = await supabase.from('local_shops').insert([rawFormData])
  
  if (error) {
    console.error('Error inserting shop:', error)
    throw new Error('Failed to add shop')
  }

  revalidatePath('/admin/local-shops')
  revalidatePath('/local')
}

export async function verifyLocalShop(shopId: string) {
  const supabase = createAdminClient()
  
  const { error } = await supabase
    .from('local_shops')
    .update({ is_verified: true })
    .eq('id', shopId)

  if (error) {
    console.error('Error verifying shop:', error)
    throw new Error('Failed to verify shop')
  }

  revalidatePath('/admin/local-shops')
  revalidatePath('/local')
}

export async function addLocalDeal(formData: FormData) {
  const supabase = createAdminClient()
  
  const rawFormData = {
    shop_id: formData.get('shop_id') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    original_price: Number(formData.get('original_price')) || null,
    offer_price: Number(formData.get('offer_price')) || 0,
    cashback_amount: Number(formData.get('cashback_amount')) || 0,
    is_active: formData.get('is_active') === 'on',
  }

  const { error } = await supabase.from('local_deals').insert([rawFormData])

  if (error) {
     console.error('Error inserting local deal: ', error)
     throw new Error('Failed to add local deal')
  }

  revalidatePath('/admin/local-deals')
  // We don't have the exact shop_slug here without querying, so we'll revalidate the whole domain route
  revalidatePath('/', 'layout')
}
