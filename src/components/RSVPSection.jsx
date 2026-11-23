import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Sparkles, CheckCircle2, User, Users, Check, Edit3, Loader2, FileSpreadsheet } from 'lucide-react'
import { FloralCorner, MandalaDivider } from './FloralDecorations'
import { useLanguage } from '../context/LanguageContext'
import { GOOGLE_SHEET_URL } from '../config'

export default function RSVPSection() {
  const [isOpen, setIsOpen] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncSuccess, setSyncSuccess] = useState(false)
  const { lang, t } = useLanguage()

  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
    guestCount: 1,
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_rsvp_sarvesh_sanjana')
      if (saved) {
        const parsed = JSON.parse(saved)
        setFormData(parsed)
        setIsSubmitted(true)
      }
    } catch (e) {
      // ignore
    }
  }, [])

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) {
      errs.name = t.rsvp.nameError
    }
    if (formData.attending === 'yes' && (!formData.guestCount || formData.guestCount < 1)) {
      errs.guestCount = lang === 'hi' ? 'कृपया अतिथियों की संख्या बताएं' : 'Please indicate at least 1 guest'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.65 },
        colors: ['#B76E79', '#DFA3A1', '#7B1834', '#ECC880', '#5E1424'],
        scalar: 1.1,
      })
    } catch (err) {
      // ignore
    }

    try {
      localStorage.setItem('wedding_rsvp_sarvesh_sanjana', JSON.stringify(formData))
    } catch (err) {
      // ignore
    }

    // Push data to Google Sheets via Webhook
    if (GOOGLE_SHEET_URL) {
      setIsSyncing(true)
      try {
        const payload = {
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          name: formData.name,
          attending: formData.attending === 'yes' ? 'Yes (Attending)' : 'No (In Spirit)',
          guestCount: formData.attending === 'yes' ? formData.guestCount : 0,
          notes: formData.notes || '',
          language: lang === 'hi' ? 'Hindi' : 'English',
        }

        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        setSyncSuccess(true)
      } catch (err) {
        console.error('Google Sheet Sync Error:', err)
      } finally {
        setIsSyncing(false)
      }
    }

    setIsSubmitted(true)
  }

  const handleEdit = () => {
    setIsSubmitted(false)
  }

  return (
    <section id="rsvp-section" className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-[#FAF6EE] via-[#FDFBF7] to-[#F5ECE0] text-stone-800 overflow-hidden">
      <FloralCorner className="top-0 left-0 w-32 h-32 sm:w-44 sm:h-44" position="top-left" />
      <FloralCorner className="top-0 right-0 w-32 h-32 sm:w-44 sm:h-44" position="top-right" />

      <div className="relative z-10 max-w-2xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-2 text-burgundy-800">
            <Heart className="w-4 h-4 text-rosegold-500 fill-rosegold-500" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold">
              {t.rsvp.tag}
            </span>
            <Heart className="w-4 h-4 text-rosegold-500 fill-rosegold-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-burgundy-950 tracking-tight">
            {t.rsvp.heading}
          </h2>
          <p className="mt-1 text-sm sm:text-base font-serif italic text-burgundy-900 font-medium">
            {t.rsvp.sub}
          </p>
        </motion.div>

        {/* Wax-Seal Style RSVP Badge / Reveal Button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-burgundy-900 via-burgundy-800 to-burgundy-900 text-rosegold-100 shadow-wax hover:shadow-lg transition-all transform active:scale-95 border border-amber-300/40"
          >
            <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#9B5560] to-[#EFA3A1] flex items-center justify-center shadow-inner border border-amber-200/50">
              <span className="font-serif italic font-bold text-xs text-white">
                {lang === 'hi' ? "स" : "S"}
              </span>
            </span>
            <span className="font-serif tracking-widest uppercase text-xs font-bold text-rosegold-100">
              {isOpen ? t.rsvp.toggleOpen : t.rsvp.toggleClosed}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </motion.div>

        {/* Interactive RSVP Form / Confirmation State */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-10 rounded-3xl bg-white/85 backdrop-blur-md border border-rosegold-300/60 shadow-luxury overflow-hidden"
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-2">
                      {t.rsvp.nameLabel} <span className="text-burgundy-600">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <User className="w-4 h-4 text-rosegold-500" />
                      </div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.rsvp.namePlaceholder}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-parchment-50 border ${
                          errors.name ? 'border-red-400 ring-1 ring-red-400' : 'border-stone-300 focus:border-rosegold-500'
                        } focus:outline-none focus:ring-2 focus:ring-rosegold-200 text-stone-800 placeholder-stone-400 text-base sm:text-sm transition-all`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Attendance Radio Buttons */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-2">
                      {t.rsvp.attendLabel} <span className="text-burgundy-600">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label
                        className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer touch-manipulation transition-all ${
                          formData.attending === 'yes'
                            ? 'bg-burgundy-50 border-burgundy-700 text-burgundy-900 ring-1 ring-burgundy-600'
                            : 'bg-white border-stone-200 text-stone-700 hover:border-rosegold-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="attending"
                          value="yes"
                          checked={formData.attending === 'yes'}
                          onChange={() => setFormData({ ...formData, attending: 'yes' })}
                          className="sr-only"
                        />
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          formData.attending === 'yes' ? 'border-burgundy-700 bg-burgundy-700 text-white' : 'border-stone-300'
                        }`}>
                          {formData.attending === 'yes' && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <div>
                          <span className="font-serif font-bold text-sm block">
                            {t.rsvp.accept}
                          </span>
                          <span className="text-[11px] text-stone-500 block">
                            {t.rsvp.acceptSub}
                          </span>
                        </div>
                      </label>

                      <label
                        className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer touch-manipulation transition-all ${
                          formData.attending === 'no'
                            ? 'bg-stone-100 border-stone-500 text-stone-900 ring-1 ring-stone-400'
                            : 'bg-white border-stone-200 text-stone-700 hover:border-rosegold-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="attending"
                          value="no"
                          checked={formData.attending === 'no'}
                          onChange={() => setFormData({ ...formData, attending: 'no' })}
                          className="sr-only"
                        />
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          formData.attending === 'no' ? 'border-stone-700 bg-stone-700 text-white' : 'border-stone-300'
                        }`}>
                          {formData.attending === 'no' && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <div>
                          <span className="font-serif font-bold text-sm block">
                            {t.rsvp.decline}
                          </span>
                          <span className="text-[11px] text-stone-500 block">
                            {t.rsvp.declineSub}
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {formData.attending === 'yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-2">
                        {t.rsvp.guestsLabel} <span className="text-burgundy-600">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                          <Users className="w-4 h-4 text-rosegold-500" />
                        </div>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={formData.guestCount}
                          onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) || 1 })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-parchment-50 border border-stone-300 focus:border-rosegold-500 focus:outline-none focus:ring-2 focus:ring-rosegold-200 text-stone-800 text-base sm:text-sm font-semibold"
                        />
                      </div>
                      <p className="mt-1 text-[11px] text-stone-500">{t.rsvp.guestsNote}</p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSyncing}
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-burgundy-900 via-burgundy-800 to-burgundy-900 text-white font-serif tracking-widest uppercase text-xs font-bold shadow-lg hover:shadow-xl hover:from-burgundy-950 hover:to-burgundy-850 active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-amber-300/40 disabled:opacity-75 cursor-pointer touch-manipulation"
                    >
                      {isSyncing ? (
                        <>
                          <Loader2 className="w-4 h-4 text-amber-300 animate-spin" />
                          <span>{lang === 'hi' ? "दर्ज किया जा रहा है..." : "Recording Attendance..."}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-amber-300" />
                          {t.rsvp.submitBtn}
                          <Sparkles className="w-4 h-4 text-amber-300" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Confirmation Feedback State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-6 px-4"
                >
                  <div className="w-16 h-16 rounded-full bg-rosegold-100 border-2 border-rosegold-300 flex items-center justify-center mx-auto mb-4 shadow-sm text-burgundy-700">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <span className="text-xs uppercase tracking-[0.25em] text-burgundy-800 font-bold">
                    {t.rsvp.confirmedTag}
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1 mb-2">
                    {t.rsvp.thankYou}, {formData.name}!
                  </h3>

                  {/* Sync Status Pill */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {GOOGLE_SHEET_URL ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold shadow-xs">
                        <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                        <span>{lang === 'hi' ? "गूगल शीट में सुरक्षित दर्ज (Synced) ✅" : "Recorded in Google Sheet ✅"}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold shadow-xs">
                        <Check className="w-3.5 h-3.5 text-amber-700 stroke-[3]" />
                        <span>{lang === 'hi' ? "उपस्थिति सुरक्षित रूप से दर्ज ✅" : "Attendance Recorded Locally ✅"}</span>
                      </span>
                    )}
                  </div>

                  <p className="font-serif italic text-base sm:text-lg text-stone-800 max-w-md mx-auto mb-6">
                    {formData.attending === 'yes'
                      ? t.rsvp.confirmedAccept
                      : t.rsvp.confirmedDecline}
                  </p>

                  <div className="p-4 rounded-2xl bg-parchment-100/80 border border-rosegold-200/60 max-w-sm mx-auto mb-6 text-left text-xs text-stone-700 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="font-bold text-stone-800">{t.rsvp.guestLabel}:</span>
                      <span>{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-stone-800">{t.rsvp.statusLabel}:</span>
                      <span className="font-bold text-burgundy-900">
                        {formData.attending === 'yes' ? t.rsvp.accept : t.rsvp.decline}
                      </span>
                    </div>
                    {formData.attending === 'yes' && (
                      <div className="flex justify-between">
                        <span className="font-bold text-stone-800">{t.rsvp.partyLabel}:</span>
                        <span className="font-bold">{formData.guestCount}</span>
                      </div>
                    )}
                  </div>

                  {/* Modify Response Action Button */}
                  <div className="flex justify-center mb-6">
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 text-xs font-serif font-bold tracking-wider uppercase border border-stone-300 shadow-sm transition-all active:scale-95"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-stone-500" />
                      {t.rsvp.modifyBtn}
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Traditional Indian Wedding Sign-off */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <MandalaDivider className="max-w-xs mb-3" />

          <span className="text-xs uppercase tracking-[0.3em] text-burgundy-800 font-bold block mb-1">
            {t.rsvp.signoffHeader}
          </span>
          <p className="font-serif text-sm sm:text-base text-stone-700 font-medium italic mb-3">
            {t.rsvp.signoffFamilies}
          </p>

          <h3 className="font-serif italic text-xl sm:text-2xl text-stone-800 font-normal">
            {t.rsvp.signoffQuote}
          </h3>

          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-rosegold-300" />
            <h4 className="font-display text-xl sm:text-2xl text-burgundy-950 font-bold tracking-wide">
              {t.rsvp.signoffCouple}
            </h4>
            <span className="h-[1px] w-12 bg-rosegold-300" />
          </div>

          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-stone-500 font-semibold font-sans">
            {t.rsvp.signoffDate}
          </p>

          <MandalaDivider className="max-w-xs mt-3 rotate-180" />
        </motion.div>

      </div>
    </section>
  )
}
