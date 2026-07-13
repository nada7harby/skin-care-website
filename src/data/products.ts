import { Product } from "../context/CartContext";

export const products: Product[] = [
  {
    id: 1,
    name: "Hydrating Facial Cleanser",
    price: 24.99,
    image:
      "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Cleansers",
    brand: "PureGlow",
    description:
      "A gentle, hydrating cleanser that removes impurities without stripping the skin's natural moisture. Suitable for all skin types, especially dry and sensitive skin.",
    rating: 4.8,
    isNew: false,
    isBestSeller: true,
    ingredients: [
      "Hyaluronic Acid",
      "Glycerin",
      "Aloe Vera",
      "Chamomile Extract",
    ],
    skinType: ["Dry", "Sensitive", "Normal"],
    benefits: ["Hydrates", "Cleanses", "Soothes"],
    howToUse:
      "Apply to damp face, massage gently, and rinse thoroughly with lukewarm water. Use morning and night.",
  },
  {
    id: 2,
    name: "Vitamin C Brightening Serum",
    price: 39.99,
    image:
      "https://images.pexels.com/photos/7428104/pexels-photo-7428104.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Serums",
    brand: "RadiantSkin",
    description:
      "This powerful serum combines 15% Vitamin C with Hyaluronic Acid to brighten skin, reduce dark spots, and boost collagen production for a radiant complexion.",
    rating: 4.9,
    isNew: true,
    isBestSeller: true,
    ingredients: [
      "Vitamin C 15%",
      "Hyaluronic Acid",
      "Ferulic Acid",
      "Vitamin E",
    ],
    skinType: ["All Skin Types"],
    benefits: ["Brightens", "Anti-aging", "Evens Tone"],
    howToUse:
      "Apply 3-4 drops to clean skin before moisturizer. Use in the morning for best results.",
  },
  {
    id: 3,
    name: "Ultra Hydrating Moisturizer",
    price: 29.99,
    image:
      "https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Moisturizers",
    brand: "Hydraluxe",
    description:
      "A deeply hydrating moisturizer that provides 24-hour hydration with hyaluronic acid and ceramides. Perfect for dry to normal skin types.",
    rating: 4.7,
    isNew: false,
    isBestSeller: true,
    ingredients: ["Hyaluronic Acid", "Ceramides", "Niacinamide", "Shea Butter"],
    skinType: ["Dry", "Normal"],
    benefits: ["24-Hour Hydration", "Strengthens Barrier", "Smooths"],
    howToUse:
      "Apply to clean face and neck morning and evening. Gently massage until absorbed.",
  },
  {
    id: 4,
    name: "Exfoliating Clay Mask",
    price: 19.99,
    image:
      "https://images.pexels.com/photos/7428102/pexels-photo-7428102.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Masks",
    brand: "PureEarth",
    description:
      "This clay mask gently exfoliates and detoxifies skin with natural clay and fruit enzymes. Use weekly for smoother, clearer skin.",
    rating: 4.5,
    isNew: false,
    isBestSeller: false,
    ingredients: [
      "Kaolin Clay",
      "Bentonite Clay",
      "Papaya Enzyme",
      "Tea Tree Oil",
    ],
    skinType: ["Oily", "Combination", "Acne-Prone"],
    benefits: ["Detoxifies", "Exfoliates", "Clarifies"],
    howToUse:
      "Apply a thin layer to clean skin, avoiding eye area. Leave on for 10-15 minutes, then rinse. Use 1-2 times weekly.",
  },
  {
    id: 5,
    name: "Retinol Night Repair Cream",
    price: 49.99,
    image:
      "https://images.pexels.com/photos/4041279/pexels-photo-4041279.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Moisturizers",
    brand: "AgelessBeauty",
    description:
      "This advanced night cream with 0.5% Retinol helps reduce fine lines and wrinkles while improving skin texture and tone as you sleep.",
    rating: 4.9,
    isNew: false,
    isBestSeller: true,
    ingredients: ["Retinol 0.5%", "Peptides", "Squalane", "Vitamin E"],
    skinType: ["Normal", "Mature", "Dry"],
    benefits: ["Anti-aging", "Reduces Wrinkles", "Improves Texture"],
    howToUse:
      "Apply a pea-sized amount to clean, dry skin at night. Start with 2-3 times weekly, gradually increase frequency.",
  },
  {
    id: 6,
    name: "Oil Control Gel Cleanser",
    price: 22.99,
    image:
      "https://images.pexels.com/photos/7428095/pexels-photo-7428095.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Cleansers",
    brand: "ClearBalance",
    description:
      "A refreshing gel cleanser that removes excess oil and impurities while maintaining skin's natural balance. Perfect for oily and combination skin.",
    rating: 4.6,
    isNew: false,
    isBestSeller: false,
    ingredients: [
      "Salicylic Acid",
      "Green Tea Extract",
      "Witch Hazel",
      "Aloe Vera",
    ],
    skinType: ["Oily", "Combination", "Acne-Prone"],
    benefits: ["Controls Oil", "Deep Cleanses", "Refreshes"],
    howToUse:
      "Massage onto wet face, creating a light lather. Rinse thoroughly. Use twice daily.",
  },
  {
    id: 7,
    name: "Hyaluronic Acid Serum",
    price: 34.99,
    image:
      "https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Serums",
    brand: "Hydraluxe",
    description:
      "This hydrating serum contains multiple forms of hyaluronic acid to deeply moisturize skin at different levels for plump, dewy skin.",
    rating: 4.7,
    isNew: true,
    isBestSeller: false,
    ingredients: [
      "Hyaluronic Acid Complex",
      "Glycerin",
      "Panthenol",
      "Allantoin",
    ],
    skinType: ["All Skin Types"],
    benefits: ["Deep Hydration", "Plumps", "Smooths"],
    howToUse:
      "Apply 2-3 drops to damp skin, then follow with moisturizer. Use morning and evening.",
  },
  {
    id: 8,
    name: "Overnight Hydration Mask",
    price: 26.99,
    image:
      "https://images.pexels.com/photos/7428102/pexels-photo-7428102.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Masks",
    brand: "NightRevive",
    description:
      "This leave-on overnight mask intensely hydrates and repairs skin while you sleep. Wake up to soft, supple, and revitalized skin.",
    rating: 4.8,
    isNew: true,
    isBestSeller: false,
    ingredients: [
      "Hyaluronic Acid",
      "Ceramides",
      "Lavender Oil",
      "Rose Extract",
    ],
    skinType: ["Dry", "Normal", "Sensitive"],
    benefits: ["Overnight Repair", "Intense Hydration", "Calms"],
    howToUse:
      "Apply as the last step of your nighttime routine. Leave on overnight, no need to rinse.",
  },
  {
    id: 9,
    name: "Niacinamide Pore Refining Serum",
    price: 32.99,
    image: "https://images.pexels.com/photos/7428094/pexels-photo-7428094.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Serums",
    brand: "PureGlow",
    description:
      "A concentrated serum with 10% Niacinamide that minimizes pores, regulates oil production, and improves skin texture.",
    rating: 4.6,
    isNew: true,
    isBestSeller: false,
    ingredients: [
      "Niacinamide 10%",
      "Zinc PCA",
      "Hyaluronic Acid",
      "Witch Hazel",
    ],
    skinType: ["Oily", "Combination", "Acne-Prone"],
    benefits: ["Minimizes Pores", "Controls Oil", "Improves Texture"],
    howToUse:
      "Apply a few drops to clean skin before moisturizer. Use morning and evening.",
  },
  {
    id: 10,
    name: "Gentle Micellar Water",
    price: 18.99,
    image:
      "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Cleansers",
    brand: "PureEarth",
    description:
      "A no-rinse micellar water that gently removes makeup, dirt, and oil while hydrating skin. Perfect for all skin types.",
    rating: 4.4,
    isNew: false,
    isBestSeller: false,
    ingredients: ["Micelles", "Glycerin", "Rose Water", "Cucumber Extract"],
    skinType: ["All Skin Types"],
    benefits: ["Removes Makeup", "Hydrates", "Refreshes"],
    howToUse:
      "Apply to cotton pad and gently wipe over face and eyes. No rinsing required.",
  },
  {
    id: 11,
    name: "SPF 50 Sunscreen",
    price: 27.99,
    image:
      "https://images.pexels.com/photos/7428094/pexels-photo-7428094.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Sunscreen",
    brand: "RadiantSkin",
    description:
      "Broad-spectrum SPF 50 sunscreen with lightweight, non-greasy formula. Protects against UVA/UVB rays and blue light.",
    rating: 4.7,
    isNew: false,
    isBestSeller: true,
    ingredients: [
      "Zinc Oxide",
      "Titanium Dioxide",
      "Vitamin E",
      "Green Tea Extract",
    ],
    skinType: ["All Skin Types"],
    benefits: ["SPF 50 Protection", "Lightweight", "Non-greasy"],
    howToUse:
      "Apply generously 15 minutes before sun exposure. Reapply every 2 hours or after swimming.",
  },
  {
    id: 12,
    name: "Eye Cream Renewal Complex",
    price: 44.99,
    image:
      "https://images.pexels.com/photos/5240814/pexels-photo-5240814.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Eye Care",
    brand: "AgelessBeauty",
    description:
      "Advanced eye cream that targets dark circles, puffiness, and fine lines with peptides and caffeine.",
    rating: 4.8,
    isNew: false,
    isBestSeller: true,
    ingredients: ["Peptides", "Caffeine", "Vitamin K", "Hyaluronic Acid"],
    skinType: ["All Skin Types"],
    benefits: ["Reduces Dark Circles", "Depuffs", "Anti-aging"],
    howToUse:
      "Gently pat a small amount around the eye area using your ring finger. Use morning and evening.",
  },
  {
    id: 13,
    name: "Acne Treatment Gel",
    price: 21.99,
    image:
      "https://images.pexels.com/photos/6621183/pexels-photo-6621183.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Treatments",
    brand: "ClearBalance",
    description:
      "Fast-acting spot treatment with 2% salicylic acid that clears blemishes and prevents new breakouts.",
    rating: 4.5,
    isNew: false,
    isBestSeller: false,
    ingredients: ["Salicylic Acid 2%", "Tea Tree Oil", "Niacinamide", "Zinc"],
    skinType: ["Oily", "Acne-Prone"],
    benefits: ["Clears Blemishes", "Prevents Breakouts", "Reduces Redness"],
    howToUse:
      "Apply a thin layer to affected areas after cleansing. Use once or twice daily.",
  },
  {
    id: 14,
    name: "Collagen Boosting Serum",
    price: 52.99,
    image: "https://images.pexels.com/photos/6621183/pexels-photo-6621183.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Serums",
    brand: "AgelessBeauty",
    description:
      "Premium anti-aging serum with peptides and plant stem cells that boosts collagen production for firmer, youthful skin.",
    rating: 4.9,
    isNew: true,
    isBestSeller: true,
    ingredients: ["Matrixyl 3000", "Plant Stem Cells", "Peptides", "Vitamin C"],
    skinType: ["Normal", "Mature", "Dry"],
    benefits: ["Boosts Collagen", "Firms", "Anti-aging"],
    howToUse:
      "Apply 2-3 drops to clean skin before moisturizer. Use morning and evening for best results.",
  },
  {
    id: 15,
    name: "Rose Water Toner",
    price: 16.99,
    image:
      "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Toners",
    brand: "NightRevive",
    description:
      "Alcohol-free toner with pure rose water that balances pH, hydrates, and refreshes skin.",
    rating: 4.3,
    isNew: false,
    isBestSeller: false,
    ingredients: ["Rose Water", "Witch Hazel", "Glycerin", "Aloe Vera"],
    skinType: ["All Skin Types"],
    benefits: ["Balances pH", "Hydrates", "Soothes"],
    howToUse:
      "Apply to cotton pad or spray directly onto face after cleansing. Follow with serum and moisturizer.",
  },
  {
    id: 16,
    name: "Lip Treatment Balm",
    price: 14.99,
    image:
      "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=500",
    category: "Lip Care",
    brand: "PureGlow",
    description:
      "Intensive lip treatment that heals, moisturizes, and protects dry, chapped lips with natural oils and butters.",
    rating: 4.6,
    isNew: false,
    isBestSeller: false,
    ingredients: ["Shea Butter", "Coconut Oil", "Vitamin E", "Beeswax"],
    skinType: ["All Skin Types"],
    benefits: ["Heals Chapped Lips", "Moisturizes", "Protects"],
    howToUse:
      "Apply generously to lips as needed throughout the day and before bed.",
  },
];
// Featured products - best sellers
export const featuredProducts = products
  .filter((p) => p.isBestSeller)
  .slice(0, 4);

// New arrivals
export const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

// Top selling products
export const topSellingProducts = products.filter((p) => p.isBestSeller);

// Get all categories
export const categories = Array.from(new Set(products.map((p) => p.category)));

// Get all brands
export const brands = Array.from(new Set(products.map((p) => p.brand)));

export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getProductsByBrand = (brand: string): Product[] => {
  return products.filter((product) => product.brand === brand);
};
