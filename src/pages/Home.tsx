import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
  StarIcon,
  QuoteIcon,
  LeafIcon,
  FlaskConicalIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { featuredProducts, products } from '../data/products';

const heroSlides = [
  {
    label: 'Vitamin C Concentrate',
    batch: 'N°02',
    title: 'Skin, formulated like it matters.',
    subtitle: 'Dermatologist-built actives in doses that actually work — no filler, no guesswork.',
    image: 'https://images.pexels.com/photos/7428104/pexels-photo-7428104.jpeg?auto=compress&cs=tinysrgb&w=1200',
    cta: 'Shop the Serum',
  },
  {
    label: 'Ceramide Barrier Cream',
    batch: 'N°05',
    title: 'Twenty-four hours of quiet repair.',
    subtitle: 'A weightless moisture barrier built on hyaluronic acid and ceramides — no greasy finish.',
    image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=1200',
    cta: 'Shop Moisturizers',
  },
  {
    label: 'Retinol Night Repair',
    batch: 'N°.5',
    title: 'While you sleep, it gets to work.',
    subtitle: '0.5% retinol and peptides, dosed for real results without the redness.',
    image: 'https://images.pexels.com/photos/4041279/pexels-photo-4041279.jpeg?auto=compress&cs=tinysrgb&w=1200',
    cta: 'Shop Night Care',
  },
];

