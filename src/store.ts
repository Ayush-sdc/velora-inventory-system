import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface InventoryItem {
  id: string
  name: string
  category: string
  currentStock: number
  unit: string
  parLevel: number
}

interface InventoryStore {
  items: InventoryItem[]
  updateStock: (id: string, newStock: number) => void
  addItem: (item: InventoryItem) => void
}

export const useInventoryStore = create<InventoryStore>()(
  persist(
    (set) => ({
      items: [
        { id: '1', name: 'Paneer', category: 'Dairy', currentStock: 8, unit: 'kg', parLevel: 15 },
        { id: '2', name: 'Basmati Rice', category: 'Dry Goods', currentStock: 45, unit: 'kg', parLevel: 20 },
        { id: '4', name: 'Cooking Oil', category: 'Dry Goods', currentStock: 18, unit: 'Liters', parLevel: 15 },
        { id: '5', name: 'Onions', category: 'Produce', currentStock: 28, unit: 'kg', parLevel: 10 },
        { id: '6', name: 'Coffee Beans', category: 'Dry Goods', currentStock: 4, unit: 'kg', parLevel: 5 },
        { id: '7', name: 'Artisan Bread', category: 'Bakery', currentStock: 12, unit: 'Loaves', parLevel: 20 },
        { id: '8', name: 'Fresh Coriander', category: 'Produce', currentStock: 2, unit: 'kg', parLevel: 3 },
        { id: '9', name: 'Tomatoes', category: 'Produce', currentStock: 15, unit: 'kg', parLevel: 10 },
        { id: '10', name: 'Butter', category: 'Dairy', currentStock: 20, unit: 'kg', parLevel: 15 },
      ],
      updateStock: (id, newStock) => 
        set((state) => ({
          items: state.items.map(item => 
            item.id === id ? { ...item, currentStock: newStock } : item
          )
        })),
      addItem: (item) => 
        set((state) => ({ items: [...state.items, item] })),
    }),
    {
      name: 'velora-inventory-storage-v2',
    }
  )
)