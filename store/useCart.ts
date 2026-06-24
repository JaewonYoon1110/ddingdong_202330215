import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  restaurantId: string | null;
  restaurantName: string | null;
  addItem: (item: Omit<CartItem, 'quantity'>, restaurantId: string, restaurantName: string) => boolean;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalAmount: () => number;
  totalCount: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  restaurantId: null,
  restaurantName: null,

  addItem: (item, restaurantId, restaurantName) => {
    const state = get();
    if (state.restaurantId && state.restaurantId !== restaurantId) {
      return false; // 다른 가게 메뉴 담기 불가
    }
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
          restaurantId,
          restaurantName,
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
        restaurantId,
        restaurantName,
      };
    });
    return true;
  },

  removeItem: (id) => set((state) => {
    const item = state.items.find((i) => i.id === id);
    if (item && item.quantity > 1) {
      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    }
    const newItems = state.items.filter((i) => i.id !== id);
    return {
      items: newItems,
      restaurantId: newItems.length === 0 ? null : state.restaurantId,
      restaurantName: newItems.length === 0 ? null : state.restaurantName,
    };
  }),

  clearCart: () => set({ items: [], restaurantId: null, restaurantName: null }),
  totalAmount: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
  totalCount: () => get().items.reduce((total, item) => total + item.quantity, 0),
}));