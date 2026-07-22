import React, { useState, useEffect } from 'react'
import { useInventoryStore } from './store'
import type { InventoryItem } from './store'
import { 
  Search, 
  Plus, 
  Sun, 
  Moon, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  CheckCircle2, 
  Trash2, 
  Edit2, 
  X,
  RotateCcw,
  RotateCw
} from 'lucide-react'

const CATEGORIES = [
  "All", 
  "Dairy", 
  "Produce", 
  "Dry Goods", 
  "Pulses", 
  "Spices", 
  "Beverages", 
  "Frozen", 
  "Bakery", 
  "Packaging", 
  "Cleaning", 
  "Housekeeping"
]

export default function App() {
  const { items, past, future, theme, updateStock, addItem, editItem, deleteItem, undo, redo, toggleTheme } = useInventoryStore()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [filterType, setFilterType] = useState<'all' | 'low' | 'out'>('all')
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)

  // Form states
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Dairy')
  const [currentStock, setCurrentStock] = useState<number | ''>(0)
  const [unit, setUnit] = useState('kg')
  const [parLevel, setParLevel] = useState<number | ''>(10)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Stats calculations
  const totalItems = items.length
  const lowStockCount = items.filter(i => i.currentStock <= i.parLevel && i.currentStock > 0).length
  const outOfStockCount = items.filter(i => i.currentStock === 0).length
  const activeCategoriesCount = new Set(items.map(i => i.category)).size

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCat = activeCategory === 'All' || item.category === activeCategory
    
    let matchesFilter = true
    if (filterType === 'low') {
      matchesFilter = item.currentStock <= item.parLevel && item.currentStock > 0
    } else if (filterType === 'out') {
      matchesFilter = item.currentStock === 0
    }

    return matchesSearch && matchesCat && matchesFilter
  })

  const handleOpenAdd = () => {
    setEditingItem(null)
    setName('')
    setCategory('Dairy')
    setCurrentStock(0)
    setUnit('kg')
    setParLevel(10)
    setIsAddModalOpen(true)
  }

  const handleOpenEdit = (item: InventoryItem) => {
    setEditingItem(item)
    setName(item.name)
    setCategory(item.category)
    setCurrentStock(item.currentStock)
    setUnit(item.unit)
    setParLevel(item.parLevel)
    setIsAddModalOpen(true)
  }

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const stockVal = typeof currentStock === 'number' ? currentStock : 0
    const parVal = typeof parLevel === 'number' ? parLevel : 0

    if (editingItem) {
      editItem(editingItem.id, {
        name,
        category,
        currentStock: stockVal,
        unit,
        parLevel: parVal
      })
    } else {
      addItem({
        id: Date.now().toString(),
        name,
        category,
        currentStock: stockVal,
        unit,
        parLevel: parVal
      })
    }
    setIsAddModalOpen(false)
  }

  return (
    <div className={theme}>
      <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
        
        {/* AMBIENT BACKGROUND GLOWS CONTAINER */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#1DB954]/10 dark:bg-[#1DB954]/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-emerald-600/5 dark:bg-emerald-600/10 rounded-full blur-[150px]" />
        </div>

        {/* TOP NAVIGATION / HEADER */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black tracking-tight text-zinc-900 dark:text-white uppercase">
              Velora <span className="text-[#1DB954]">Inventory</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Status indicator */}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              isOnline 
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-[#1DB954]' 
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
            }`}>
              {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
              <span>{isOnline ? 'Online' : 'Offline Mode'}</span>
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-300"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        {/* MAIN CONTENT WRAPPER */}
        <main className="relative z-10 max-w-6xl mx-auto p-4 md:p-6 space-y-6">

          {/* METRIC CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button 
              onClick={() => setFilterType('all')}
              className={`text-left bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-4 rounded-xl border transition-all shadow-sm cursor-pointer ${
                filterType === 'all' 
                  ? 'border-[#1DB954] ring-1 ring-[#1DB954]' 
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Total Items</p>
              <p className="text-2xl font-bold mt-1 text-zinc-900 dark:text-white">{totalItems}</p>
            </button>

            <button 
              onClick={() => setFilterType('low')}
              className={`text-left bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-4 rounded-xl border transition-all shadow-sm cursor-pointer ${
                filterType === 'low' 
                  ? 'border-amber-500 ring-1 ring-amber-500' 
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Low Stock</p>
              <p className="text-2xl font-bold mt-1 text-amber-500">{lowStockCount}</p>
            </button>

            <button 
              onClick={() => setFilterType('out')}
              className={`text-left bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-4 rounded-xl border transition-all shadow-sm cursor-pointer ${
                filterType === 'out' 
                  ? 'border-rose-500 ring-1 ring-rose-500' 
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Out of Stock</p>
              <p className="text-2xl font-bold mt-1 text-rose-500">{outOfStockCount}</p>
            </button>

            <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Categories</p>
              <p className="text-2xl font-bold mt-1 text-zinc-900 dark:text-white">{activeCategoriesCount}</p>
            </div>
          </div>

          {/* STICKY CONTROL BAR (Search, Filters, Categories) */}
          <div className="sticky top-[57px] z-20 bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-md pt-2 pb-3 space-y-3 -mx-4 px-4 md:-mx-6 md:px-6 border-b border-zinc-200/50 dark:border-zinc-800/50">
            
            {/* ACTIVE FILTER STATUS BANNER */}
            {filterType !== 'all' && (
              <div className="flex items-center justify-between bg-zinc-200/80 dark:bg-zinc-900/90 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 text-sm">
                <span className="font-medium">
                  Showing filter: <strong className="text-[#1DB954] uppercase">{filterType === 'low' ? 'Low Stock Items' : 'Out of Stock Items'}</strong>
                </span>
                <button 
                  onClick={() => setFilterType('all')}
                  className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white underline"
                >
                  Clear Filter
                </button>
              </div>
            )}

            {/* SEARCH, UNDO/REDO & ACTION BAR */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1 flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                  <input 
                    type="text"
                    placeholder="Search inventory..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#1DB954] shadow-sm"
                  />
                </div>

                {/* Undo / Redo Buttons */}
                <div className="flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-1 gap-1 shadow-sm">
                  <button
                    onClick={undo}
                    disabled={past.length === 0}
                    className={`p-2 rounded-lg transition-colors ${
                      past.length === 0 
                        ? 'opacity-40 cursor-not-allowed text-zinc-400' 
                        : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                    title="Undo last action"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800" />
                  <button
                    onClick={redo}
                    disabled={future.length === 0}
                    className={`p-2 rounded-lg transition-colors ${
                      future.length === 0 
                        ? 'opacity-40 cursor-not-allowed text-zinc-400' 
                        : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                    title="Redo action"
                  >
                    <RotateCw size={16} />
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleOpenAdd}
                className="flex items-center justify-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
              >
                <Plus size={18} />
                <span>Add Item</span>
              </button>
            </div>

            {/* CATEGORY FILTER BUTTONS */}
            <div className="w-full overflow-x-auto pb-1 flex items-center gap-2 scrollbar-none">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all flex-shrink-0 ${
                    activeCategory === cat 
                      ? 'bg-[#1DB954] text-black shadow-md scale-105' 
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

          {/* INVENTORY LIST GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {filteredItems.length === 0 ? (
              <div className="col-span-full py-12 text-center text-zinc-500">
                <p className="text-base font-medium">No inventory items found.</p>
                <p className="text-xs mt-1">Try tweaking your filters, search or adding a new item.</p>
              </div>
            ) : (
              filteredItems.map(item => {
                const isLow = item.currentStock <= item.parLevel && item.currentStock > 0
                const isOut = item.currentStock === 0

                return (
                  <div 
                    key={item.id}
                    className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-zinc-900 dark:text-white">{item.name}</h3>
                        <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded-md font-semibold">
                          {item.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                        <span>Target Par: {item.parLevel} {item.unit}</span>
                      </div>

                      <div className="pt-1">
                        {isOut ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full">
                            <AlertTriangle size={12} /> Out of Stock
                          </span>
                        ) : isLow ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                            <AlertTriangle size={12} /> Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            <CheckCircle2 size={12} /> Good
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CONTROLS */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/80 rounded-xl p-1 border border-zinc-200 dark:border-zinc-700">
                        <button
                          onClick={() => updateStock(item.id, Number((item.currentStock - 1).toFixed(2)))}
                          className="w-8 h-8 flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 rounded-lg transition-colors"
                        >
                          -
                        </button>
                        <span className="w-12 text-center text-sm font-bold text-zinc-900 dark:text-white">
                          {item.currentStock}
                        </span>
                        <button
                          onClick={() => updateStock(item.id, Number((item.currentStock + 1).toFixed(2)))}
                          className="w-8 h-8 flex items-center justify-center font-bold text-zinc-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 rounded-lg transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                          title="Edit Item"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="p-1.5 text-zinc-400 hover:text-rose-500 transition-colors"
                          title="Delete Item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </main>

        {/* ADD/EDIT MODAL */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  {editingItem ? 'Edit Item' : 'Add New Inventory Item'}
                </h2>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveItem} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Item Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mozzarella Cheese"
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1DB954]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1DB954]"
                    >
                      {CATEGORIES.filter(c => c !== 'All').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Unit</label>
                    <input
                      type="text"
                      required
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      placeholder="kg, Liters, Pieces"
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1DB954]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Current Stock</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="any"
                      value={currentStock}
                      onChange={(e) => setCurrentStock(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1DB954]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Target Par Level</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="any"
                      value={parLevel}
                      onChange={(e) => setParLevel(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1DB954]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold px-5 py-2 rounded-xl text-sm transition-all shadow-md"
                  >
                    Save Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}