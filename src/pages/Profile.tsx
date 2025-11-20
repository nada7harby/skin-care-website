import React, { useState } from 'react';
import { UserIcon, PackageIcon, HeartIcon, SettingsIcon } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { Button } from '../components/ui/Button';
export const Profile: React.FC = () => {
  const {
    favorites
  } = useFavorites();
  const [activeTab, setActiveTab] = useState('orders');
  const orders = [{
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 89.97,
    items: 3
  }, {
    id: 'ORD-002',
    date: '2024-01-10',
    status: 'In Transit',
    total: 54.99,
    items: 2
  }, {
    id: 'ORD-003',
    date: '2024-01-05',
    status: 'Processing',
    total: 124.98,
    items: 4
  }];
  return <div className="container-custom py-12">
      <h1 className="text-3xl font-bold text-primary-dark mb-8">My Account</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mb-3">
                <UserIcon size={32} className="text-primary-dark" />
              </div>
              <h2 className="font-semibold text-primary-dark">Sarah Johnson</h2>
              <p className="text-sm text-gray-600">sarah.j@email.com</p>
            </div>
            <nav className="space-y-2">
              <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${activeTab === 'orders' ? 'bg-primary-dark text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                <PackageIcon size={18} className="mr-2" />
                My Orders
              </button>
              <button onClick={() => setActiveTab('wishlist')} className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${activeTab === 'wishlist' ? 'bg-primary-dark text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                <HeartIcon size={18} className="mr-2" />
                Wishlist
              </button>
              <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${activeTab === 'settings' ? 'bg-primary-dark text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                <SettingsIcon size={18} className="mr-2" />
                Settings
              </button>
            </nav>
          </div>
        </div>
        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'orders' && <div>
                <h2 className="text-2xl font-bold text-primary-dark mb-6">
                  Order History
                </h2>
                <div className="space-y-4">
                  {orders.map(order => <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-primary-dark">
                            {order.id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Placed on {order.date}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          {order.items} items
                        </span>
                        <div className="flex items-center space-x-4">
                          <span className="font-semibold text-primary-dark">
                            ${order.total.toFixed(2)}
                          </span>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>}
            {activeTab === 'wishlist' && <div>
                <h2 className="text-2xl font-bold text-primary-dark mb-6">
                  My Wishlist ({favorites.length})
                </h2>
                {favorites.length === 0 ? <p className="text-gray-600">Your wishlist is empty.</p> : <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favorites.map(product => <div key={product.id} className="border rounded-lg p-4 flex">
                        <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                        <div className="flex-1">
                          <h3 className="font-medium text-primary-dark">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {product.category}
                          </p>
                          <p className="font-semibold text-primary-dark mt-2">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </div>)}
                  </div>}
              </div>}
            {activeTab === 'settings' && <div>
                <h2 className="text-2xl font-bold text-primary-dark mb-6">
                  Account Settings
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">
                      Personal Information
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-2">
                            First Name
                          </label>
                          <input type="text" className="input" defaultValue="Sarah" />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2">
                            Last Name
                          </label>
                          <input type="text" className="input" defaultValue="Johnson" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">
                          Email
                        </label>
                        <input type="email" className="input" defaultValue="sarah.j@email.com" />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">
                          Phone
                        </label>
                        <input type="tel" className="input" defaultValue="+1 (555) 123-4567" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input type="password" className="input" />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">
                          New Password
                        </label>
                        <input type="password" className="input" />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input type="password" className="input" />
                      </div>
                    </div>
                  </div>
                  <Button>Save Changes</Button>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};