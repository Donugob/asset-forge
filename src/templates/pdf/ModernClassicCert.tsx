import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Svg, Circle, Path } from '@react-pdf/renderer';

export const ModernClassicCert = ({ data, branding, origin = '' }: { data: Record<string, string>, branding?: Record<string, string>, origin?: string }) => {
  
  // Register fonts dynamically to avoid Google Fonts changing hashed URLs
  // Only register if they haven't been registered yet
  if (!Font.getRegisteredFontFamilies().includes('Great Vibes')) {
    Font.register({
      family: 'Great Vibes',
      src: `${origin}/fonts/GreatVibes-Regular.ttf`,
    });
  }

  if (!Font.getRegisteredFontFamilies().includes('Montserrat')) {
    Font.register({
      family: 'Montserrat',
      fonts: [
        { src: `${origin}/fonts/Montserrat-Regular.ttf`, fontWeight: 400 },
        { src: `${origin}/fonts/Montserrat-Bold.ttf`, fontWeight: 700 },
        { src: `${origin}/fonts/Montserrat-Black.ttf`, fontWeight: 900 },
      ]
    });
  }

  const bgColor = branding?.background_color || '#103957';
  const primaryColor = branding?.primary_color || '#3a8ac0';
  
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: bgColor,
      color: '#FFFFFF',
      fontFamily: 'Montserrat',
      overflow: 'hidden',
    },
    // Corner shapes using absolute positioning and SVG
    shapeTopLeft: {
      position: 'absolute',
      top: -100,
      left: -100,
    },
    shapeBottomRight: {
      position: 'absolute',
      bottom: -100,
      right: -100,
      transform: 'rotate(180deg)',
    },
    content: {
      flex: 1,
      padding: 60,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },
    title: {
      fontSize: 52,
      fontWeight: 900,
      letterSpacing: 2,
      marginBottom: 5,
      color: '#FFFFFF',
    },
    subtitle: {
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: 3,
      marginBottom: 40,
      color: '#FFFFFF',
      textTransform: 'uppercase',
    },
    presentedTo: {
      fontSize: 12,
      marginBottom: 15,
      color: '#c2dbef',
    },
    name: {
      fontSize: 48,
      fontWeight: 900,
      marginBottom: 15,
      color: primaryColor,
    },
    description: {
      fontSize: 11,
      color: '#c2dbef',
      textAlign: 'center',
      width: '70%',
      lineHeight: 1.5,
      marginBottom: 70,
    },
    signaturesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
      position: 'absolute',
      bottom: 80,
    },
    signatureBlock: {
      alignItems: 'center',
      width: 150,
    },
    signatureImage: {
      fontFamily: 'Great Vibes',
      fontSize: 36,
      color: '#FFFFFF',
      marginBottom: -10,
      transform: 'rotate(-5deg)',
    },
    signatureLine: {
      width: '100%',
      height: 1,
      backgroundColor: '#FFFFFF',
      marginBottom: 5,
    },
    signatureName: {
      fontSize: 11,
      fontWeight: 700,
      color: '#FFFFFF',
    }
  });

  const DotGrid = ({ x, y }: { x: number, y: number }) => {
    return (
      <Svg width="40" height="60" style={{ position: 'absolute', top: y, left: x, opacity: 0.5 }}>
        {Array.from({ length: 4 }).map((_, col) => 
          Array.from({ length: 5 }).map((_, row) => (
            <Circle key={`${col}-${row}`} cx={col * 10 + 5} cy={row * 10 + 5} r="1.5" fill="#FFFFFF" />
          ))
        )}
      </Svg>
    );
  };

  const RibbonBadge = () => (
    <View style={{ position: 'absolute', bottom: 50, left: '50%', transform: 'translateX(-40px)', width: 80, height: 100, alignItems: 'center' }}>
      <Svg width="80" height="80" style={{ position: 'absolute', top: 30 }}>
        <Path d="M20 0 L10 70 L30 60 Z" fill="#296b99" />
        <Path d="M60 0 L70 70 L50 60 Z" fill="#296b99" />
        <Path d="M25 0 L15 65 L35 55 Z" fill="#3a8ac0" />
        <Path d="M55 0 L65 65 L45 55 Z" fill="#3a8ac0" />
      </Svg>
      <Svg width="60" height="60" style={{ position: 'absolute', top: 0 }}>
        <Circle cx="30" cy="30" r="28" fill="#8cbde1" />
        <Circle cx="30" cy="30" r="24" fill="#f8e7b9" />
        <Circle cx="30" cy="30" r="20" fill="#f0d588" />
      </Svg>
    </View>
  );

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        
        {/* Background Overlay Shapes */}
        <View style={styles.shapeTopLeft}>
          <Svg width="400" height="400">
            <Path d="M0,0 L400,0 L0,400 Z" fill="#0d2c44" />
            <Path d="M0,0 L300,0 L0,300 Z" fill={primaryColor} opacity="0.9" />
            <Path d="M0,0 L150,0 L0,150 Z" fill="#FFFFFF" />
          </Svg>
        </View>

        <View style={styles.shapeBottomRight}>
          <Svg width="400" height="400">
            <Path d="M0,0 L400,0 L0,400 Z" fill="#0d2c44" />
            <Path d="M0,0 L300,0 L0,300 Z" fill={primaryColor} opacity="0.9" />
            <Path d="M0,0 L150,0 L0,150 Z" fill="#FFFFFF" />
          </Svg>
        </View>

        {/* Decorative elements */}
        <DotGrid x={40} y={120} />
        <DotGrid x={760} y={220} />

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{data.title?.toUpperCase() || 'CERTIFICATE'}</Text>
          <Text style={styles.subtitle}>{data.event_name?.toUpperCase() || 'OF ACHIEVEMENT'}</Text>
          
          <Text style={styles.presentedTo}>This certificate is proudly presented to</Text>
          
          <Text style={styles.name}>{data.recipient_name || 'Charlotte Newman'}</Text>
          
          <Text style={styles.description}>
            {data.description || 'The participant has demonstrated dedication, commitment, and a strong willingness to learn throughout the program.'}
          </Text>
          
          {/* Signatures */}
          <View style={styles.signaturesContainer}>
            <View style={styles.signatureBlock}>
              <Text style={styles.signatureImage}>Hannah Porter</Text>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>Hannah Porter</Text>
            </View>
            
            <View style={styles.signatureBlock}>
              <Text style={styles.signatureImage}>Callum Price</Text>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>Callum Price</Text>
            </View>
          </View>
        </View>

        {/* Ribbon Badge */}
        <RibbonBadge />

      </Page>
    </Document>
  );
};
