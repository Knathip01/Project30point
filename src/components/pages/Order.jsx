import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Image from "../../assets/hero/QRCODE.png"; // นำเข้ารูปภาพ QR Code
import html2canvas from 'html2canvas'; // นำเข้า html2canvas สำหรับการแปลง DOM เป็นภาพ

const Order = () => {
  const location = useLocation();
  
  const [orderData, setOrderData] = useState({
    selectedProducts: [],
    name: '',
    email: '',
    address: '',
    finalPrice: 0,
  });

  const [showQRCode, setShowQRCode] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  const productListRef = useRef(null);

  useEffect(() => {
    const storedOrderData = JSON.parse(localStorage.getItem('orderData'));

    if (location.state) {
      setOrderData(location.state);
      localStorage.setItem('orderData', JSON.stringify(location.state)); 
    } else if (storedOrderData) {
      setOrderData(storedOrderData);
    }
  }, [location.state]);

  const { selectedProducts, name, email, address, finalPrice } = orderData;

  const handleRemoveProduct = (indexToRemove) => {
    const updatedProducts = selectedProducts.filter((_, index) => index !== indexToRemove);
    const updatedFinalPrice = updatedProducts.reduce((total, product) => total + product.price, 0);

    const updatedOrderData = { 
      ...orderData, 
      selectedProducts: updatedProducts, 
      finalPrice: updatedFinalPrice 
    };

    setOrderData(updatedOrderData);
    localStorage.setItem('orderData', JSON.stringify(updatedOrderData));
  };

  const handleShowQRCode = () => {
    setShowQRCode(true);
  };

  const handleImageUpload = (event) => {
    setUploadedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleDownloadSummary = async () => {
    const canvas = await html2canvas(productListRef.current, {
      scrollX: -window.scrollX, 
      scrollY: -window.scrollY, 
      windowWidth: document.documentElement.scrollWidth, 
      windowHeight: document.documentElement.scrollHeight,
    });
    
    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'order-summary.png';
    link.click();
  };

  const handleConfirmPayment = () => {
    if (uploadedImage) {
      setIsConfirmed(true);
      alert('การชำระเงินของคุณได้รับการยืนยันแล้ว!');
      sendOrderToFacebook(orderData);
    } else {
      alert('กรุณาแนบหลักฐานการชำระเงิน');
    }
  };

  if (!selectedProducts.length || !name || !email || !address || finalPrice === undefined) {
    return <p>ข้อมูลคำสั่งซื้อไม่ครบถ้วน</p>;
  }

  return (
    <div style={{ padding: '20px', background: 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)' }}>
      <h1>สรุปคำสั่งซื้อ</h1>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => window.open('https://www.facebook.com/photharambeetle', '_blank')}
          style={{
            padding: '15px 30px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '20px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
          }}
        >
          ติดต่อแอดมิน
        </button>
      </div>

      <div 
        ref={productListRef}
        style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}
      >
        <h2>รายการสินค้า:</h2>
        {selectedProducts.map((product, index) => (
          <div key={product.id || index} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
              <div>
                <p>ชื่อสินค้า: {product.name}</p>
                <p>ราคา: {product.price} บาท</p>
              </div>
              <button onClick={() => handleRemoveProduct(index)} style={{ color: 'red', marginLeft: 'auto' }}>
                ลบสินค้า
              </button>
            </div>
          </div>
        ))}
        <p>ชื่อผู้สั่ง: {name}</p>
        <p>อีเมล: {email}</p>
        <p>ที่อยู่: {address}</p>
        <p>ยอดชำระทั้งหมด: {finalPrice} บาท</p>

        <button onClick={handleShowQRCode} style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '5px', marginTop: '20px' }}>
          ชำระเงิน
        </button>

        {showQRCode && (
          <div style={{ marginTop: '20px' }}>
            <h3>สแกนเพื่อชำระเงิน</h3>
            <img src={Image} alt="QR Code" style={{ width: '150px', height: '150px' }} />
            
            <div style={{ marginTop: '20px' }}>
              <label>แนบหลักฐานการชำระเงิน:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>

            {uploadedImage && (
              <div style={{ marginTop: '20px' }}>
                <h4>หลักฐานการชำระเงิน:</h4>
                <img src={uploadedImage} alt="Uploaded Proof" style={{ width: '200px', height: '200px' }} />
              </div>
            )}

            <button onClick={handleConfirmPayment} style={{ padding: '10px', backgroundColor: '#2196F3', color: 'white', borderRadius: '5px', marginTop: '20px' }}>
              ยืนยันการชำระเงิน
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handleDownloadSummary}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '15px 30px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#000',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '30px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          fontSize: '1.2rem',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-5px)';
          e.target.style.boxShadow = '0 8px 40px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        }}
      >
        ดาวน์โหลดสรุปคำสั่งซื้อ
      </button>
    </div>
  );
};

export default Order;
