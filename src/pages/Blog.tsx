import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, ArrowUpRightIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useStoreData } from '../context/StoreDataContext';

export const BlogList: React.FC = () => {
  const { blogPosts } = useStoreData();
  const posts = blogPosts.filter(post => post.status === 'Published');

  return (
    <div className="container-custom pt-32 pb-24">
      <div className="mb-12 max-w-2xl">
        <span className="eyebrow-mono">From the lab notes</span>
        <h1 className="text-display-2 font-display font-semibold text-ink mt-1 mb-3">Skincare, Explained</h1>
        <p className="text-ink-muted">Ingredient education, routines, and formula guidance managed from the GlowSkin admin dashboard.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {posts.map((post, index) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className={`group overflow-hidden rounded-2xl border border-porcelain-line bg-porcelain-paper ${index === 0 ? 'md:col-span-2' : ''}`}>
            <div className={index === 0 ? 'aspect-[16/8]' : 'aspect-[4/3]'}>
              <img src={post.featuredImage} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <span className="label-tag text-copper">{post.category}</span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink transition-colors group-hover:text-copper">{post.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink">
                Read guide <ArrowUpRightIcon size={15} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const BlogDetails: React.FC = () => {
  const { slug } = useParams();
  const { blogPosts } = useStoreData();
  const post = blogPosts.find(item => item.slug === slug && item.status === 'Published');

  if (!post) {
    return (
      <div className="container-custom pt-40 pb-24 text-center">
        <h1 className="text-display-3 font-display font-semibold text-ink mb-4">Article Not Found</h1>
        <p className="text-ink-muted mb-8">This article is not published or no longer exists.</p>
        <Link to="/blog"><Button>Back to Blog</Button></Link>
      </div>
    );
  }

  return (
    <article>
      <section className="relative flex min-h-[58vh] items-end overflow-hidden bg-espresso text-porcelain-paper">
        <img src={post.featuredImage} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/55 to-transparent" />
        <div className="container-custom relative pt-40 pb-16">
          <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-porcelain-paper/70 hover:text-copper-glow">
            <ArrowLeftIcon size={15} /> Blog
          </Link>
          <span className="label-tag text-copper-glow">{post.category} - {post.publishDate}</span>
          <h1 className="mt-3 max-w-3xl text-display-1 font-display font-semibold">{post.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-porcelain-paper/65">{post.excerpt}</p>
        </div>
      </section>
      <section className="bg-porcelain-paper py-20">
        <div className="container-custom max-w-3xl">
          <div className="mb-8 border-b border-porcelain-line pb-6 text-sm text-ink-muted">
            Written by <span className="font-semibold text-ink">{post.author}</span>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink-muted">
            {post.content.split('\n').filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map(tag => <span key={tag} className="rounded-full border border-porcelain-line px-3 py-1 text-sm text-ink-muted">{tag}</span>)}
          </div>
        </div>
      </section>
    </article>
  );
};
