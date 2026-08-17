import React, { useState } from 'react';
import { UserIcon, PackageIcon, HeartIcon, SettingsIcon } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { Button } from '../components/ui/Button';
import { useStoreData } from '../context/StoreDataContext';

const navItems = [
  { id: 'orders', label: 'My Orders', icon: PackageIcon },
  { id: 'wishlist', label: 'Wishlist', icon: HeartIcon },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

export const Profile: React.FC = () => {
  const { favorites } = useFavorites();
  const { customers, orders } = useStoreData();
  const [activeTab, setActiveTab] = useState('orders');
  const customer = customers[0];
  const customerOrders = orders.filter(order => order.customerId === customer?.id || order.email === customer?.email);
  const statusStyle = (status: string) =>
    status === 'Delivered' ? 'bg-sage/10 text-sage' : status === 'In Transit' ? 'bg-copper/10 text-copper' : 'bg-ink/8 text-ink-muted';

  return (
    <div className="container-custom pt-32 pb-24">
      <h1 className="text-display-2 font-display font-semibold text-ink mb-10">My Account</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-porcelain-paper border border-porcelain-line rounded-2xl p-6 lg:sticky lg:top-28">
            <div className="flex flex-col items-center text-center mb-6 pb-6 border-b border-porcelain-line">
              <div className="w-16 h-16 bg-copper/10 rounded-full flex items-center justify-center mb-3">
                <UserIcon size={26} className="text-copper" />
              </div>
              <h2 className="font-display font-semibold text-ink">{customer?.name || 'GlowSkin Customer'}</h2>
              <p className="text-sm text-ink-soft">{customer?.email}</p>
            </div>
            <nav className="space-y-1">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === id ? 'bg-copper text-porcelain-paper' : 'text-ink-muted hover:bg-porcelain'}`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-porcelain-paper border border-porcelain-line rounded-2xl p-7">
            {activeTab === 'orders' && (
              <div>
                <h2 className="font-display font-semibold text-ink mb-6">Order History</h2>
                <div className="space-y-4">
                  {customerOrders.map(order => (
                    <div key={order.id} className="border border-porcelain-line rounded-xl p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-mono text-sm text-ink">{order.orderNumber}</h3>
                          <p className="text-sm text-ink-soft">Placed on {order.date}</p>
                        </div>
                        <span className={`label-tag px-2.5 py-1 rounded-full ${statusStyle(order.orderStatus)}`}>{order.orderStatus}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-ink-muted text-sm">{order.items.length} items</span>
                        <div className="flex items-center gap-4">
                          <span className="font-mono font-medium text-ink tabular">${order.total.toFixed(2)}</span>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'wishlist' && (
              <div>
                <h2 className="font-display font-semibold text-ink mb-6">My Wishlist ({favorites.length})</h2>
                {favorites.length === 0 ? (
                  <p className="text-ink-muted">Your wishlist is empty.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favorites.map(product => (
                      <div key={product.id} className="border border-porcelain-line rounded-xl p-4 flex gap-4">
                        <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-ink truncate">{product.name}</h3>
                          <p className="text-sm text-ink-soft">{product.category}</p>
                          <p className="font-mono font-semibold text-ink mt-2 tabular">${product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display font-semibold text-ink mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-ink-muted mb-2 block">First Name</label>
                      <input type="text" className="input" defaultValue={customer?.name.split(' ')[0]} />
                      </div>
                      <div>
                        <label className="text-sm text-ink-muted mb-2 block">Last Name</label>
                      <input type="text" className="input" defaultValue={customer?.name.split(' ').slice(1).join(' ')} />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-ink-muted mb-2 block">Email</label>
                    <input type="email" className="input" defaultValue={customer?.email} />
                    </div>
                    <div>
                      <label className="text-sm text-ink-muted mb-2 block">Phone</label>
                    <input type="tel" className="input" defaultValue={customer?.phone} />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-ink mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-ink-muted mb-2 block">Current Password</label>
                      <input type="password" className="input" />
                    </div>
                    <div>
                      <label className="text-sm text-ink-muted mb-2 block">New Password</label>
                      <input type="password" className="input" />
                    </div>
                    <div>
                      <label className="text-sm text-ink-muted mb-2 block">Confirm New Password</label>
                      <input type="password" className="input" />
                    </div>
                  </div>
                </div>
                <Button>Save Changes</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
