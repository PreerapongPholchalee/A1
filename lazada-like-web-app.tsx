import React, { useState, useEffect } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardHeader,
  DialogContent,
  Dialog,
  DialogTitle,
} from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { Globe, Menu, User, ShoppingCart, Search, ChevronLeft, ChevronRight } from 'lucide-react';

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
    <CardHeader title={product.name[lang]} />
    <CardContent className="flex-grow">
      <CardMedia component="img" image={product.image} alt={product.name[lang]} className="w-full h-40 object-cover mb-2" />
      <Typography variant="h6" className="text-lg font-bold">
        {product.price.toLocaleString()} ฿
      </Typography>
    </CardContent>
    <CardActions>
      <Button onClick={() => addToCart(product)} className="w-full">
        {translations[lang].addToCart}
      </Button>
    </CardActions>
  </Card>
);

const Header = ({ cartItems, openLoginDialog, lang, setLang }) => (
  <header className="bg-blue-600 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">{translations[lang].appName}</h1>
      <nav className="flex items-center space-x-4">
        <Select value={lang} onChange={(e) => setLang(e.target.value)}>
          <MenuItem value="th">ไทย</MenuItem>
          <MenuItem value="en">English</MenuItem>
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
      <input type="text" placeholder={translations[lang].search} className="flex-grow" />
      <Button className="ml-2">
        <Search />
      </Button>
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
      <button onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <ChevronLeft />
      </button>
      <button> onClick=(nextSlide) className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      {'>'}
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
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogTitle>{isRegistering ? translations[lang].register : translations[lang].login}</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <>
              <div>
                <label htmlFor="firstName">{translations[lang].firstName}</label>
                <input id="firstName" name="firstName" required onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="lastName">{translations[lang].lastName}</label>
                <input id="lastName" name="lastName" required onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="phone">{translations[lang].phone}</label>
                <input id="phone" name="phone" type="tel" required onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="address">{translations[lang].address}</label>
                <input id="address" name="address" required onChange={handleInputChange} />
              </div>
            </>
          )}
          <div>
            <label htmlFor="email">{translations[lang].email}</label>
            <input id="email" name="email" type="email" onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="password">{translations[lang].password}</label>
            <input id="password" name="password" type="password" required onChange={handleInputChange} />
          </div>
          <div>
            <Button type="submit" className="w-full">
              {translations[lang].submit}
            </Button>
          </div>
        </form>
        <Button onClick={() => setIsRegistering(!isRegistering)} className="mt-4">
          {isRegistering ? translations[lang].haveAccount : translations[lang].noAccount}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const App = () => {
  const [lang, setLang] = useState('th');
  const [cartItems, setCartItems] = useState([]);
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems:([cartItems, product]);
  };

  return (
    <div>
      <Header cartItems={cartItems} openLoginDialog={() => setLoginDialogOpen(true)} lang={lang} setLang={setLang} />
      <SearchBar lang={lang} />
      <ImageSlider />
      <div className="container mx-auto my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} lang={lang} />
        ))}
      </div>
      <LoginDialog isOpen={isLoginDialogOpen} onClose={() => setLoginDialogOpen(false)} lang={lang} />
    </div>
  );
};

export default App;
