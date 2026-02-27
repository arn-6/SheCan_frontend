import React, { useState, useRef } from 'react'
import API from '../api'

const CANCER_TYPES = [
  { value: 'blood_cancer', label: 'Blood Cancer' },
  { value: 'breast_cancer', label: 'Breast Cancer' },
  { value: 'ovarian_cancer', label: 'Ovarian Cancer' },
  { value: 'cervical_cancer', label: 'Cervical Cancer' },
  { value: 'bone_cancer', label: 'Bone Cancer' },
  { value: 'brain_cancer', label: 'Brain Cancer' },
  { value: 'thyroid_cancer', label: 'Thyroid Cancer' },
  { value: 'lung_cancer', label: 'Lung Cancer' },
  { value: 'colon_cancer', label: 'Colon Cancer' },
  { value: 'skin_cancer', label: 'Skin Cancer' },
  { value: 'other', label: 'Other' },
]

function PreservationTechnique() {
  const [form, setForm] = useState({
    age: '',
    cancer_type: '',
    cancer_stage: 'stage_2',
    city: '',
    has_partner: false,
    needs_immediate_treatment: false,
    storage_years: 5,
    amh_level: 2.0,
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const resultRef = useRef(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setResult(null)
    try {
      const payload = {
        ...form,
        age: parseInt(form.age),
        storage_years: parseInt(form.storage_years),
        amh_level: parseFloat(form.amh_level),
      }
      const res = await API.post('/preservation-technique', payload)
      setResult(res.data)
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 200)
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to get recommendations.')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (num) =>
    '₹' + Number(num).toLocaleString('en-IN')

  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <span className="badge-rose mb-6">Financial & Technique Modeling</span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Preservation Pathways</h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Detailed clinical recommendations and financial breakdowns personalized for your specific diagnosis and location.
          </p>
        </div>

        <form className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[3rem] shadow-soft border border-slate-100" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Patient Age</label>
              <input type="number" name="age" value={form.age} onChange={handleChange}
                min="13" max="55" required placeholder="Years"
                className="input-base" />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Diagnosis</label>
              <select name="cancer_type" value={form.cancer_type} onChange={handleChange} required
                className="input-base">
                <option value="">Select type</option>
                {CANCER_TYPES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Treatment City</label>
              <select name="city" value={form.city} onChange={handleChange} required
                className="input-base">
                <option value="">Select city</option>
                <option value="kochi">Kochi</option>
                <option value="trivandrum">Thiruvananthapuram</option>
                <option value="bangalore">Bengaluru</option>
                <option value="chennai">Chennai</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Storage Period</label>
              <div className="flex items-center gap-6 px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent">
                <input type="range" name="storage_years" min="1" max="20"
                  value={form.storage_years} onChange={handleChange}
                  className="flex-1 accent-rose-600" />
                <span className="text-rose-600 font-black text-xl w-12">{form.storage_years}y</span>
              </div>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <label className={`flex items-center gap-6 p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all duration-300 ${
                form.has_partner ? 'border-rose-600 bg-rose-50/50 shadow-xl shadow-rose-500/10' : 'border-slate-50 bg-slate-50 hover:border-slate-200'
              }`}>
                <input type="checkbox" name="has_partner" checked={form.has_partner} onChange={handleChange} className="w-6 h-6 rounded-lg text-rose-600 border-slate-200 focus:ring-rose-500" />
                <span className={`text-sm font-black uppercase tracking-widest ${form.has_partner ? 'text-rose-600' : 'text-slate-500'}`}>Partner / Donor Sperm</span>
              </label>

              <label className={`flex items-center gap-6 p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all duration-300 ${
                form.needs_immediate_treatment ? 'border-rose-600 bg-rose-50/50 shadow-xl shadow-rose-500/10' : 'border-slate-50 bg-slate-50 hover:border-slate-200'
              }`}>
                <input type="checkbox" name="needs_immediate_treatment" checked={form.needs_immediate_treatment} onChange={handleChange} className="w-6 h-6 rounded-lg text-rose-600 border-slate-200 focus:ring-rose-500" />
                <span className={`text-sm font-black uppercase tracking-widest ${form.needs_immediate_treatment ? 'text-rose-600' : 'text-slate-500'}`}>Urgent Start Required</span>
              </label>
            </div>
          </div>

          {error && <div className="mt-12 p-6 bg-rose-50 text-rose-600 rounded-3xl text-sm font-bold border border-rose-100">{error}</div>}

          <button type="submit" className="w-full mt-16 btn-primary !py-6 !text-lg !rounded-[2rem]" disabled={loading}>
            {loading ? 'Modeling Treatment Pathways...' : 'Analyze Pathways & Costs'}
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className="max-w-5xl mx-auto mt-40 space-y-32" ref={resultRef}>
            <div className="text-center space-y-4">
              <span className="badge-rose">Clinical Selection</span>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Optimal Preservation Strategies</h2>
            </div>

            {result.recommended_techniques.map((tech, idx) => (
              <div key={idx} className="bg-white rounded-[4rem] shadow-soft border border-slate-100 overflow-hidden">
                <div className="p-12 md:p-24">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-20 pb-20 border-b border-slate-50">
                    <div className="flex-1">
                      <span className={`inline-block py-1 px-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 ${
                        tech.rank === 1 ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {tech.rank === 1 ? 'Primary Recommendation' : 'Secondary Option'}
                      </span>
                      <h3 className="text-5xl font-black text-slate-900 leading-tight mb-8 tracking-tight">{tech.cost_analysis.technique_name}</h3>
                      <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12">{tech.cost_analysis.description}</p>
                      <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-4">Why this pathway?</span>
                        <p className="text-slate-900 font-bold leading-relaxed">{tech.reason}</p>
                      </div>
                    </div>
                    
                    <div className="w-full lg:w-72 space-y-4">
                       <div className="p-8 bg-white border border-slate-100 shadow-soft rounded-[2rem]">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Live Birth Potential</span>
                          <span className="text-2xl font-black text-slate-900 leading-none">{tech.cost_analysis.success_rate}</span>
                       </div>
                       <div className="p-8 bg-white border border-slate-100 shadow-soft rounded-[2rem]">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Cycle Requirement</span>
                          <span className="text-2xl font-black text-slate-900 leading-none">{tech.cost_analysis.expected_cycles} {tech.cost_analysis.expected_cycles > 1 ? 'Stimulations' : 'Stimulation'}</span>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-12">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Investment Summary</h4>
                    
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-20">
                      <div className="space-y-4">
                        <table className="w-full">
                          <tbody>
                            {Object.entries(tech.cost_analysis.detailed_breakdown).map(([key, val]) => (
                              <tr key={key} className="border-b border-slate-50 group hover:bg-slate-50/50 transition-all">
                                <td className="py-5 pr-4 text-xs font-black uppercase tracking-widest text-slate-400">{key}</td>
                                <td className="py-5 text-right font-black text-slate-900">{formatCurrency(val.adjusted_cost || val.total)}</td>
                              </tr>
                            ))}
                            <tr className="border-b border-slate-50">
                              <td className="py-5 pr-4 text-xs font-black uppercase tracking-widest text-slate-400">Clinical Storage ({tech.cost_analysis.storage_years}y)</td>
                              <td className="py-5 text-right font-black text-slate-900">{formatCurrency(tech.cost_analysis.total_storage_cost)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="p-12 md:p-16 bg-slate-900 rounded-[3rem] text-white flex flex-col justify-between shadow-2xl shadow-slate-900/40 relative overflow-hidden">
                        <div className="relative z-10">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 block mb-4">Total Estimated Package</span>
                          <div className="text-6xl font-black text-white mb-6 tracking-tighter">{formatCurrency(tech.cost_analysis.grand_total)}</div>
                          <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">Includes 5% GST</span>
                        </div>
                        
                        <div className="mt-16 pt-12 border-t border-white/10 relative z-10">
                           <div className="flex flex-wrap gap-3">
                              {[
                                { l: 'CITY', f: tech.cost_analysis.multipliers_used.city.factor },
                                { l: 'AGE', f: tech.cost_analysis.multipliers_used.age.factor },
                                { l: 'URGENCY', f: tech.cost_analysis.multipliers_used.urgency.factor },
                              ].map(m => (
                                <div key={m.l} className="px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                                   <span className="text-[9px] font-black text-slate-500 mr-2">{m.l}</span>
                                   <span className="text-xs font-black text-white">{m.f}x</span>
                                </div>
                              ))}
                           </div>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-[100px] -z-0 translate-x-1/2 -translate-y-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PreservationTechnique
