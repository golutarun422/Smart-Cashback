'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function awardManualCashback(formData: FormData) {
  const supabase = createAdminClient()
  
  const user_id = formData.get('user_id') as string
  const amount = Number(formData.get('amount'))
  
  if (!user_id || !amount || amount <= 0) {
     console.error("Missing or invalid amount");
     return; // Silently fail instead of crashing dev environment
  }

  // Insert a confirmed cashback transaction
  // The PostgreSQL trigger `handle_cashback_status_change` will automatically
  // detect this insert (with status 'confirmed' or it inserts 'pending' then updates to 'confirmed')
  // Wait, the trigger says: "if old.status = 'pending' and new.status = 'confirmed'".
  // What if we insert natively as 'confirmed'?
  // Trigger code:
  // if old.status = 'pending' and new.status = 'confirmed' -> update balance += amount
  // if TG_OP = 'INSERT' and new.status = 'pending' -> update pending_balance += amount
  // It does NOT handle TG_OP='INSERT' and new.status='confirmed'!
  // Let's explicitly insert a pending transaction and then update it to confirmed, to guarantee triggers run nicely.
  
  const { data: transaction, error: insertError } = await supabase
    .from('cashback_transactions')
    .insert([
      {
        user_id,
        amount,
        status: 'pending' // Insert as pending to trigger pending_balance increase
      }
    ])
    .select('id')
    .single()

  if (insertError) {
    console.error('Error creating manual cashback:', insertError)
    throw new Error('Failed to create transaction')
  }

  // Now update to confirmed to trigger real balance increment
  const { error: updateError } = await supabase
    .from('cashback_transactions')
    .update({ status: 'confirmed' })
    .eq('id', transaction.id)

  if (updateError) {
    console.error('Error confirming manual cashback:', updateError)
    throw new Error('Failed to confirm transaction')
  }

  revalidatePath('/admin/users')
}
