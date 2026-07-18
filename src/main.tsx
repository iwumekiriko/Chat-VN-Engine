import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ModalProvider } from './context/ModalProvider.tsx'
import { DialogueProvider } from './engine/DialogueProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <ModalProvider>
      <DialogueProvider>
        <App />
      </DialogueProvider>
    </ModalProvider>
)
