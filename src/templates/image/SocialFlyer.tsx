import React from 'react';

export const SocialFlyer = ({ data, branding }: { data: any, branding?: any }) => {
  const primaryColor = branding?.primary_color || '#10B981';
  const bgColor = branding?.background_color || '#111827';
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: bgColor,
        color: '#ffffff',
        padding: '60px',
        justifyContent: 'space-between',
        fontFamily: branding?.font_family || 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '32px', color: primaryColor, marginBottom: '10px' }}>
          {data.event_name || 'Event Name'}
        </h2>
        <h1 style={{ fontSize: '72px', fontWeight: 'bold', margin: '0 0 20px 0', lineHeight: 1.1 }}>
          Vote for<br/>{data.recipient_name || 'Recipient'}
        </h1>
        <p style={{ fontSize: '28px', color: '#9CA3AF' }}>
          {data.description || 'Nominee for Best Category'}
        </p>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', fontSize: '24px', fontWeight: 'bold' }}>
          vote now
        </div>
        {data.qr_code_url && (
          <div style={{ 
            display: 'flex', 
            width: '150px', 
            height: '150px', 
            backgroundColor: '#fff',
            borderRadius: '16px',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: '#000', fontSize: '14px' }}>QR Code</span>
          </div>
        )}
      </div>
    </div>
  );
};
