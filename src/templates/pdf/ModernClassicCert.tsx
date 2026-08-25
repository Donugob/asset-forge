import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Svg, Circle, Path, Polygon } from '@react-pdf/renderer';

export const ModernClassicCert = ({ data, branding, features, origin = '' }: { data: Record<string, string>, branding?: Record<string, string>, features?: Record<string, boolean>, origin?: string }) => {
  
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
  
  // Features Defaults
  const showCornerShapes = features?.show_corner_shapes ?? true;
  const showDotGrid = features?.show_dot_grid ?? true;
  const showRibbonBadge = features?.show_ribbon_badge ?? true;
  const showSignatures = features?.show_signatures ?? true;
  const showEventName = features?.show_event_name ?? true;
  const showDescription = features?.show_description ?? true;

  // Extract values
  const title = data.title?.toUpperCase() || 'CERTIFICATE';
  const subtitle = data.event_name?.toUpperCase() || 'OF ACHIEVEMENT';
  const name = data.recipient_name || 'Charlotte Newman';
  
  // Dynamic font scaling
  const getDynamicFontSize = (text: string, maxSize: number, minSize: number, threshold: number) => {
    if (text.length <= threshold) return maxSize;
    const size = maxSize - (text.length - threshold) * 1.5;
    return Math.max(size, minSize);
  };

  const titleFontSize = getDynamicFontSize(title, 52, 28, 12);
  const nameFontSize = getDynamicFontSize(name, 48, 24, 16);
  
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: bgColor,
      color: '#FFFFFF',
      fontFamily: 'Montserrat',
      overflow: 'hidden',
    },
    shapeTopLeft: { position: 'absolute', top: -100, left: -100 },
    shapeBottomRight: { position: 'absolute', bottom: -100, right: -100, transform: 'rotate(180deg)' },
    content: {
      flex: 1,
      padding: 60,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },
    title: {
      fontSize: titleFontSize,
      fontWeight: 900,
      letterSpacing: 2,
      marginBottom: 5,
      color: '#FFFFFF',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 14,
      fontWeight: 700,
      letterSpacing: 3,
      marginBottom: 40,
      color: '#FFFFFF',
      textTransform: 'uppercase',
      textAlign: 'center',
    },
    presentedTo: {
      fontSize: 12,
      marginBottom: 15,
      color: '#c2dbef',
    },
    name: {
      fontSize: nameFontSize,
      fontWeight: 900,
      marginBottom: 15,
      color: primaryColor,
      textAlign: 'center',
    },
    description: {
      fontSize: 11,
      color: '#c2dbef',
      textAlign: 'center',
      width: '75%',
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
    signatureBlock: { alignItems: 'center', width: 150 },
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

  const DotGrid = ({ x, y }: { x: number, y: number }) => (
    <View style={{ position: 'absolute', top: y, left: x, opacity: 0.5 }} fixed>
      <Svg width="40" height="60">
        {Array.from({ length: 4 }).map((_, col) => 
          Array.from({ length: 5 }).map((_, row) => (
            <Circle key={`${col}-${row}`} cx={col * 10 + 5} cy={row * 10 + 5} r="1.5" fill="#FFFFFF" />
          ))
        )}
      </Svg>
    </View>
  );

  // A more realistic badge with a starburst/scalloped polygon
  const RibbonBadge = () => {
    // Generate a 24-point star for the scalloped edge
    const points = Array.from({ length: 48 }).map((_, i) => {
      const radius = i % 2 === 0 ? 30 : 25;
      const angle = (i * Math.PI) / 24;
      return `${30 + radius * Math.cos(angle)},${30 + radius * Math.sin(angle)}`;
    }).join(' ');

    return (
      <View style={{ position: 'absolute', bottom: 50, left: '50%', transform: 'translateX(-40px)', width: 80, height: 100, alignItems: 'center' }} fixed>
        <Svg width="80" height="80" style={{ position: 'absolute', top: 30 }}>
          <Path d="M20 0 L10 70 L30 60 Z" fill="#296b99" />
          <Path d="M60 0 L70 70 L50 60 Z" fill="#296b99" />
          <Path d="M25 0 L15 65 L35 55 Z" fill={primaryColor} />
          <Path d="M55 0 L65 65 L45 55 Z" fill={primaryColor} />
        </Svg>
        <Svg width="60" height="60" style={{ position: 'absolute', top: 0 }}>
          <Polygon points={points} fill="#c2dbef" />
          <Circle cx="30" cy="30" r="22" fill="#f8e7b9" />
          <Circle cx="30" cy="30" r="18" fill="#f0d588" />
        </Svg>
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        
        {showCornerShapes && (
          <>
            <View style={styles.shapeTopLeft} fixed>
              <Svg width="400" height="400">
                <Path d="M0,0 L400,0 L0,400 Z" fill="#0d2c44" />
                <Path d="M0,0 L300,0 L0,300 Z" fill={primaryColor} opacity="0.9" />
                <Path d="M0,0 L150,0 L0,150 Z" fill="#FFFFFF" />
              </Svg>
            </View>

            <View style={styles.shapeBottomRight} fixed>
              <Svg width="400" height="400">
                <Path d="M0,0 L400,0 L0,400 Z" fill="#0d2c44" />
                <Path d="M0,0 L300,0 L0,300 Z" fill={primaryColor} opacity="0.9" />
                <Path d="M0,0 L150,0 L0,150 Z" fill="#FFFFFF" />
              </Svg>
            </View>
          </>
        )}

        {showDotGrid && (
          <>
            <DotGrid x={40} y={120} />
            <DotGrid x={760} y={220} />
          </>
        )}

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          {showEventName && <Text style={styles.subtitle}>{subtitle}</Text>}
          
          <Text style={styles.presentedTo}>This certificate is proudly presented to</Text>
          
          <Text style={styles.name}>{name}</Text>
          
          {showDescription && (
            <Text style={styles.description}>
              {data.description || 'The participant has demonstrated dedication, commitment, and a strong willingness to learn throughout the program.'}
            </Text>
          )}
          
          {showSignatures && (
            <View style={styles.signaturesContainer}>
              <View style={styles.signatureBlock}>
                <Text style={styles.signatureImage}>{data.signature_1_name || 'Hannah Porter'}</Text>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureName}>{data.signature_1_title || data.signature_1_name || 'Hannah Porter'}</Text>
              </View>
              
              <View style={styles.signatureBlock}>
                <Text style={styles.signatureImage}>{data.signature_2_name || 'Callum Price'}</Text>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureName}>{data.signature_2_title || data.signature_2_name || 'Callum Price'}</Text>
              </View>
            </View>
          )}
        </View>

        {showRibbonBadge && <RibbonBadge />}

      </Page>
    </Document>
  );
};
