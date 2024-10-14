import { useState, useEffect } from 'react';

const products = [
  { id: 1, name: '🔜Allotopus moellenkampi moseri', image: 'https://th.bing.com/th/id/R.3dac206afffd4760f537e6060d01215e?rik=5IbGdyj4JAnoZA&riu=http%3a%2f%2finsectforum.no-ip.org%2fgods%2fcgi-bin%2fattachment.cgi%3fforum%3d2%26topic%3d18170%26postno%3d%26name%3d22_1259917291%26type%3d.jpg&ehk=M%2bSOkWB8We7blpAf6X3r5XY7LZodnY1MxUldcSSyxwU%3d&risl=&pid=ImgRaw&r=0' },
  { id: 2, name: '🔜Mengata Merry', image: 'https://baseec-img-mng.akamaized.net/images/item/origin/0992ef657a8e600772d0694ae4742e90.png?imformat=generic&q=90&im=Resize,width=640,type=normal' },
  { id: 3, name: '🔜Hexarthrius parryi',  image: 'https://th.bing.com/th/id/R.a14450c6b3a1301d91cce92356a8b274?rik=KOOVIJ5sRq7CwQ&riu=http%3a%2f%2fimg13.shop-pro.jp%2fPA01090%2f320%2fetc%2f426.JPG%3f2116&ehk=g1O2pFptLDNCRn3WFQVR%2bd9SLRu2b%2fXLQYB7gAYhC0Q%3d&risl=&pid=ImgRaw&r=0' },
  { id: 4, name: '🔜Odontolabis cephalotes',image: 'https://e-colors.jp/cdn/shop/files/2405190001-01_00363703-1cca-4c69-b754-db8d19ddf723_1024x1024@2x.jpg?v=1715937513' },
  { id: 5, name: '🔜Takasagomiyama', image: 'https://blog-imgs-156.fc2.com/a/t/o/atoz2000/PB190009s.jpg' },
  { id: 6, name: '🔜Kuroshima Noko', image: 'https://blog-imgs-147.fc2.com/a/t/o/atoz2000/P2170741s.jpg' },
  { id: 7, name: '🔜Prosopocoilus giraffa', image: 'https://m.media-amazon.com/images/I/51BOvGjKLiL._AC_.jpg' },
  { id: 8, name: '🔜dipterocarpus',  image: 'https://img.aucfree.com/u1063726077.1.jpg' },
  { id: 9, name: '🔜Lamprima adolphinae', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhEc_IpDMi8FB6iE-mLwH33FmbxhEi0TzYsxCQ0nQJvL8EJGnBmf4PkQ2cDusVA1_WK6GaX8Q42KuGvBvwXcLrdWON2LxtQtfhcn3WgY91azeGhTZ-QNSMZAmEnZ2yrqqRNgKxSlA_aaY0/s640/L.adolphinaemacho.jpg' },
  { id: 10, name: '🔜Mecynorrhina torquata ugandensis',  image: 'https://auctions.afimg.jp/w380431156/ya/image/w380431156.1.jpg' },
];

function ProductCard({ product }) {
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
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <img src={product.image} alt={product.name} style={{ width: '150px', height: '150px', borderRadius: '10px' }} />
      <h3 style={{ color: 'black' }}>{product.name}</h3>
    </div>
  );
}

export default function ProductList() {
  return (
    <div style={{ 
      backgroundImage: 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)', 
      minHeight: '100vh', 
      padding: '20px' 
    }}>
      <h1 style={{ textAlign: 'center', color: 'red' }}>
  🔜Beetles Coming Soon🔜
      </h1>
     
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
