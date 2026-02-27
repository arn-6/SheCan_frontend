import React, { useState, useEffect } from 'react'
import API from '../api'

function Centers() {
  const [allCenters, setAllCenters] = useState([])
  const [cities, setCities] = useState([])
  const [activeCity, setActiveCity] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/centers')
      .then((res) => {
        setAllCenters(res.data.centers)
        setCities(res.data.cities)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered =
    activeCity === 'all'
      ? allCenters
      : allCenters.filter((c) => c.city.toLowerCase().includes(activeCity))

  if (loading) {
    return (
      <div className="pt-64 pb-20 text-center bg-white min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-slate-50 rounded-3xl mb-6 shadow-soft"></div>
          <div className="h-4 w-40 bg-slate-50 rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-20 text-center">
           <span className="badge-rose mb-6">Directory Services</span>
           <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Oncofertility Care Network</h1>
           <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
             Specialized fertility centres equipped with rapid-start protocols and advanced cryopreservation technologies for cancer patients.
           </p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3 mb-16">
          <button
            className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-soft border ${
              activeCity === 'all' ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
            }`}
            onClick={() => setActiveCity('all')}
          >
            All Territories
          </button>
          {cities.map((city) => (
            <button
              key={city}
              className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-soft border ${
                activeCity === city ? 'bg-rose-600 text-white border-rose-600 shadow-xl shadow-rose-500/20' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
              }`}
              onClick={() => setActiveCity(city)}
            >
              {city}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto space-y-16">
          {filtered.map((center) => (
            <div className="bg-white rounded-[4rem] shadow-soft border border-slate-100 overflow-hidden group hover:border-rose-100 transition-all duration-500" key={center.id}>
              <div className="p-12 md:p-20">
                <div className="flex flex-col xl:flex-row justify-between items-start gap-12 mb-16">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="px-4 py-1.5 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-xl">{center.city}</span>
                      <div className="flex items-center text-amber-500 font-black text-sm gap-1">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        {center.rating}
                      </div>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 leading-tight mb-8 tracking-tight group-hover:text-rose-600 transition-colors">{center.name}</h2>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">{center.description}</p>
                  </div>
                  <div className="w-full xl:w-auto flex flex-col gap-4">
                    <a href={center.website} target="_blank" rel="noreferrer" className="px-10 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-center hover:bg-rose-600 transition-all shadow-xl shadow-slate-900/10 hover:shadow-rose-500/30 active:scale-95">Official Site</a>
                    <div className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-200">Ref: {center.id.toUpperCase()}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                  {[
                    { l: 'Territory', v: center.address },
                    { l: 'Direct Line', v: center.phone },
                    { l: 'Clinical Hours', v: center.working_hours },
                    { l: 'Success Index', v: center.success_rate },
                  ].map(stat => (
                    <div key={stat.l} className="p-8 bg-slate-50 rounded-[2.5rem] border border-transparent hover:border-slate-100 transition-all">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-2">{stat.l}</span>
                      <p className="text-sm font-black text-slate-900 leading-snug">{stat.v}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-16">
                  <div className="space-y-8">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Specialized Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {center.specialties.map((s, i) => (
                        <span className="px-5 py-2.5 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-rose-100 hover:text-rose-600 transition-all" key={i}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-8">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Oncofertility Protocols</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {center.oncofertility_features.map((f, i) => (
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-50 group-hover:bg-rose-50/30 group-hover:border-rose-50 transition-all" key={i}>
                          <div className="w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.4)]"></div>
                          <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-12">
                   <div className="flex gap-16">
                     <div className="text-center md:text-left">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 block mb-2">Faculty</span>
                       <span className="text-2xl font-black text-slate-900 tracking-tighter">{center.team_size} MDs</span>
                     </div>
                     <div className="text-center md:text-left">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 block mb-2">Assistance</span>
                       <span className="text-2xl font-black text-slate-900 tracking-tighter">{center.financial_assistance.includes('EMI') ? 'EMI' : 'AID'} Available</span>
                     </div>
                   </div>
                   <div className={`px-8 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] border-2 transition-all ${
                     center.insurance_accepted ? 'border-emerald-100 bg-emerald-50 text-emerald-600' : 'border-slate-50 bg-slate-50 text-slate-300'
                   }`}>
                     Insurance Coverage: {center.insurance_accepted ? 'Verified' : 'Review Needed'}
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Centers
