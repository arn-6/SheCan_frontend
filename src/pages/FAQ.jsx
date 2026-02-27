import React, { useState, useEffect } from 'react'
import API from '../api'

function FAQ() {
  const [faqData, setFaqData] = useState(null)
  const [openId, setOpenId] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/faqs')
      .then((res) => {
        setFaqData(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

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

  if (!faqData) return null

  const filteredCategories =
    activeCategory === 'all'
      ? faqData.categories
      : faqData.categories.filter((c) => c.category === activeCategory)

  return (
    <div className="pt-40 pb-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-20 text-center">
           <span className="badge-rose mb-6">Patient Education</span>
           <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Clinical Knowledge Base</h1>
           <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
             Comprehensive, evidence-based responses to the most critical aspects of fertility preservation.
           </p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3 mb-16">
          <button
            className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-soft border ${
              activeCategory === 'all' ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
            }`}
            onClick={() => setActiveCategory('all')}
          >
            Unified Library
          </button>
          {faqData.categories.map((cat) => (
            <button
              key={cat.category}
              className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-soft border ${
                activeCategory === cat.category ? 'bg-rose-600 text-white border-rose-600 shadow-xl shadow-rose-500/20' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
              }`}
              onClick={() => setActiveCategory(cat.category)}
            >
              {cat.category}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto space-y-20">
          {filteredCategories.map((cat) => (
            <div key={cat.category} className="space-y-8">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-300 pl-4">{cat.category}</h2>
              <div className="space-y-4">
                {cat.questions.map((q) => (
                  <div
                    key={q.id}
                    className={`bg-white rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${
                      openId === q.id ? 'border-rose-100 shadow-soft ring-8 ring-rose-500/5 translate-y-[-4px]' : 'border-slate-100'
                    }`}
                  >
                    <button
                      className="w-full p-10 flex justify-between items-center text-left transition-all hover:bg-slate-50/50"
                      onClick={() => setOpenId(openId === q.id ? null : q.id)}
                    >
                      <span className={`text-xl font-black pr-12 leading-snug tracking-tight ${openId === q.id ? 'text-rose-600' : 'text-slate-900'}`}>{q.question}</span>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        openId === q.id ? 'bg-rose-600 text-white rotate-[135deg] shadow-lg shadow-rose-500/40' : 'bg-slate-50 text-slate-300'
                      }`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                      </div>
                    </button>
                    <div className={`transition-all duration-500 ease-in-out ${openId === q.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-10 pb-10">
                        <div className="h-px bg-slate-50 mb-10"></div>
                        <p className="text-lg text-slate-500 font-medium leading-loose max-w-3xl">{q.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ
