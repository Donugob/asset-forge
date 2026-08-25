import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Svg, Circle, Path, Defs, LinearGradient, Stop } from '@react-pdf/renderer';

export const CorporateElegantCert = ({ data, branding, features, origin = '' }: { data: Record<string, string>, branding?: Record<string, string>, features?: Record<string, boolean>, origin?: string }) => {
  
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

  const bgColor = branding?.background_color || '#ffffff';
  const primaryColor = branding?.primary_color || '#bf953f'; // Gold color for text

  // Features Defaults
  const showTopBanner = features?.show_corner_shapes ?? true; // mapped to top banner
  const showRibbonBadge = features?.show_ribbon_badge ?? true;
  const showSignatures = features?.show_signatures ?? true;
  const showEventName = features?.show_event_name ?? true;
  const showDescription = features?.show_description ?? true;
  const showLogo = features?.show_dot_grid ?? true; // mapped to logo

  const title = data.title?.toUpperCase() || 'CERTIFICATE';
  const subtitle = data.event_name?.toUpperCase() || 'OF ACHIEVEMENT';
  const name = data.recipient_name || 'Harumi Kobayashi';
  
  const getDynamicFontSize = (text: string, maxSize: number, minSize: number, threshold: number) => {
    if (text.length <= threshold) return maxSize;
    const size = maxSize - (text.length - threshold) * 2;
    return Math.max(size, minSize);
  };

  const nameFontSize = getDynamicFontSize(name, 56, 32, 16);
  
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: bgColor,
      color: '#333333',
      fontFamily: 'Montserrat',
      overflow: 'hidden',
    },
    backgroundWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    content: {
      flex: 1,
      padding: 50,
      paddingTop: 40,
      zIndex: 10,
    },
    topSection: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      height: 140,
    },
    titleContainer: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      marginTop: 20,
      marginRight: 20,
    },
    title: {
      fontFamily: 'Montserrat',
      fontSize: 36,
      fontWeight: 900,
      letterSpacing: 2,
      marginBottom: 2,
      color: '#ffffff', // Always white because it's on dark banner
    },
    subtitle: {
      fontFamily: 'Montserrat',
      fontSize: 10,
      fontWeight: 400,
      letterSpacing: 4,
      color: '#ffffff',
    },
    badgeContainer: {
      position: 'absolute',
      top: 150,
      right: 80,
      width: 140,
      height: 220,
      alignItems: 'center',
    },
    mainContent: {
      marginTop: 20,
      paddingLeft: 30,
      width: '65%',
    },
    presentedTo: {
      fontSize: 11,
      fontWeight: 400,
      marginBottom: 15,
      color: '#111',
    },
    nameContainer: {
      borderBottomWidth: 1.5,
      borderBottomColor: '#111',
      paddingBottom: 5,
      marginBottom: 15,
      width: '90%',
    },
    name: {
      fontFamily: 'Great Vibes',
      fontSize: nameFontSize,
      color: primaryColor,
    },
    description: {
      fontFamily: 'Montserrat',
      fontSize: 9,
      color: '#333',
      lineHeight: 1.6,
      width: '90%',
    },
    bottomSection: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      paddingLeft: 30,
      marginTop: 60,
    },
    signatureBlock: {
      alignItems: 'center',
      width: 140,
      marginRight: 60,
    },
    signatureLine: {
      width: '100%',
      height: 1,
      backgroundColor: '#111',
      marginBottom: 8,
    },
    signatureName: {
      fontFamily: 'Montserrat',
      fontWeight: 700,
      fontSize: 9,
      color: '#111',
    },
    signatureTitle: {
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: 8,
      color: '#555',
    },
    logoContainer: {
      position: 'absolute',
      top: 160,
      left: 80,
      flexDirection: 'row',
      alignItems: 'center',
    }
  });

  const RibbonSeal = () => {
    // Generate scalloped points
    let d = "";
    for (let i = 0; i < 72; i++) {
      const radius = i % 2 === 0 ? 45 : 41;
      const angle = (i * Math.PI) / 36;
      const x = 70 + radius * Math.cos(angle);
      const y = 70 + radius * Math.sin(angle);
      if (i === 0) d += `M${x},${y} `;
      else d += `L${x},${y} `;
    }
    d += "Z";

    return (
      <View style={styles.badgeContainer}>
        <Svg width="140" height="220" viewBox="0 0 140 220">
          <Defs>
            <LinearGradient id="sealGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#bf953f" />
              <Stop offset="25%" stopColor="#fcf6ba" />
              <Stop offset="50%" stopColor="#b38728" />
              <Stop offset="75%" stopColor="#fbf5b7" />
              <Stop offset="100%" stopColor="#aa771c" />
            </LinearGradient>
            <LinearGradient id="sealDark" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#1a1a1a" />
              <Stop offset="50%" stopColor="#333333" />
              <Stop offset="100%" stopColor="#111111" />
            </LinearGradient>
          </Defs>
          
          {/* Ribbons hanging down */}
          <Path d="M40,60 L25,180 L40,165 L55,180 Z" fill="url(#sealDark)" />
          <Path d="M100,60 L85,180 L100,165 L115,180 Z" fill="url(#sealDark)" />
          
          {/* Gold borders on ribbons */}
          <Path d="M25,180 L40,165 L55,180 L55,60 L25,60 Z" fill="none" stroke="url(#sealGold)" strokeWidth="3" />
          <Path d="M85,180 L100,165 L115,180 L115,60 L85,60 Z" fill="none" stroke="url(#sealGold)" strokeWidth="3" />
          
          {/* The Seal */}
          <Path d={d} fill="url(#sealGold)" />
          <Circle cx="70" cy="70" r="38" fill="#111" />
          <Circle cx="70" cy="70" r="34" fill="url(#sealGold)" />
          <Circle cx="70" cy="70" r="33" fill="#ebd28f" />
          {/* Slight inner shadow/gradient */}
          <Circle cx="70" cy="70" r="30" fill="url(#sealGold)" />
        </Svg>
      </View>
    );
  };

  const CorporateBackground = () => (
    <View style={styles.backgroundWrapper} fixed>
      <Svg width="100%" height="100%" viewBox="0 0 842 595">
        <Defs>
          <LinearGradient id="bgGoldDark" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#d3a758" />
            <Stop offset="50%" stopColor="#f8e7b9" />
            <Stop offset="100%" stopColor="#b38728" />
          </LinearGradient>
          <LinearGradient id="bgDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#1a1a1a" />
            <Stop offset="100%" stopColor="#333333" />
          </LinearGradient>
        </Defs>
        
        {showTopBanner && (
          <>
            {/* Main dark swoosh at the top */}
            <Path d="M0,0 L842,0 L842,160 C700,240 400,100 0,220 Z" fill="url(#bgDark)" />
            {/* Gold trim underneath the dark swoosh */}
            <Path d="M0,220 C400,100 700,240 842,160 L842,175 C700,255 400,115 0,235 Z" fill="url(#bgGoldDark)" />
            {/* Extra subtle gold wave */}
            <Path d="M0,235 C350,130 650,260 842,185 L842,190 C650,265 350,135 0,240 Z" fill="url(#bgGoldDark)" opacity={0.6} />

            {/* Bottom left waves */}
            <Path d="M0,450 C80,480 120,550 150,595 L0,595 Z" fill="url(#bgGoldDark)" />
            <Path d="M0,470 C60,490 90,560 110,595 L0,595 Z" fill="#ffffff" />
            <Path d="M0,500 C40,510 60,570 80,595 L0,595 Z" fill="url(#bgDark)" />
          </>
        )}
      </Svg>
    </View>
  );

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <CorporateBackground />

        {showLogo && (
          <View style={styles.logoContainer}>
            <Svg width="16" height="16" viewBox="0 0 24 24">
              <Path d="M12,2 L15,9 L22,9 L16,14 L18,21 L12,17 L6,21 L8,14 L2,9 L9,9 Z" fill="url(#bgGoldDark)" />
            </Svg>
            <Text style={{ fontFamily: 'Montserrat', fontSize: 10, fontWeight: 700, marginLeft: 6, color: '#333' }}>
              Wardlere Inc.
            </Text>
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.topSection}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
              {showEventName && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
          </View>

          <View style={styles.mainContent}>
            <Text style={styles.presentedTo}>This certificate is proudly presented to:</Text>
            
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{name}</Text>
            </View>
            
            {showDescription && (
              <Text style={styles.description}>
                {data.description || 'Awarded with great honor and appreciation for exceptional performance, dedication, and valuable contributions. This achievement reflects determination, passion, and a strong commitment to success. Your hard work and perseverance have made this accomplishment truly well-deserved and inspiring.'}
              </Text>
            )}

            <View style={styles.bottomSection}>
              {showSignatures ? (
                <View style={styles.signatureBlock}>
                  <View style={styles.signatureLine} />
                  <Text style={styles.signatureName}>{data.signature_1_name || 'Kimberly Nguyen'}</Text>
                  <Text style={styles.signatureTitle}>{data.signature_1_title || 'Manager'}</Text>
                </View>
              ) : <View style={styles.signatureBlock} />}
              
              {showSignatures ? (
                <View style={styles.signatureBlock}>
                  <View style={styles.signatureLine} />
                  <Text style={styles.signatureName}>{data.signature_2_name || 'Rufus Stewart'}</Text>
                  <Text style={styles.signatureTitle}>{data.signature_2_title || 'Director'}</Text>
                </View>
              ) : <View style={styles.signatureBlock} />}
            </View>
          </View>
        </View>

        {showRibbonBadge && <RibbonSeal />}

      </Page>
    </Document>
  );
};
