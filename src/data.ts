import { MenuItem, StackerIngredient } from './types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'big-mac-stack',
    name: 'McBigMac',
    arbyName: 'MCBIGMAC ULTIMATE',
    tagline: 'WE STACKED THE ARCHES WITH BEEF.',
    description: 'Four seared beef patties, three buns, cheddar, and our signature Special Sauce stacked tall.',
    baseCalories: 590,
    calories: 1180, // Ultimate version calories
    price: 1450,
    image: '/src/assets/images/big_mac_stack_1783453433593.jpg',
    category: 'burgers',
    ingredients: ['Sesame Bun Top', 'Special Mac Sauce', 'Shredded Lettuce', 'Melting Cheddar', 'Flame-Grilled Patty', 'Flame-Grilled Patty', 'Middle Club Bun', 'Pickle Medley', 'Melting Cheddar', 'Flame-Grilled Patty', 'Flame-Grilled Patty', 'Bun Bottom'],
    level: 'ultimate'
  },
  {
    id: 'quarter-pounder-titan',
    name: 'McQuarterPounder',
    arbyName: 'MCQUARTERPOUNDER TITAN',
    tagline: '100% PURE UNAPOLOGETIC BEEF POWER.',
    description: 'A fresh, flame-seared quarter-pound patty with crunchy onion rings, cheddar, onions, and pickles on a sesame bun.',
    baseCalories: 520,
    calories: 960,
    price: 1350,
    image: '/src/assets/images/quarter_pounder_stack_1783453453800.jpg',
    category: 'burgers',
    ingredients: ['Sesame Bun Top', 'Thick Melted Cheddar', 'Giant Quarter-Pound Patty', 'Slivered Onions', 'Crispy Onion Rings', 'Thick Melted Cheddar', 'Giant Quarter-Pound Patty', 'Pickles', 'Ketchup & Mustard', 'Bun Bottom'],
    level: 'ultimate'
  },
  {
    id: 'mcchicken-titan',
    name: 'McChicken',
    arbyName: 'MCCHICKEN TITAN',
    tagline: 'CRUNCH THAT WILL SHATTER THE WINDOWS.',
    description: 'A giant crispy McChicken breast fried golden and topped with spicy volcano mayonnaise, lettuce, and pepper jack cheese.',
    baseCalories: 400,
    calories: 780,
    price: 950,
    image: '/src/assets/images/crispy_chicken_stack_1783453473246.jpg',
    category: 'chicken',
    ingredients: ['Glossy Brioche Bun Top', 'Spicy Volcano Mayo', 'Shredded Lettuce', 'Shatteringly Crispy Chicken Breast', 'Melted Pepper Jack', 'Shatteringly Crispy Chicken Breast', 'Spicy Volcano Mayo', 'Bun Bottom'],
    level: 'ultimate'
  },
  {
    id: 'extreme-golden-fries',
    name: 'McFry',
    arbyName: 'MCFRY BASKET',
    tagline: 'THE WORLD\'S MOST FAMOUS FRY, RE-ENGINEERED FOR EXTREME INDULGENCE.',
    description: 'Our world-famous golden French fries, served in a massive basket portion, piping hot and crispy.',
    baseCalories: 320,
    calories: 680,
    price: 490,
    image: '/src/assets/images/mcfry_fries_1783454063740.jpg',
    category: 'sides',
    ingredients: ['Premium Idaho Potatoes', 'Pure Sea Salt Crystals', 'Crispy Golden Outer Shell', 'Fluffy Steaming Interior'],
    level: 'ultimate'
  }
];

export const STACKER_INGREDIENTS: StackerIngredient[] = [
  {
    id: 'bun-top',
    name: 'Toasted Sesame Bun Top',
    calories: 120,
    price: 80,
    color: '#E5A65D',
    borderColor: '#C6873F',
    heightPx: 32,
    renderType: 'bun-top'
  },
  {
    id: 'mac-sauce',
    name: 'Aggressive Special Sauce',
    calories: 90,
    price: 50,
    color: '#F4D35E',
    borderColor: '#D4B33E',
    heightPx: 12,
    renderType: 'sauce'
  },
  {
    id: 'lettuce',
    name: 'Crisp Shredded Lettuce',
    calories: 5,
    price: 30,
    color: '#83C5BE',
    borderColor: '#5FA89E',
    heightPx: 14,
    renderType: 'lettuce'
  },
  {
    id: 'cheese',
    name: 'Melted Cheddar Avalanche',
    calories: 110,
    price: 90,
    color: '#FFAA00',
    borderColor: '#CC8800',
    heightPx: 16,
    renderType: 'cheese'
  },
  {
    id: 'beef-patty',
    name: 'Giant Flame-Grilled Beef Patty',
    calories: 240,
    price: 280,
    color: '#5C3D2E',
    borderColor: '#3D251A',
    heightPx: 26,
    renderType: 'meat'
  },
  {
    id: 'chicken-fillet',
    name: 'Shatter-Crisp Chicken Fillet',
    calories: 290,
    price: 320,
    color: '#D4A373',
    borderColor: '#A87A50',
    heightPx: 30,
    renderType: 'chicken'
  },
  {
    id: 'bacon',
    name: 'Crispy Sizzling Onion Rings',
    calories: 80,
    price: 70,
    color: '#FFA500',
    borderColor: '#D47A00',
    heightPx: 12,
    renderType: 'bacon'
  },
  {
    id: 'bun-bottom',
    name: 'Rugged Toasted Bun Bottom',
    calories: 100,
    price: 80,
    color: '#DDA15E',
    borderColor: '#BC6C25',
    heightPx: 24,
    renderType: 'bun-bottom'
  }
];

export const AGGRESSIVE_SLOGANS: string[] = [
  "WE HAVE THE LOVIN' IT!",
  "I'M LOVIN' IT!",
  "THE ARCHES ARE MADE OF SOLID GOLD BEEF!",
  "HAPPY MEAL? MORE LIKE THE ULTIMATE FEAST!",
  "YOU WANT THE LOVIN'? WE GOT THE LOVIN' AND THE MEATS!",
  "A DOUBLE-DECKER MONUMENT OF LOVIN' IT!",
  "BAKED IN THE FIRES OF BEEF CONQUEST!",
  "THIS ISN'T SNACKING. THIS IS A STRATEGIC MEAT OVERLOAD!",
  "GIVE YOUR APPETITE THE ARCH RE-EDUCATION IT DESERVES!"
];

export const BRAND_FACTS = [
  {
    title: "100% REAL SEAR",
    value: "450°F",
    desc: "Searing at blistering heat to lock in maximum flavor."
  },
  {
    title: "MEGA CALORIC MASS",
    value: "1,180+",
    desc: "High-density calorie counts designed for maximum hunger."
  },
  {
    title: "SOLID SHIELD FRIES",
    value: "8-INCH",
    desc: "Long-cut fries designed to hold maximum dip."
  }
];
