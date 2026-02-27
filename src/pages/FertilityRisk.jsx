import React, { useState, useRef } from 'react'
import API from '../api'

const CANCER_TYPES = [
  { value: 'blood_cancer', label: 'Blood Cancer (Leukemia/Lymphoma)' },
  { value: 'breast_cancer', label: 'Breast Cancer' },
  { value: 'ovarian_cancer', label: 'Ovarian Cancer' },
  { value: 'cervical_cancer', label: 'Cervical Cancer' },
  { value: 'bone_cancer', label: 'Bone Cancer (Osteosarcoma)' },
  { value: 'brain_cancer', label: 'Brain Cancer' },
  { value: 'thyroid_cancer', label: 'Thyroid Cancer' },
  { value: 'lung_cancer', label: 'Lung Cancer' },
  { value: 'colon_cancer', label: 'Colon Cancer' },
  { value: 'skin_cancer', label: 'Skin Cancer / Melanoma' },
  { value: 'kidney_cancer', label: 'Kidney Cancer' },
  { value: 'other', label: 'Other Cancer Type' },
]

const MEDICAL_CONDITIONS = [
  { value: 'none', label: 'None' },
  { value: 'endometriosis', label: 'Endometriosis' },
  { value: 'pcos', label: 'PCOS' },
  { value: 'previous_chemotherapy', label: 'Previous Chemotherapy' },
  { value: 'previous_radiation', label: 'Previous Radiation Therapy' },
  { value: 'autoimmune_disorder', label: 'Autoimmune Disorder' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'thyroid_disorder', label: 'Thyroid Disorder' },
  { value: 'genetic_disorder', label: 'Genetic Disorder (BRCA, etc.)' },
  { value: 'premature_ovarian_insufficiency', label: 'Premature Ovarian Insufficiency' },
  { value: 'uterine_fibroids', label: 'Uterine Fibroids' },
]

