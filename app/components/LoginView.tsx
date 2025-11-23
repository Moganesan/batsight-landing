'use client';

import { ArrowLeft, User, Key, Zap } from 'lucide-react';
import { Scanline } from './VisualAssets';

export const LoginView = ({ onBack, onLogin }: { onBack: () => void; onLogin: () => void }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
      <div className="w-full max-w-md border border-[#44403c] bg-[#12100f] p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#ff4d00]"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 border-l border-t border-[#292524] -mr-2 -mb-2"></div>
        <Scanline />

        <div className="mb-10 relative z-10">
             <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-[#ff4d00] animate-pulse"></div>
                <span className="font-mono text-xs font-bold tracking-widest text-[#ff4d00]">RESTRICTED_AREA</span>
            </div>
            <h2 className="text-3xl font-black text-[#e7e5e4] uppercase tracking-tighter leading-none">System Access</h2>
            <p className="text-[10px] text-[#78716c] font-mono mt-3 border-l border-[#44403c] pl-3">
                ENTER CREDENTIALS TO BYPASS FIREWALL.<br/>
                UNAUTHORIZED ACCESS WILL BE LOGGED.
            </p>
        </div>

        <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-[#57534e] flex items-center gap-2">
                    <User size={10} /> Operator ID
                </label>
                <input type="text" className="w-full bg-[#0c0a09] border border-[#44403c] text-[#e7e5e4] text-xs font-mono p-4 focus:outline-none focus:border-[#ff4d00] transition-all rounded-none" placeholder="USR-8829-X" />
            </div>

            <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-[#57534e] flex items-center gap-2">
                    <Key size={10} /> Security Key
                </label>
                <input type="password" className="w-full bg-[#0c0a09] border border-[#44403c] text-[#e7e5e4] text-xs font-mono p-4 focus:outline-none focus:border-[#ff4d00] transition-all rounded-none" placeholder="••••••••••••" />
            </div>

            <div className="pt-4">
                <button type="submit" className="w-full bg-[#e7e5e4] text-black h-12 text-xs font-bold uppercase tracking-wide hover:bg-[#ff4d00] transition-colors flex items-center justify-center gap-2 rounded-none group">
                    <Zap size={12} className="group-hover:fill-current" /> Initialize Session
                </button>
            </div>

             <div className="text-center pt-4 flex justify-end items-center border-t border-[#292524] mt-6">
                <a href="#" className="text-[9px] uppercase tracking-widest text-[#57534e] hover:text-[#ff4d00] transition-colors">Forgot Key?</a>
            </div>
        </form>
      </div>
    </div>
  );
};

