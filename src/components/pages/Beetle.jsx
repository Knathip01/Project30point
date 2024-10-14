import { useState, useEffect } from 'react';

// ข้อมูลสินค้า
const products = [
  { id: 1, name: 'white Eye Body kabuto Beetle', price: 7000, image: 'https://img.aucfree.com/c1042985545.1.jpg' },
  { id: 2, name: 'Megasoma actaeon', price: 9000, image: 'https://mushinavi.com/kabukabu/jp-actaeon/f-actaeon12.jpg' },
  { id: 3, name: 'Golofa pizarro', price: 9500, image: 'https://i.pinimg.com/originals/9e/37/76/9e37766c431c4141028d26e676f1c929.jpg' },
  { id: 4, name: 'Dynastes granti', price: 10000, image: 'https://th.bing.com/th/id/R.018ed2233dc9c9b7ec7c3f590b00233e?rik=RFlUGYESzdAeCA&riu=http%3a%2f%2fwww.zap-co.com%2fstaff_blog%2fwp-content%2fuploads%2f2015%2f06%2ff-grant56.jpg&ehk=O2ACKWHug959l%2fTtaXIWysQpwhzWnocbiOep80EVy1w%3d&risl=&pid=ImgRaw&r=0' },
  { id: 5, name: 'Dynastes maya', price: 5000, image: 'https://mushinavi.com/kabukabu/jp-hyllus/f-hyllus20.jpg' },
  { id: 6, name: 'Megasoma elephas elephas', price: 7500, image: 'https://s.kaskus.id/images/2013/11/11/5512667_20131111064323.jpg' },
  { id: 7, name: 'Dynastes hercules ecuatorianus', price: 12000, image: 'https://th.bing.com/th/id/R.8b5be19c5026933e5ec45d0a30368eb9?rik=5K5z0SNf%2bV%2fcwA&riu=http%3a%2f%2fbeetlespace.wz.cz%2fdruhy%2ffotky%2fDynastes_hercules_ecuatorianus_09.jpg&ehk=ZdqL6PRJr3xoq%2boCRgdrNHpfb%2fs7b4v5z8x1MkuTD0k%3d&risl=&pid=ImgRaw&r=0' },
  { id: 8, name: 'Sumatran Atlas', price: 10000, image: 'https://dorcusdanke.itembox.design/item/1254908991.jpg?t=20210218095400' },
  { id: 9, name: 'Dynastes hercules hercules', price: 19000, image: 'https://img.aucfree.com/f149659226.1.jpg' },
  { id: 10, name: 'Dynastes Satanas', price: 9500, image: 'https://i.pinimg.com/736x/10/11/dd/1011dd5333e53be34a1ec6bf0480f88a.jpg' },
];

function ProductCard({ product, addToCart, colorIndex, couponColors }) {
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      margin: '25px', 
      padding: '25px', 
      backgroundColor: '#f0fff0', 
      textAlign: 'center', 
      transition: 'transform 0.2s', 
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
      borderRadius: '10px',
      width: '200px',
      height: 'auto'
    }} 
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} 
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
      <img src={product.image} alt={product.name} style={{ width: '150px', height: '150px', borderRadius: '10px' }} />
      <h3 style={{ color: 'black' }}>{product.name}</h3>
      <p style={{ color: 'black' }}>ราคา: {product.price} บาท</p>
      <button onClick={() => addToCart(product)} style={{ color: couponColors[colorIndex] }}>
        🛒 เพิ่มลงตะกร้า
      </button>
    </div>
  );
}

export default function ProductList() {
  const [cart, setCart] = useState([]);
  const [colorIndex, setColorIndex] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState('');
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
    const isLucky = Math.random() < 0.1; // โอกาส 10% ในการได้รับคูปอง
    if (isLucky) {
      setCoupon(0.3); // ให้ส่วนลด 30%
      setCouponMessage('ยินดีด้วย! คุณได้รับคูปองส่วนลด 30%!');
    } else {
      setCoupon(null); // ไม่ได้รับส่วนลด
      setCouponMessage('เสียใจด้วย! คุณไม่ได้รับคูปองส่วนลด');
    }
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

      <button onClick={generateRandomCoupon} style={{ display: 'block', margin: '0 auto' }}>
        🎁 สุ่มคูปองส่วนลด
      </button>

      {couponMessage && (
        <p style={{ textAlign: 'center', fontSize: '16px', color: coupon ? 'green' : 'red' }}>
          {couponMessage}
        </p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} colorIndex={colorIndex} couponColors={couponColors} />
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
