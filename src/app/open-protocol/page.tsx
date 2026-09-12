"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Share2,
  Database,
  Lock,
  Layers,
  CheckCircle2,
  Copy,
  ExternalLink,
  Cpu,
  ArrowRight,
  Sparkles,
  Server,
} from "lucide-react";
import { motion } from "framer-motion";

export default function OpenProtocolPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("search");
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      id: "search",
      method: "POST",
      path: "/api/v1/dispatch/search",
      title: "Discover 15-Min Certified Pros",
      desc: "Queries local cooperative federation registry using PostGIS spatial polygon and GNN trust score.",
      requestBody: JSON.stringify(
        {
          wardId: "BLR-KRM-004",
          locality: "Koramangala 4th Block",
          craftCategory: "electrician",
          maxArrivalMinutes: 15,
          unitType: "instahelp",
          requiredCertifications: ["e-Shram-Verified", "WomenSafe"],
        },
        null,
        2
      ),
      responseBody: JSON.stringify(
        {
          status: "SUCCESS",
          availableProsCount: 42,
          minEstimatedArrival: "12m",
          matchedPros: [
            {
              workerId: "W-7801",
              name: "Rajesh Kumar",
              gnnTrustScore: 94,
              hourlyRateINR: 350,
              takeHomeRateINR: 290,
              coopFederation: "NLCFI Bengaluru",
              shapAffinityFactor: 0.94,
            },
          ],
        },
        null,
        2
      ),
    },
    {
      id: "select",
      method: "POST",
      path: "/api/v1/dispatch/select",
      title: "Select Service Unit & Lock 15m Slot",
      desc: "Creates an immutable booking entry on the cooperative wage ledger with 100% itemized fee splits.",
      requestBody: JSON.stringify(
        {
          unitId: "block-2hr",
          unitType: "instahelp",
          customerCoordinates: { lat: 12.9352, lng: 77.6245 },
          paymentType: "UPI_DIRECT",
          requestedOtpSecurity: true,
        },
        null,
        2
      ),
      responseBody: JSON.stringify(
        {
          bookingId: "SS-784912",
          dispatchStatus: "ASSIGNED",
          securityOtp: "4821",
          estimatedArrivalMinutes: 11,
          wageBreakdown: {
            totalAmountINR: 299,
            directWorkerPayoutINR: 255,
            hospitalizationCoverINR: 15,
            monsoonDistressFundINR: 15,
            openCloudOpsINR: 14,
          },
        },
        null,
        2
      ),
    },
    {
      id: "passport",
      method: "POST",
      path: "/api/v1/passport/verify",
      title: "Verify Sovereign Worker Passport",
      desc: "Validates W3C Verifiable Credential signature against government e-Shram public key infrastructure.",
      requestBody: JSON.stringify(
        {
          uanNumber: "UAN-8821-4401-9012",
          aadhaarKycRef: "KYC-BLR-904128",
          federatedEpsilon: 1.2,
        },
        null,
        2
      ),
      responseBody: JSON.stringify(
        {
          isValid: true,
          verificationTier: 3,
          attestationsCount: 38,
          womenSafetyScore: 5.0,
          antiFraudSybilRisk: "ZERO_DETECTED",
          crossPlatformInteroperable: true,
        },
        null,
        2
      ),
    },
    {
      id: "weather",
      method: "POST",
      path: "/api/v1/welfare/parametric-trigger",
      title: "Weather Oracle Disruption Trigger",
      desc: "Listens to verified IMD rainfall or CPCB air quality sensors to trigger zero-claim automated UPI payouts.",
      requestBody: JSON.stringify(
        {
          oracleSource: "IMD_BENGALURU_RADAR",
          rainfallRateMmHr: 54,
          affectedWardIds: ["BLR-KRM-004", "BLR-IND-112", "BLR-HSR-003"],
          triggerThreshold: 45,
        },
        null,
        2
      ),
      responseBody: JSON.stringify(
        {
          triggerActivated: true,
          beneficiariesNotified: 42,
          payoutPerWorkerINR: 850,
          totalDisbursedINR: 35700,
          upiRailStatus: "SETTLED_WITHIN_180S",
        },
        null,
        2
      ),
    },
  ];

  const activeEp = endpoints.find((e) => e.id === selectedEndpoint) || endpoints[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeEp.requestBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      
      {/* 1. Header Banner */}
      <div className="bg-slate-50 border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-200 text-slate-800 px-2.5 py-1 rounded-full">
              Open Architecture
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              ONDC & Beckn Compatible Open Household Protocol
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Open Cooperative API & Protocol
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl font-normal leading-relaxed mt-1">
                SahakarSeva is designed as an unbundled, open network inspired by ONDC and Bharat Taxi. Any cooperative federation, municipal agency, or customer app can interoperate seamlessly.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <span className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl font-mono">
                OpenAPI 3.1 Specification
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* 2. Three Protocol Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="p-3 bg-white rounded-xl border border-slate-200 w-fit">
              <Share2 className="w-5 h-5 text-slate-900" />
            </div>
            <h3 className="text-base font-black text-slate-900">Beckn & ONDC Interoperability</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Household service requests can originate from any buyer application (e.g. Paytm, Mystore, WhatsApp bot) and fulfill via local cooperative guilds.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="p-3 bg-white rounded-xl border border-slate-200 w-fit">
              <Lock className="w-5 h-5 text-emerald-700" />
            </div>
            <h3 className="text-base font-black text-slate-900">Portable Sovereign Passports</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Worker credentials and GNN trust ratings are portable across platforms. No private corporation can lock a worker into an exclusive silo.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="p-3 bg-white rounded-xl border border-slate-200 w-fit">
              <Database className="w-5 h-5 text-slate-900" />
            </div>
            <h3 className="text-base font-black text-slate-900">Collective Data Cooperative</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Workers and cooperatives collectively own service telemetry. Anonymized data informs government urban planning, skill training, and CSR grants.
            </p>
          </div>
        </div>

        {/* 3. Interactive OpenAPI Endpoint Explorer */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-elevated space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                Live REST API Playground
              </span>
              <h2 className="text-xl font-black text-white">
                Cooperative Network Endpoints
              </h2>
            </div>

            {/* Endpoint Switcher Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {endpoints.map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => setSelectedEndpoint(ep.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    selectedEndpoint === ep.id
                      ? "bg-white text-slate-900 font-extrabold"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                  }`}
                >
                  {ep.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Endpoint Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 text-xs">
            <div className="flex items-center gap-2.5 font-mono">
              <span className="bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded text-[11px]">
                {activeEp.method}
              </span>
              <span className="text-white font-bold">{activeEp.path}</span>
            </div>
            <span className="text-slate-400 text-[11px]">{activeEp.desc}</span>
          </div>

          {/* Request / Response JSON Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
            
            {/* Request Payload */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                <span>Request Payload (JSON)</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-slate-300 hover:text-white transition cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-emerald-300 overflow-x-auto max-h-72">
                {activeEp.requestBody}
              </pre>
            </div>

            {/* Response Payload */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                <span>Response (200 OK)</span>
                <span className="text-emerald-400 font-mono font-bold">~12ms latency</span>
              </div>
              <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-sky-300 overflow-x-auto max-h-72">
                {activeEp.responseBody}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
