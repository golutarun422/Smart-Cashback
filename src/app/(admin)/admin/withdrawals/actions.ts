'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function processWithdrawal(id: string, status: 'approved' | 'rejected') {
  const supabase = createAdminClient()
  
  if (status === 'rejected') {
     // If rejected, refund the wallet
     const { data: withdrawal } = await supabase.from('withdrawals').select('*').eq('id', id).single()
     if (withdrawal && withdrawal.status === 'pending') {
         const { data: wallet } = await supabase.from('wallet').select('balance').eq('user_id', withdrawal.user_id).single()
         if (wallet) {
            await supabase.from('wallet').update({ balance: wallet.balance + withdrawal.amount }).eq('user_id', withdrawal.user_id)
         }
     }
  }

  const { error } = await supabase
    .from('withdrawals')
    .update({ 
       status,
       processed_at: new Date().toISOString()
    })
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to mark as ${status}`)
  }

  revalidatePath('/admin/withdrawals')
  revalidatePath('/admin/users')
}
