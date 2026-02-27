import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-widest mb-6">
              Empowering Cancer Warriors
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-8">
              Preserving your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">future</span>, one step at a time.
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 leading-relaxed mb-12 max-w-2xl mx-auto">
              A clinical-grade platform helping women navigate fertility preservation with clarity, speed, and precision.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link to="/fertility-risk" className="w-full md:w-auto px-8 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-brand-600 transition-all shadow-2xl hover:shadow-brand/40">
                Calculate Risk Score
              </Link>
              <Link to="/preservation" className="w-full md:w-auto px-8 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:border-brand-200 transition-all">
                Explore Clinical Options
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-brand-50 rounded-full blur-3xl opacity-50 -z-0"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-brand-50 rounded-full blur-3xl opacity-50 -z-0"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8">
              <div className="text-5xl font-black text-slate-900 mb-2">1 in 20</div>
              <div className="text-slate-500 font-semibold">Women under 40 diagnosed face fertility risks</div>
            </div>
            <div className="p-8 border-y md:border-y-0 md:border-x border-slate-200">
              <div className="text-5xl font-black text-brand-600 mb-2">90%+</div>
              <div className="text-slate-500 font-semibold">Survival rate with modern vitrification</div>
            </div>
            <div className="p-8">
              <div className="text-5xl font-black text-slate-900 mb-2">14 Days</div>
              <div className="text-slate-500 font-semibold">Average time for preservation cycle</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Clinical Decision Support</h2>
            <p className="text-lg text-slate-500 font-medium">
              We combine advanced medical research with localized data to provide you with the most accurate guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Risk Calculator', desc: 'Personalized risk profiling based on diagnosis and clinical history.', link: '/fertility-risk', bg: 'bg-white' },
              { title: 'Clinical Options', desc: 'Expert recommendations on egg, embryo, or tissue preservation.', link: '/preservation', bg: 'bg-white' },
              { title: 'Resources', desc: 'Evidence-based answers to your most critical preservation questions.', link: '/faq', bg: 'bg-white' },
              { title: 'Care Centres', desc: 'Direct access to high-specialty oncofertility centres across Kerala.', link: '/centers', bg: 'bg-white' }
            ].map((feature, idx) => (
              <Link key={idx} to={feature.link} className={`${feature.bg} p-10 rounded-[2rem] border border-slate-100 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-brand-100 group`}>
                <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-brand-600">{feature.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">{feature.desc}</p>
                <div className="text-brand-600 text-xs font-black uppercase tracking-widest flex items-center">
                  Access Tool <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Time is a critical factor in preservation.</h2>
              <p className="text-slate-400 text-lg mb-12 font-medium">
                Our free assessment provides you with the clinical insights needed to make an informed decision within minutes.
              </p>
              <Link to="/fertility-risk" className="inline-block px-10 py-5 bg-brand-600 text-white rounded-2xl font-bold text-lg hover:bg-brand-500 transition-all shadow-xl shadow-brand/20">
                Start Your Free Assessment Now
              </Link>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl -z-0"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl -z-0"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-black tracking-tighter text-brand-600 mb-6">SheCan</div>
          <p className="text-slate-400 text-sm font-semibold mb-2">© 2026 SheCan — Medical-Grade Fertility Guidance</p>
          <p className="text-slate-300 text-[10px] uppercase tracking-widest max-w-md mx-auto">
            Disclaimer: This tool provides general guidance. Always consult with your oncologist and fertility specialist before making medical decisions.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
