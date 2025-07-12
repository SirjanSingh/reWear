import { ChevronLeft, ChevronRight, Heart, Star, Users, Recycle, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const featuredItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      size: "M",
      condition: "Excellent",
      likes: 24,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Designer Silk Scarf",
      size: "One Size",
      condition: "Like New",
      likes: 18,
      rating: 4.9,
    },
    {
      id: 3,
      title: "Cozy Wool Sweater",
      size: "L",
      condition: "Good",
      likes: 31,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Classic White Sneakers",
      size: "9",
      condition: "Very Good",
      likes: 42,
      rating: 4.6,
    },
    {
      id: 5,
      title: "Floral Summer Dress",
      size: "S",
      condition: "Excellent",
      likes: 27,
      rating: 4.8,
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, featuredItems.length - 2))
  }

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + Math.max(1, featuredItems.length - 2)) % Math.max(1, featuredItems.length - 2),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/80 border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Recycle className="h-9 w-9 text-emerald-600 drop-shadow-sm" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ReWear
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors duration-200 relative group">
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors duration-200 relative group">
                Community
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#" className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors duration-200 relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <button 
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              onClick={()=>{
                navigate('/login');
              }}>
                Login
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-600/5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16 xl:grid-cols-[1fr_600px] items-center">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold shadow-sm">
                  <Recycle className="w-4 h-4 mr-2" />
                  Sustainable Fashion
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                  ReWear Community
                  <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Clothing Exchange
                  </span>
                </h1>
                <p className="max-w-[600px] text-lg md:text-xl text-slate-600 leading-relaxed">
                  Join our sustainable fashion community where you can swap, share, and discover pre-loved clothing.
                  Give your wardrobe a refresh while reducing fashion waste and connecting with like-minded people.
                </p>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <button 
                  onClick={() => navigate('/start-swapping')}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Start Swapping
                </button>
                <button 
                  onClick={() => navigate('/browse-items')}
                  className="border-2 border-slate-300 hover:border-emerald-600 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-sm hover:shadow-md">
                  Browse Items
                </button>
                              <button 
                onClick={() => navigate('/list-item')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-sm hover:shadow-md">
                List an Item
              </button>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 pt-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-100 rounded-full">
                    <Users className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-slate-900">10K+</span>
                    <p className="text-sm text-slate-600">Members</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-100 rounded-full">
                    <ShoppingBag className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-slate-900">50K+</span>
                    <p className="text-sm text-slate-600">Items Swapped</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-100 rounded-full">
                    <Recycle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-lg font-bold text-slate-900">100%</span>
                    <p className="text-sm text-slate-600">Eco-Friendly</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/20 to-teal-600/20 rounded-3xl transform rotate-6"></div>
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop"
                width="600"
                height="600"
                alt="ReWear Community"
                className="relative aspect-square overflow-hidden rounded-3xl object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Featured Items</h2>
            <p className="text-slate-600 max-w-[600px] mx-auto text-lg">
              Discover amazing pre-loved items from our community members. Each piece has been carefully curated and is
              ready for its next adventure.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}
              >
                {featuredItems.map((item) => (
                  <div key={item.id} className="w-1/3 flex-shrink-0 px-3">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=250&h=300&fit=crop"
                          alt={item.title}
                          width={250}
                          height={300}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <button className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110">
                          <Heart className="h-4 w-4 text-slate-600 hover:text-red-500 transition-colors" />
                        </button>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-3 text-slate-900">{item.title}</h3>
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
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white border-2 border-slate-200 hover:border-emerald-600 hover:bg-emerald-50 p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5 text-slate-600 hover:text-emerald-600" />
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white border-2 border-slate-200 hover:border-emerald-600 hover:bg-emerald-50 p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5 text-slate-600 hover:text-emerald-600" />
            </button>
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              View All Items
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">How ReWear Works</h2>
            <p className="text-slate-600 max-w-[600px] mx-auto text-lg">
              Join our sustainable fashion community in three simple steps
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center space-y-6 group">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">List Your Items</h3>
              <p className="text-slate-600 leading-relaxed">Upload photos and details of clothing items you no longer wear</p>
            </div>
            <div className="text-center space-y-6 group">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Browse & Connect</h3>
              <p className="text-slate-600 leading-relaxed">Discover items you love and connect with other community members</p>
            </div>
            <div className="text-center space-y-6 group">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Swap & Enjoy</h3>
              <p className="text-slate-600 leading-relaxed">Arrange swaps and give your wardrobe a sustainable refresh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Recycle className="h-8 w-8 text-emerald-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  ReWear
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Building a sustainable fashion community, one swap at a time.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-white">Platform</h4>
              <div className="space-y-3">
                <a href="#" className="block text-slate-300 hover:text-emerald-400 transition-colors duration-200">
                  How It Works
                </a>
                <a href="#" className="block text-slate-300 hover:text-emerald-400 transition-colors duration-200">
                  Browse Items
                </a>
                <a href="#" className="block text-slate-300 hover:text-emerald-400 transition-colors duration-200">
                  List an Item
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-white">Community</h4>
              <div className="space-y-3">
                <a href="#" className="block text-slate-300 hover:text-emerald-400 transition-colors duration-200">
                  Guidelines
                </a>
                <a href="#" className="block text-slate-300 hover:text-emerald-400 transition-colors duration-200">
                  Safety Tips
                </a>
                <a href="#" className="block text-slate-300 hover:text-emerald-400 transition-colors duration-200">
                  Success Stories
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-white">Support</h4>
              <div className="space-y-3">
                <a href="#" className="block text-slate-300 hover:text-emerald-400 transition-colors duration-200">
                  Help Center
                </a>
                <a href="#" className="block text-slate-300 hover:text-emerald-400 transition-colors duration-200">
                  Contact Us
                </a>
                <a href="#" className="block text-slate-300 hover:text-emerald-400 transition-colors duration-200">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} ReWear Community. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}