import React, { createContext, useContext, useEffect, useState } from 'react';
import { products as seedProducts } from '../data/products';
import { Product } from './CartContext';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  parent?: string;
  status: 'Active' | 'Inactive';
  displayOrder: number;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  description: string;
  logo: string;
  status: 'Active' | 'Inactive';
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Suspended';
  registrationDate: string;
  addresses: string[];
  notes: string;
  wishlist: number[];
}

export interface OrderItem {
  productId: number;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  customerId: number;
  customer: string;
  email: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  promoCode?: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  orderStatus: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
  shippingStatus: 'Pending' | 'Packed' | 'Shipped' | 'Delivered';
  shippingAddress: string;
  billingAddress: string;
  paymentMethod: string;
  shippingMethod: string;
  notes: string[];
  timeline: string[];
}

export interface Review {
  id: number;
  customer: string;
  productId: number;
  product: string;
  rating: number;
  review: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Spam';
  reply?: string;
}

export interface Coupon {
  id: number;
  code: string;
  discountType: 'Percentage' | 'Fixed Amount';
  discountValue: number;
  minimumOrder: number;
  maximumDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usagePerCustomer: number;
  applicableProducts: number[];
  applicableCategories: string[];
  active: boolean;
  timesUsed: number;
  totalDiscountGiven: number;
  revenueGenerated: number;
}

export interface Bundle {
  id: number;
  name: string;
  image: string;
  includedProducts: number[];
  originalTotalPrice: number;
  bundlePrice: number;
  discountPercentage: number;
  stock: number;
  description: string;
  status: 'Active' | 'Inactive';
  startDate: string;
  endDate: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  featuredImage: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  status: 'Draft' | 'Published' | 'Scheduled' | 'Archived';
  publishDate: string;
  seoTitle: string;
  seoDescription: string;
}

export interface ContactMessage {
  id: number;
  senderName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: 'New' | 'Read' | 'Replied' | 'Closed';
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  subscriptionDate: string;
  status: 'Active' | 'Unsubscribed';
  source: string;
}

export interface AdminNotification {
  id: number;
  type: 'New Order' | 'Low Stock' | 'New Customer' | 'New Review' | 'Contact Message' | 'Failed Payment';
  title: string;
  body: string;
  date: string;
  read: boolean;
}

export interface ActivityLogItem {
  id: number;
  user: string;
  action: string;
  target: string;
  date: string;
  ip: string;
  details: string;
}

interface HomeContent {
  heroSlides: Array<{ id: number; title: string; subtitle: string; image: string; ctaText: string; ctaLink: string; order: number; active: boolean; label: string; batch: string }>;
  newsletter: { title: string; description: string; buttonText: string; successMessage: string };
}

interface AboutContent {
  story: string;
  mission: string;
  vision: string;
  values: Array<{ title: string; text: string }>;
  stats: Array<{ value: string; label: string }>;
}

export interface StoreSettings {
  storeName: string;
  email: string;
  phone: string;
  address: string;
  currency: string;
  language: string;
  timezone: string;
  shippingCost: number;
  freeShippingMinimum: number;
  taxEnabled: boolean;
  taxPercentage: number;
  social: Record<string, string>;
}

interface StoreData {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  customers: Customer[];
  orders: Order[];
  reviews: Review[];
  coupons: Coupon[];
  bundles: Bundle[];
  blogPosts: BlogPost[];
  messages: ContactMessage[];
  subscribers: NewsletterSubscriber[];
  notifications: AdminNotification[];
  activityLog: ActivityLogItem[];
  homeContent: HomeContent;
  aboutContent: AboutContent;
  faqs: Array<{ id: number; question: string; answer: string; category: string; order: number; active: boolean }>;
  settings: StoreSettings;
}

