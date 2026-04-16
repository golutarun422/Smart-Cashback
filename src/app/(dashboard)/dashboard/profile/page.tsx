import { User, Mail, Tag, Save, ShieldCheck, ExternalLink } from "lucide-react";
import { createClient } from '@/lib/supabase/server';
import { redirect } from "next/navigation";
import { updateProfile } from './actions';

export const revalidate = 0;

export default async function ProfilePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div className="flex items-center gap-4 mb-2">
        <div className="bg-primary/10 p-3 rounded-2xl text-primary border border-primary/20">
          <User size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account Settings</h1>
          <p className="text-slate-500 font-medium">Manage your personal information and preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
             <form action={updateProfile} className="space-y-6">
                <div className="space-y-4">
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                         <User size={16} className="text-slate-400" /> Full Name
                      </label>
                      <input 
                        name="name" 
                        type="text" 
                        defaultValue={profile?.name || ''} 
                        required 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium" 
                      />
                   </div>

                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                         <Mail size={16} className="text-slate-400" /> Email Address
                      </label>
                      <div className="relative group">
                        <input 
                          type="email" 
                          value={user.email} 
                          disabled 
                          className="w-full bg-slate-100 border border-slate-200 text-slate-500 rounded-xl px-4 py-3.5 cursor-not-allowed font-medium" 
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                           <ShieldCheck size={18} className="text-emerald-500" />
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 font-medium">Your email is verified via Google authentication.</p>
                   </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                   <button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                      <Save size={18} /> Save Changes
                   </button>
                </div>
             </form>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex items-start gap-4">
             <div className="bg-amber-100 p-2.5 rounded-xl text-amber-600">
                <ShieldCheck size={24} />
             </div>
             <div>
                <h4 className="font-bold text-amber-900">Security Note</h4>
                <p className="text-sm text-amber-800/80 leading-relaxed mt-1 font-medium">
                  We use secure industry-standard encryption to protect your data. Your wallet funds are only accessible via your verified Google/Email identity.
                </p>
             </div>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
           <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-primary/20 blur-2xl"></div>
              
              <div className="relative z-10 space-y-6">
                 <div className="flex items-center gap-3 mb-2">
                    <Tag className="text-primary" />
                    <h3 className="font-bold text-lg">Referral Code</h3>
                 </div>
                 
                 <div className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center group cursor-pointer hover:bg-white/20 transition-all">
                    <code className="text-2xl font-mono font-black tracking-widest text-primary group-hover:scale-110 block transition-transform">
                      {profile?.referral_code}
                    </code>
                 </div>

                 <p className="text-sm text-slate-400 font-medium">
                   Share this code with friends! When they earn ₹100, you both get a flat <span className="text-white font-bold">₹50 Reward</span>.
                 </p>

                 <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2 text-sm">
                    Copy Link <ExternalLink size={14} />
                 </button>
              </div>
           </div>

           <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4">
              <h3 className="font-bold text-slate-900">Quick Support</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Need help with your account or a missing cashback? Our team is available 24/7.
              </p>
              <a href="mailto:support@smartcashback.com" className="block text-primary font-bold text-sm hover:underline">
                support@smartcashback.com
              </a>
           </div>
        </div>

      </div>
    </div>
  );
}
