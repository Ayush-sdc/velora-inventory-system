import { AlertCircle, CheckCircle2, WifiOff } from 'lucide-react'
import { useInventoryStore } from './store'
import { useState, useEffect } from 'react'

export default function App() {
  const { items, updateStock } = useInventoryStore()
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const handleOffline = () => setIsOffline(true)
    const handleOnline = () => setIsOffline(false)
    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)
    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Velora Inventory</h1>
            <p className="text-gray-500">Live offline prototype</p>
          </div>
          {isOffline && (
            <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              <WifiOff size={16} /> Offline Mode
            </div>
          )}
        </header>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {items.map((item) => {
            const isLow = item.currentStock <= item.parLevel
            return (
              <div key={item.id} className="p-4 border-b border-gray-100 last:border-0 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category} • Par: {item.parLevel} {item.unit}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  {isLow ? (
                    <span className="flex items-center gap-1 text-red-600 text-sm font-medium">
                      <AlertCircle size={16} /> Low
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                      <CheckCircle2 size={16} /> Good
                    </span>
                  )}
                  
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                    <button 
                      onClick={() => updateStock(item.id, item.currentStock - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-gray-900"
                    >-</button>
                    <span className="w-8 text-center font-semibold text-gray-800">{item.currentStock}</span>
                    <button 
                      onClick={() => updateStock(item.id, item.currentStock + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-gray-900"
                    >+</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}