interface StoreDataContextType extends StoreData {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  saveProduct: (product: Product) => Product;
  deleteProduct: (id: number) => void;
  duplicateProduct: (id: number) => void;
  updateProductStock: (id: number, stock: number, reason: string) => void;
  saveCategory: (category: Category) => void;
  deleteCategory: (id: number) => void;
  saveBrand: (brand: Brand) => void;
  deleteBrand: (id: number) => void;
  saveOrder: (order: Order) => void;
  createOrderFromCart: (payload: Omit<Order, 'id' | 'orderNumber' | 'date' | 'timeline'>) => Order;
  saveCustomer: (customer: Customer) => void;
  saveReview: (review: Review) => void;
  deleteReview: (id: number) => void;
  saveCoupon: (coupon: Coupon) => void;
  deleteCoupon: (id: number) => void;
  validateCoupon: (code: string, subtotal: number) => { coupon: Coupon; discount: number } | null;
  saveBundle: (bundle: Bundle) => void;
  saveBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: number) => void;
  saveMessage: (message: ContactMessage) => void;
  updateMessageStatus: (id: number, status: ContactMessage['status']) => void;
  saveSubscriber: (email: string, source: string) => void;
  updateNotification: (id: number, read: boolean) => void;
  markAllNotificationsRead: () => void;
  updateHomeContent: (content: HomeContent) => void;
  updateAboutContent: (content: AboutContent) => void;
  saveFaq: (faq: StoreData['faqs'][number]) => void;
  updateSettings: (settings: StoreSettings) => void;
  logActivity: (action: string, target: string, details: string) => void;
}

const StoreDataContext = createContext<StoreDataContextType | undefined>(undefined);

const today = '2026-07-15';

const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const enrichProduct = (product: Product, index: number): Product => {
  const stock = product.stock ?? [48, 22, 9, 0, 64, 13, 28, 7][index % 8];
  return {
    ...product,
    sku: product.sku || `GS-${String(product.id).padStart(4, '0')}`,
    slug: product.slug || slugify(product.name),
    shortDescription: product.shortDescription || product.description.slice(0, 110),
    discountPrice: product.discountPrice,
    costPrice: product.costPrice || Number((product.price * 0.42).toFixed(2)),
    tax: product.tax ?? 8,
    stock,
    reservedStock: product.reservedStock ?? index % 4,
    lowStockAlert: product.lowStockAlert ?? 10,
    status: product.status || 'Published',
    stockStatus: stock <= 0 ? 'Out of Stock' : stock <= 10 ? 'Low Stock' : 'In Stock',
    featured: product.featured ?? Boolean(product.isBestSeller),
    createdDate: product.createdDate || `2026-0${(index % 6) + 1}-${String((index % 24) + 1).padStart(2, '0')}`,
    gallery: product.gallery || [product.image],
    tags: product.tags || [product.category, product.brand],
    dermatologistTested: product.dermatologistTested ?? true,
    crueltyFree: product.crueltyFree ?? true,
    vegan: product.vegan ?? index % 3 !== 0,
    fragranceFree: product.fragranceFree ?? index % 2 === 0,
    parabenFree: product.parabenFree ?? true,
    metaTitle: product.metaTitle || `${product.name} | GlowSkin`,
    metaDescription: product.metaDescription || product.description.slice(0, 150),
    keywords: product.keywords || [product.category, product.brand, 'skincare'],
  };
};

const initialProducts = seedProducts.map(enrichProduct);

const initialCategories: Category[] = Array.from(new Set(initialProducts.map(product => product.category))).map((name, index) => ({
  id: index + 1,
  name,
  slug: slugify(name),
  description: `${name} formulas curated for effective daily routines.`,
  image: initialProducts.find(product => product.category === name)?.image || '',
  status: 'Active',
  displayOrder: index + 1,
}));

const initialBrands: Brand[] = Array.from(new Set(initialProducts.map(product => product.brand))).map((name, index) => ({
  id: index + 1,
  name,
  slug: slugify(name),
  description: `${name} develops targeted formulas for modern skincare routines.`,
  logo: initialProducts.find(product => product.brand === name)?.image || '',
  status: 'Active',
}));

