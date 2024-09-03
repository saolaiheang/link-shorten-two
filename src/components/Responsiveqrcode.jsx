import React, { useState, useEffect } from 'react';
import { QRCode } from 'react-qrcode-logo';

function ResponsiveQRCode({ value }) {
  const [qrCodeSize, setQrCodeSize] = useState(getQrCodeSize());

  useEffect(() => {
    // Update QR code size on window resize
    const handleResize = () => setQrCodeSize(getQrCodeSize());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function getQrCodeSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) return 100;
    if (screenWidth < 768) return 80; 
    return 100; 
  }

  return (
    <div className="flex justify-center items-center">
      <QRCode value={value} size={qrCodeSize} quietZone={0} />
    </div>
  );
}

export default ResponsiveQRCode;