const categories = [
  { name: 'Cleansers', image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=800', span: 'col-span-2 row-span-2' },
  { name: 'Serums', image: 'https://images.pexels.com/photos/7428104/pexels-photo-7428104.jpeg?auto=compress&cs=tinysrgb&w=600', span: 'col-span-1 row-span-1' },
  { name: 'Moisturizers', image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=600', span: 'col-span-1 row-span-1' },
  { name: 'Masks', image: 'https://images.pexels.com/photos/7428102/pexels-photo-7428102.jpeg?auto=compress&cs=tinysrgb&w=600', span: 'col-span-1 row-span-1' },
  { name: 'Sunscreen', image: 'https://images.pexels.com/photos/7428094/pexels-photo-7428094.jpeg?auto=compress&cs=tinysrgb&w=600', span: 'col-span-1 row-span-1' },
  { name: 'Eye Care', image: 'https://images.pexels.com/photos/5240814/pexels-photo-5240814.jpeg?auto=compress&cs=tinysrgb&w=800', span: 'col-span-2 row-span-1' },
  { name: 'Treatments', image: 'https://images.pexels.com/photos/6621183/pexels-photo-6621183.jpeg?auto=compress&cs=tinysrgb&w=600', span: 'col-span-1 row-span-1' },
  { name: 'Toners', image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600', span: 'col-span-1 row-span-1' },
];

const deals = [
  { title: 'Complete Skincare Set', discount: '25% OFF', price: '$149.99', originalPrice: '$199.99', description: '6-piece daily routine, formulated to layer' },
  { title: 'Anti-Aging Bundle', discount: '30% OFF', price: '$179.99', originalPrice: '$257.99', description: 'Retinol, peptides, and collagen support' },
  { title: 'Hydration Collection', discount: '20% OFF', price: '$119.99', originalPrice: '$149.99', description: 'Three-step moisture-barrier routine' },
];

const testimonials = [
  { name: 'Sarah Johnson', rating: 5, review: 'The Vitamin C serum completely changed my skin. Dark spots faded in three weeks — I keep three bottles in rotation now.', product: 'Vitamin C Brightening Serum', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { name: 'Michael Chen', rating: 5, review: 'Best moisturizer I’ve used. My skin stays hydrated all day without ever feeling greasy or heavy.', product: 'Ultra Hydrating Moisturizer', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { name: 'Emma Williams', rating: 5, review: 'The retinol cream is the real deal. Fine lines are visibly softer, and my texture has never been smoother.', product: 'Retinol Night Repair Cream', image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150' },
];

const articles = [
  { title: 'Ten Steps to a Morning Routine That Actually Works', category: 'Routine', image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=900', excerpt: 'Layering order, timing, and the two steps most people skip.', big: true },
  { title: 'Understanding Your Skin Type', category: 'Basics', image: 'https://images.pexels.com/photos/5240814/pexels-photo-5240814.jpeg?auto=compress&cs=tinysrgb&w=600', excerpt: 'A five-minute test to identify what your skin actually needs.' },
  { title: 'Retinol Without the Redness', category: 'Anti-Aging', image: 'https://images.pexels.com/photos/7428104/pexels-photo-7428104.jpeg?auto=compress&cs=tinysrgb&w=600', excerpt: 'How to build tolerance without derailing your barrier.' },
];

const brands = ['PureGlow', 'RadiantSkin', 'Hydraluxe', 'AgelessBeauty', 'ClearBalance', 'NightRevive', 'PureEarth'];

export const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % heroSlides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  const slide = heroSlides[currentSlide];

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative bg-espresso text-porcelain-paper overflow-hidden min-h-[92vh] flex items-center">
        <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
        <div className="absolute top-[-10%] right-[-5%] w-[38rem] h-[38rem] rounded-full bg-copper/20 blur-[110px] animate-drift" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[30rem] h-[30rem] rounded-full bg-sage/10 blur-[110px]" />

        <div className="container-custom relative z-10 pt-28 pb-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div key={currentSlide} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="label-tag text-copper-glow border border-copper-glow/30 rounded-full px-3 py-1">{slide.batch}</span>
                    <span className="text-porcelain-paper/50 text-sm">{slide.label}</span>
                  </div>
                  <h1 className="text-display-1 font-display font-semibold mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-porcelain-paper/65 max-w-md mb-9 leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/products">
                      <Button size="lg">{slide.cta}</Button>
                    </Link>
                    <Link to="/about">
                      <Button variant="outlineLight" size="lg">Our Formulas</Button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-16 pt-8 border-t border-porcelain-paper/10">
                {[
                  { icon: FlaskConicalIcon, text: '98% natural-origin actives' },
                  { icon: ShieldCheckIcon, text: 'Dermatologist tested' },
                  { icon: LeafIcon, text: 'Cruelty-free, always' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-porcelain-paper/55 text-sm">
                    <Icon size={16} className="text-copper-glow" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <motion.div
                  className="relative rounded-[2rem] overflow-hidden border border-porcelain-paper/10 shadow-glow-lg animate-float"
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img src={slide.image} alt={slide.label} className="w-full h-[430px] sm:h-[520px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute -left-6 bottom-8 glass-dark border border-porcelain-paper/10 rounded-xl px-4 py-3 max-w-[13rem] shadow-glow hidden sm:block"
                >
                  <span className="label-tag text-copper-glow block mb-1">{slide.batch} — {slide.label}</span>
                  <span className="text-porcelain-paper/70 text-xs">Formulated in small batches, shipped fresh.</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 lg:right-12 z-10 flex items-center gap-4">
          <span className="font-mono text-xs text-porcelain-paper/40 tabular">
            0{currentSlide + 1} / 0{heroSlides.length}
          </span>
          <div className="flex gap-2">
            <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-porcelain-paper/20 hover:border-copper-glow hover:text-copper-glow flex items-center justify-center transition-colors" aria-label="Previous slide">
              <ChevronLeftIcon size={18} />
            </button>
            <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-porcelain-paper/20 hover:border-copper-glow hover:text-copper-glow flex items-center justify-center transition-colors" aria-label="Next slide">
              <ChevronRightIcon size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ============ MARQUEE STRIP ============ */}
      <section className="bg-copper text-porcelain-paper py-3.5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center shrink-0">
              {['New Year Sale — up to 30% off', 'Free shipping over $50', '100% satisfaction guaranteed', 'Small-batch formulation'].map((t, i) => (
                <div key={i} className="flex items-center gap-8 px-8 font-medium text-sm">
                  <span>{t}</span>
                  <span className="opacity-50">✦</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============ CATEGORIES (BENTO) ============ */}
      <section className="py-24 bg-porcelain">
        <div className="container-custom">
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <h2 className="text-display-2 font-display font-semibold text-ink max-w-lg">
                Shop by category
              </h2>
              <Link to="/products" className="inline-flex items-center gap-2 text-ink font-medium hover:text-copper transition-colors group shrink-0">
                Browse everything
                <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-4 grid-flow-row-dense auto-rows-[150px] sm:auto-rows-[170px] gap-4">
            {categories.map((category, index) => (
              <AnimatedSection key={category.name} delay={index * 0.06} className={category.span}>
                <Link to={`/products?category=${category.name}`} className="group relative overflow-hidden rounded-2xl h-full block">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-700 ease-expo group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent" />
                  <div className="absolute inset-0 flex items-end p-5">
                    <div>
                      <h3 className="text-lg font-display font-semibold text-porcelain-paper mb-1">{category.name}</h3>
                      <span className="inline-flex items-center text-porcelain-paper/70 text-xs opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                        Shop now <ArrowRightIcon size={12} className="ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BEST SELLERS ============ */}
      <section className="py-24 bg-porcelain-paper">
        <div className="container-custom">
          <AnimatedSection>
            <ProductGrid products={featuredProducts} title="Best Sellers" eyebrow="Reordered the most" />
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <div className="text-center mt-14">
              <Link to="/products">
                <Button variant="outline">View All Products</Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ NEW ARRIVALS (SHELF) ============ */}
      <section className="py-24 bg-porcelain overflow-hidden">
        <div className="container-custom mb-10">
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <span className="eyebrow-mono">Fresh off the line</span>
                <h2 className="text-display-2 font-display font-semibold text-ink mt-1">New Arrivals</h2>
              </div>
              <p className="text-ink-muted max-w-sm">Scroll the shelf — the newest formulas land here first.</p>
            </div>
          </AnimatedSection>
        </div>
        <div className="container-custom">
          <div className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
            {products.filter(p => p.isNew).map((product, i) => (
              <div key={product.id} className="w-[240px] sm:w-[270px] shrink-0 snap-start">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DEALS ============ */}
      <section className="py-24 bg-espresso text-porcelain-paper relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />
        <div className="container-custom relative">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="eyebrow-mono">Limited time</span>
              <h2 className="text-display-2 font-display font-semibold mt-2 mb-3">Bundle & Save</h2>
              <p className="text-porcelain-paper/60 max-w-xl mx-auto">Pre-formulated routines, discounted for committing to the full regimen.</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deals.map((deal, index) => (
              <AnimatedSection key={deal.title} delay={index * 0.12}>
                <motion.div
                  className="relative bg-espresso-2 border border-porcelain-paper/10 rounded-2xl p-7 hover:border-copper/40 transition-colors duration-300"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="absolute -top-3 left-7 bg-copper text-porcelain-paper label-tag px-3 py-1.5 rounded-full">
                    {deal.discount}
                  </div>
                  <h3 className="text-xl font-display font-semibold mt-3 mb-2">{deal.title}</h3>
                  <p className="text-porcelain-paper/55 text-sm mb-6">{deal.description}</p>
                  <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-dashed border-porcelain-paper/15">
                    <span className="font-mono text-2xl tabular">{deal.price}</span>
                    <span className="font-mono text-sm line-through text-porcelain-paper/35 tabular">{deal.originalPrice}</span>
                  </div>
                  <Link to="/products">
                    <Button variant="outlineLight" fullWidth>Shop Bundle</Button>
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-24 bg-porcelain-paper">
        <div className="container-custom max-w-4xl">
          <AnimatedSection>
            <QuoteIcon size={40} className="text-copper/30 mb-6" />
          </AnimatedSection>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-display-3 font-display font-medium text-ink leading-snug mb-8 max-w-3xl">
                "{testimonials[activeTestimonial].review}"
              </p>
              <div className="flex items-center gap-3 mb-10">
                <div className="flex">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <StarIcon key={i} size={15} className="fill-copper text-copper" />
                  ))}
                </div>
                <span className="text-ink-muted text-sm">{testimonials[activeTestimonial].product}</span>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center gap-4 pt-8 border-t border-porcelain-line">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActiveTestimonial(i)}
                className="flex items-center gap-3 group"
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className={`w-11 h-11 rounded-full object-cover transition-all duration-300 ${
                    activeTestimonial === i ? 'ring-2 ring-copper ring-offset-2 ring-offset-porcelain-paper' : 'opacity-40 grayscale group-hover:opacity-70'
                  }`}
                />
                <span className={`text-sm font-medium hidden sm:block transition-colors ${activeTestimonial === i ? 'text-ink' : 'text-ink-soft'}`}>
                  {t.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TIPS / BLOG (BENTO) ============ */}
      <section className="py-24 bg-porcelain">
        <div className="container-custom">
          <AnimatedSection>
            <div className="mb-12">
              <span className="eyebrow-mono">From the lab notes</span>
              <h2 className="text-display-2 font-display font-semibold text-ink mt-1">Skincare, Explained</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection className="md:row-span-2">
              <Link to="/blog" className="group relative rounded-2xl overflow-hidden h-full min-h-[320px] block">
                <img src={articles[0].image} alt={articles[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/20 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="label-tag text-copper-glow mb-3">{articles[0].category}</span>
                  <h3 className="text-2xl font-display font-semibold text-porcelain-paper mb-3 max-w-sm">{articles[0].title}</h3>
                  <p className="text-porcelain-paper/65 text-sm max-w-sm mb-4">{articles[0].excerpt}</p>
                  <span className="inline-flex items-center text-porcelain-paper font-medium text-sm">
                    Read the guide <ArrowUpRightIcon size={15} className="ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
            <div className="flex flex-col gap-6">
              {articles.slice(1).map((article, index) => (
                <AnimatedSection key={article.title} delay={index * 0.1}>
                  <Link to="/blog" className="group flex gap-5 items-center bg-porcelain-paper border border-porcelain-line rounded-2xl p-4 hover:border-copper/30 transition-colors">
                    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div>
                      <span className="label-tag text-copper mb-1.5 block">{article.category}</span>
                      <h3 className="font-display font-semibold text-ink leading-snug mb-1 group-hover:text-copper transition-colors">{article.title}</h3>
                      <p className="text-ink-soft text-xs">{article.excerpt}</p>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ BRANDS MARQUEE ============ */}
      <section className="py-16 bg-porcelain-paper border-y border-porcelain-line overflow-hidden">
        <p className="text-center text-ink-soft text-sm mb-8">Trusted by skincare professionals worldwide</p>
        <div className="flex whitespace-nowrap animate-marquee-slow">
          {[...Array(3)].map((_, dup) => (
            <div key={dup} className="flex items-center shrink-0">
              {brands.map(brand => (
                <span key={brand} className="font-display text-2xl font-semibold text-ink/25 px-10">
                  {brand}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <section className="py-28 bg-espresso text-porcelain-paper relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-copper/15 blur-[120px]" />
        <div className="container-custom relative">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-tag text-copper-glow">Join the formulation lab</span>
            <h2 className="text-display-2 font-display font-semibold mt-3 mb-5">
              Get first access to what we’re brewing
            </h2>
            <p className="text-porcelain-paper/60 mb-10">
              New formulas, ingredient breakdowns, and early access drops — straight to your inbox.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address"
                className="flex-grow px-6 py-4 rounded-lg bg-porcelain-paper/5 border border-porcelain-paper/20 text-porcelain-paper placeholder:text-porcelain-paper/35 focus:outline-none focus:border-copper-glow focus:ring-2 focus:ring-copper-glow/20 transition-colors"
              />
              <Button size="lg" className="whitespace-nowrap">Subscribe</Button>
            </form>
            <p className="text-xs text-porcelain-paper/35 mt-5">Join 50,000+ subscribers. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