const initialCustomers: Customer[] = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 (555) 123-4567', status: 'Active', registrationDate: '2024-01-03', addresses: ['123 Beauty Lane, Los Angeles, CA 90001'], notes: 'Sensitive skin. Prefers fragrance-free formulas.', wishlist: [2, 5, 12] },
  { id: 2, name: 'Michael Chen', email: 'michael.chen@email.com', phone: '+1 (555) 920-1144', status: 'Active', registrationDate: '2024-03-18', addresses: ['88 Market Street, San Francisco, CA 94105'], notes: 'Often buys moisturizers and sunscreen.', wishlist: [3, 11] },
  { id: 3, name: 'Emma Williams', email: 'emma.w@email.com', phone: '+1 (555) 410-3377', status: 'Active', registrationDate: '2024-05-22', addresses: ['442 Rose Ave, Austin, TX 78701'], notes: 'Interested in anti-aging products.', wishlist: [5, 14] },
];

const makeOrder = (id: number, customer: Customer, productIds: number[], status: Order['orderStatus']): Order => {
  const items = productIds.map((productId, index) => {
    const product = initialProducts.find(item => item.id === productId) || initialProducts[0];
    return { productId: product.id, name: product.name, image: product.image, quantity: index + 1, unitPrice: product.price };
  });
  const subtotal = Number(items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0).toFixed(2));
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = Number((subtotal * 0.08).toFixed(2));
  const total = Number((subtotal + shipping + tax).toFixed(2));
  return {
    id,
    orderNumber: `GS-${new Date().getFullYear()}-${String(id).padStart(4, '0')}`,
    customerId: customer.id,
    customer: customer.name,
    email: customer.email,
    date: `2026-07-${String(10 + id).padStart(2, '0')}`,
    items,
    subtotal,
    shipping,
    tax,
    discount: 0,
    total,
    paymentStatus: status === 'Pending' ? 'Pending' : 'Paid',
    orderStatus: status,
    shippingStatus: status === 'Delivered' ? 'Delivered' : status === 'Shipped' ? 'Shipped' : 'Pending',
    shippingAddress: customer.addresses[0],
    billingAddress: customer.addresses[0],
    paymentMethod: 'Mock credit card',
    shippingMethod: subtotal > 50 ? 'Free standard shipping' : 'Standard shipping',
    notes: [],
    timeline: [`Order created on 2026-07-${String(10 + id).padStart(2, '0')}`, `Status set to ${status}`],
  };
};

const initialOrders = [
  makeOrder(1, initialCustomers[0], [2, 3], 'Delivered'),
  makeOrder(2, initialCustomers[1], [11, 6], 'Shipped'),
  makeOrder(3, initialCustomers[2], [5, 14], 'Processing'),
  makeOrder(4, initialCustomers[0], [1, 8, 12], 'Pending'),
];

const initialReviews: Review[] = [
  { id: 1, customer: 'Sarah Johnson', productId: 2, product: 'Vitamin C Brightening Serum', rating: 5, review: 'Dark spots faded faster than I expected, and the texture is beautiful.', date: '2026-07-01', status: 'Approved' },
  { id: 2, customer: 'Michael Chen', productId: 3, product: 'Ultra Hydrating Moisturizer', rating: 5, review: 'Hydrating without any greasy finish. Easy reorder.', date: '2026-07-03', status: 'Approved' },
  { id: 3, customer: 'Emma Williams', productId: 5, product: 'Retinol Night Repair Cream', rating: 4, review: 'Visible smoothing after two weeks. I started slowly and had no irritation.', date: '2026-07-07', status: 'Pending' },
];

