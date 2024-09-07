
import React, { useState, useEffect, useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';
import SuccessMessage from './Successalert';
const QRCodeComponent = ({ value, logoUrl, isLoggedIn }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrCodeSize, setQrCodeSize] = useState(getQrCodeSize());
  const qrCodeRef = useRef(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      alert('Please log in or sign up to view the QR code.');
    }
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
      navigator.clipboard.writeText(value)
        .then(() => {
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
        })
        .catch((error) => {
          console.error('Failed to copy:', error);
        });
    }
  };

  return (
    <>
      {/* Render the small QR Code */}
      <div onClick={handleQRCodeClick} style={{ cursor: isLoggedIn ? 'pointer' : 'not-allowed' }}>
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
            {showSuccessMessage && <SuccessMessage message="QR Code URL copied to clipboard!" />}

      {/* Styles for modal and buttons */}
      <style jsx>{`
    .modal {
      position: fixed;
      top: 70px;
      left: 0;
      width: 100%;
      height: 70%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      width: 50%;
      padding: 20px;
      background: rgba(0, 0, 0, 0.5);
      text-align: center;
      position: relative;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .close-btn {
      position: absolute;
      top: 5px;
      right: 20px;
      background: none;
      border: none;
      font-size: 30px;
      cursor: pointer;
    }

    .modal-actions {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn-download, .btn-copy {
      margin: 10px;
      padding: 10px 40px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      font-size: 16px;
    }

    .btn-download {
      background-color: #3498db;
      color: white;
    }

    .btn-copy {
      background-color: #e74c3c;
      color: white;
    }

    @media (max-width: 640px) {
      .modal-content {
        width: 90%;
        padding: 20px;
      }

      .close-btn {
        font-size: 30px;
        right: 10px;
        top: 0px;
      }
    }
  `}</style>
    </>
  );
};

export default QRCodeComponent;
