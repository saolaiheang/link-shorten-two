// import React, { useState, useEffect } from 'react';
// import { QRCode } from 'react-qrcode-logo';

// function ResponsiveQRCode({ value }) {
//   const [qrCodeSize, setQrCodeSize] = useState(getQrCodeSize());

//   useEffect(() => {

//     const handleResize = () => setQrCodeSize(getQrCodeSize());

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   function getQrCodeSize() {
//     const screenWidth = window.innerWidth;
//     if (screenWidth < 640) return 100;
//     if (screenWidth < 768) return 80;
//     return 100;
//   }

  

//   return (
//     <div className="flex justify-center items-center">
//       <QRCode value={value} size={qrCodeSize} quietZone={0} />
//     </div>
//   );
// }

// export default ResponsiveQRCode;

// 
import React, { useState, useEffect, useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';

const QRCodeComponent = ({ value, logoUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrCodeSize, setQrCodeSize] = useState(getQrCodeSize());
  const qrCodeRef = useRef(null);

  // Handle resize for responsive QR code
  useEffect(() => {
    const handleResize = () => setQrCodeSize(getQrCodeSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get QR code size based on screen width
  function getQrCodeSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) return 100;
    if (screenWidth < 768) return 50;
    return 100;
  }

  // Handle QR code click to open modal
  const handleQRCodeClick = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Download QR code
  const handleDownload = () => {
    const canvas = qrCodeRef.current.querySelector('canvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'qrcode.png';
    link.click();
  };

  // Copy QR code URL to clipboard
  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      alert('QR Code URL copied to clipboard!');
    }
  };

  return (
    <>
      {/* Render the small QR Code */}
      <div onClick={handleQRCodeClick} style={{ cursor: 'pointer' }}>
        <QRCode
          value={value}
          size={qrCodeSize}
          quietZone={2}
          logoImage={logoUrl}
          logoWidth={qrCodeSize * 0.2}
          logoHeight={qrCodeSize * 0.2}
          logoOpacity={0.8}
        />
      </div>

      {/* Modal for enlarged QR Code */}
      {isModalOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseModal}>×</button>

            {/* Larger QR Code in modal */}
            <div ref={qrCodeRef}>
              <QRCode
                value={value}
                size={300}
                quietZone={10}
                logoImage={logoUrl}
                logoWidth={60}  // 20% of the larger QR code size
                logoHeight={60}
                logoOpacity={0.8}
              />
            </div>

            {/* Buttons for download and copy */}
            <div className="modal-actions">
              <button className="btn-download" onClick={handleDownload}>Download</button>
              <button className="btn-copy" onClick={handleCopy}>Copy URL</button>
            </div>
          </div>
        </div>
      )}

      {/* Styles for modal and buttons */}
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background: #A2A2A2;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          position: relative;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }
        .modal-actions {
          margin-top: 20px;
        }
        .btn-download, .btn-copy {
          margin: 5px;
          padding: 10px 20px;
          cursor: pointer;
          border: none;
          border-radius: 5px;
        }
        .btn-download {
          background-color: #3498db;
          color: white;
        }
        .btn-copy {
          background-color: #e74c3c;
          color: white;
        }
      `}</style>
    </>
  );
};

export default QRCodeComponent;