const initialCoupons: Coupon[] = [
  { id: 1, code: 'GLOW20', discountType: 'Percentage', discountValue: 20, minimumOrder: 50, maximumDiscount: 40, startDate: '2026-01-01', endDate: '2026-12-31', usageLimit: 500, usagePerCustomer: 2, applicableProducts: [], applicableCategories: [], active: true, timesUsed: 128, totalDiscountGiven: 1864, revenueGenerated: 9320 },
  { id: 2, code: 'SERUM10', discountType: 'Fixed Amount', discountValue: 10, minimumOrder: 35, startDate: '2026-06-01', endDate: '2026-09-01', usageLimit: 200, usagePerCustomer: 1, applicableProducts: [], applicableCategories: ['Serums'], active: true, timesUsed: 42, totalDiscountGiven: 420, revenueGenerated: 2100 },
];

const initialBundles: Bundle[] = [
  { id: 1, name: 'Complete Skincare Set', image: initialProducts[1].image, includedProducts: [1, 2, 3, 11], originalTotalPrice: 122.96, bundlePrice: 99.99, discountPercentage: 19, stock: 36, description: 'A complete morning routine for cleansed, bright, protected skin.', status: 'Active', startDate: '2026-01-01', endDate: '2026-12-31' },
  { id: 2, name: 'Anti-Aging Bundle', image: initialProducts[4].image, includedProducts: [5, 12, 14], originalTotalPrice: 147.97, bundlePrice: 119.99, discountPercentage: 19, stock: 18, description: 'Retinol, peptides, and eye renewal in one routine.', status: 'Active', startDate: '2026-01-01', endDate: '2026-12-31' },
];

