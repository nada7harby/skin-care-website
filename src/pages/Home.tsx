import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, SparklesIcon, TruckIcon, ShieldCheckIcon, StarIcon, QuoteIcon, ClockIcon, TagIcon, TrendingUpIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductCard } from '../components/product/ProductCard';
import { Button } from '../components/ui/Button';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { featuredProducts, newArrivals, topSellingProducts, products } from '../data/products';
const heroSlides = [{
  title: 'Radiant Skin, Natural Glow',
  subtitle: 'Discover premium skincare products made with natural ingredients',
  image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=1200',
  cta: 'Shop Now'
}, {
  title: 'New Vitamin C Collection',
  subtitle: 'Brighten your complexion with our advanced formulas',
  image: 'https://images.pexels.com/photos/7428104/pexels-photo-7428104.jpeg?auto=compress&cs=tinysrgb&w=1200',
  cta: 'Explore Collection'
}, {
  title: 'Winter Hydration Essentials',
  subtitle: 'Keep your skin moisturized all season long',
  image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=1200',
  cta: 'Shop Moisturizers'
}];
export const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  return <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="relative bg-primary-light bg-opacity-30 overflow-hidden">
        <div className="relative h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{
            opacity: 0,
            x: 100
          }} animate={{
            opacity: 1,
            x: 0
          }} exit={{
            opacity: 0,
            x: -100
          }} transition={{
            duration: 0.5
          }} className="absolute inset-0">
              <div className="container-custom h-full py-20">
                <div className="flex flex-col md:flex-row items-center h-full">
                  <motion.div className="md:w-1/2 mb-10 md:mb-0 z-10" initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: 0.2,
                  duration: 0.6
                }}>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
                      {heroSlides[currentSlide].title}
                    </h1>
                    <p className="text-lg text-gray-700 mb-8 max-w-md">
                      {heroSlides[currentSlide].subtitle}
                    </p>
                    <div className="flex space-x-4">
                      <Button size="lg">{heroSlides[currentSlide].cta}</Button>
                      <Button variant="outline" size="lg">
                        Learn More
                      </Button>
                    </div>
                  </motion.div>
                  <motion.div className="md:w-1/2" initial={{
                  opacity: 0,
                  scale: 0.95
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} transition={{
                  delay: 0.3,
                  duration: 0.6
                }}>
                    <img src={heroSlides[currentSlide].image} alt={heroSlides[currentSlide].title} className="rounded-lg shadow-lg w-full h-[400px] object-cover" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors z-20" aria-label="Previous slide">
            <ChevronLeftIcon size={24} className="text-primary-dark" />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors z-20" aria-label="Next slide">
            <ChevronRightIcon size={24} className="text-primary-dark" />
          </button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {heroSlides.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-primary-dark w-8' : 'bg-gray-400'}`} aria-label={`Go to slide ${index + 1}`} />)}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <AnimatedSection>
        <section className="bg-primary-dark text-white py-4">
          <div className="container-custom">
            <motion.div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left space-y-2 md:space-y-0" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.6
          }}>
              <div className="flex items-center">
                <SparklesIcon size={20} className="mr-2" />
                <span className="font-medium">
                  New Year Sale: Up to 30% Off
                </span>
              </div>
              <div className="flex items-center">
                <TruckIcon size={20} className="mr-2" />
                <span>Free Shipping on Orders Over $50</span>
              </div>
              <div className="flex items-center">
                <ShieldCheckIcon size={20} className="mr-2" />
                <span>100% Satisfaction Guaranteed</span>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-primary-dark mb-8 text-center">
              Shop By Category
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: 'Cleansers', image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=600' },
              { name: 'Serums', image: 'https://images.pexels.com/photos/7428104/pexels-photo-7428104.jpeg?auto=compress&cs=tinysrgb&w=600' },
              { name: 'Moisturizers', image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=600' },
              { name: 'Masks', image: 'https://images.pexels.com/photos/7428102/pexels-photo-7428102.jpeg?auto=compress&cs=tinysrgb&w=600' },
              { name: 'Sunscreen', image: 'https://images.pexels.com/photos/7428094/pexels-photo-7428094.jpeg?auto=compress&cs=tinysrgb&w=600' },
              { name: 'Eye Care', image: 'https://images.pexels.com/photos/5240814/pexels-photo-5240814.jpeg?auto=compress&cs=tinysrgb&w=600' },
              { name: 'Treatments', image: 'https://images.pexels.com/photos/6621183/pexels-photo-6621183.jpeg?auto=compress&cs=tinysrgb&w=600' },
              { name: 'Toners', image: 'https://images.pexels.com/photos/5029857/pexels-photo-5029857.jpeg?auto=compress&cs=tinysrgb&w=600' }
            ].map((category, index) => <AnimatedSection key={category.name} delay={index * 0.1}>
                <Link to={`/products?category=${category.name}`}>
                  <motion.div className="group relative overflow-hidden rounded-lg shadow-md h-64" whileHover={{
                scale: 1.02
              }} transition={{
                duration: 0.3
              }}>
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {category.name}
                        </h3>
                        <span className="inline-flex items-center text-white text-sm">
                          Shop Now <ArrowRightIcon size={16} className="ml-1" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </AnimatedSection>)}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection>
            <ProductGrid products={featuredProducts} title="Best Sellers" />
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="text-center mt-10">
              <Link to="/products">
                <Button>View All Products</Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <ProductGrid products={newArrivals} title="New Arrivals" />
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="text-center mt-10">
              <Link to="/products">
                <Button>View All Products</Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Top Selling Products Section */}
      <section className="py-16 bg-primary-light bg-opacity-20">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <TrendingUpIcon size={32} className="text-primary-dark mr-3" />
                <h2 className="text-3xl font-bold text-primary-dark">
                  Top Selling Products
                </h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our customers' favorites - these bestselling skincare essentials deliver proven results
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topSellingProducts.slice(0, 4).map((product, index) => (
              <AnimatedSection key={product.id} delay={index * 0.1}>
                <ProductCard product={product} />
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.4}>
            <div className="text-center mt-10">
              <Link to="/products">
                <Button size="lg">View All Best Sellers</Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Promotions / Deals Section */}
      <AnimatedSection>
        <section className="py-16 bg-primary-dark text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary-light rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-light rounded-full translate-x-1/3 translate-y-1/3"></div>
          </div>
          <div className="container-custom relative z-10">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center bg-primary-light bg-opacity-20 px-4 py-2 rounded-full mb-4">
                <TagIcon size={20} className="mr-2" />
                <span className="font-semibold">Limited Time Offer</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">
                Special Holiday Deals
              </h2>
              <p className="text-lg text-primary-light max-w-2xl mx-auto">
                Save up to 30% on premium skincare sets and bundles
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Complete Skincare Set', discount: '25% OFF', price: '$149.99', originalPrice: '$199.99', description: '6-piece daily routine' },
                { title: 'Anti-Aging Bundle', discount: '30% OFF', price: '$179.99', originalPrice: '$257.99', description: 'Professional results at home' },
                { title: 'Hydration Collection', discount: '20% OFF', price: '$119.99', originalPrice: '$149.99', description: 'Ultimate moisture boost' }
              ].map((deal, index) => (
                <motion.div
                  key={index}
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 hover:bg-opacity-20 transition-all duration-300"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-primary-light text-primary-dark px-4 py-2 rounded-full inline-block mb-4 font-bold">
                    {deal.discount}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{deal.title}</h3>
                  <p className="text-primary-light mb-4">{deal.description}</p>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-bold">{deal.price}</span>
                    <span className="text-lg line-through text-gray-400">{deal.originalPrice}</span>
                  </div>
                  <Button variant="secondary" fullWidth>
                    Shop Bundle
                  </Button>
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="inline-flex items-center bg-white bg-opacity-10 px-6 py-3 rounded-full">
                <ClockIcon size={20} className="mr-2" />
                <span>Offer ends in 7 days - Don't miss out!</span>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Testimonials / Reviews Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-dark mb-4">
                What Our Customers Say
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join thousands of satisfied customers who transformed their skin with our products
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                rating: 5,
                review: 'The Vitamin C serum completely changed my skin! Dark spots faded in just 3 weeks. Absolutely love it!',
                product: 'Vitamin C Brightening Serum',
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
              },
              {
                name: 'Michael Chen',
                rating: 5,
                review: 'Best moisturizer I\'ve ever used. My skin stays hydrated all day without feeling greasy.',
                product: 'Ultra Hydrating Moisturizer',
                image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
              },
              {
                name: 'Emma Williams',
                rating: 5,
                review: 'Amazing retinol cream! Fine lines are visibly reduced. Will definitely repurchase!',
                product: 'Retinol Night Repair Cream',
                image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150'
              }
            ].map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 0.15}>
                <motion.div
                  className="bg-primary-light bg-opacity-30 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <QuoteIcon size={32} className="text-primary-dark mb-4 opacity-30" />
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.review}"</p>
                  <div className="flex items-center mt-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div>
                      <p className="font-semibold text-primary-dark">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.product}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Skincare Tips / Blog Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-dark mb-4">
                Skincare Tips & Guides
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Expert advice and tips to help you achieve your best skin yet
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '10 Steps to Perfect Morning Routine',
                category: 'Skincare Routine',
                image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600',
                excerpt: 'Start your day right with these essential skincare steps for glowing, healthy skin.'
              },
              {
                title: 'Understanding Your Skin Type',
                category: 'Skincare Basics',
                image: 'https://images.pexels.com/photos/3738383/pexels-photo-3738383.jpeg?auto=compress&cs=tinysrgb&w=600',
                excerpt: 'Learn how to identify your skin type and choose the right products for your needs.'
              },
              {
                title: 'Anti-Aging Secrets Revealed',
                category: 'Anti-Aging',
                image: 'https://images.pexels.com/photos/7428104/pexels-photo-7428104.jpeg?auto=compress&cs=tinysrgb&w=600',
                excerpt: 'Discover proven ingredients and techniques to maintain youthful, radiant skin.'
              }
            ].map((article, index) => (
              <AnimatedSection key={index} delay={index * 0.15}>
                <Link to="/blog">
                  <motion.div
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary-dark text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-primary-dark mb-3 hover:text-primary-dark/80 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <div className="flex items-center text-primary-dark font-medium">
                        <span>Read More</span>
                        <ArrowRightIcon size={16} className="ml-2" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands Section */}
      <AnimatedSection>
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-dark mb-4">
                Featured Brands
              </h2>
              <p className="text-gray-600">
                Trusted by professionals worldwide
              </p>
            </div>
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {['PureGlow', 'RadiantSkin', 'Hydraluxe', 'AgelessBeauty', 'ClearBalance', 'NightRevive'].map((brand, index) => (
                <motion.div
                  key={brand}
                  className="text-2xl font-bold text-primary-dark opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 0.6, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {brand}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Newsletter Section */}
      <AnimatedSection>
        <section className="py-16 bg-primary-dark text-white">
          <div className="container-custom">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SparklesIcon size={48} className="mx-auto mb-6 text-primary-light" />
              <h2 className="text-4xl font-bold mb-4">
                Join Our Beauty Community
              </h2>
              <p className="text-primary-light text-lg mb-8">
                Subscribe to receive exclusive skincare tips, early access to new products, and special offers delivered to your inbox.
              </p>
              <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-grow px-6 py-4 rounded-lg text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light" 
                />
                <Button variant="secondary" size="lg" className="whitespace-nowrap">
                  Subscribe Now
                </Button>
              </div>
              <p className="text-sm text-primary-light mt-4">
                Join 50,000+ subscribers. Unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </div>;
};