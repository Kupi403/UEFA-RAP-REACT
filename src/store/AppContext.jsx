import React, { createContext, useState } from 'react'
import pl from '../locale/pl'
import en from '../locale/en'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
	const versions = ['2024:1', '2023:2', '2023:1', '2022:2']

	const currentContextValues = {
		language: localStorage.getItem('language') || 'pl',
		version: localStorage.getItem('version') || versions[0],
	}

	const [version, setVersion] = useState(currentContextValues.version)
	const [language, setLanguage] = useState(currentContextValues.language)

	localStorage.setItem('version', version)
	localStorage.setItem('language', language)

	const translations = language === 'pl' ? pl : en

	return (
		<AppContext.Provider value={{ version, versions, setVersion, language, setLanguage, translations }}>
			{children}
		</AppContext.Provider>
	)
}
