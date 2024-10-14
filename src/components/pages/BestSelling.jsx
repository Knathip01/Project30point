import { useState, useEffect } from 'react'; 
import Popup from "../Popup";  // นำเข้า Popup สำหรับ Order Now

// รายการสินค้าตัวอย่าง
const products = [
  { id: 1, name: 'white Eye Body kabuto Beetle', price: 7000, image: 'https://img.aucfree.com/c1042985545.1.jpg' },
  { id: 2, name: 'Megasoma actaeon', price: 9000, image: 'https://mushinavi.com/kabukabu/jp-actaeon/f-actaeon12.jpg' },
  { id: 3, name: 'Golofa pizarro', price: 9500, image: 'https://i.pinimg.com/originals/9e/37/76/9e37766c431c4141028d26e676f1c929.jpg' },
  { id: 4, name: 'Dynastes granti', price: 10000, image: 'https://th.bing.com/th/id/R.018ed2233dc9c9b7ec7c3f590b00233e?rik=RFlUGYESzdAeCA&riu=http%3a%2f%2fwww.zap-co.com%2fstaff_blog%2fwp-content%2fuploads%2f2015%2f06%2ff-grant56.jpg&ehk=O2ACKWHug959l%2fTtaXIWysQpwhzWnocbiOep80EVy1w%3d&risl=&pid=ImgRaw&r=0' },
  { id: 5, name: 'Dynastes maya', price: 5000, image: 'https://mushinavi.com/kabukabu/jp-hyllus/f-hyllus20.jpg' },
  { id: 6, name: 'Megasoma  elephas', price: 7500, image: 'https://s.kaskus.id/images/2013/11/11/5512667_20131111064323.jpg' },
  { id: 7, name: ' hercules ecuatorianus', price: 12000, image: 'https://th.bing.com/th/id/R.8b5be19c5026933e5ec45d0a30368eb9?rik=5K5z0SNf%2bV%2fcwA&riu=http%3a%2f%2fbeetlespace.wz.cz%2fdruhy%2ffotky%2fDynastes_hercules_ecuatorianus_09.jpg&ehk=ZdqL6PRJr3xoq%2boCRgdrNHpfb%2fs7b4v5z8x1MkuTD0k%3d&risl=&pid=ImgRaw&r=0' },
  { id: 8, name: 'Sumatran Atlas', price: 10000, image: 'https://dorcusdanke.itembox.design/item/1254908991.jpg?t=20210218095400' },
  { id: 9, name: 'Dynastes hercules ', price: 19000, image: 'https://img.aucfree.com/f149659226.1.jpg' },
  { id: 10, name: 'Dynastes Satanas', price: 9500, image: 'https://i.pinimg.com/736x/10/11/dd/1011dd5333e53be34a1ec6bf0480f88a.jpg' },
  { id: 11, name: 'Odontolabis brookeana', price: 5000, image: 'https://th.bing.com/th/id/OIP.Di4fZhawtDgBnRZNRjbhcwHaFj?rs=1&pid=ImgDetMain' },
  { id: 12, name: 'Rainbow Stag Beetle', price: 3500, image: 'https://th.bing.com/th/id/OIP.obNV9vTKoSZc0mTe4uOsxgHaHa?w=750&h=750&rs=1&pid=ImgDetMain' },
  { id: 13, name: 'Prosopocoilus fabricei', price: 4000, image: 'https://musiya.com/hp/daizukan/pict/fabricei_noko.jpg' },
  { id: 14, name: 'Rhaetulus ssp', price: 4500, image: 'https://musiya.com/hp/daizukan/pict/supekiosusu(kawanoi).jpg' },
  { id: 15, name: 'Odontolabis dalmanni', price: 3000, image: 'https://musiya.com/hp/daizukan/pict/dalman_tuyakuwa.jpg' },
  { id: 16, name: 'Dorcus hopei ', price: 7500, image: 'https://musiya.com/hp/daizukan/pict/ookuwagata.JPG' },
  { id: 17, name: 'Dorcus ritsemae', price: 4000, image: 'https://musiya.com/hp/daizukan/pict/pari-ookuwa.jpg' },
  { id: 18, name: 'Dorcus thoracicus', price: 4500, image: 'https://musiya.com/hp/daizukan/pict/thoracicus_hirata.jpg' },
  { id: 19, name: 'Lucanus  cervus', price: 4000, image: 'https://www.msxlabs.org/forum/attachments/30423-akbez-geyik-bocegi-lucanus-akbesianus-cervus-geyik-bocegi.jpg' },
  { id: 20, name: 'Archides hirat', price: 5500, image: 'https://th.bing.com/th/id/R.3bd341c086bbbf8dd1d6239b7edb7f56?rik=YmghGAaRkG%2bnUA&riu=http%3a%2f%2fimg13.shop-pro.jp%2fPA01090%2f320%2fetc%2f559.JPG%3f2128&ehk=9nrYtNadR8kGcGGmLtnz6dEfNsPAWZ6wHfnzEAkoibo%3d&risl=&pid=ImgRaw&r=0' },
  { id: 21, name: '《ไม้โอ๊ค》', price: 500, image: 'https://lzd-img-global.slatic.net/g/p/f27fa2b9a32ed68e23f1c99f5ab1ace1.jpg_720x720q80.jpg' },
  { id: 22, name: '《Dmat natural 50ลิตร》', price: 770, image: 'https://down-th.img.susercontent.com/file/34a574f2078bc4973e3f4338a3efca03@resize_w450_nl.webp' },
  { id: 23, name: '《Dmat Pro+ 50ลิตร》', price: 1670, image: 'https://down-th.img.susercontent.com/file/95744de44983a5d5e7f79e1c91bb424f@resize_w450_nl.webp' },
  { id: 24, name: '《Lmat pro+  50ลิตร》', price: 1670, image: 'https://down-th.img.susercontent.com/file/1ddf799791a64f9cccde56b91b314104@resize_w450_nl.webp' },
  { id: 25, name: '《Dmat natural 9ลิตร》', price: 136, image: 'https://down-th.img.susercontent.com/file/12620519fa219127072194bd6fbf6556.webp' },
  { id: 26, name: '《Dmat Pro+ 9ลิตร》', price: 156, image: 'https://down-th.img.susercontent.com/file/44abb54911ce45ecee05754183b5669e@resize_w450_nl.webp' },
  { id: 27, name: '《Lmat Pro+ 9ลิตร》', price: 153, image: 'https://down-th.img.susercontent.com/file/119b264860900209a4bf3b2d5cba3d65@resize_w450_nl.webp' },
  { id: 28, name: '《ELmat Pro+》', price: 153, image: 'https://down-th.img.susercontent.com/file/ff020ce2b8377164e07c15a8eac41ff2@resize_w450_nl.webp' },
  { id: 29, name: 'เชื้อเห็ดนางฟ้า 1600cc', price: 100, image: 'https://down-th.img.susercontent.com/file/824a8a3239fa1e4ccae2f429e6f50f4e.webp' },
  { id: 30, name: 'Kabuto mat', price: 150, image: 'https://down-th.img.susercontent.com/file/a2836a648c52a1b4dd6e0dccf72c2c16@resize_w450_nl.webp' },
  { id: 31, name: 'Kuwa mat', price: 150, image: 'https://down-th.img.susercontent.com/file/15ff109327acc0125d15bf1d7bc2fe9a.webp' },
  { id: 32, name: 'Kinshi', price: 150, image: 'https://down-th.img.susercontent.com/file/sg-11134201-22120-cilqssb5nqlv23.webp' },
  { id: 33, name: '《Jelly เยลลี่พรีเมี่ยมด้วง》', price: 750, image: 'https://down-th.img.susercontent.com/file/th-11134207-7qukz-lin9d8hpszqg03.webp' },
  { id: 34, name: '《Moss mat 》', price: 100, image: 'https://down-th.img.susercontent.com/file/3401181e0ce833bad5433c6403704f23.webp' },
  { id: 35, name: '《ฐานรองเยลลี่แบบไม้ 》', price: 50, image: 'https://down-th.img.susercontent.com/file/1e4974605894b1a9644c33b3cc52498f.webp' },
  { id: 36, name: '《วัสดุปูพื้นเบลเยี่ยม Belgium》', price: 160, image: 'https://down-th.img.susercontent.com/file/8fc2a17e1e1fb0ac9d3d19748437bb34.webp' },
  { id: 37, name: '《เปลือกไม้ Pine USA》', price: 100, image: 'https://down-th.img.susercontent.com/file/1739b58c2ea50a25a1b037917bddf71b@resize_w450_nl.webp' },
  { id: 38, name: '《กิ่งไม้ Apple stick wood》', price: 80, image: 'https://down-th.img.susercontent.com/file/bffdd252082905117eb1ed5946d4271f.webp' },
  { id: 39, name: '《 Pin for insect beetles》', price: 120, image: 'https://down-th.img.susercontent.com/file/th-11134207-7r992-lv4bjt70w99v65.webp' },
  { id: 40, name: '《Jelly-Splitters》', price: 400, image: 'https://down-th.img.susercontent.com/file/5abd583c1ab7c3beea23f1fe76c03212.webp' },
  { id: 41, name: 'Filter sheet for insect beetles', price: 120, image: 'https://down-th.img.susercontent.com/file/th-11134207-7r98u-lw5hb8j7bi6n03.webp' },
  { id: 42, name: 'Cork bark wood', price: 200, image: 'https://down-th.img.susercontent.com/file/th-11134207-7r98s-lvvez66o2qq768.webp' },
  { id: 43, name: 'Japan filter Box ', price: 680, image: 'https://down-th.img.susercontent.com/file/7d7f7663882cdc77ae8d191f91af597b.webp' },
  { id: 44, name: ' ฐานรองเยลลี่แบบไม้ ', price: 200, image: 'https://down-th.img.susercontent.com/file/472926d17d6f782a0f70a10800b3235d.webp' },
  
];

