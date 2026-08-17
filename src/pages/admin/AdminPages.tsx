import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  ArchiveIcon, CopyIcon, DownloadIcon, EditIcon, EyeIcon, FileDownIcon, FileTextIcon,
  LayoutGridIcon, ListIcon, MailIcon, PackageIcon, PlusIcon, PrinterIcon, SaveIcon,
  ShoppingCartIcon, TrashIcon, UploadIcon, UsersIcon
} from 'lucide-react';
import { Product } from '../../context/CartContext';
import { BlogPost, Brand, Category, Coupon, Order, useStoreData } from '../../context/StoreDataContext';
import { useToast } from '../../context/ToastContext';
import { adminInputClass, ChartCard, ConfirmDialog, Drawer, EmptyState, PageHeader, Pagination, SearchInput, StatCard, StatusBadge } from '../../components/admin/AdminUi';

const pageSize = 8;

const AdminButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: 'primary' | 'plain' | 'danger' }> = ({ tone = 'plain', className = '', ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors disabled:opacity-40 ${
      tone === 'primary' ? 'bg-copper text-porcelain-paper hover:bg-copper-deep' : tone === 'danger' ? 'border border-rust/30 text-rust hover:bg-rust/10' : 'border border-porcelain-line hover:border-copper hover:text-copper dark:border-white/10'
    } ${className}`}
  />
);

const Field: React.FC<{ label: string; children: React.ReactNode; error?: string }> = ({ label, children, error }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-medium text-ink-muted dark:text-white/55">{label}</span>
    {children}
    {error && <span className="mt-1 block text-xs text-rust">{error}</span>}
  </label>
);

const Toolbar: React.FC<{ search: string; setSearch: (value: string) => void; children?: React.ReactNode }> = ({ search, setSearch, children }) => (
  <div className="mb-5 flex flex-col gap-3 rounded-xl border border-porcelain-line bg-porcelain-paper p-4 dark:border-white/10 dark:bg-white/5 lg:flex-row lg:items-center">
    <div className="min-w-[260px] flex-1"><SearchInput value={search} onChange={setSearch} /></div>
    {children}
  </div>
);

const TableWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="overflow-x-auto rounded-xl border border-porcelain-line bg-porcelain-paper dark:border-white/10 dark:bg-white/5">
    <table className="min-w-full divide-y divide-porcelain-line text-sm dark:divide-white/10">{children}</table>
  </div>
);

const usePaged = <T,>(items: T[]) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const pageItems = items.slice((page - 1) * pageSize, page * pageSize);
  return { page, setPage, totalPages, pageItems };
};

export const AdminIndex: React.FC = () => <Navigate to="/admin/dashboard" replace />;

export const DashboardPage: React.FC = () => {
  const { products, orders, customers, reviews, messages } = useStoreData();
  const [range, setRange] = useState('Last 30 Days');
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.orderStatus === 'Pending').length;
  const outOfStock = products.filter(product => product.stockStatus === 'Out of Stock').length;
  const averageOrder = orders.length ? revenue / orders.length : 0;
  const topProducts = products.filter(product => product.isBestSeller || product.featured).slice(0, 5);

  return (
    <div>
      <PageHeader title="Store Overview" description="Live mock analytics collected from the same data layer used by the storefront." action={
        <select value={range} onChange={event => setRange(event.target.value)} className={adminInputClass}>
          {['Today', 'Last 7 Days', 'Last 30 Days', 'This Year', 'Custom Date Range'].map(item => <option key={item}>{item}</option>)}
        </select>
      } />
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Revenue" value={`$${revenue.toFixed(2)}`} helper={range} icon={<ShoppingCartIcon size={18} />} />
        <StatCard title="Total Orders" value={String(orders.length)} helper={`${pendingOrders} pending`} icon={<PackageIcon size={18} />} />
        <StatCard title="Total Customers" value={String(customers.length)} helper="Mock CRM profiles" icon={<UsersIcon size={18} />} />
        <StatCard title="Total Products" value={String(products.length)} helper={`${outOfStock} out of stock`} icon={<ArchiveIcon size={18} />} />
        <StatCard title="Products Out of Stock" value={String(outOfStock)} />
        <StatCard title="Pending Orders" value={String(pendingOrders)} />
        <StatCard title="Average Order Value" value={`$${averageOrder.toFixed(2)}`} />
        <StatCard title="Conversion Rate" value="4.8%" helper="Mock traffic analytics" />
      </div>
      <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2"><ChartCard title="Sales Overview" values={[42, 56, 48, 72, 91, 84, 118]} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} /></div>
        <ChartCard title="Orders by Status" values={[pendingOrders, orders.filter(o => o.orderStatus === 'Processing').length, orders.filter(o => o.orderStatus === 'Shipped').length, orders.filter(o => o.orderStatus === 'Delivered').length]} labels={['Pending', 'Proc.', 'Ship.', 'Done']} />
        <ChartCard title="Revenue by Month" values={[6200, 7400, 6900, 8200, 9100, 11200]} labels={['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']} />
        <ChartCard title="Sales by Category" values={[20, 34, 29, 16, 12, 18]} labels={['Clean', 'Serum', 'Moist', 'Mask', 'SPF', 'Eye']} />
        <ChartCard title="Traffic Sources" values={[48, 26, 14, 12]} labels={['Search', 'Social', 'Email', 'Direct']} />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Panel title="Recent Orders">
          {orders.slice(0, 5).map(order => <Row key={order.id} left={order.orderNumber} meta={order.customer} right={<StatusBadge status={order.orderStatus} />} />)}
        </Panel>
        <Panel title="Low Stock Products">
          {products.filter(product => (product.stock ?? 0) <= (product.lowStockAlert ?? 10)).slice(0, 5).map(product => <Row key={product.id} left={product.name} meta={product.sku} right={<StatusBadge status={product.stockStatus || 'In Stock'} />} />)}
        </Panel>
        <Panel title="Best Selling Products">
          {topProducts.map(product => <Row key={product.id} left={product.name} meta={product.category} right={<span className="font-mono">${product.price.toFixed(2)}</span>} />)}
        </Panel>
        <Panel title="Latest Customer Reviews">
          {reviews.slice(0, 4).map(review => <Row key={review.id} left={review.product} meta={review.review} right={<StatusBadge status={review.status} />} />)}
        </Panel>
        <Panel title="Recent Activities">
          {messages.slice(0, 4).map(message => <Row key={message.id} left={message.subject} meta={message.senderName} right={<StatusBadge status={message.status} />} />)}
        </Panel>
        <Panel title="Unread Contact Messages">
          {messages.filter(message => message.status === 'New').map(message => <Row key={message.id} left={message.senderName} meta={message.subject} right={<MailIcon size={16} className="text-copper" />} />)}
        </Panel>
      </div>
    </div>
  );
};

const Panel: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="rounded-xl border border-porcelain-line bg-porcelain-paper p-5 dark:border-white/10 dark:bg-white/5">
    <h2 className="mb-4 font-display text-lg font-semibold">{title}</h2>
    <div className="space-y-3">{children}</div>
  </section>
);

const Row: React.FC<{ left: string; meta?: string; right?: React.ReactNode }> = ({ left, meta, right }) => (
  <div className="flex items-center justify-between gap-4 rounded-lg bg-porcelain px-3 py-3 dark:bg-white/5">
    <div className="min-w-0">
      <p className="truncate text-sm font-semibold">{left}</p>
      {meta && <p className="truncate text-xs text-ink-soft dark:text-white/45">{meta}</p>}
    </div>
    <div className="shrink-0">{right}</div>
  </div>
);

export const ProductsPage: React.FC = () => {
  const { products, categories, brands, deleteProduct, duplicateProduct, saveProduct } = useStoreData();
  const { notify } = useToast();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [brand, setBrand] = useState('all');
  const [stock, setStock] = useState('all');
  const [status, setStatus] = useState('all');
  const [view, setView] = useState<'table' | 'grid'>('table');
  const [selected, setSelected] = useState<number[]>([]);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const filtered = products.filter(product =>
    [product.name, product.sku].join(' ').toLowerCase().includes(search.toLowerCase()) &&
    (category === 'all' || product.category === category) &&
    (brand === 'all' || product.brand === brand) &&
    (stock === 'all' || product.stockStatus === stock) &&
    (status === 'all' || product.status === status)
  );
  const { page, setPage, totalPages, pageItems } = usePaged(filtered);

  const bulkStatus = (nextStatus: Product['status']) => {
    selected.forEach(id => {
      const product = products.find(item => item.id === id);
      if (product) saveProduct({ ...product, status: nextStatus });
    });
    notify(`${selected.length} products updated.`);
    setSelected([]);
  };

  return (
    <div>
      <PageHeader title="Products" description="Manage catalog data that powers the public product list, details pages, filters, cart availability, and homepage sections." action={
        <div className="flex flex-wrap gap-2">
          <AdminButton><UploadIcon size={15} /> Import</AdminButton>
          <AdminButton><DownloadIcon size={15} /> Export</AdminButton>
          <Link to="/admin/products/create"><AdminButton tone="primary"><PlusIcon size={15} /> Add Product</AdminButton></Link>
        </div>
      } />
      <Toolbar search={search} setSearch={setSearch}>
        <select value={category} onChange={event => setCategory(event.target.value)} className={adminInputClass}><option value="all">All categories</option>{categories.map(item => <option key={item.id}>{item.name}</option>)}</select>
        <select value={brand} onChange={event => setBrand(event.target.value)} className={adminInputClass}><option value="all">All brands</option>{brands.map(item => <option key={item.id}>{item.name}</option>)}</select>
        <select value={stock} onChange={event => setStock(event.target.value)} className={adminInputClass}><option value="all">All stock</option><option>In Stock</option><option>Low Stock</option><option>Out of Stock</option></select>
        <select value={status} onChange={event => setStatus(event.target.value)} className={adminInputClass}><option value="all">All status</option><option>Published</option><option>Draft</option><option>Archived</option></select>
        <div className="flex rounded-lg border border-porcelain-line p-1 dark:border-white/10">
          <button onClick={() => setView('table')} className={`rounded-md p-2 ${view === 'table' ? 'bg-copper text-white' : ''}`} aria-label="Table view"><ListIcon size={16} /></button>
          <button onClick={() => setView('grid')} className={`rounded-md p-2 ${view === 'grid' ? 'bg-copper text-white' : ''}`} aria-label="Grid view"><LayoutGridIcon size={16} /></button>
        </div>
      </Toolbar>
      {selected.length > 0 && <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-copper/20 bg-copper/10 p-3 text-sm"><span>{selected.length} selected</span><AdminButton onClick={() => bulkStatus('Published')}>Publish</AdminButton><AdminButton onClick={() => bulkStatus('Archived')}>Archive</AdminButton></div>}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {pageItems.map(product => <ProductAdminCard key={product.id} product={product} onDelete={() => setConfirmId(product.id)} />)}
        </div>
      ) : (
        <TableWrap>
          <thead><tr className="text-left text-xs uppercase tracking-wide text-ink-soft dark:text-white/45">
            <th className="px-4 py-3"><input type="checkbox" checked={selected.length === pageItems.length && pageItems.length > 0} onChange={event => setSelected(event.target.checked ? pageItems.map(item => item.id) : [])} /></th>
            {['Product', 'SKU', 'Category', 'Brand', 'Price', 'Stock', 'Rating', 'Status', 'Featured', 'Created', 'Actions'].map(head => <th key={head} className="px-4 py-3">{head}</th>)}
          </tr></thead>
          <tbody className="divide-y divide-porcelain-line dark:divide-white/10">
            {pageItems.map(product => (
              <tr key={product.id}>
                <td className="px-4 py-3"><input type="checkbox" checked={selected.includes(product.id)} onChange={event => setSelected(prev => event.target.checked ? [...prev, product.id] : prev.filter(id => id !== product.id))} /></td>
                <td className="px-4 py-3"><div className="flex items-center gap-3"><img src={product.image} alt="" className="h-11 w-11 rounded-lg object-cover" /><span className="font-semibold">{product.name}</span></div></td>
                <td className="px-4 py-3 font-mono text-xs">{product.sku}</td><td className="px-4 py-3">{product.category}</td><td className="px-4 py-3">{product.brand}</td>
                <td className="px-4 py-3 font-mono">${(product.discountPrice || product.price).toFixed(2)}</td><td className="px-4 py-3"><StatusBadge status={product.stockStatus || 'In Stock'} /></td>
                <td className="px-4 py-3">{product.rating}</td><td className="px-4 py-3"><StatusBadge status={product.status || 'Published'} /></td><td className="px-4 py-3">{product.featured ? 'Yes' : 'No'}</td><td className="px-4 py-3">{product.createdDate}</td>
                <td className="px-4 py-3"><div className="flex gap-1"><Link to={`/product/${product.id}`}><IconAction title="View"><EyeIcon size={15} /></IconAction></Link><Link to={`/admin/products/${product.id}/edit`}><IconAction title="Edit"><EditIcon size={15} /></IconAction></Link><IconAction title="Duplicate" onClick={() => { duplicateProduct(product.id); notify('Product duplicated.'); }}><CopyIcon size={15} /></IconAction><IconAction title="Archive" onClick={() => saveProduct({ ...product, status: 'Archived' })}><ArchiveIcon size={15} /></IconAction><IconAction title="Delete" onClick={() => setConfirmId(product.id)}><TrashIcon size={15} /></IconAction></div></td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      )}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      <ConfirmDialog open={confirmId !== null} title="Delete product?" message="This removes the product from storefront catalog and dashboard tables." onCancel={() => setConfirmId(null)} onConfirm={() => { if (confirmId) deleteProduct(confirmId); setConfirmId(null); notify('Product deleted.'); }} />
    </div>
  );
};

const IconAction: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { title: string }> = ({ title, children, ...props }) => <button {...props} title={title} aria-label={title} className="rounded-md p-2 text-ink-soft hover:bg-porcelain hover:text-copper dark:hover:bg-white/7">{children}</button>;

const ProductAdminCard: React.FC<{ product: Product; onDelete: () => void }> = ({ product, onDelete }) => (
  <div className="rounded-xl border border-porcelain-line bg-porcelain-paper p-4 dark:border-white/10 dark:bg-white/5">
    <img src={product.image} alt={product.name} className="mb-4 h-44 w-full rounded-lg object-cover" />
    <div className="mb-3 flex items-start justify-between gap-3"><div><h3 className="font-semibold">{product.name}</h3><p className="text-xs text-ink-soft dark:text-white/45">{product.sku}</p></div><StatusBadge status={product.stockStatus || 'In Stock'} /></div>
    <div className="flex items-center justify-between text-sm"><span>{product.category}</span><span className="font-mono">${product.price.toFixed(2)}</span></div>
    <div className="mt-4 flex gap-2"><Link className="flex-1" to={`/admin/products/${product.id}/edit`}><AdminButton className="w-full"><EditIcon size={15} /> Edit</AdminButton></Link><AdminButton onClick={onDelete} tone="danger"><TrashIcon size={15} /></AdminButton></div>
  </div>
);

const defaultProduct = (categories: Category[], brands: Brand[]): Product => ({
  id: 0, name: '', price: 0, image: 'https://images.pexels.com/photos/7428104/pexels-photo-7428104.jpeg?auto=compress&cs=tinysrgb&w=800', category: categories[0]?.name || 'Serums', brand: brands[0]?.name || 'GlowSkin', description: '', rating: 4.5, sku: '', status: 'Draft', stock: 10, lowStockAlert: 5, isNew: false, isBestSeller: false, featured: false, ingredients: [], skinType: [], benefits: [], howToUse: '', crueltyFree: true, dermatologistTested: true, parabenFree: true,
});

export const ProductFormPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, categories, brands, saveProduct } = useStoreData();
  const { notify } = useToast();
  const existing = products.find(product => product.id === Number(id));
  const [product, setProduct] = useState<Product>(existing || defaultProduct(categories, brands));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);

  const update = (patch: Partial<Product>) => { setProduct(prev => ({ ...prev, ...patch })); setDirty(true); };
  const save = (status: Product['status']) => {
    const nextErrors: Record<string, string> = {};
    if (!product.name.trim()) nextErrors.name = 'Product name is required.';
    if (!product.description.trim()) nextErrors.description = 'Full description is required.';
    if (!product.price || product.price <= 0) nextErrors.price = 'Regular price must be greater than zero.';
    if (!product.sku?.trim() && product.id) nextErrors.sku = 'SKU is required.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const saved = saveProduct({ ...product, status });
    notify(status === 'Published' ? 'Product published.' : 'Product saved.');
    setDirty(false);
    navigate(`/admin/products/${saved.id}/edit`);
  };

  return (
    <div>
      <PageHeader title={existing ? 'Edit Product' : 'Create Product'} description="All fields feed directly into the storefront product card, details page, filters, SEO, and stock behavior." action={
        <div className="flex flex-wrap gap-2"><Link to="/admin/products"><AdminButton>Cancel</AdminButton></Link><Link to={product.id ? `/product/${product.id}` : '/products'}><AdminButton><EyeIcon size={15} /> Preview</AdminButton></Link><AdminButton onClick={() => save('Draft')}><SaveIcon size={15} /> Save as Draft</AdminButton><AdminButton tone="primary" onClick={() => save('Published')}>Publish</AdminButton></div>
      } />
      {dirty && <p className="mb-4 rounded-lg border border-copper/20 bg-copper/10 px-4 py-3 text-sm text-copper">You have unsaved changes.</p>}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          <FormSection title="Basic Information">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2"><Field label="Product Name" error={errors.name}><input value={product.name} onChange={event => update({ name: event.target.value })} className={adminInputClass} /></Field><Field label="Slug"><input value={product.slug || ''} onChange={event => update({ slug: event.target.value })} className={adminInputClass} /></Field></div>
            <Field label="Short Description"><input value={product.shortDescription || ''} onChange={event => update({ shortDescription: event.target.value })} className={adminInputClass} /></Field>
            <Field label="Full Description" error={errors.description}><textarea value={product.description} onChange={event => update({ description: event.target.value })} className={`${adminInputClass} min-h-[130px]`} /></Field>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3"><Field label="SKU" error={errors.sku}><input value={product.sku || ''} onChange={event => update({ sku: event.target.value })} className={adminInputClass} /></Field><Field label="Barcode"><input value={product.barcode || ''} onChange={event => update({ barcode: event.target.value })} className={adminInputClass} /></Field><Field label="Status"><select value={product.status} onChange={event => update({ status: event.target.value as Product['status'] })} className={adminInputClass}><option>Draft</option><option>Published</option><option>Archived</option></select></Field></div>
            <CheckGrid items={[['Featured Product', 'featured'], ['New Arrival', 'isNew'], ['Best Seller', 'isBestSeller']]} product={product} update={update} />
          </FormSection>
          <FormSection title="Product Images">
            <Field label="Main Image URL"><input value={product.image} onChange={event => update({ image: event.target.value })} className={adminInputClass} /></Field>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4"><img src={product.image} alt="" className="aspect-square rounded-lg object-cover" /><div className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-porcelain-line text-center text-sm text-ink-soft dark:border-white/10"><UploadIcon size={18} className="mr-2" /> Drag image</div></div>
            <Field label="Alt Text"><input value={product.metaTitle || ''} onChange={event => update({ metaTitle: event.target.value })} className={adminInputClass} /></Field>
          </FormSection>
          <FormSection title="Skincare Information">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2"><Field label="Suitable Skin Types"><input value={(product.skinType || []).join(', ')} onChange={event => update({ skinType: event.target.value.split(',').map(v => v.trim()).filter(Boolean) })} className={adminInputClass} /></Field><Field label="Benefits"><input value={(product.benefits || []).join(', ')} onChange={event => update({ benefits: event.target.value.split(',').map(v => v.trim()).filter(Boolean) })} className={adminInputClass} /></Field></div>
            <Field label="Ingredients"><textarea value={(product.ingredients || []).join(', ')} onChange={event => update({ ingredients: event.target.value.split(',').map(v => v.trim()).filter(Boolean) })} className={`${adminInputClass} min-h-[90px]`} /></Field>
            <Field label="How to Use"><textarea value={product.howToUse || ''} onChange={event => update({ howToUse: event.target.value })} className={`${adminInputClass} min-h-[90px]`} /></Field>
            <Field label="Warnings"><input value={product.warnings || ''} onChange={event => update({ warnings: event.target.value })} className={adminInputClass} /></Field>
            <CheckGrid items={[['Dermatologist Tested', 'dermatologistTested'], ['Cruelty-Free', 'crueltyFree'], ['Vegan', 'vegan'], ['Fragrance-Free', 'fragranceFree'], ['Paraben-Free', 'parabenFree']]} product={product} update={update} />
          </FormSection>
          <FormSection title="SEO">
            <Field label="Meta Title"><input value={product.metaTitle || ''} onChange={event => update({ metaTitle: event.target.value })} className={adminInputClass} /></Field>
            <Field label="Meta Description"><textarea value={product.metaDescription || ''} onChange={event => update({ metaDescription: event.target.value })} className={`${adminInputClass} min-h-[90px]`} /></Field>
            <Field label="Keywords"><input value={(product.keywords || []).join(', ')} onChange={event => update({ keywords: event.target.value.split(',').map(v => v.trim()).filter(Boolean) })} className={adminInputClass} /></Field>
          </FormSection>
        </div>
        <aside className="space-y-5">
          <FormSection title="Pricing">
            <Field label="Regular Price" error={errors.price}><input type="number" value={product.price} onChange={event => update({ price: Number(event.target.value) })} className={adminInputClass} /></Field>
            <Field label="Sale Price"><input type="number" value={product.discountPrice || ''} onChange={event => update({ discountPrice: Number(event.target.value) || undefined })} className={adminInputClass} /></Field>
            <Field label="Cost Price"><input type="number" value={product.costPrice || ''} onChange={event => update({ costPrice: Number(event.target.value) || undefined })} className={adminInputClass} /></Field>
            <Field label="Tax %"><input type="number" value={product.tax || 0} onChange={event => update({ tax: Number(event.target.value) })} className={adminInputClass} /></Field>
          </FormSection>
          <FormSection title="Inventory">
            <Field label="Stock Quantity"><input type="number" value={product.stock || 0} onChange={event => update({ stock: Number(event.target.value) })} className={adminInputClass} /></Field>
            <Field label="Low Stock Alert"><input type="number" value={product.lowStockAlert || 0} onChange={event => update({ lowStockAlert: Number(event.target.value) })} className={adminInputClass} /></Field>
            <Field label="Maximum Purchase Quantity"><input type="number" value={product.maxPurchaseQuantity || ''} onChange={event => update({ maxPurchaseQuantity: Number(event.target.value) || undefined })} className={adminInputClass} /></Field>
          </FormSection>
          <FormSection title="Classification">
            <Field label="Category"><select value={product.category} onChange={event => update({ category: event.target.value })} className={adminInputClass}>{categories.map(item => <option key={item.id}>{item.name}</option>)}</select></Field>
            <Field label="Brand"><select value={product.brand} onChange={event => update({ brand: event.target.value })} className={adminInputClass}>{brands.map(item => <option key={item.id}>{item.name}</option>)}</select></Field>
            <Field label="Tags"><input value={(product.tags || []).join(', ')} onChange={event => update({ tags: event.target.value.split(',').map(v => v.trim()).filter(Boolean) })} className={adminInputClass} /></Field>
          </FormSection>
        </aside>
      </div>
    </div>
  );
};

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => <section className="space-y-4 rounded-xl border border-porcelain-line bg-porcelain-paper p-5 dark:border-white/10 dark:bg-white/5"><h2 className="font-display text-lg font-semibold">{title}</h2>{children}</section>;

const CheckGrid: React.FC<{ items: Array<[string, keyof Product]>; product: Product; update: (patch: Partial<Product>) => void }> = ({ items, product, update }) => (
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
    {items.map(([label, key]) => <label key={String(key)} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(product[key])} onChange={event => update({ [key]: event.target.checked } as Partial<Product>)} className="accent-copper" /> {label}</label>)}
  </div>
);

export const InventoryPage: React.FC = () => {
  const { products, updateProductStock } = useStoreData();
  const { notify } = useToast();
  const [search, setSearch] = useState('');
  const filtered = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()) || product.sku?.toLowerCase().includes(search.toLowerCase()));
  return <SimpleInventory products={filtered} search={search} setSearch={setSearch} update={(id, stock) => { updateProductStock(id, stock, 'Manual admin adjustment'); notify('Stock updated.'); }} />;
};

const SimpleInventory: React.FC<{ products: Product[]; search: string; setSearch: (v: string) => void; update: (id: number, stock: number) => void }> = ({ products, search, setSearch, update }) => (
  <div><PageHeader title="Inventory" description="Stock adjustments update cart availability and storefront out-of-stock behavior." action={<AdminButton><FileDownIcon size={15} /> Export Inventory</AdminButton>} /><Toolbar search={search} setSearch={setSearch}><select className={adminInputClass}><option>All stock states</option><option>Low Stock</option><option>Out of Stock</option></select></Toolbar><TableWrap><thead><tr className="text-left text-xs uppercase text-ink-soft">{['Product','SKU','Current','Reserved','Available','Low Alert','Status','Last Updated','Adjust'].map(h=><th key={h} className="px-4 py-3">{h}</th>)}</tr></thead><tbody className="divide-y divide-porcelain-line dark:divide-white/10">{products.map(product => <tr key={product.id}><td className="px-4 py-3 font-semibold">{product.name}</td><td className="px-4 py-3 font-mono text-xs">{product.sku}</td><td className="px-4 py-3">{product.stock}</td><td className="px-4 py-3">{product.reservedStock || 0}</td><td className="px-4 py-3">{Math.max(0,(product.stock||0)-(product.reservedStock||0))}</td><td className="px-4 py-3">{product.lowStockAlert}</td><td className="px-4 py-3"><StatusBadge status={product.stockStatus || 'In Stock'} /></td><td className="px-4 py-3">{product.createdDate}</td><td className="px-4 py-3"><input type="number" defaultValue={product.stock} onBlur={e=>update(product.id,Number(e.target.value))} className={`${adminInputClass} w-24`} /></td></tr>)}</tbody></TableWrap></div>
);

export const OrdersPage: React.FC = () => {
  const { orders } = useStoreData();
  const [search, setSearch] = useState('');
  const filtered = orders.filter(order => [order.orderNumber, order.customer, order.email].join(' ').toLowerCase().includes(search.toLowerCase()));
  const { page, setPage, totalPages, pageItems } = usePaged(filtered);
  return (
    <div><PageHeader title="Orders" description="Checkout orders appear here with payment, fulfillment, export, and bulk status controls." action={<AdminButton><DownloadIcon size={15} /> Export Orders</AdminButton>} /><Toolbar search={search} setSearch={setSearch}><select className={adminInputClass}><option>All order status</option><option>Pending</option><option>Processing</option><option>Shipped</option><option>Delivered</option></select><select className={adminInputClass}><option>All payment status</option><option>Paid</option><option>Pending</option><option>Failed</option></select></Toolbar><TableWrap><thead><tr className="text-left text-xs uppercase text-ink-soft">{['Order','Customer','Email','Date','Items','Total','Payment','Order','Shipping','Actions'].map(h=><th key={h} className="px-4 py-3">{h}</th>)}</tr></thead><tbody className="divide-y divide-porcelain-line dark:divide-white/10">{pageItems.map(order => <tr key={order.id}><td className="px-4 py-3 font-mono">{order.orderNumber}</td><td className="px-4 py-3">{order.customer}</td><td className="px-4 py-3">{order.email}</td><td className="px-4 py-3">{order.date}</td><td className="px-4 py-3">{order.items.length}</td><td className="px-4 py-3 font-mono">${order.total.toFixed(2)}</td><td className="px-4 py-3"><StatusBadge status={order.paymentStatus} /></td><td className="px-4 py-3"><StatusBadge status={order.orderStatus} /></td><td className="px-4 py-3"><StatusBadge status={order.shippingStatus} /></td><td className="px-4 py-3"><Link to={`/admin/orders/${order.id}`}><AdminButton><EyeIcon size={15} /> View</AdminButton></Link></td></tr>)}</tbody></TableWrap><Pagination page={page} totalPages={totalPages} onPageChange={setPage} /></div>
  );
};

export const OrderDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { orders, saveOrder } = useStoreData();
  const { notify } = useToast();
  const order = orders.find(item => item.id === Number(id));
  const [note, setNote] = useState('');
  if (!order) return <EmptyState title="Order not found" message="This order may have been removed." />;
  const update = (patch: Partial<Order>) => { saveOrder({ ...order, ...patch, timeline: [...order.timeline, `Admin updated order on ${new Date().toLocaleString()}`] }); notify('Order updated.'); };
  return <div><PageHeader title={order.orderNumber} description={`${order.customer} - ${order.email}`} action={<div className="flex gap-2"><AdminButton><PrinterIcon size={15} /> Print Invoice</AdminButton><AdminButton><DownloadIcon size={15} /> Download Invoice</AdminButton></div>} /><div className="grid grid-cols-1 gap-5 xl:grid-cols-3"><div className="space-y-5 xl:col-span-2"><FormSection title="Ordered Products">{order.items.map(item => <Row key={item.productId} left={`${item.name} x ${item.quantity}`} meta={`Unit $${item.unitPrice.toFixed(2)}`} right={<span className="font-mono">${(item.unitPrice * item.quantity).toFixed(2)}</span>} />)}</FormSection><FormSection title="Timeline">{order.timeline.map((item, index) => <p key={index} className="rounded-lg bg-porcelain p-3 text-sm dark:bg-white/5">{item}</p>)}</FormSection><FormSection title="Notes"><textarea value={note} onChange={e=>setNote(e.target.value)} className={`${adminInputClass} min-h-[90px]`} placeholder="Internal note or customer note" /><AdminButton onClick={()=>{ update({ notes:[...order.notes,note] }); setNote(''); }}>Add Note</AdminButton></FormSection></div><aside className="space-y-5"><FormSection title="Status"><Field label="Order Status"><select value={order.orderStatus} onChange={e=>update({ orderStatus:e.target.value as Order['orderStatus'] })} className={adminInputClass}>{['Pending','Confirmed','Processing','Shipped','Delivered','Cancelled','Refunded'].map(s=><option key={s}>{s}</option>)}</select></Field><Field label="Payment Status"><select value={order.paymentStatus} onChange={e=>update({ paymentStatus:e.target.value as Order['paymentStatus'] })} className={adminInputClass}>{['Pending','Paid','Failed','Refunded'].map(s=><option key={s}>{s}</option>)}</select></Field></FormSection><FormSection title="Totals"><Row left="Subtotal" right={`$${order.subtotal.toFixed(2)}`} /><Row left="Shipping" right={`$${order.shipping.toFixed(2)}`} /><Row left="Tax" right={`$${order.tax.toFixed(2)}`} /><Row left="Discount" right={`$${order.discount.toFixed(2)}`} /><Row left="Total" right={`$${order.total.toFixed(2)}`} /></FormSection><FormSection title="Addresses"><p className="text-sm text-ink-muted dark:text-white/55">{order.shippingAddress}</p><p className="mt-3 text-sm text-ink-muted dark:text-white/55">{order.billingAddress}</p></FormSection></aside></div></div>;
};

export const CategoriesPage: React.FC = () => {
  const { categories, products, saveCategory, deleteCategory } = useStoreData();
  return <ResourcePage<Category> title="Categories" description="New active categories show in product filters and admin product classification." items={categories} blank={{ id: 0, name: '', slug: '', description: '', image: '', status: 'Active', displayOrder: categories.length + 1 }} save={saveCategory} remove={deleteCategory} columns={[['Name','name'],['Slug','slug'],['Status','status'],['Order','displayOrder']]} count={item => products.filter(product => product.category === item.name).length} />;
};

export const BrandsPage: React.FC = () => {
  const { brands, products, saveBrand, deleteBrand } = useStoreData();
  return <ResourcePage<Brand> title="Brands" description="Active brands appear in filters and product forms." items={brands} blank={{ id: 0, name: '', slug: '', description: '', logo: '', status: 'Active' }} save={saveBrand} remove={deleteBrand} columns={[['Name','name'],['Slug','slug'],['Status','status']]} count={item => products.filter(product => product.brand === item.name).length} />;
};

function ResourcePage<T extends { id: number; name: string; slug: string; description: string; status: string }>(props: { title: string; description: string; items: T[]; blank: T; save: (item: T) => void; remove: (id: number) => void; columns: Array<[string, keyof T]>; count: (item: T) => number }) {
  const { notify } = useToast();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<T | null>(null);
  const filtered = props.items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  return <div><PageHeader title={props.title} description={props.description} action={<AdminButton tone="primary" onClick={() => setEditing(props.blank)}><PlusIcon size={15} /> Add</AdminButton>} /><Toolbar search={search} setSearch={setSearch} /><TableWrap><thead><tr className="text-left text-xs uppercase text-ink-soft">{props.columns.map(([h])=><th key={h} className="px-4 py-3">{h}</th>)}<th className="px-4 py-3">Products</th><th className="px-4 py-3">Actions</th></tr></thead><tbody className="divide-y divide-porcelain-line dark:divide-white/10">{filtered.map(item=><tr key={item.id}>{props.columns.map(([, key])=><td key={String(key)} className="px-4 py-3">{key === 'status' ? <StatusBadge status={String(item[key])} /> : String(item[key])}</td>)}<td className="px-4 py-3">{props.count(item)}</td><td className="px-4 py-3"><div className="flex gap-2"><AdminButton onClick={()=>setEditing(item)}><EditIcon size={15} /> Edit</AdminButton><AdminButton tone="danger" onClick={()=>{props.remove(item.id); notify(`${props.title.slice(0,-1)} deleted.`)}}><TrashIcon size={15} /></AdminButton></div></td></tr>)}</tbody></TableWrap><Drawer open={Boolean(editing)} title={`Edit ${props.title.slice(0,-1)}`} onClose={()=>setEditing(null)}>{editing && <ResourceForm item={editing} onSave={(item)=>{props.save(item); setEditing(null); notify(`${props.title.slice(0,-1)} saved.`)}} />}</Drawer></div>;
}

function ResourceForm<T extends { name: string; slug: string; description: string; status: string }>(props: { item: T; onSave: (item: T) => void }) {
  const [item, setItem] = useState<T>(props.item);
  const set = (patch: Partial<T>) => setItem(prev => ({ ...prev, ...patch }));
  return <div className="space-y-4"><Field label="Name"><input value={item.name} onChange={e=>set({name:e.target.value} as Partial<T>)} className={adminInputClass} /></Field><Field label="Slug"><input value={item.slug} onChange={e=>set({slug:e.target.value} as Partial<T>)} className={adminInputClass} /></Field><Field label="Description"><textarea value={item.description} onChange={e=>set({description:e.target.value} as Partial<T>)} className={`${adminInputClass} min-h-[120px]`} /></Field><Field label="Status"><select value={item.status} onChange={e=>set({status:e.target.value} as Partial<T>)} className={adminInputClass}><option>Active</option><option>Inactive</option></select></Field><AdminButton tone="primary" onClick={()=>props.onSave(item)}><SaveIcon size={15} /> Save</AdminButton></div>;
}

export const CustomersPage: React.FC = () => {
  const { customers, orders } = useStoreData();
  return <BasicTable title="Customers" description="Customer profiles replace static account data and connect to orders and wishlists." heads={['Name','Email','Phone','Orders','Spent','Registered','Status','Actions']} rows={customers.map(customer => [customer.name, customer.email, customer.phone, orders.filter(o=>o.customerId===customer.id).length, `$${orders.filter(o=>o.customerId===customer.id).reduce((s,o)=>s+o.total,0).toFixed(2)}`, customer.registrationDate, <StatusBadge status={customer.status} />, <Link to={`/admin/customers/${customer.id}`}><AdminButton><EyeIcon size={15} /> View</AdminButton></Link>])} />;
};

export const CustomerDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { customers, orders, products, saveCustomer } = useStoreData();
  const customer = customers.find(item => item.id === Number(id));
  if (!customer) return <EmptyState title="Customer not found" message="This customer does not exist." />;
  const customerOrders = orders.filter(order => order.customerId === customer.id);
  return <div><PageHeader title={customer.name} description={customer.email} /><div className="grid grid-cols-1 gap-5 xl:grid-cols-3"><FormSection title="Personal Information"><p>{customer.phone}</p><p>{customer.registrationDate}</p><StatusBadge status={customer.status} /><AdminButton onClick={()=>saveCustomer({...customer,status:customer.status==='Active'?'Suspended':'Active'})}>{customer.status==='Active'?'Suspend':'Activate'} Account</AdminButton></FormSection><FormSection title="Total Spending"><p className="font-mono text-3xl">${customerOrders.reduce((s,o)=>s+o.total,0).toFixed(2)}</p><p className="text-sm text-ink-muted">{customerOrders.length} orders</p></FormSection><FormSection title="Addresses">{customer.addresses.map(address=><p key={address} className="text-sm">{address}</p>)}</FormSection><div className="xl:col-span-2"><FormSection title="Order History">{customerOrders.map(order=><Row key={order.id} left={order.orderNumber} meta={order.date} right={<StatusBadge status={order.orderStatus}/>} />)}</FormSection></div><FormSection title="Wishlist">{customer.wishlist.flatMap(id => { const product = products.find(p => p.id === id); return product ? [<Row key={product.id} left={product.name} meta={product.category} right={`$${product.price.toFixed(2)}`} />] : []; })}</FormSection></div></div>;
};

export const ReviewsPage: React.FC = () => {
  const { reviews, saveReview, deleteReview } = useStoreData();
  return <BasicTable title="Reviews" description="Only approved reviews appear on product detail pages." heads={['Customer','Product','Rating','Review','Date','Status','Actions']} rows={reviews.map(review=>[review.customer, review.product, review.rating, review.review, review.date, <StatusBadge status={review.status} />, <div className="flex gap-2"><AdminButton onClick={()=>saveReview({...review,status:'Approved'})}>Approve</AdminButton><AdminButton onClick={()=>saveReview({...review,status:'Rejected'})}>Reject</AdminButton><AdminButton tone="danger" onClick={()=>deleteReview(review.id)}>Delete</AdminButton></div>])} />;
};

export const CouponsPage: React.FC = () => {
  const { coupons, saveCoupon, deleteCoupon } = useStoreData();
  const [editing, setEditing] = useState<Coupon | null>(null);
  const blank: Coupon = { id: 0, code: '', discountType: 'Percentage', discountValue: 10, minimumOrder: 0, startDate: '2026-01-01', endDate: '2026-12-31', usageLimit: 100, usagePerCustomer: 1, applicableProducts: [], applicableCategories: [], active: true, timesUsed: 0, totalDiscountGiven: 0, revenueGenerated: 0 };
  return <div><PageHeader title="Promo Codes" description="Coupons validate in cart and checkout." action={<AdminButton tone="primary" onClick={()=>setEditing(blank)}><PlusIcon size={15} /> Add Coupon</AdminButton>} /><BasicTable heads={['Code','Type','Value','Minimum','Active','Used','Discount Given','Revenue','Actions']} rows={coupons.map(c=>[c.code,c.discountType,c.discountValue,`$${c.minimumOrder}`,c.active?'Active':'Inactive',c.timesUsed,`$${c.totalDiscountGiven}`,`$${c.revenueGenerated}`,<div className="flex gap-2"><AdminButton onClick={()=>setEditing(c)}>Edit</AdminButton><AdminButton tone="danger" onClick={()=>deleteCoupon(c.id)}>Delete</AdminButton></div>])} /><Drawer open={Boolean(editing)} title="Coupon" onClose={()=>setEditing(null)}>{editing && <CouponForm coupon={editing} onSave={(coupon)=>{saveCoupon(coupon); setEditing(null)}} />}</Drawer></div>;
};

const CouponForm: React.FC<{ coupon: Coupon; onSave: (coupon: Coupon) => void }> = ({ coupon, onSave }) => {
  const [item, setItem] = useState(coupon);
  const set = (patch: Partial<Coupon>) => setItem(prev => ({ ...prev, ...patch }));
  return <div className="space-y-4"><Field label="Coupon Code"><input value={item.code} onChange={e=>set({code:e.target.value.toUpperCase()})} className={adminInputClass}/></Field><Field label="Discount Type"><select value={item.discountType} onChange={e=>set({discountType:e.target.value as Coupon['discountType']})} className={adminInputClass}><option>Percentage</option><option>Fixed Amount</option></select></Field><Field label="Discount Value"><input type="number" value={item.discountValue} onChange={e=>set({discountValue:Number(e.target.value)})} className={adminInputClass}/></Field><Field label="Minimum Order"><input type="number" value={item.minimumOrder} onChange={e=>set({minimumOrder:Number(e.target.value)})} className={adminInputClass}/></Field><Field label="Usage Limit"><input type="number" value={item.usageLimit} onChange={e=>set({usageLimit:Number(e.target.value)})} className={adminInputClass}/></Field><label className="flex gap-2 text-sm"><input type="checkbox" checked={item.active} onChange={e=>set({active:e.target.checked})} className="accent-copper"/> Active</label><AdminButton tone="primary" onClick={()=>onSave(item)}>Save Coupon</AdminButton></div>;
};

export const BundlesPage: React.FC = () => {
  const { bundles } = useStoreData();
  return <BasicTable title="Bundles" description="Bundle data is shown on the homepage and can be expanded into product merchandising." heads={['Bundle','Products','Original','Price','Discount','Stock','Status']} rows={bundles.map(b=>[b.name,b.includedProducts.length,`$${b.originalTotalPrice}`,`$${b.bundlePrice}`,`${b.discountPercentage}%`,b.stock,<StatusBadge status={b.status}/>])} />;
};

export const BlogAdminPage: React.FC = () => {
  const { blogPosts, saveBlogPost, deleteBlogPost } = useStoreData();
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const blank: BlogPost = { id: 0, title: '', slug: '', featuredImage: '', excerpt: '', content: '', author: 'Admin', category: 'Routine', tags: [], status: 'Draft', publishDate: new Date().toISOString().slice(0,10), seoTitle: '', seoDescription: '' };
  return <div><PageHeader title="Blog" description="Published posts power /blog and /blog/:slug." action={<AdminButton tone="primary" onClick={()=>setEditing(blank)}><PlusIcon size={15}/> Add Article</AdminButton>} /><BasicTable heads={['Title','Slug','Author','Category','Status','Publish Date','Actions']} rows={blogPosts.map(post=>[post.title,post.slug,post.author,post.category,<StatusBadge status={post.status}/>,post.publishDate,<div className="flex gap-2"><Link to={`/blog/${post.slug}`}><AdminButton>Preview</AdminButton></Link><AdminButton onClick={()=>setEditing(post)}>Edit</AdminButton><AdminButton tone="danger" onClick={()=>deleteBlogPost(post.id)}>Delete</AdminButton></div>])} /><Drawer open={Boolean(editing)} title="Article" onClose={()=>setEditing(null)}>{editing && <BlogForm post={editing} onSave={(post)=>{saveBlogPost(post); setEditing(null)}} />}</Drawer></div>;
};

const BlogForm: React.FC<{ post: BlogPost; onSave: (post: BlogPost) => void }> = ({ post, onSave }) => {
  const [item, setItem] = useState(post);
  const set = (patch: Partial<BlogPost>) => setItem(prev => ({ ...prev, ...patch }));
  return <div className="space-y-4"><Field label="Title"><input value={item.title} onChange={e=>set({title:e.target.value})} className={adminInputClass}/></Field><Field label="Slug"><input value={item.slug} onChange={e=>set({slug:e.target.value})} className={adminInputClass}/></Field><Field label="Featured Image"><input value={item.featuredImage} onChange={e=>set({featuredImage:e.target.value})} className={adminInputClass}/></Field><Field label="Excerpt"><textarea value={item.excerpt} onChange={e=>set({excerpt:e.target.value})} className={`${adminInputClass} min-h-[80px]`}/></Field><Field label="Content Editor"><textarea value={item.content} onChange={e=>set({content:e.target.value})} className={`${adminInputClass} min-h-[180px]`}/></Field><div className="grid grid-cols-2 gap-4"><Field label="Author"><input value={item.author} onChange={e=>set({author:e.target.value})} className={adminInputClass}/></Field><Field label="Status"><select value={item.status} onChange={e=>set({status:e.target.value as BlogPost['status']})} className={adminInputClass}><option>Draft</option><option>Published</option><option>Scheduled</option><option>Archived</option></select></Field></div><AdminButton tone="primary" onClick={()=>onSave(item)}>Save Article</AdminButton></div>;
};

export const ContentHomePage: React.FC = () => {
  const { homeContent, updateHomeContent } = useStoreData();
  const { notify } = useToast();
  const [content, setContent] = useState(homeContent);
  return <div><PageHeader title="Home Content" description="Edit hero slides and newsletter copy without touching code." action={<AdminButton tone="primary" onClick={()=>{updateHomeContent(content); notify('Homepage content updated.')}}>Save Content</AdminButton>} /><div className="space-y-5">{content.heroSlides.map((slide,index)=><FormSection key={slide.id} title={`Hero Slide ${index+1}`}><Field label="Title"><input value={slide.title} onChange={e=>setContent(prev=>({...prev,heroSlides:prev.heroSlides.map(s=>s.id===slide.id?{...s,title:e.target.value}:s)}))} className={adminInputClass}/></Field><Field label="Subtitle"><input value={slide.subtitle} onChange={e=>setContent(prev=>({...prev,heroSlides:prev.heroSlides.map(s=>s.id===slide.id?{...s,subtitle:e.target.value}:s)}))} className={adminInputClass}/></Field><Field label="Image"><input value={slide.image} onChange={e=>setContent(prev=>({...prev,heroSlides:prev.heroSlides.map(s=>s.id===slide.id?{...s,image:e.target.value}:s)}))} className={adminInputClass}/></Field><Field label="CTA"><input value={slide.ctaText} onChange={e=>setContent(prev=>({...prev,heroSlides:prev.heroSlides.map(s=>s.id===slide.id?{...s,ctaText:e.target.value}:s)}))} className={adminInputClass}/></Field></FormSection>)}<FormSection title="Newsletter"><Field label="Title"><input value={content.newsletter.title} onChange={e=>setContent(prev=>({...prev,newsletter:{...prev.newsletter,title:e.target.value}}))} className={adminInputClass}/></Field><Field label="Description"><textarea value={content.newsletter.description} onChange={e=>setContent(prev=>({...prev,newsletter:{...prev.newsletter,description:e.target.value}}))} className={`${adminInputClass} min-h-[90px]`}/></Field></FormSection></div></div>;
};

export const ContentAboutPage: React.FC = () => {
  const { aboutContent, updateAboutContent } = useStoreData();
  const { notify } = useToast();
  const [content, setContent] = useState(aboutContent);
  return <div><PageHeader title="About Content" description="Brand story, mission, vision, values, and statistics." action={<AdminButton tone="primary" onClick={()=>{updateAboutContent(content); notify('About content updated.')}}>Save Content</AdminButton>} /><FormSection title="Brand Story"><Field label="Story"><textarea value={content.story} onChange={e=>setContent({...content,story:e.target.value})} className={`${adminInputClass} min-h-[130px]`}/></Field><Field label="Mission"><input value={content.mission} onChange={e=>setContent({...content,mission:e.target.value})} className={adminInputClass}/></Field><Field label="Vision"><input value={content.vision} onChange={e=>setContent({...content,vision:e.target.value})} className={adminInputClass}/></Field></FormSection></div>;
};

export const ContentFaqPage: React.FC = () => {
  const { faqs, saveFaq } = useStoreData();
  const [editing, setEditing] = useState<typeof faqs[number] | null>(null);
  return <div><PageHeader title="FAQ Content" description="Active FAQ questions render on /faq." action={<AdminButton tone="primary" onClick={()=>setEditing({id:0,question:'',answer:'',category:'General',order:faqs.length+1,active:true})}>Add FAQ</AdminButton>} /><BasicTable heads={['Order','Question','Category','Active','Actions']} rows={faqs.sort((a,b)=>a.order-b.order).map(faq=>[faq.order,faq.question,faq.category,faq.active?'Yes':'No',<AdminButton onClick={()=>setEditing(faq)}>Edit</AdminButton>])} /><Drawer open={Boolean(editing)} title="FAQ" onClose={()=>setEditing(null)}>{editing && <FaqForm faq={editing} onSave={(faq)=>{saveFaq(faq); setEditing(null)}} />}</Drawer></div>;
};

const FaqForm: React.FC<{ faq: { id:number; question:string; answer:string; category:string; order:number; active:boolean }; onSave: (faq: { id:number; question:string; answer:string; category:string; order:number; active:boolean }) => void }> = ({ faq, onSave }) => {
  const [item,setItem]=useState(faq);
  return <div className="space-y-4"><Field label="Question"><input value={item.question} onChange={e=>setItem({...item,question:e.target.value})} className={adminInputClass}/></Field><Field label="Answer"><textarea value={item.answer} onChange={e=>setItem({...item,answer:e.target.value})} className={`${adminInputClass} min-h-[120px]`}/></Field><Field label="Category"><input value={item.category} onChange={e=>setItem({...item,category:e.target.value})} className={adminInputClass}/></Field><Field label="Order"><input type="number" value={item.order} onChange={e=>setItem({...item,order:Number(e.target.value)})} className={adminInputClass}/></Field><label className="flex gap-2"><input type="checkbox" checked={item.active} onChange={e=>setItem({...item,active:e.target.checked})} className="accent-copper"/> Active</label><AdminButton tone="primary" onClick={()=>onSave(item)}>Save FAQ</AdminButton></div>
};

export const MessagesPage: React.FC = () => {
  const { messages, updateMessageStatus } = useStoreData();
  return <BasicTable title="Contact Messages" description="Messages submitted from the contact form appear here and feed notification counts." heads={['Sender','Email','Phone','Subject','Message','Date','Status','Actions']} rows={messages.map(m=>[m.senderName,m.email,m.phone,m.subject,m.message,m.date,<StatusBadge status={m.status}/>,<div className="flex gap-2"><AdminButton onClick={()=>updateMessageStatus(m.id,'Read')}>Read</AdminButton><AdminButton onClick={()=>updateMessageStatus(m.id,'Replied')}>Reply</AdminButton><AdminButton onClick={()=>updateMessageStatus(m.id,'Closed')}>Close</AdminButton></div>])} />;
};

export const NewsletterPage: React.FC = () => {
  const { subscribers } = useStoreData();
  return <BasicTable title="Newsletter Subscribers" description="Subscriber list captured from homepage/footer forms." heads={['Email','Subscription Date','Status','Source','Actions']} rows={subscribers.map(s=>[s.email,s.subscriptionDate,<StatusBadge status={s.status}/>,s.source,<AdminButton><DownloadIcon size={15}/> Export CSV</AdminButton>])} />;
};

export const NotificationsPage: React.FC = () => {
  const { notifications, updateNotification, markAllNotificationsRead } = useStoreData();
  return <BasicTable title="Notifications" description="Operational center for orders, low stock, reviews, messages, customers, and failed payments." action={<AdminButton onClick={markAllNotificationsRead}>Mark All as Read</AdminButton>} heads={['Type','Title','Message','Date','Read','Actions']} rows={notifications.map(n=>[n.type,n.title,n.body,n.date,n.read?'Read':'Unread',<AdminButton onClick={()=>updateNotification(n.id,!n.read)}>{n.read?'Mark unread':'Mark read'}</AdminButton>])} />;
};

export const ReportsPage: React.FC = () => <div><PageHeader title="Reports & Analytics" description="Exportable mock reports for sales, orders, products, inventory, customers, coupons, and tax." action={<div className="flex gap-2"><AdminButton><FileDownIcon size={15}/> CSV</AdminButton><AdminButton><FileTextIcon size={15}/> PDF</AdminButton><AdminButton><PrinterIcon size={15}/> Print</AdminButton></div>} /><div className="grid grid-cols-1 gap-5 xl:grid-cols-2"><ChartCard title="Sales Report" values={[42,58,61,84,96,118]} labels={['Feb','Mar','Apr','May','Jun','Jul']} /><ChartCard title="Customers Report" values={[18,22,28,34,39,51]} labels={['Feb','Mar','Apr','May','Jun','Jul']} /><ChartCard title="Coupons Report" values={[4,9,11,13,19,24]} labels={['Feb','Mar','Apr','May','Jun','Jul']} /><ChartCard title="Tax Report" values={[220,310,280,410,470,590]} labels={['Feb','Mar','Apr','May','Jun','Jul']} /></div></div>;

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useStoreData();
  const { notify } = useToast();
  const [item, setItem] = useState(settings);
  const set = (patch: Partial<typeof item>) => setItem(prev=>({...prev,...patch}));
  return <div><PageHeader title="Store Settings" description="General, shipping, payment, taxes, social, email, and policies are prepared for backend integration." action={<AdminButton tone="primary" onClick={()=>{updateSettings(item); notify('Settings saved.')}}>Save Settings</AdminButton>} /><div className="grid grid-cols-1 gap-5 xl:grid-cols-2"><FormSection title="General"><Field label="Store Name"><input value={item.storeName} onChange={e=>set({storeName:e.target.value})} className={adminInputClass}/></Field><Field label="Store Email"><input value={item.email} onChange={e=>set({email:e.target.value})} className={adminInputClass}/></Field><Field label="Phone"><input value={item.phone} onChange={e=>set({phone:e.target.value})} className={adminInputClass}/></Field><Field label="Address"><textarea value={item.address} onChange={e=>set({address:e.target.value})} className={adminInputClass}/></Field></FormSection><FormSection title="Shipping & Taxes"><Field label="Shipping Cost"><input type="number" value={item.shippingCost} onChange={e=>set({shippingCost:Number(e.target.value)})} className={adminInputClass}/></Field><Field label="Free Shipping Minimum"><input type="number" value={item.freeShippingMinimum} onChange={e=>set({freeShippingMinimum:Number(e.target.value)})} className={adminInputClass}/></Field><Field label="Tax Percentage"><input type="number" value={item.taxPercentage} onChange={e=>set({taxPercentage:Number(e.target.value)})} className={adminInputClass}/></Field><label className="flex gap-2"><input type="checkbox" checked={item.taxEnabled} onChange={e=>set({taxEnabled:e.target.checked})} className="accent-copper"/> Enable tax</label></FormSection><FormSection title="Payment"><label className="flex gap-2"><input type="checkbox" defaultChecked className="accent-copper"/> Cash on Delivery</label><label className="flex gap-2"><input type="checkbox" defaultChecked className="accent-copper"/> Credit Card Mock Gateway</label><label className="flex gap-2"><input type="checkbox" className="accent-copper"/> PayPal placeholder</label></FormSection><FormSection title="Policies"><Field label="Return Policy"><textarea defaultValue="30-day money-back guarantee." className={`${adminInputClass} min-h-[100px]`}/></Field><Field label="Shipping Policy"><textarea defaultValue="Standard shipping in 3-5 business days." className={`${adminInputClass} min-h-[100px]`}/></Field></FormSection></div></div>;
};

export const AdminUsersPage: React.FC = () => <BasicTable title="Admin Users & Permissions" description="Role-based UI hides restricted modules when a real backend is connected." heads={['Name','Email','Role','Permissions','Status']} rows={[['Nada Hassan','admin@glowskin.com','Super Admin','View, Create, Edit, Delete, Export, Settings',<StatusBadge status="Active"/>],['Maya Brooks','manager@glowskin.com','Store Manager','View, Edit, Export',<StatusBadge status="Active"/>],['Lena Hart','content@glowskin.com','Content Editor','View, Create, Edit Content',<StatusBadge status="Active"/>]]} />;

export const ActivityLogPage: React.FC = () => {
  const { activityLog } = useStoreData();
  return <BasicTable title="Activity Log" description="Important admin actions are logged with mock IPs for audit readiness." heads={['User','Action','Target','Date','IP','Details']} rows={activityLog.map(item=>[item.user,item.action,item.target,item.date,item.ip,item.details])} />;
};

function BasicTable(props: { title?: string; description?: string; action?: React.ReactNode; heads: string[]; rows: React.ReactNode[][] }) {
  const [search,setSearch]=useState('');
  const filtered=props.rows.filter(row=>row.map(cell=>typeof cell==='string'||typeof cell==='number'?String(cell):'').join(' ').toLowerCase().includes(search.toLowerCase()));
  const {page,setPage,totalPages,pageItems}=usePaged(filtered);
  return <div>{props.title && <PageHeader title={props.title} description={props.description} action={props.action} />}<Toolbar search={search} setSearch={setSearch} />{filtered.length===0?<EmptyState title="No records found" message="Try adjusting your search or filters."/>:<><TableWrap><thead><tr className="text-left text-xs uppercase text-ink-soft">{props.heads.map(h=><th key={h} className="px-4 py-3">{h}</th>)}</tr></thead><tbody className="divide-y divide-porcelain-line dark:divide-white/10">{pageItems.map((row,index)=><tr key={index}>{row.map((cell,i)=><td key={i} className="max-w-xs px-4 py-3 align-top">{cell}</td>)}</tr>)}</tbody></TableWrap><Pagination page={page} totalPages={totalPages} onPageChange={setPage}/></>}</div>;
}

