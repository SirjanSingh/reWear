import { ArrowLeft, Heart, Star, Clock, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { itemService } from "../../services/itemService";

export default function StartSwapping() {
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
          <p className="mt-4 text-slate-600">Loading available items...</p>
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
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-slate-600 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Start Swapping</h1>
            <p className="text-lg text-slate-600">
              Browse through available items and start your sustainable fashion journey.
              Each item has a point value and estimated exchange time.
            </p>
          </div>

          {/* Points Guide */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-4">How Points Work</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <Award className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Earn Points</h3>
                  <p className="text-sm text-slate-600">List your items to earn points</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Star className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Spend Points</h3>
                  <p className="text-sm text-slate-600">Use points to swap for items</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900">Exchange Time</h3>
                  <p className="text-sm text-slate-600">Estimated delivery time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {items.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden w-full">
                <div className="relative">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full aspect-square object-cover"
                  />
                  <button className="absolute top-5 right-5 p-2.5 rounded-full bg-white/90 hover:bg-white transition-colors">
                    <Heart className="h-5 w-5 text-slate-600 hover:text-red-500 transition-colors" />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg text-slate-900">{item.title}</h3>
                    <div className="flex items-center bg-emerald-50 px-3 py-1.5 rounded-full">
                      <span className="font-medium text-emerald-600">{item.points} pts</span>
                    </div>
                  </div>
                  <p className="text-base text-slate-600 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="text-base text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full">
                      Size {item.size}
                    </span>
                    <span className="text-base text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full">
                      {item.condition}
                    </span>
                    <span className="text-base text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full flex items-center">
                      <Clock className="h-4 w-4 mr-1.5" />
                      2-3 days
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1.5 text-base font-medium text-slate-700">{item.rating}</span>
                    </div>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full text-base font-medium transition-colors">
                      Swap Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 