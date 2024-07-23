import React, { createContext, useState, useEffect } from 'react'
import pl from '../locale/pl'
import en from '../locale/en'
import api20241 from '../assets/app-clips-2024-1.json'
import api20232 from '../assets/app-clips-2023-2.json'
import api20231 from '../assets/app-clips-2023-1.json'
import api20222 from '../assets/app-clips-2022-2.json'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
	const versions = ['2024:1', '2023:2', '2023:1']

	const currentContextValues = {
		language: localStorage.getItem('language') || 'pl',
		version: localStorage.getItem('version') || versions[0],
	}

	const [version, setVersion] = useState(currentContextValues.version)
	const [language, setLanguage] = useState(currentContextValues.language)
	const [api, setApi] = useState(api20241)

	useEffect(() => {
		switch (version) {
			case '2024:1':
				setApi(api20241)
				break
			case '2023:2':
				setApi(api20232)
				break
			case '2023:1':
				setApi(api20231)
				break
			case '2022:2':
				setApi(api20222)
				break
			default:
				setApi(api20241)
		}
	}, [version])

	localStorage.setItem('version', version)
	localStorage.setItem('language', language)

	const translations = language === 'pl' ? pl : en

	return (
		<AppContext.Provider value={{ version, versions, setVersion, language, setLanguage, translations, api }}>
			{children}
		</AppContext.Provider>
	)
}
