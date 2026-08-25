import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Svg, Circle, Path, Polygon, Defs, LinearGradient, Stop } from '@react-pdf/renderer';

export const LuxuryGoldCert = ({ data, branding, features, origin = '' }: { data: Record<string, string>, branding?: Record<string, string>, features?: Record<string, boolean>, origin?: string }) => {
  
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
  
  if (!Font.getRegisteredFontFamilies().includes('Playfair Display')) {
    Font.register({
      family: 'Playfair Display',
      fonts: [
        { src: `${origin}/fonts/PlayfairDisplay-Regular.ttf`, fontWeight: 400 },
        { src: `${origin}/fonts/PlayfairDisplay-Italic.ttf`, fontWeight: 400, fontStyle: 'italic' },
        { src: `${origin}/fonts/PlayfairDisplay-Bold.ttf`, fontWeight: 700 },
      ]
    });
  }

  const bgColor = branding?.background_color || '#d8c3a5'; // Base beige
  const primaryColor = branding?.primary_color || '#111111'; // Black/dark text

  // Features Defaults
  const showCornerShapes = features?.show_corner_shapes ?? true;
  const showRibbonBadge = features?.show_ribbon_badge ?? true;
  const showSignatures = features?.show_signatures ?? true;
  const showEventName = features?.show_event_name ?? true;
  const showDescription = features?.show_description ?? true;

  const title = data.title?.toUpperCase() || 'CERTIFICATE';
  const subtitle = data.event_name?.toUpperCase() || 'OF RECOGNITION';
  const name = data.recipient_name || 'Harumi Kobayashi';
  
  const getDynamicFontSize = (text: string, maxSize: number, minSize: number, threshold: number) => {
    if (text.length <= threshold) return maxSize;
    const size = maxSize - (text.length - threshold) * 1.5;
    return Math.max(size, minSize);
  };

  const titleFontSize = getDynamicFontSize(title, 42, 24, 15);
  const nameFontSize = getDynamicFontSize(name, 56, 32, 16);
  
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: bgColor,
      color: primaryColor,
      fontFamily: 'Montserrat',
      overflow: 'hidden',
    },
    backgroundWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
    },
    content: {
      flex: 1,
      padding: 50,
      paddingTop: 60,
      zIndex: 10,
    },
    topSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 30,
    },
    titleContainer: {
      flexDirection: 'column',
      width: '60%',
    },
    title: {
      fontFamily: 'Playfair Display',
      fontSize: titleFontSize,
      fontWeight: 700,
      letterSpacing: 3,
      marginBottom: 5,
      color: primaryColor,
    },
    subtitle: {
      fontFamily: 'Playfair Display',
      fontStyle: 'italic',
      fontSize: 14,
      letterSpacing: 4,
      color: primaryColor,
    },
    badgeContainer: {
      width: 120,
      height: 120,
      alignItems: 'center',
      justifyContent: 'center',
    },
    centerSection: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    presentedTo: {
      fontSize: 10,
      fontWeight: 700,
      marginBottom: 10,
      color: primaryColor,
    },
    nameContainer: {
      borderBottomWidth: 1,
      borderBottomColor: primaryColor,
      paddingBottom: 5,
      marginBottom: 15,
      width: '70%',
      alignItems: 'center',
    },
    name: {
      fontFamily: 'Great Vibes',
      fontSize: nameFontSize,
      color: primaryColor,
    },
    description: {
      fontFamily: 'Playfair Display',
      fontStyle: 'italic',
      fontSize: 11,
      color: primaryColor,
      textAlign: 'center',
      width: '60%',
      lineHeight: 1.5,
    },
    bottomSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      height: 100,
      paddingHorizontal: 30,
    },
    signatureBlock: {
      alignItems: 'center',
      width: 120,
    },
    signatureLine: {
      width: '100%',
      height: 1,
      backgroundColor: primaryColor,
      marginBottom: 5,
    },
    signatureName: {
      fontFamily: 'Playfair Display',
      fontWeight: 700,
      fontSize: 10,
      color: primaryColor,
    },
    signatureTitle: {
      fontFamily: 'Playfair Display',
      fontStyle: 'italic',
      fontSize: 9,
      color: primaryColor,
    }
  });

  // A luxury scalloped seal badge (black and gold)
  const LuxuryBadge = () => {
    const points = Array.from({ length: 72 }).map((_, i) => {
      const radius = i % 2 === 0 ? 45 : 42;
      const angle = (i * Math.PI) / 36;
      return `${50 + radius * Math.cos(angle)},${50 + radius * Math.sin(angle)}`;
    }).join(' ');

    return (
      <View style={styles.badgeContainer}>
        <Svg width="100" height="100">
          <Defs>
            <LinearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#bf953f" />
              <Stop offset="25%" stopColor="#fcf6ba" />
              <Stop offset="50%" stopColor="#b38728" />
              <Stop offset="75%" stopColor="#fbf5b7" />
              <Stop offset="100%" stopColor="#aa771c" />
            </LinearGradient>
            <LinearGradient id="blackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#333333" />
              <Stop offset="100%" stopColor="#000000" />
            </LinearGradient>
          </Defs>
          <Polygon points={points} fill="url(#goldGrad)" />
          <Circle cx="50" cy="50" r="38" fill="#000" stroke="#000" strokeWidth="1" />
          <Circle cx="50" cy="50" r="35" fill="url(#blackGrad)" stroke="url(#goldGrad)" strokeWidth="2" />
        </Svg>
      </View>
    );
  };

  // Simple elegant SVG background with curved golden lines
  const ElegantBackground = () => (
    <View style={styles.backgroundWrapper} fixed>
      <Svg width="842" height="595">
        <Defs>
          <LinearGradient id="bgGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#c5a059" stopOpacity="0.4" />
            <Stop offset="50%" stopColor="#e8d8c3" stopOpacity="0" />
            <Stop offset="100%" stopColor="#c5a059" stopOpacity="0.5" />
          </LinearGradient>
        </Defs>
        <Path d="M0 0 L842 0 L842 595 L0 595 Z" fill={bgColor} />
        {showCornerShapes && (
          <>
            <Path d="M0,0 Q200,300 0,595" fill="none" stroke="url(#bgGold)" strokeWidth="40" />
            <Path d="M842,0 Q600,200 842,595" fill="none" stroke="url(#bgGold)" strokeWidth="60" />
            <Path d="M0,595 Q421,400 842,595" fill="none" stroke="url(#bgGold)" strokeWidth="30" />
          </>
        )}
      </Svg>
    </View>
  );
  
  // A simple SVG trophy/laurel graphic for the center bottom
  const TrophyLaurel = () => (
    <View style={{ width: 80, height: 80, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width="60" height="60" viewBox="0 0 100 100">
        <Defs>
          <LinearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#fcf6ba" />
            <Stop offset="50%" stopColor="#bf953f" />
            <Stop offset="100%" stopColor="#aa771c" />
          </LinearGradient>
        </Defs>
        {/* Simple Laurel Branches */}
        <Path d="M20,80 Q10,50 30,20" fill="none" stroke="url(#trophyGold)" strokeWidth="3" />
        <Path d="M80,80 Q90,50 70,20" fill="none" stroke="url(#trophyGold)" strokeWidth="3" />
        {/* Trophy Cup */}
        <Path d="M35,30 L65,30 L60,60 Q50,75 40,60 Z" fill="url(#trophyGold)" />
        <Path d="M45,65 L55,65 L55,80 L40,80 L60,80" fill="none" stroke="url(#trophyGold)" strokeWidth="4" />
        <Path d="M35,35 Q20,35 25,50 Q30,60 38,55" fill="none" stroke="url(#trophyGold)" strokeWidth="2" />
        <Path d="M65,35 Q80,35 75,50 Q70,60 62,55" fill="none" stroke="url(#trophyGold)" strokeWidth="2" />
      </Svg>
    </View>
  );

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <ElegantBackground />

        <View style={styles.content}>
          <View style={styles.topSection}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
              {showEventName && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
            {showRibbonBadge && <LuxuryBadge />}
          </View>

          <View style={styles.centerSection}>
            <Text style={styles.presentedTo}>This certificate is presented to :</Text>
            
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{name}</Text>
            </View>
            
            {showDescription && (
              <Text style={styles.description}>
                {data.description || 'In recognition of her great performance during the month of November 2023. As a tribute for her loyalty and efforts.'}
              </Text>
            )}
          </View>

          <View style={styles.bottomSection}>
            {showSignatures ? (
              <View style={styles.signatureBlock}>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureName}>{data.signature_1_name || 'NAME'}</Text>
                <Text style={styles.signatureTitle}>{data.signature_1_title || 'Position'}</Text>
              </View>
            ) : <View style={styles.signatureBlock} />}
            
            <TrophyLaurel />

            {showSignatures ? (
              <View style={styles.signatureBlock}>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureName}>{data.signature_2_name || 'NAME'}</Text>
                <Text style={styles.signatureTitle}>{data.signature_2_title || 'Position'}</Text>
              </View>
            ) : <View style={styles.signatureBlock} />}
          </View>
        </View>

      </Page>
    </Document>
  );
};
