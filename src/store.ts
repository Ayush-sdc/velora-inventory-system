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
  past: InventoryItem[][]
  future: InventoryItem[][]
  theme: 'light' | 'dark'
  updateStock: (id: string, newStock: number) => void
  addItem: (item: InventoryItem) => void
  editItem: (id: string, updatedItem: Partial<InventoryItem>) => void
  deleteItem: (id: string) => void
  undo: () => void
  redo: () => void
  toggleTheme: () => void
}

export const useInventoryStore = create<InventoryStore>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      items: [
        { id: '1', name: 'Paneer', category: 'Dairy', currentStock: 8, unit: 'kg', parLevel: 15 },
        { id: '2', name: 'Basmati Rice', category: 'Dry Goods', currentStock: 45, unit: 'kg', parLevel: 20 },
        { id: '3', name: 'Wheat Flour (Atta)', category: 'Dry Goods', currentStock: 80, unit: 'kg', parLevel: 40 },
        { id: '4', name: 'Cooking Oil', category: 'Dry Goods', currentStock: 18, unit: 'Liters', parLevel: 15 },
        { id: '5', name: 'Onions', category: 'Produce', currentStock: 28, unit: 'kg', parLevel: 10 },
        { id: '6', name: 'Coffee Beans', category: 'Beverages', currentStock: 4, unit: 'kg', parLevel: 5 },
        { id: '7', name: 'Artisan Bread', category: 'Bakery', currentStock: 12, unit: 'Loaves', parLevel: 20 },
        { id: '8', name: 'Fresh Coriander', category: 'Produce', currentStock: 2, unit: 'kg', parLevel: 3 },
        { id: '9', name: 'Tomatoes', category: 'Produce', currentStock: 15, unit: 'kg', parLevel: 10 },
        { id: '10', name: 'Butter', category: 'Dairy', currentStock: 20, unit: 'kg', parLevel: 15 },
        { id: '11', name: 'Milk', category: 'Dairy', currentStock: 60, unit: 'Liters', parLevel: 30 },
        { id: '12', name: 'Curd', category: 'Dairy', currentStock: 25, unit: 'kg', parLevel: 15 },
        { id: '13', name: 'Cheese', category: 'Dairy', currentStock: 10, unit: 'kg', parLevel: 8 },
        { id: '14', name: 'Fresh Cream', category: 'Dairy', currentStock: 12, unit: 'Liters', parLevel: 8 },
        { id: '15', name: 'Ghee', category: 'Dairy', currentStock: 18, unit: 'kg', parLevel: 10 },

        // Pulses
        { id: '16', name: 'Toor Dal', category: 'Pulses', currentStock: 30, unit: 'kg', parLevel: 15 },
        { id: '17', name: 'Moong Dal', category: 'Pulses', currentStock: 25, unit: 'kg', parLevel: 12 },
        { id: '18', name: 'Masoor Dal', category: 'Pulses', currentStock: 18, unit: 'kg', parLevel: 10 },
        { id: '19', name: 'Chana Dal', category: 'Pulses', currentStock: 20, unit: 'kg', parLevel: 12 },
        { id: '20', name: 'Urad Dal', category: 'Pulses', currentStock: 22, unit: 'kg', parLevel: 12 },
        { id: '21', name: 'Rajma', category: 'Pulses', currentStock: 18, unit: 'kg', parLevel: 8 },
        { id: '22', name: 'Kabuli Chana', category: 'Pulses', currentStock: 20, unit: 'kg', parLevel: 10 },
        { id: '23', name: 'Black Chana', category: 'Pulses', currentStock: 15, unit: 'kg', parLevel: 8 },

        // Produce
        { id: '24', name: 'Potatoes', category: 'Produce', currentStock: 60, unit: 'kg', parLevel: 30 },
        { id: '25', name: 'Carrots', category: 'Produce', currentStock: 15, unit: 'kg', parLevel: 8 },
        { id: '26', name: 'Capsicum', category: 'Produce', currentStock: 12, unit: 'kg', parLevel: 8 },
        { id: '27', name: 'Cauliflower', category: 'Produce', currentStock: 10, unit: 'kg', parLevel: 5 },
        { id: '28', name: 'Cabbage', category: 'Produce', currentStock: 12, unit: 'kg', parLevel: 6 },
        { id: '29', name: 'Green Peas', category: 'Produce', currentStock: 15, unit: 'kg', parLevel: 8 },
        { id: '30', name: 'French Beans', category: 'Produce', currentStock: 10, unit: 'kg', parLevel: 5 },
        { id: '31', name: 'Green Chillies', category: 'Produce', currentStock: 4, unit: 'kg', parLevel: 2 },
        { id: '32', name: 'Ginger', category: 'Produce', currentStock: 8, unit: 'kg', parLevel: 4 },
        { id: '33', name: 'Garlic', category: 'Produce', currentStock: 12, unit: 'kg', parLevel: 5 },
        { id: '34', name: 'Mint Leaves', category: 'Produce', currentStock: 3, unit: 'kg', parLevel: 2 },
        { id: '35', name: 'Spinach', category: 'Produce', currentStock: 8, unit: 'kg', parLevel: 5 },
        { id: '36', name: 'Lemons', category: 'Produce', currentStock: 100, unit: 'Pieces', parLevel: 40 },
        { id: '37', name: 'Cucumber', category: 'Produce', currentStock: 20, unit: 'kg', parLevel: 10 },

        // Dry Goods
        { id: '38', name: 'Maida', category: 'Dry Goods', currentStock: 40, unit: 'kg', parLevel: 20 },
        { id: '39', name: 'Semolina (Suji)', category: 'Dry Goods', currentStock: 20, unit: 'kg', parLevel: 10 },
        { id: '40', name: 'Corn Flour', category: 'Dry Goods', currentStock: 10, unit: 'kg', parLevel: 5 },
        { id: '41', name: 'Besan', category: 'Dry Goods', currentStock: 25, unit: 'kg', parLevel: 10 },
        { id: '42', name: 'Poha', category: 'Dry Goods', currentStock: 15, unit: 'kg', parLevel: 8 },
        { id: '43', name: 'Vermicelli', category: 'Dry Goods', currentStock: 10, unit: 'kg', parLevel: 5 },
        { id: '44', name: 'Sugar', category: 'Dry Goods', currentStock: 50, unit: 'kg', parLevel: 20 },
        { id: '45', name: 'Jaggery', category: 'Dry Goods', currentStock: 12, unit: 'kg', parLevel: 6 },
        { id: '46', name: 'Salt', category: 'Dry Goods', currentStock: 30, unit: 'kg', parLevel: 15 },

        // Spices
        { id: '47', name: 'Turmeric Powder', category: 'Spices', currentStock: 5, unit: 'kg', parLevel: 2 },
        { id: '48', name: 'Red Chilli Powder', category: 'Spices', currentStock: 5, unit: 'kg', parLevel: 2 },
        { id: '49', name: 'Coriander Powder', category: 'Spices', currentStock: 6, unit: 'kg', parLevel: 3 },
        { id: '50', name: 'Cumin Seeds', category: 'Spices', currentStock: 4, unit: 'kg', parLevel: 2 },
        { id: '51', name: 'Mustard Seeds', category: 'Spices', currentStock: 3, unit: 'kg', parLevel: 2 },
        { id: '52', name: 'Black Pepper', category: 'Spices', currentStock: 2, unit: 'kg', parLevel: 1 },
        { id: '53', name: 'Cardamom', category: 'Spices', currentStock: 1, unit: 'kg', parLevel: 0.5 },
        { id: '54', name: 'Cloves', category: 'Spices', currentStock: 1, unit: 'kg', parLevel: 0.5 },
        { id: '55', name: 'Cinnamon', category: 'Spices', currentStock: 1.5, unit: 'kg', parLevel: 1 },
        { id: '56', name: 'Bay Leaves', category: 'Spices', currentStock: 1, unit: 'kg', parLevel: 0.5 },
        { id: '57', name: 'Garam Masala', category: 'Spices', currentStock: 3, unit: 'kg', parLevel: 1 },
        { id: '58', name: 'Kitchen King Masala', category: 'Spices', currentStock: 2, unit: 'kg', parLevel: 1 },
        { id: '59', name: 'Kasuri Methi', category: 'Spices', currentStock: 2, unit: 'kg', parLevel: 1 },
        { id: '60', name: 'Chaat Masala', category: 'Spices', currentStock: 2, unit: 'kg', parLevel: 1 },

        // Beverages
        { id: '61', name: 'Tea Leaves', category: 'Beverages', currentStock: 8, unit: 'kg', parLevel: 5 },
        { id: '62', name: 'Green Tea', category: 'Beverages', currentStock: 2, unit: 'kg', parLevel: 1 },
        { id: '63', name: 'Soft Drink Syrup', category: 'Beverages', currentStock: 10, unit: 'Liters', parLevel: 5 },
        { id: '64', name: 'Fresh Orange Juice', category: 'Beverages', currentStock: 15, unit: 'Liters', parLevel: 8 },

        // Frozen
        { id: '65', name: 'Frozen Green Peas', category: 'Frozen', currentStock: 20, unit: 'kg', parLevel: 10 },
        { id: '66', name: 'Frozen Sweet Corn', category: 'Frozen', currentStock: 15, unit: 'kg', parLevel: 8 },
        { id: '67', name: 'Ice Cream', category: 'Frozen', currentStock: 25, unit: 'Boxes', parLevel: 10 },

        // Bakery
        { id: '68', name: 'Burger Buns', category: 'Bakery', currentStock: 40, unit: 'Pieces', parLevel: 20 },
        { id: '69', name: 'Pizza Base', category: 'Bakery', currentStock: 30, unit: 'Pieces', parLevel: 15 },

        // Packaging
        { id: '70', name: 'Paper Cups', category: 'Packaging', currentStock: 500, unit: 'Pieces', parLevel: 200 },
        { id: '71', name: 'Paper Plates', category: 'Packaging', currentStock: 400, unit: 'Pieces', parLevel: 200 },
        { id: '72', name: 'Food Containers', category: 'Packaging', currentStock: 600, unit: 'Pieces', parLevel: 250 },
        { id: '73', name: 'Carry Bags', category: 'Packaging', currentStock: 700, unit: 'Pieces', parLevel: 300 },
        { id: '74', name: 'Tissues', category: 'Packaging', currentStock: 100, unit: 'Packs', parLevel: 40 },
        { id: '75', name: 'Aluminium Foil', category: 'Packaging', currentStock: 25, unit: 'Rolls', parLevel: 10 },
        { id: '76', name: 'Cling Film', category: 'Packaging', currentStock: 20, unit: 'Rolls', parLevel: 8 },

        // Cleaning
        { id: '77', name: 'Dishwashing Liquid', category: 'Cleaning', currentStock: 20, unit: 'Liters', parLevel: 10 },
        { id: '78', name: 'Floor Cleaner', category: 'Cleaning', currentStock: 15, unit: 'Liters', parLevel: 8 },
        { id: '79', name: 'Hand Wash', category: 'Cleaning', currentStock: 12, unit: 'Liters', parLevel: 6 },
        { id: '80', name: 'Surface Sanitizer', category: 'Cleaning', currentStock: 10, unit: 'Liters', parLevel: 5 },
        { id: '81', name: 'Garbage Bags', category: 'Cleaning', currentStock: 250, unit: 'Pieces', parLevel: 100 },
        { id: '82', name: 'Toilet Cleaner', category: 'Cleaning', currentStock: 12, unit: 'Liters', parLevel: 6 },
        { id: '83', name: 'Glass Cleaner', category: 'Cleaning', currentStock: 8, unit: 'Liters', parLevel: 4 },

        // Housekeeping
        { id: '84', name: 'Bath Soap', category: 'Housekeeping', currentStock: 150, unit: 'Bars', parLevel: 50 },
        { id: '85', name: 'Shampoo Sachets', category: 'Housekeeping', currentStock: 250, unit: 'Pieces', parLevel: 100 },
        { id: '86', name: 'Laundry Detergent', category: 'Housekeeping', currentStock: 30, unit: 'kg', parLevel: 15 },
        { id: '87', name: 'Toilet Paper', category: 'Housekeeping', currentStock: 180, unit: 'Rolls', parLevel: 80 },
        { id: '88', name: 'Room Freshener', category: 'Housekeeping', currentStock: 25, unit: 'Bottles', parLevel: 10 },
        { id: '89', name: 'Mop', category: 'Housekeeping', currentStock: 10, unit: 'Pieces', parLevel: 5 },
        { id: '90', name: 'Broom', category: 'Housekeeping', currentStock: 12, unit: 'Pieces', parLevel: 5 }
      ],
      past: [],
      future: [],

      updateStock: (id, newStock) => {
        const currentItems = get().items
        const newItems = currentItems.map((item) =>
          item.id === id ? { ...item, currentStock: Math.max(0, newStock) } : item
        )
        if (JSON.stringify(currentItems) === JSON.stringify(newItems)) return
        set({
          past: [...get().past, currentItems].slice(-20),
          future: [],
          items: newItems,
        })
      },

      addItem: (item) => {
        const currentItems = get().items
        const newItems = [...currentItems, item]
        set({
          past: [...get().past, currentItems].slice(-20),
          future: [],
          items: newItems,
        })
      },

      editItem: (id, updatedItem) => {
        const currentItems = get().items
        const newItems = currentItems.map((item) =>
          item.id === id ? { ...item, ...updatedItem } : item
        )
        set({
          past: [...get().past, currentItems].slice(-20),
          future: [],
          items: newItems,
        })
      },

      deleteItem: (id) => {
        const currentItems = get().items
        const newItems = currentItems.filter((item) => item.id !== id)
        set({
          past: [...get().past, currentItems].slice(-20),
          future: [],
          items: newItems,
        })
      },

      undo: () => {
        const { past, future, items } = get()
        if (past.length === 0) return
        const previous = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)
        set({
          past: newPast,
          future: [items, ...future],
          items: previous,
        })
      },

      redo: () => {
        const { past, future, items } = get()
        if (future.length === 0) return
        const next = future[0]
        const newFuture = future.slice(1)
        set({
          past: [...past, items],
          future: newFuture,
          items: next,
        })
      },

      toggleTheme: () => 
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }))
    }),
    {
      name: 'velora-inventory-storage-v5',
    }
  )
)