export default function ProductList() {
  const [orderPopup, setOrderPopup] = useState(false);  // state สำหรับ Popup
  const [selectedProducts, setSelectedProducts] = useState([]);  // สินค้าที่เลือกสำหรับสั่งซื้อ
  const [colorIndex, setColorIndex] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [shippingFee] = useState(100);

  const couponColors = ['red', 'green', 'black', 'blue', 'cyan'];

  // ฟังก์ชันเพิ่มสินค้าเข้าไปยังรายการสั่งซื้อ
  const handleAddProduct = (product) => {
    setSelectedProducts([...selectedProducts, product]);
    setOrderPopup(true);  // แสดง Popup
  };

  const generateRandomCoupon = () => {
    const discountOptions = [0.3, 0.5, 0.7,]; // เพิ่มส่วนลด 0% สำหรับกรณีที่ไม่ได้รับคูปอง
    const randomIndex = Math.floor(Math.random() * discountOptions.length);
    const randomDiscount = discountOptions[randomIndex];
    setCoupon(randomDiscount);
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % couponColors.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      backgroundImage: 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)', 
      minHeight: '50vh', 
      padding: '15px' 
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: couponColors[colorIndex], 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        Photharam Beetle Shop
      </h1>

      <button onClick={generateRandomCoupon} style={{ display: 'block', margin: '0 auto' }}>
        🎁 สุ่มคูปองส่วนลด
      </button>

      {coupon && (
        <p style={{ textAlign: 'center', color: 'green', fontSize: '16px' }}>
          ยินดีด้วย! คุณได้รับคูปองส่วนลด {coupon * 100}%!
        </p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', margin: '25px', padding: '25px', backgroundColor: '#f0fff0' }}>
            <img src={product.image} alt={product.name} style={{ width: '150px', height: '150px' }} />
            <h3 style={{ color: 'black' }}>{product.name}</h3>
            <p style={{ color: 'black' }}>ราคา: {product.price} บาท</p>
            <button onClick={() => handleAddProduct(product)} style={{ color: couponColors[colorIndex] }}>
              Add to Order
            </button>
          </div>
        ))}
      </div>

      {/* Popup Order Now */}
      {orderPopup && (
        <Popup 
          orderPopup={orderPopup} 
          setOrderPopup={setOrderPopup} 
          selectedProducts={selectedProducts}  // ส่ง selectedProducts ไปที่ Popup
          setSelectedProducts={setSelectedProducts}  // ส่งฟังก์ชัน setSelectedProducts เพื่ออัปเดตรายการสินค้า
          coupon={coupon}  // ส่งคูปองไปที่ Popup ถ้ามี
          shippingFee={shippingFee}  // ส่งค่าจัดส่งไปที่ Popup
        />
      )}
    </div>
  );
}
