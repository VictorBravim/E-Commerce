// CartContext.tsx
import React, { createContext, useContext, useReducer } from 'react';

// Define o tipo de dados Product
export type Product = {
    id: number;
    name: string;
    price: number;
    // Outras propriedades do produto
  };

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  cartItems: CartItem[];
};

// Defina as ações possíveis
type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }; // Por exemplo, usando o ID do produto

// Defina o contexto
const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<Action>;
  }>({
    state: { cartItems: [] },
    dispatch: () => null,
  });

// Provedor de contexto
export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });
  
    return (
      <CartContext.Provider value={{ state, dispatch }}>
        {children}
      </CartContext.Provider>
    );
  };
  
  // Hook personalizado para utilizar o contexto
  export const useCart = () => {
    return useContext(CartContext);
  };

// Defina o redutor para manipular as ações
const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Lógica para adicionar um item ao carrinho
      return {
        ...state,
        cartItems: [...state.cartItems, { product: action.payload, quantity: 1 }],
      };
    case 'REMOVE_FROM_CART':
      // Lógica para remover um item do carrinho
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product.id !== action.payload),
      };
    default:
      return state;
  }
};
