import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, User, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const products = [
  { id: 1, name: { th: 'สมาร์ทโฟน', en: 'Smartphone' }, price: 15000, image: '/api/placeholder/200/200' },
  { id: 2, name: { th: 'แล็ปท็อป', en: 'Laptop' }, price: 30000, image: '/api/placeholder/200/200' },
  { id: 3, name: { th: 'หูฟังไร้สาย', en: 'Wireless Headphones' }, price: 5000, image: '/api/placeholder/200/200' },
  { id: 4, name: { th: 'กล้องดิจิตอล', en: 'Digital Camera' }, price: 20000, image: '/api/placeholder/200/200' },
];

const translations = {
  th: {
    appName: 'UDSt - SHOP',
    search: 'ค้นหาสินค้า...',
    addToCart: 'เพิ่มลงตะกร้า',
    register: 'สมัครสมาชิก',
    login: 'เข้าสู่ระบบ',
    firstName: 'ชื่อ',
    lastName: 'นามสกุล',
    phone: 'เบอร์โทรศัพท์',
    address: 'ที่อยู่จัดส่ง',
    email: 'อีเมล (ถ้ามี)',
    password: 'รหัสผ่าน',
    submit: 'ยืนยัน',
    haveAccount: 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ',
    noAccount: 'ยังไม่มีบัญชี? สมัครสมาชิก',
    changeLanguage: 'เปลี่ยนภาษา',
  },
  en: {
    appName: 'UDSt - SHOP',
    search: 'Search products...',
    addToCart: 'Add to Cart',
    register: 'Register',
    login: 'Login',
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone Number',
    address: 'Shipping Address',
    email: 'Email (optional)',
    password: 'Password',
    submit: 'Submit',
    haveAccount: 'Have an account? Login',
    noAccount: 'No account? Register',
    changeLanguage: 'Change Language',
  },
};

const ProductCard = ({ product, addToCart, lang }) => (
  <Card className="w-full h-full flex flex-col">
    <CardHeader>
      <CardTitle className="text-lg">{product.name[lang]}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <img src={product.image} alt={product.name[lang]} className="w-full h-40 object-cover mb-2" />
      <p className="text-lg font-bold">{product.price.toLocaleString()} ฿</p>
    </CardContent>
    <CardFooter>
      <Button onClick={() => addToCart(product)} className="w-full">{translations[lang].addToCart}</Button>
    </CardFooter>
  </Card>
);

const Header = ({ cartItems, openLoginDialog, lang, setLang }) => (
  <header className="bg-blue-600 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">{translations[lang].appName}</h1>
      <nav className="flex items-center space-x-4">
        <Select value={lang} onValueChange={setLang}>
          <SelectTrigger className="w-[180px]">
            <Globe className="mr-2 h-4 w-4" />
            <SelectValue placeholder={translations[lang].changeLanguage} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="th">ไทย</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
        <Menu className="cursor-pointer" />
        <User className="cursor-pointer" onClick={openLoginDialog} />
        <div className="relative">
          <ShoppingCart className="cursor-pointer" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItems.length}
            </span>
          )}
        </div>
      </nav>
    </div>
  </header>
);

const SearchBar = ({ lang }) => (
  <div className="container mx-auto my-4">
    <div className="flex">
      <Input type="text" placeholder={translations[lang].search} className="flex-grow" />
      <Button className="ml-2"><Search /></Button>
    </div>
  </div>
);

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    '/api/placeholder/1200/400',
    '/api/placeholder/1200/400',
    '/api/placeholder/1200/400',
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide}
          alt={`Slide ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

const LoginDialog = ({ isOpen, onClose, lang }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isRegistering ? translations[lang].register : translations[lang].login}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <>
              <div>
                <Label htmlFor="firstName">{translations[lang].firstName}</Label>
                <Input id="firstName" name="firstName" required onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="lastName">{translations[lang].lastName}</Label>
                <Input id="lastName" name="lastName" required onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="phone">{translations[lang].phone}</Label>
                <Input id="phone" name="phone" type="tel" required onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="address">{translations[lang].address}</Label>
                <Input id="address" name="address" required onChange={handleInputChange} />
              </div>
            </>
          )}
          <div>
            <Label htmlFor="email">{translations[lang].email}</Label>
            <Input id="email" name="email" type="email" onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="password">{translations[lang].password}</Label>
            <Input id="password" name="password" type="password" required onChange={handleInputChange} />
          </div>
          <Button type="submit">{translations[lang].submit}</Button>
        </form>
        <Button variant="link" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? translations[lang].haveAccount : translations[lang].noAccount}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [lang, setLang] = useState('th');

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        cartItems={cartItems} 
        openLoginDialog={() => setIsLoginDialogOpen(true)} 
        lang={lang}
        setLang={setLang}
      />
      <SearchBar lang={lang} />
      <div className="container mx-auto my-4">
        <ImageSlider />
      </div>
      <main className="container mx-auto my-8">
        <div className="grid grid-cols-2 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} lang={lang} />
          ))}
        </div>
      </main>
      <LoginDialog isOpen={isLoginDialogOpen} onClose={() => setIsLoginDialogOpen(false)} lang={lang} />
    </div>
  );
};

export default App;