const initialBlogPosts: BlogPost[] = [
  { id: 1, title: 'Ten Steps to a Morning Routine That Actually Works', slug: 'morning-skincare-routine', featuredImage: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=1200', excerpt: 'Layering order, timing, and the two steps most people skip.', content: 'Start with a gentle cleanse, layer water-based serums first, seal hydration, and finish with SPF. The most effective routine is consistent, simple, and matched to your skin type.', author: 'Dr. Lena Hart', category: 'Routine', tags: ['routine', 'spf', 'serum'], status: 'Published', publishDate: '2026-07-02', seoTitle: 'Morning Skincare Routine | GlowSkin', seoDescription: 'A simple morning skincare routine that works.' },
  { id: 2, title: 'Understanding Your Skin Type', slug: 'understanding-your-skin-type', featuredImage: 'https://images.pexels.com/photos/5240814/pexels-photo-5240814.jpeg?auto=compress&cs=tinysrgb&w=1200', excerpt: 'A five-minute test to identify what your skin actually needs.', content: 'Observe your skin after cleansing and waiting thirty minutes. Tightness, shine, and sensitivity cues can help you choose textures and actives with less guesswork.', author: 'Maya Brooks', category: 'Basics', tags: ['skin type', 'basics'], status: 'Published', publishDate: '2026-07-08', seoTitle: 'How to Find Your Skin Type', seoDescription: 'Learn how to identify your skin type.' },
  { id: 3, title: 'Retinol Without the Redness', slug: 'retinol-without-redness', featuredImage: 'https://images.pexels.com/photos/7428104/pexels-photo-7428104.jpeg?auto=compress&cs=tinysrgb&w=1200', excerpt: 'How to build tolerance without derailing your barrier.', content: 'Use a pea-sized amount two nights a week, avoid layering strong exfoliants on the same night, and moisturize generously.', author: 'Dr. Lena Hart', category: 'Anti-Aging', tags: ['retinol', 'barrier'], status: 'Published', publishDate: '2026-07-11', seoTitle: 'Retinol Without Irritation', seoDescription: 'How to use retinol more comfortably.' },
];

const initialData: StoreData = {
  products: initialProducts,
  categories: initialCategories,
  brands: initialBrands,
  customers: initialCustomers,
  orders: initialOrders,
  reviews: initialReviews,
  coupons: initialCoupons,
  bundles: initialBundles,
  blogPosts: initialBlogPosts,
  messages: [
    { id: 1, senderName: 'Ava Reed', email: 'ava@example.com', phone: '+1 (555) 884-2020', subject: 'Sensitive skin recommendation', message: 'Can you recommend a routine for sensitive dry skin?', date: today, status: 'New' },
  ],
  subscribers: [
    { id: 1, email: 'sarah.j@email.com', subscriptionDate: '2026-06-18', status: 'Active', source: 'Homepage' },
    { id: 2, email: 'skinlab@example.com', subscriptionDate: '2026-07-04', status: 'Active', source: 'Footer' },
  ],
  notifications: [
    { id: 1, type: 'New Order', title: 'New checkout order', body: 'GS-2026-0004 is waiting for confirmation.', date: today, read: false },
    { id: 2, type: 'Low Stock', title: 'Low stock alert', body: 'Exfoliating Clay Mask needs replenishment.', date: today, read: false },
    { id: 3, type: 'Contact Message', title: 'New support message', body: 'Ava Reed asked for a sensitive skin routine.', date: today, read: false },
  ],
  activityLog: [
    { id: 1, user: 'System', action: 'Seed Data Loaded', target: 'Store', date: today, ip: '127.0.0.1', details: 'Initial mock data prepared for admin dashboard.' },
  ],
  homeContent: {
    heroSlides: [
      { id: 1, label: 'Vitamin C Concentrate', batch: 'N 02', title: 'Skin, formulated like it matters.', subtitle: 'Dermatologist-built actives in doses that actually work.', image: initialProducts[1].image, ctaText: 'Shop the Serum', ctaLink: '/products?category=Serums', order: 1, active: true },
      { id: 2, label: 'Ceramide Barrier Cream', batch: 'N 05', title: 'Twenty-four hours of quiet repair.', subtitle: 'A weightless moisture barrier built on hyaluronic acid and ceramides.', image: initialProducts[2].image, ctaText: 'Shop Moisturizers', ctaLink: '/products?category=Moisturizers', order: 2, active: true },
      { id: 3, label: 'Retinol Night Repair', batch: 'N 08', title: 'While you sleep, it gets to work.', subtitle: 'Retinol and peptides, dosed for real results without the redness.', image: initialProducts[4].image, ctaText: 'Shop Night Care', ctaLink: '/products?category=Moisturizers', order: 3, active: true },
    ],
    newsletter: { title: "Get first access to what we're brewing", description: 'New formulas, ingredient breakdowns, and early access drops straight to your inbox.', buttonText: 'Subscribe', successMessage: 'You are on the GlowSkin list.' },
  },
  aboutContent: {
    story: "GlowSkin was founded in 2020 to make skincare products that are honest about what's in them and effective enough to notice.",
    mission: 'Build dermatologist-tested skincare with clear ingredients and practical routines.',
    vision: 'A bathroom shelf where every formula has a reason to be there.',
    values: [
      { title: 'Dosed, not diluted', text: 'Active ingredients at concentrations that are clinically useful.' },
      { title: 'Clean by default', text: 'No parabens, sulfates, or synthetic fragrance.' },
      { title: 'Dermatologist tested', text: 'Every formula is reviewed before it reaches a shelf.' },
      { title: 'Small batches', text: 'Fresh production keeps formulas moving quickly.' },
    ],
    stats: [
      { value: '2020', label: 'Founded' },
      { value: '16', label: 'Active formulas' },
      { value: '50K+', label: 'Customers' },
      { value: '100%', label: 'Cruelty-free' },
    ],
  },
  faqs: [
    { id: 1, question: 'How long does shipping take?', answer: 'Standard shipping takes 3-5 business days within the continental US. Orders over $50 ship free.', category: 'Shipping', order: 1, active: true },
    { id: 2, question: 'What is your return policy?', answer: "We offer a 30-day money-back guarantee. If a formula is not right for your skin, contact us for a refund.", category: 'Orders', order: 2, active: true },
    { id: 3, question: 'Are your products cruelty-free?', answer: 'Yes. None of our products or ingredients are tested on animals.', category: 'Products', order: 3, active: true },
    { id: 4, question: 'How do I know which products are right for my skin?', answer: 'Every product page lists compatible skin types and key benefits. You can also send us a message for help.', category: 'Products', order: 4, active: true },
  ],
  settings: {
    storeName: 'GlowSkin',
    email: 'support@glowskin.com',
    phone: '+1 (555) 123-4567',
    address: '123 Beauty Lane, Los Angeles, CA 90001',
    currency: 'USD',
    language: 'English',
    timezone: 'America/Los_Angeles',
    shippingCost: 5.99,
    freeShippingMinimum: 50,
    taxEnabled: true,
    taxPercentage: 8,
    social: { facebook: '#', instagram: '#', tiktok: '#', x: '#', youtube: '#' },
  },
};

const loadInitialData = (): StoreData => {
  const saved = localStorage.getItem('glowskinStoreData');
  if (!saved) return initialData;
  try {
    return { ...initialData, ...JSON.parse(saved) };
  } catch {
    return initialData;
  }
};

export const StoreDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<StoreData>(loadInitialData);

  useEffect(() => {
    localStorage.setItem('glowskinStoreData', JSON.stringify(data));
  }, [data]);

  const nextId = <T extends { id: number }>(items: T[]) => Math.max(0, ...items.map(item => item.id)) + 1;

  const logActivity = (action: string, target: string, details: string) => {
    setData(prev => ({
      ...prev,
      activityLog: [{ id: nextId(prev.activityLog), user: 'Admin', action, target, date: new Date().toISOString().slice(0, 16).replace('T', ' '), ip: '127.0.0.1', details }, ...prev.activityLog],
    }));
  };

  const saveProduct = (product: Product) => {
    const stock = product.stock ?? 0;
    const normalized: Product = {
      ...product,
      id: product.id || nextId(data.products),
      slug: product.slug || slugify(product.name),
      sku: product.sku || `GS-${String(product.id || nextId(data.products)).padStart(4, '0')}`,
      stock,
      stockStatus: stock <= 0 ? 'Out of Stock' : stock <= (product.lowStockAlert ?? 10) ? 'Low Stock' : 'In Stock',
      createdDate: product.createdDate || new Date().toISOString().slice(0, 10),
    };
    setData(prev => ({
      ...prev,
      products: prev.products.some(item => item.id === normalized.id)
        ? prev.products.map(item => item.id === normalized.id ? normalized : item)
        : [normalized, ...prev.products],
    }));
    logActivity(product.id ? 'Product Updated' : 'Product Created', normalized.name, `${normalized.name} saved as ${normalized.status}.`);
    return normalized;
  };

  const deleteProduct = (id: number) => {
    const product = data.products.find(item => item.id === id);
    setData(prev => ({ ...prev, products: prev.products.filter(item => item.id !== id) }));
    logActivity('Product Deleted', product?.name || `Product ${id}`, 'Product removed from catalog.');
  };

  const duplicateProduct = (id: number) => {
    const product = data.products.find(item => item.id === id);
    if (!product) return;
    saveProduct({ ...product, id: 0, name: `${product.name} Copy`, sku: undefined, slug: undefined, status: 'Draft' });
  };

  const updateProductStock = (id: number, stock: number, reason: string) => {
    setData(prev => ({
      ...prev,
      products: prev.products.map(product => product.id === id ? {
        ...product,
        stock,
        stockStatus: stock <= 0 ? 'Out of Stock' : stock <= (product.lowStockAlert ?? 10) ? 'Low Stock' : 'In Stock',
      } : product),
    }));
    logActivity('Stock Updated', data.products.find(product => product.id === id)?.name || `Product ${id}`, reason);
  };

  const saveCategory = (category: Category) => {
    const normalized = { ...category, id: category.id || nextId(data.categories), slug: category.slug || slugify(category.name) };
    setData(prev => ({ ...prev, categories: prev.categories.some(item => item.id === normalized.id) ? prev.categories.map(item => item.id === normalized.id ? normalized : item) : [...prev.categories, normalized] }));
    logActivity('Category Saved', normalized.name, 'Category settings updated.');
  };

  const deleteCategory = (id: number) => setData(prev => ({ ...prev, categories: prev.categories.filter(item => item.id !== id) }));

  const saveBrand = (brand: Brand) => {
    const normalized = { ...brand, id: brand.id || nextId(data.brands), slug: brand.slug || slugify(brand.name) };
    setData(prev => ({ ...prev, brands: prev.brands.some(item => item.id === normalized.id) ? prev.brands.map(item => item.id === normalized.id ? normalized : item) : [...prev.brands, normalized] }));
    logActivity('Brand Saved', normalized.name, 'Brand settings updated.');
  };

  const deleteBrand = (id: number) => setData(prev => ({ ...prev, brands: prev.brands.filter(item => item.id !== id) }));

  const saveOrder = (order: Order) => {
    setData(prev => ({ ...prev, orders: prev.orders.map(item => item.id === order.id ? order : item) }));
    logActivity('Order Updated', order.orderNumber, `Order status changed to ${order.orderStatus}.`);
  };

  const createOrderFromCart = (payload: Omit<Order, 'id' | 'orderNumber' | 'date' | 'timeline'>) => {
    const id = nextId(data.orders);
    const order: Order = {
      ...payload,
      id,
      orderNumber: `GS-${new Date().getFullYear()}-${String(id).padStart(4, '0')}`,
      date: new Date().toISOString().slice(0, 10),
      timeline: ['Order created from checkout', `Payment status: ${payload.paymentStatus}`],
    };
    setData(prev => ({
      ...prev,
      orders: [order, ...prev.orders],
      notifications: [{ id: nextId(prev.notifications), type: 'New Order', title: 'New checkout order', body: `${order.orderNumber} was created.`, date: new Date().toISOString().slice(0, 10), read: false }, ...prev.notifications],
      products: prev.products.map(product => {
        const item = order.items.find(orderItem => orderItem.productId === product.id);
        if (!item) return product;
        const stock = Math.max(0, (product.stock ?? 0) - item.quantity);
        return { ...product, stock, stockStatus: stock <= 0 ? 'Out of Stock' : stock <= (product.lowStockAlert ?? 10) ? 'Low Stock' : 'In Stock' };
      }),
    }));
    return order;
  };

  const saveCustomer = (customer: Customer) => setData(prev => ({ ...prev, customers: prev.customers.some(item => item.id === customer.id) ? prev.customers.map(item => item.id === customer.id ? customer : item) : [...prev.customers, { ...customer, id: nextId(prev.customers) }] }));
  const saveReview = (review: Review) => setData(prev => ({ ...prev, reviews: prev.reviews.some(item => item.id === review.id) ? prev.reviews.map(item => item.id === review.id ? review : item) : [...prev.reviews, { ...review, id: nextId(prev.reviews) }] }));
  const deleteReview = (id: number) => setData(prev => ({ ...prev, reviews: prev.reviews.filter(item => item.id !== id) }));
  const saveCoupon = (coupon: Coupon) => setData(prev => ({ ...prev, coupons: prev.coupons.some(item => item.id === coupon.id) ? prev.coupons.map(item => item.id === coupon.id ? coupon : item) : [...prev.coupons, { ...coupon, id: nextId(prev.coupons) }] }));
  const deleteCoupon = (id: number) => setData(prev => ({ ...prev, coupons: prev.coupons.filter(item => item.id !== id) }));

  const validateCoupon = (code: string, subtotal: number) => {
    const coupon = data.coupons.find(item => item.code.toLowerCase() === code.toLowerCase() && item.active);
    if (!coupon || subtotal < coupon.minimumOrder) return null;
    const raw = coupon.discountType === 'Percentage' ? subtotal * (coupon.discountValue / 100) : coupon.discountValue;
    const discount = Number(Math.min(raw, coupon.maximumDiscount || raw).toFixed(2));
    return { coupon, discount };
  };

  const saveBundle = (bundle: Bundle) => setData(prev => ({ ...prev, bundles: prev.bundles.some(item => item.id === bundle.id) ? prev.bundles.map(item => item.id === bundle.id ? bundle : item) : [...prev.bundles, { ...bundle, id: nextId(prev.bundles) }] }));
  const saveBlogPost = (post: BlogPost) => setData(prev => ({ ...prev, blogPosts: prev.blogPosts.some(item => item.id === post.id) ? prev.blogPosts.map(item => item.id === post.id ? post : item) : [{ ...post, id: nextId(prev.blogPosts) }, ...prev.blogPosts] }));
  const deleteBlogPost = (id: number) => setData(prev => ({ ...prev, blogPosts: prev.blogPosts.filter(item => item.id !== id) }));

  const saveMessage = (message: ContactMessage) => setData(prev => ({
    ...prev,
    messages: [{ ...message, id: nextId(prev.messages) }, ...prev.messages],
    notifications: [{ id: nextId(prev.notifications), type: 'Contact Message', title: 'New contact message', body: message.subject, date: message.date, read: false }, ...prev.notifications],
  }));
  const updateMessageStatus = (id: number, status: ContactMessage['status']) => setData(prev => ({ ...prev, messages: prev.messages.map(item => item.id === id ? { ...item, status } : item) }));
  const saveSubscriber = (email: string, source: string) => setData(prev => prev.subscribers.some(item => item.email.toLowerCase() === email.toLowerCase()) ? prev : ({ ...prev, subscribers: [{ id: nextId(prev.subscribers), email, subscriptionDate: new Date().toISOString().slice(0, 10), status: 'Active', source }, ...prev.subscribers] }));
  const updateNotification = (id: number, read: boolean) => setData(prev => ({ ...prev, notifications: prev.notifications.map(item => item.id === id ? { ...item, read } : item) }));
  const markAllNotificationsRead = () => setData(prev => ({ ...prev, notifications: prev.notifications.map(item => ({ ...item, read: true })) }));
  const updateHomeContent = (homeContent: HomeContent) => setData(prev => ({ ...prev, homeContent }));
  const updateAboutContent = (aboutContent: AboutContent) => setData(prev => ({ ...prev, aboutContent }));
  const saveFaq = (faq: StoreData['faqs'][number]) => setData(prev => ({ ...prev, faqs: prev.faqs.some(item => item.id === faq.id) ? prev.faqs.map(item => item.id === faq.id ? faq : item) : [...prev.faqs, { ...faq, id: nextId(prev.faqs) }] }));
  const updateSettings = (settings: StoreSettings) => setData(prev => ({ ...prev, settings }));

  const value: StoreDataContextType = {
    ...data,
    setProducts: updater => setData(prev => ({ ...prev, products: typeof updater === 'function' ? updater(prev.products) : updater })),
    saveProduct,
    deleteProduct,
    duplicateProduct,
    updateProductStock,
    saveCategory,
    deleteCategory,
    saveBrand,
    deleteBrand,
    saveOrder,
    createOrderFromCart,
    saveCustomer,
    saveReview,
    deleteReview,
    saveCoupon,
    deleteCoupon,
    validateCoupon,
    saveBundle,
    saveBlogPost,
    deleteBlogPost,
    saveMessage,
    updateMessageStatus,
    saveSubscriber,
    updateNotification,
    markAllNotificationsRead,
    updateHomeContent,
    updateAboutContent,
    saveFaq,
    updateSettings,
    logActivity,
  };

  return <StoreDataContext.Provider value={value}>{children}</StoreDataContext.Provider>;
};

export const useStoreData = () => {
  const context = useContext(StoreDataContext);
  if (!context) throw new Error('useStoreData must be used within StoreDataProvider');
  return context;
};
