import { Heart, Star, Recycle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { itemService } from "../../services/itemService"

export default function BrowseItems() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await itemService.getItems();
        setItems(response.items);
        setError(null);
      } catch (err) {
        setError('Failed to fetch items. Please try again later.');
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-slate-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/80 border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="relative">
                <Recycle className="h-9 w-9 text-emerald-600 drop-shadow-sm" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ReWear
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl font-bold text-slate-900">Browse Items</h1>
          <p className="text-slate-600 max-w-[600px] mx-auto text-lg">
            Discover amazing pre-loved items from our community members. Each piece has been carefully curated and is
            ready for its next adventure.
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="relative">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110">
                  <Heart className="h-4 w-4 text-slate-600 hover:text-red-500 transition-colors" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-slate-900">{item.title}</h3>
                <p className="text-2xl font-bold text-emerald-600 mb-4">{item.points} points / 3 days</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="border-2 border-slate-200 px-3 py-1.5 rounded-full text-sm font-semibold text-slate-700">
                    Size {item.size}
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                    {item.condition}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-slate-700">{item.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                    <span className="text-sm font-bold text-slate-700">{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 