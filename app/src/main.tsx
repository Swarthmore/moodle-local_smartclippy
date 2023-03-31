import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// @ts-ignore
window.CLIPPY_CDN = 'https://cdn.jsdelivr.net/gh/pi0/clippyjs/assets/agents/'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)