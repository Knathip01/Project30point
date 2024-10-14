import { useState, useEffect } from 'react';

// ข้อมูลสินค้า
const products = [
  { id: 1, name: 'Odontolabis brookeana', price: 5000, image: 'https://th.bing.com/th/id/OIP.Di4fZhawtDgBnRZNRjbhcwHaFj?rs=1&pid=ImgDetMain' },
  { id: 2, name: 'Rainbow Stag Beetle', price: 3500, image: 'https://th.bing.com/th/id/OIP.obNV9vTKoSZc0mTe4uOsxgHaHa?w=750&h=750&rs=1&pid=ImgDetMain' },
  { id: 3, name: 'Prosopocoilus fabricei', price: 4000, image: 'https://musiya.com/hp/daizukan/pict/fabricei_noko.jpg' },
  { id: 4, name: 'Rhaetulus ssp', price: 4500, image: 'https://musiya.com/hp/daizukan/pict/supekiosusu(kawanoi).jpg' },
  { id: 5, name: 'Odontolabis dalmanni', price: 3000, image: 'https://musiya.com/hp/daizukan/pict/dalman_tuyakuwa.jpg' },
  { id: 6, name: 'Dorcus hopei binodulus', price: 7500, image: 'https://musiya.com/hp/daizukan/pict/ookuwagata.JPG' },
  { id: 7, name: 'Dorcus ritsemae ritsemae', price: 4000, image: 'https://musiya.com/hp/daizukan/pict/pari-ookuwa.jpg' },
  { id: 8, name: 'Dorcus thoracicus', price: 4500, image: 'https://musiya.com/hp/daizukan/pict/thoracicus_hirata.jpg' },
  { id: 9, name: 'Lucanus akbesianus cervus', price: 4000, image: 'https://www.msxlabs.org/forum/attachments/30423-akbez-geyik-bocegi-lucanus-akbesianus-cervus-geyik-bocegi.jpg' },
  { id: 10, name: 'Archides hirat', price: 5500, image: 'https://th.bing.com/th/id/R.3bd341c086bbbf8dd1d6239b7edb7f56?rik=YmghGAaRkG%2bnUA&riu=http%3a%2f%2fimg13.shop-pro.jp%2fPA01090%2f320%2fetc%2f559.JPG%3f2128&ehk=9nrYtNadR8kGcGGmLtnz6dEfNsPAWZ6wHfnzEAkoibo%3d&risl=&pid=ImgRaw&r=0' },
];

export default function ProductList() {
  const [cart, setCart] = useState([]);
  const [colorIndex, setColorIndex] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [shippingFee] = useState(100);

  const couponColors = ['red', 'green', 'black', 'blue', 'cyan'];

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const updateQuantity = (product, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(product);
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const generateRandomCoupon = () => {
    const discountOptions = [0, 0.3]; // ลดเหลือแค่ไม่ได้รับส่วนลดและรับคูปอง 30%
    const randomIndex = Math.floor(Math.random() * discountOptions.length);
    const randomDiscount = discountOptions[randomIndex];
    setCoupon(randomDiscount);
  };

  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
  const discount = coupon ? coupon * totalPrice : 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % couponColors.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div style={{ 
      backgroundImage: 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)', 
      minHeight: '100vh', 
      padding: '20px' 
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: couponColors[colorIndex], 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        Photharam Beetle Shop
        <div style={{ marginLeft: '10px', display: 'inline-block' }}>
          🛒 ({totalItemsInCart})
        </div>
      </h1>

      <button onClick={generateRandomCoupon} style={{ display: 'block', margin: '0 auto', padding: '10px 20px', fontSize: '16px', borderRadius: '5px' }}>
        🎁 สุ่มคูปองส่วนลด
      </button>

      {coupon !== null && (
        <p style={{ textAlign: 'center', fontSize: '16px', color: coupon > 0 ? 'green' : 'red' }}>
          {coupon > 0 ? 'ยินดีด้วย! คุณได้รับคูปองส่วนลด 30%!' : 'เสียใจด้วย! คุณไม่ได้รับคูปองส่วนลด'}
        </p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products.map((product) => (
          <div key={product.id} style={{ 
            border: '1px solid #ccc', 
            margin: '25px', 
            padding: '15px', 
            backgroundColor: '#f0fff0', 
            borderRadius: '10px',
            width: '200px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
            textAlign: 'center' 
          }}>
            <img src={product.image} alt={product.name} style={{ width: '150px', height: '150px', borderRadius: '10px' }} />
            <h3 style={{ color: 'black' }}>{product.name}</h3>
            <p style={{ color: 'black' }}>ราคา: {product.price} บาท</p>
            <button onClick={() => addToCart(product)} style={{ color: couponColors[colorIndex], padding: '5px 10px', borderRadius: '5px' }}>
              🛒 เพิ่มลงตะกร้า
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center', border: '2px solid #000', padding: '20px', backgroundColor: '#e0f7e0' }}>
        <h2 style={{ color: couponColors[colorIndex] }}>🛍️ ตะกร้าสินค้า</h2>
        {cart.length === 0 ? (
          <p style={{ color: 'black' }}>ไม่มีสินค้าในตะกร้า</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((product) => (
              <li key={product.id} style={{ marginBottom: '10px', color: 'black' }}>
                {product.name} - {product.price} บาท x {product.quantity}
                <div>
                  <button onClick={() => updateQuantity(product, product.quantity - 1)}>➖</button>
                  <button onClick={() => updateQuantity(product, product.quantity + 1)}>➕</button>
                  <button onClick={() => removeFromCart(product)}>❌ ลบ</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p style={{ color: 'black' }}>ยอดรวม: {totalPrice} บาท</p>
        {coupon && <p style={{ color: 'black' }}>ส่วนลด: {discount} บาท</p>}
        <p style={{ color: 'black' }}>ค่าจัดส่ง: {shippingFee} บาท</p>
        <p style={{ color: 'black' }}>ยอดชำระทั้งหมด: {totalPrice - discount + shippingFee} บาท</p>
      </div>
    </div>
  );
}