function FertilityRisk() {
  const [form, setForm] = useState({
    age: '',
    cancer_type: '',
    cancer_stage: '',
    amh_level: '',
    medical_conditions: [],
    period_regularity: '',
    bmi: '',
    smoking: false,
    previous_pregnancies: 0,
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const resultRef = useRef(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox' && name === 'smoking') {
      setForm({ ...form, [name]: checked })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleConditionToggle = (val) => {
    if (val === 'none') {
      setForm({ ...form, medical_conditions: ['none'] })
      return
    }
    let updated = form.medical_conditions.filter((c) => c !== 'none')
    if (updated.includes(val)) {
      updated = updated.filter((c) => c !== val)
    } else {
      updated.push(val)
    }
    setForm({ ...form, medical_conditions: updated.length ? updated : ['none'] })
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
        amh_level: parseFloat(form.amh_level),
        bmi: form.bmi ? parseFloat(form.bmi) : 22.0,
        previous_pregnancies: parseInt(form.previous_pregnancies) || 0,
      }
      const res = await API.post('/fertility-risk', payload)
      setResult(res.data)
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 200)
    } catch (err) {
      setError(err.response?.data?.detail || 'Calculation failed. Please check your inputs.')
    } finally {
      setLoading(false)
    }
  }

  const getScoreBarColor = (pct) => {
    if (pct < 30) return 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
    if (pct < 55) return 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
    if (pct < 75) return 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
    return 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
  }

  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <span className="badge-rose mb-6">Assessment Module</span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Fertility Risk Profile</h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Our clinical algorithm evaluates your diagnosis and physiological markers to provide an urgency-mapped preservation window.
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
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Cancer Diagnosis</label>
              <select name="cancer_type" value={form.cancer_type} onChange={handleChange} required
                className="input-base">
                <option value="">Select type</option>
                {CANCER_TYPES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Clinical Staging</label>
              <select name="cancer_stage" value={form.cancer_stage} onChange={handleChange} required
                className="input-base">
                <option value="">Select stage</option>
                <option value="stage_1">Stage I — Localized</option>
                <option value="stage_2">Stage II — Regional</option>
                <option value="stage_3">Stage III — Advanced</option>
                <option value="stage_4">Stage IV — Metastatic</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">AMH Level (ng/mL)</label>
              <input type="number" name="amh_level" value={form.amh_level} onChange={handleChange}
                min="0" max="15" step="0.1" required placeholder="e.g. 2.5"
                className="input-base" />
            </div>

            <div className="md:col-span-2 space-y-6">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block">Menstrual Regularity</label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {['regular', 'irregular', 'absent', 'unknown'].map((opt) => (
                  <label key={opt} className={`relative flex items-center justify-center py-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 font-bold uppercase tracking-widest text-xs ${
                    form.period_regularity === opt ? 'border-rose-600 bg-rose-50/50 text-rose-600' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'
                  }`}>
                    <input type="radio" name="period_regularity" value={opt} className="absolute opacity-0" checked={form.period_regularity === opt} onChange={handleChange} required />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block">Clinical History Indicators</label>
              <div className="flex flex-wrap gap-3">
                {MEDICAL_CONDITIONS.map((cond) => (
                  <label key={cond.value} className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all duration-300 ${
                    form.medical_conditions.includes(cond.value) ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
                  }`}>
                    <input type="checkbox" className="absolute opacity-0" checked={form.medical_conditions.includes(cond.value)} onChange={() => handleConditionToggle(cond.value)} />
                    {cond.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 pt-8 flex items-center gap-4">
              <label className={`flex flex-1 items-center gap-4 p-6 rounded-3xl border-2 transition-all cursor-pointer ${form.smoking ? 'border-rose-500 bg-rose-50/30' : 'border-slate-50 bg-slate-50'}`}>
                <input type="checkbox" name="smoking" checked={form.smoking} onChange={handleChange} className="w-6 h-6 rounded-lg text-rose-600 border-slate-200 focus:ring-rose-500" />
                <span className="text-sm font-bold text-slate-600">Current or Recent Smoker</span>
              </label>
              <div className="flex-1 space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 block">Previous Pregnancies</label>
                 <input type="number" name="previous_pregnancies" value={form.previous_pregnancies} onChange={handleChange} min="0" max="15" className="input-base !py-3" />
              </div>
            </div>
          </div>

          {error && <div className="mt-12 p-6 bg-rose-50 text-rose-600 rounded-3xl text-sm font-bold border border-rose-100 flex items-center gap-4 animate-in fade-in zoom-in duration-300">
             <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center flex-shrink-0">!</div>
             {error}
          </div>}

          <button type="submit" className="w-full mt-16 btn-primary !py-6 !text-lg !rounded-[2rem]" disabled={loading}>
            {loading ? 'Processing Clinical Data...' : 'Generate Assessment Report'}
          </button>
        </form>

        {/* Result UI */}
        {result && (
          <div className="max-w-5xl mx-auto mt-32 space-y-24" ref={resultRef}>
            <div className="bg-white rounded-[4rem] shadow-soft border border-slate-100 overflow-hidden">
               <div className="p-12 md:p-24">
                  <div className="flex flex-col lg:flex-row items-center gap-16 mb-24 pb-24 border-b border-slate-50">
                     <div className="relative">
                        <div className="w-56 h-56 rounded-full border-[16px] flex items-center justify-center transition-all duration-1000" style={{ borderColor: `${result.color}15` }}>
                           <span className="text-7xl font-black tracking-tighter" style={{ color: result.color }}>{result.total_score}</span>
                        </div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-xl" style={{ backgroundColor: result.color }}>Score</div>
                     </div>
                     <div className="flex-1 text-center lg:text-left">
                        <span className="badge-rose mb-6" style={{ color: result.color, backgroundColor: `${result.color}10` }}>{result.risk_level} Urgency</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">{result.urgency}</h2>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                           <div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Time Window</span>
                              <span className="text-lg font-bold text-slate-900">{result.time_window}</span>
                           </div>
                           <div className="w-px h-12 bg-slate-100 hidden md:block"></div>
                           <div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Status</span>
                              <span className="text-lg font-bold text-slate-900">{result.clinical_analysis.ovarian_reserve_status}</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                     <div className="space-y-12">
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">Biological Markers</h3>
                        <div className="space-y-8">
                           {Object.entries(result.score_breakdown).map(([key, data]) => {
                              const pct = (data.value / data.max) * 100
                              return (
                                 <div key={key} className="space-y-3">
                                    <div className="flex justify-between items-end">
                                       <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">{data.label}</span>
                                       <span className="text-sm font-black text-slate-900">{data.value} <span className="text-slate-300 font-medium">/ {data.max}</span></span>
                                    </div>
                                    <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden">
                                       <div className={`h-full transition-all duration-1000 rounded-full ${getScoreBarColor(pct)}`} style={{ width: `${pct}%` }}></div>
                                    </div>
                                 </div>
                              )
                           })}
                        </div>
                     </div>

                     <div className="space-y-12">
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">Treatment Intensity</h3>
                        <div className="grid grid-cols-1 gap-4">
                           {[
                              { label: 'Gonadotoxicity', val: result.clinical_analysis.gonadotoxicity_level },
                              { label: 'Ovarian Failure Risk', val: result.clinical_analysis.ovarian_failure_risk },
                              { label: 'Intensity Factor', val: result.clinical_analysis.treatment_intensity },
                              { label: 'Natural Conception Index', val: result.clinical_analysis.post_treatment_natural_conception },
                           ].map((item) => (
                              <div key={item.label} className="flex justify-between items-center p-6 bg-slate-50 rounded-[2rem] border border-transparent hover:border-slate-100 transition-all">
                                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                                 <span className="text-lg font-black text-slate-900">{item.val}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="mt-32 p-12 md:p-20 bg-slate-900 rounded-[3rem] text-white shadow-2xl shadow-slate-900/40">
                     <h3 className="text-3xl font-black mb-12 tracking-tight">Report Recommendations</h3>
                     <div className="grid grid-cols-1 gap-6">
                        {result.recommendations.map((rec, i) => (
                           <div key={i} className="flex items-start gap-6 p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all group">
                              <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center flex-shrink-0 font-black text-xs shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform">{i+1}</div>
                              <p className="text-lg text-slate-300 font-medium leading-relaxed">{rec}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FertilityRisk
