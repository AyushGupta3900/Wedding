import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('shadi_lang_pref')
      return saved === 'hi' ? 'hi' : 'en'
    } catch (e) {
      return 'en'
    }
  })

  const switchLanguage = (newLang) => {
    setLang(newLang)
    try {
      localStorage.setItem('shadi_lang_pref', newLang)
    } catch (e) {
      // ignore
    }
  }

  const t = translations[lang] || translations.en

  return (
    <LanguageContext.Provider value={{ lang, setLang: switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
