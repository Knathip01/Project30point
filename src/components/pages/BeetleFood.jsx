import { useState, useEffect } from 'react';

// ข้อมูลสินค้า
const products = [
  { id: 1, name: '《ไม้โอ๊ค》', price: 500, image: 'https://lzd-img-global.slatic.net/g/p/f27fa2b9a32ed68e23f1c99f5ab1ace1.jpg_720x720q80.jpg' },
  { id: 2, name: '《Dmat natural 50ลิตร》', price: 770, image: 'https://down-th.img.susercontent.com/file/34a574f2078bc4973e3f4338a3efca03@resize_w450_nl.webp' },
  { id: 3, name: '《Dmat Pro+ 50ลิตร》', price: 1670, image: 'https://down-th.img.susercontent.com/file/95744de44983a5d5e7f79e1c91bb424f@resize_w450_nl.webp' },
  { id: 4, name: '《Lmat pro+  50ลิตร》', price: 1670, image: 'https://down-th.img.susercontent.com/file/1ddf799791a64f9cccde56b91b314104@resize_w450_nl.webp' },
  { id: 5, name: '《Dmat natural 9ลิตร》', price: 136, image: 'https://down-th.img.susercontent.com/file/12620519fa219127072194bd6fbf6556.webp' },
  { id: 6, name: '《Dmat Pro+ 9ลิตร》', price: 156, image: 'https://down-th.img.susercontent.com/file/44abb54911ce45ecee05754183b5669e@resize_w450_nl.webp' },
  { id: 7, name: '《Lmat Pro+ 9ลิตร》', price: 153, image: 'https://down-th.img.susercontent.com/file/119b264860900209a4bf3b2d5cba3d65@resize_w450_nl.webp' },
  { id: 8, name: '《ELmat Pro+》', price: 153, image: 'https://down-th.img.susercontent.com/file/ff020ce2b8377164e07c15a8eac41ff2@resize_w450_nl.webp' },
  { id: 9, name: 'เชื้อเห็ดนางฟ้า 1600cc', price: 100, image: 'https://down-th.img.susercontent.com/file/824a8a3239fa1e4ccae2f429e6f50f4e.webp' },
  { id: 10, name: 'Kabuto mat', price: 150, image: 'https://down-th.img.susercontent.com/file/a2836a648c52a1b4dd6e0dccf72c2c16@resize_w450_nl.webp' },
  { id: 11, name: 'Kuwa mat', price: 150, image: 'https://down-th.img.susercontent.com/file/15ff109327acc0125d15bf1d7bc2fe9a.webp' },
  { id: 12, name: 'Kinshi', price: 150, image: 'https://down-th.img.susercontent.com/file/sg-11134201-22120-cilqssb5nqlv23.webp' },
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
    const discountOptions = [0, 0.7]; // เพิ่ม 0 เพื่อสุ่มไม่ได้รับคูปอง
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

      <button onClick={generateRandomCoupon} style={{ display: 'block', margin: '0 auto' }}>
        🎁 สุ่มคูปองส่วนลด
      </button>

      {coupon !== null && (
        <p style={{ textAlign: 'center', color: coupon > 0 ? 'green' : 'red', fontSize: '16px' }}>
          {coupon > 0 ? `ยินดีด้วย! คุณได้รับคูปองส่วนลด ${coupon * 100}%!` : 'เสียใจด้วย! คุณไม่ได้รับคูปองส่วนลด'}
        </p>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        justifyItems: 'center', 
        marginTop: '20px'
      }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '20px', backgroundColor: '#f0fff0', borderRadius: '10px', textAlign: 'center' }}>
            <img src={product.image} alt={product.name} style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px' }} />
            <h3 style={{ color: 'black', marginTop: '10px' }}>{product.name}</h3>
            <p style={{ color: 'black' }}>ราคา: {product.price} บาท</p>
            <button onClick={() => addToCart(product)} style={{ color: couponColors[colorIndex], padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
              🛒 เพิ่มลงตะกร้า
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center', border: '2px solid #000', padding: '20px', backgroundColor: '#e0f7e0', borderRadius: '10px' }}>
        <h2 style={{ color: couponColors[colorIndex] }}>🛍️ ตะกร้าสินค้า</h2>
        {cart.length === 0 ? (
          <p style={{ color: 'black' }}>ไม่มีสินค้าในตะกร้า</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((product) => (
              <li key={product.id} style={{ marginBottom: '10px', color: 'black' }}>
                {product.name} - {product.price} บาท x {product.quantity}
                <div style={{ marginTop: '5px' }}>
                  <button onClick={() => updateQuantity(product, product.quantity - 1)} style={{ marginRight: '5px' }}>➖</button>
                  <button onClick={() => updateQuantity(product, product.quantity + 1)} style={{ marginRight: '5px' }}>➕</button>
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
