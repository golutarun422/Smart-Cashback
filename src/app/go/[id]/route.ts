import { NextResponse } from 'next/server'
// import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // const id = params.id
//   const supabase = createClient()
  
//   // In a real app we'd fetch the deal
//   const { data: deal } = await supabase
//     .from('deals')
//     .select('affiliate_link')
//     .eq('id', id)
//     .single()
    
//   // And log the click
//   const { data: { user } } = await supabase.auth.getUser()
//   await supabase.from('clicks').insert({
//     deal_id: id,
//     user_id: user?.id,
//     ip_address: request.headers.get('x-forwarded-for') || 'unknown',
//   })
  
  // For now, redirect to a safe target
  // const target = deal?.affiliate_link || 'https://amazon.in'
  const target = 'https://amazon.in'

  return NextResponse.redirect(target)
}
