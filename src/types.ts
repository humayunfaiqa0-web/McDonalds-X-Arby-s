export interface MenuItem {
  id: string;
  name: string;
  arbyName: string;
  tagline: string;
  description: string;
  calories: number;
  baseCalories: number;
  price: number;
  image: string;
  category: 'burgers' | 'chicken' | 'sides' | 'desserts';
  ingredients: string[];
  level: 'classic' | 'mega' | 'ultimate';
}

export interface StackerIngredient {
  id: string;
  name: string;
  calories: number;
  price: number;
  color: string;
  borderColor: string;
  heightPx: number;
  renderType: 'bun-top' | 'bun-bottom' | 'meat' | 'chicken' | 'cheese' | 'sauce' | 'lettuce' | 'bacon';
}

export interface SavedMcStack {
  name: string;
  ingredients: string[];
  totalCalories: number;
  totalPrice: number;
  rating: number;
}
