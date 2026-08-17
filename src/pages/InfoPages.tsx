import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MailIcon, PhoneIcon, MapPinIcon, ChevronDownIcon, FlaskConicalIcon, LeafIcon, ShieldCheckIcon, PackageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { useStoreData } from '../context/StoreDataContext';
import { useToast } from '../context/ToastContext';

const values = [
  { icon: FlaskConicalIcon, title: 'Dosed, not diluted', text: 'Active ingredients at concentrations that are actually clinically effective.' },
  { icon: LeafIcon, title: 'Clean by default', text: 'No parabens, sulfates, or synthetic fragrance. Ever.' },
  { icon: ShieldCheckIcon, title: 'Dermatologist tested', text: 'Every formula is tested before it reaches a shelf.' },
  { icon: PackageIcon, title: 'Small batches', text: 'Formulated in small runs so nothing sits in a warehouse.' },
];

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard shipping takes 3–5 business days within the continental US. Orders over $50 ship free. Expedited options are available at checkout.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day money-back guarantee on all products. If a formula isn’t right for your skin, contact us for a full refund — no questions asked.' },
  { q: 'Are your products cruelty-free?', a: 'Yes, always. None of our products or ingredients are tested on animals, and we’re proud to be certified cruelty-free.' },
  { q: 'How do I know which products are right for my skin?', a: 'Every product page lists compatible skin types and key benefits. If you’re unsure, our contact form connects you with a real formulator, not a bot.' },
  { q: 'Do you ship internationally?', a: 'Currently we ship within the United States and Canada. We’re working on expanding — join the newsletter for updates.' },
];

const AboutPage: React.FC = () => {
  const { aboutContent } = useStoreData();
  return <div>
    <section className="relative bg-espresso text-porcelain-paper min-h-[60vh] flex items-end overflow-hidden">
      <img
        src="https://images.pexels.com/photos/7428104/pexels-photo-7428104.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="Unlabeled skincare bottles being formulated in the studio"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-espresso/10" />
      <div className="container-custom relative pt-40 pb-16">
        <span className="label-tag text-copper-glow">Since 2020</span>
        <h1 className="text-display-1 font-display font-semibold mt-3 max-w-2xl">
          Formulated with intention.
        </h1>
      </div>
    </section>

    <section className="py-24 bg-porcelain-paper">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 mb-20">
          <div className="lg:col-span-7">
            <span className="eyebrow-mono">Our story</span>
            <h2 className="text-display-3 font-display font-semibold text-ink mt-2 mb-6">
              Effective skincare shouldn't require a chemistry degree to understand.
            </h2>
            <div className="space-y-4 text-ink-muted leading-relaxed max-w-2xl">
              <p>{aboutContent.story}</p>
              <p>{aboutContent.mission}</p>
              <p>{aboutContent.vision}</p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden aspect-[4/5]">
              <img
                src="https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="A GlowSkin serum bottle beside fresh botanicals"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-y border-porcelain-line mb-20">
            {aboutContent.stats.map(stat => (
              <div key={stat.label} className="text-center md:text-left">
                <div className="font-mono text-3xl sm:text-4xl text-copper tabular mb-1">{stat.value}</div>
                <div className="text-ink-muted text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <div className="mb-4">
          <span className="eyebrow-mono">What we stand for</span>
          <h2 className="text-display-3 font-display font-semibold text-ink mt-2 mb-10">Four things we won't compromise on</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((value, index) => (
            <AnimatedSection key={value.title} delay={index * 0.08}>
              <div className="bg-porcelain rounded-2xl p-6 h-full">
                <value.icon size={22} className="text-copper mb-4" />
                <h3 className="font-display font-semibold text-ink mb-2">{value.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed">{value.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </div>
};

const ContactPage: React.FC = () => {
  const { saveMessage } = useStoreData();
  const { notify } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.email.includes('@') || !form.subject || !form.message) {
      notify('Please complete the contact form.', 'error');
      return;
    }
    saveMessage({ id: 0, senderName: form.name, email: form.email, phone: '', subject: form.subject, message: form.message, date: new Date().toISOString().slice(0, 10), status: 'New' });
    notify('Message sent to the GlowSkin team.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container-custom pt-32 pb-24">
      <div className="mb-14 max-w-xl">
        <span className="eyebrow-mono">We read everything</span>
        <h1 className="text-display-2 font-display font-semibold text-ink mt-1 mb-3">Get in Touch</h1>
        <p className="text-ink-muted">Questions about a formula, an order, or a partnership - a real person replies within one business day.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-5">
          {[
            { icon: MailIcon, title: 'Email', text: 'support@glowskin.com' },
            { icon: PhoneIcon, title: 'Phone', text: '+1 (555) 123-4567' },
            { icon: MapPinIcon, title: 'Studio', text: '123 Beauty Lane, Los Angeles, CA 90001' },
          ].map(item => (
            <div key={item.title} className="flex items-start gap-4 bg-porcelain-paper border border-porcelain-line rounded-xl p-5">
              <div className="w-10 h-10 rounded-full bg-copper/10 flex items-center justify-center shrink-0">
                <item.icon size={17} className="text-copper" />
              </div>
              <div>
                <h3 className="font-medium text-ink text-sm mb-0.5">{item.title}</h3>
                <p className="text-ink-muted text-sm">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-7">
          <form className="bg-porcelain-paper border border-porcelain-line rounded-2xl p-7 space-y-4" onSubmit={submit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-ink-muted mb-2 block">Name</label>
                <input type="text" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} className="input" placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm text-ink-muted mb-2 block">Email</label>
                <input type="email" value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))} className="input" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="text-sm text-ink-muted mb-2 block">Subject</label>
              <input type="text" value={form.subject} onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))} className="input" placeholder="How can we help?" />
            </div>
            <div>
              <label className="text-sm text-ink-muted mb-2 block">Message</label>
              <textarea value={form.message} onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))} className="input min-h-[150px] resize-none" placeholder="Your message" />
            </div>
            <Button fullWidth type="submit">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
};
const FaqPage: React.FC = () => {
  const { faqs: managedFaqs } = useStoreData();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const activeFaqs = managedFaqs.filter(faq => faq.active).sort((a, b) => a.order - b.order);
  return (
    <div className="container-custom pt-32 pb-24 max-w-3xl">
      <div className="mb-12 text-center">
        <span className="eyebrow-mono">Common questions</span>
        <h1 className="text-display-2 font-display font-semibold text-ink mt-1">Frequently Asked Questions</h1>
      </div>
      <div className="divide-y divide-porcelain-line border-y border-porcelain-line">
        {(activeFaqs.length ? activeFaqs : faqs).map((faq, index) => {
          const open = openIndex === index;
          return (
            <div key={faq.q}>
              <button
                onClick={() => setOpenIndex(open ? null : index)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
                aria-expanded={open}
              >
                <span className={`font-medium transition-colors ${open ? 'text-copper' : 'text-ink'}`}>{faq.q}</span>
                <ChevronDownIcon size={18} className={`shrink-0 text-ink-soft transition-transform duration-300 ${open ? 'rotate-180 text-copper' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-ink-muted leading-relaxed pb-6 max-w-xl">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const InfoPages: React.FC = () => {
  const location = useLocation();
  const page = location.pathname.substring(1);
  if (page === 'about') return <AboutPage />;
  if (page === 'contact') return <ContactPage />;
  if (page === 'faq') return <FaqPage />;
  return null;
};



