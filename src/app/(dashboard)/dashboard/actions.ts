'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function submitWithdrawal(formData: FormData) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not logged in')

  const amount = Number(formData.get('amount'))
  const upi_id = formData.get('upi_id') as string

  // Fetch true balance securely on server
  const { data: wallet } = await supabase
    .from('wallet')
    .select('balance')
    .eq('user_id', user.id)
    .single()

  if (!wallet || wallet.balance < amount) {
    throw new Error('Insufficient confirmed balance')
  }

  // Deduct balance securely
  const { error: walletError } = await supabase
    .from('wallet')
    .update({ balance: wallet.balance - amount })
    .eq('user_id', user.id)

  if (walletError) throw new Error('Could not deduct wallet')

  // Insert withdrawal request
  const { error: withdrawError } = await supabase
    .from('withdrawals')
    .insert([{
       user_id: user.id,
       amount,
       upi_id,
       status: 'pending'
    }])

  if (withdrawError) throw new Error('Failed to submit withdrawal request')

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/withdraw')
  redirect('/dashboard/withdraw?success=true')
}
