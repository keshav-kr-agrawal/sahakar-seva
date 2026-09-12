"use client";

import React from "react";
import { MultiSkillCrew } from "@/lib/mockData";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/utils";
import { Users, Clock, Star, ShieldCheck, Check, ArrowRight, Plus, Minus } from "lucide-react";

interface Props {
  crew: MultiSkillCrew;
}

export default function CrewCard({ crew }: Props) {
  const { cartItems, addToCart, removeFromCart } = useApp();
  const cartItem = cartItems.find((i) => i.id === crew.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
      <div>
        {/* Top Header: Tagline & Category */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
            {crew.category}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{crew.crewRating}</span>
            <span className="text-slate-400 font-normal">({crew.totalCompletedJobs} gigs)</span>
          </div>
        </div>

        <h3 className="text-lg font-black text-slate-900 leading-snug mb-1">
          {crew.name}
        </h3>
        <p className="text-xs text-slate-600 mb-4">
          {crew.tagline}
        </p>

        {/* Crew Members Avatars & Roles */}
        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 mb-4 space-y-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Cooperative Crew Split ({crew.members.length} Pros Deployed)</span>
            <span className="text-emerald-700 font-bold">100% Transparent</span>
          </div>

          {/* Member Pills */}
          <div className="space-y-2">
            {crew.members.map((member, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="font-bold text-slate-800 leading-none">{member.name}</div>
                    <div className="text-[10px] text-slate-400">{member.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-900 font-mono">
                    {formatINR(member.payoutINR)}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold">
                    {member.percentageSplit}% split
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Split Visual Bar */}
          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden flex mt-2">
            {crew.members.map((m, idx) => (
              <div
                key={idx}
                style={{ width: `${m.percentageSplit}%` }}
                className={`h-full ${
                  idx === 0 ? "bg-emerald-500" : idx === 1 ? "bg-blue-500" : "bg-purple-500"
                }`}
                title={`${m.name}: ${m.percentageSplit}%`}
              />
            ))}
          </div>
        </div>

        {/* Deliverables Scope */}
        <div className="space-y-1 mb-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Standard Scope:
          </div>
          {crew.scopeDeliverables.map((item, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / CTA */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 font-medium block">
            {crew.durationHours} Hours Dedicated
          </span>
          <div className="text-xl font-black text-slate-900 font-mono">
            {formatINR(crew.totalPriceINR)}
          </div>
        </div>

        {quantity === 0 ? (
          <button
            onClick={() =>
              addToCart({
                id: crew.id,
                title: crew.name,
                price: crew.totalPriceINR,
                category: "Multi-Skill Crew",
                etaMinutes: crew.responseGuaranteeMin,
                unitType: "crew",
                workerPayout: Math.round(crew.totalPriceINR * 0.85),
              })
            }
            className="bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>Book Crew</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-slate-900 text-white rounded-xl px-2 py-1">
            <button
              onClick={() => removeFromCart(crew.id)}
              className="p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-white cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-black px-1.5 font-mono">{quantity}</span>
            <button
              onClick={() =>
                addToCart({
                  id: crew.id,
                  title: crew.name,
                  price: crew.totalPriceINR,
                  category: "Multi-Skill Crew",
                  etaMinutes: crew.responseGuaranteeMin,
                  unitType: "crew",
                  workerPayout: Math.round(crew.totalPriceINR * 0.85),
                })
              }
              className="p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-white cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
