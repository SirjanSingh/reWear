import { ArrowLeft, Heart, Star, Clock, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StartSwapping() {
  const navigate = useNavigate();

  const swapItems = [
    {
      id: 1,
      title: "Vintage Levi's Denim Jacket",
      description: "Classic blue denim jacket from the 90s, perfect condition",
      size: "M",
      condition: "Excellent",
      points: 500,
      exchangeTime: "2-3 days",
      likes: 24,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=300"
    },
    {
      id: 2,
      title: "Gucci Silk Scarf",
      description: "Authentic Gucci scarf with floral pattern",
      size: "One Size",
      condition: "Like New",
      points: 800,
      exchangeTime: "1-2 days",
      likes: 18,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300"
    },
    {
      id: 3,
      title: "Cashmere Sweater",
      description: "Pure cashmere sweater in navy blue",
      size: "L",
      condition: "Good",
      points: 600,
      exchangeTime: "2-4 days",
      likes: 31,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300"
    },
    {
      id: 4,
      title: "Nike Air Max",
      description: "Limited edition sneakers, barely worn",
      size: "9",
      condition: "Very Good",
      points: 700,
      exchangeTime: "3-4 days",
      likes: 42,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300"
    },
  ];

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
            {swapItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden w-full">
                <div className="relative">
                  <img
                    src={item.image}
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
                      {item.exchangeTime}
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