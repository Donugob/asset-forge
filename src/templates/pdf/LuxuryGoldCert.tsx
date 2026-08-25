import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Svg, Circle, Path, Defs, LinearGradient, Stop } from '@react-pdf/renderer';

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
  
  if (!Font.getRegisteredFontFamilies().includes('PT Serif')) {
    Font.register({
      family: 'PT Serif',
      fonts: [
        { src: `${origin}/fonts/PTSerif-Regular.ttf`, fontWeight: 400 },
        { src: `${origin}/fonts/PTSerif-Italic.ttf`, fontWeight: 400, fontStyle: 'italic' },
        { src: `${origin}/fonts/PTSerif-Bold.ttf`, fontWeight: 700 },
      ]
    });
  }

  const bgColor = branding?.background_color || '#d8c3a5'; // Base beige
  const primaryColor = branding?.primary_color || '#111111'; // Black/dark text

  // Features Defaults
  const showCornerShapes = features?.show_corner_shapes ?? true;
  const showRibbonBadge = features?.show_ribbon_badge ?? true;
  const showSignatures = features?.show_signatures ?? true;
  const showTrophy = features?.show_dot_grid ?? true;
  const showEventName = features?.show_event_name ?? true;
  const showDescription = features?.show_description ?? true;

  const title = data.title?.toUpperCase() || 'CERTIFICATE';
  const subtitle = data.event_name?.toUpperCase() || 'OF RECOGNITION';
  const name = data.recipient_name || 'Harumi Kobayashi';
  
  const getDynamicFontSize = (text: string, maxSize: number, minSize: number, threshold: number) => {
    if (text.length <= threshold) return maxSize;
    const size = maxSize - (text.length - threshold) * 2;
    return Math.max(size, minSize);
  };

  const titleFontSize = getDynamicFontSize(title, 52, 32, 12);
  const nameFontSize = getDynamicFontSize(name, 72, 42, 16);
  
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
      width: '100%',
      height: '100%',
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
      marginBottom: 0,
      paddingLeft: 40,
    },
    titleContainer: {
      flexDirection: 'column',
      width: '60%',
      marginTop: 20,
    },
    title: {
      fontFamily: 'PT Serif',
      fontSize: titleFontSize,
      fontWeight: 700,
      letterSpacing: 2,
      marginBottom: 5,
      color: primaryColor,
    },
    subtitle: {
      fontFamily: 'PT Serif',
      fontStyle: 'italic',
      fontSize: 16,
      letterSpacing: 6,
      color: primaryColor,
    },
    badgeContainer: {
      width: 140,
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -20,
      marginRight: 20,
    },
    centerSection: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      marginTop: 10,
    },
    presentedTo: {
      fontFamily: 'Montserrat',
      fontSize: 12,
      fontWeight: 700,
      marginBottom: 10,
      color: primaryColor,
    },
    nameContainer: {
      borderBottomWidth: 1.5,
      borderBottomColor: primaryColor,
      paddingBottom: 5,
      marginBottom: 15,
      width: '60%',
      alignItems: 'center',
    },
    name: {
      fontFamily: 'Great Vibes',
      fontSize: nameFontSize,
      color: primaryColor,
    },
    description: {
      fontFamily: 'PT Serif',
      fontStyle: 'italic',
      fontSize: 12,
      color: primaryColor,
      textAlign: 'center',
      width: '50%',
      lineHeight: 1.5,
    },
    bottomSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      height: 120,
      paddingHorizontal: 80,
      paddingBottom: 20,
    },
    signatureBlock: {
      alignItems: 'center',
      width: 140,
    },
    signatureImage: {
      fontFamily: 'Great Vibes',
      fontSize: 36,
      color: primaryColor,
      marginBottom: -15,
      transform: 'rotate(-5deg)',
      zIndex: 20,
    },
    signatureLine: {
      width: '100%',
      height: 1,
      backgroundColor: primaryColor,
      marginBottom: 8,
    },
    signatureName: {
      fontFamily: 'PT Serif',
      fontWeight: 700,
      fontSize: 12,
      color: primaryColor,
    },
    signatureTitle: {
      fontFamily: 'PT Serif',
      fontStyle: 'italic',
      fontSize: 10,
      color: primaryColor,
    }
  });

  // A luxury scalloped seal badge
  const LuxuryBadge = () => {
    // We create the starburst path manually because Polygon is buggy with gradients
    let d = "";
    for (let i = 0; i < 72; i++) {
      const radius = i % 2 === 0 ? 48 : 44;
      const angle = (i * Math.PI) / 36;
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      if (i === 0) d += `M${x},${y} `;
      else d += `L${x},${y} `;
    }
    d += "Z";

    return (
      <View style={styles.badgeContainer}>
        <Svg width="140" height="140" viewBox="0 0 100 100">
          <Defs>
            <LinearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#bf953f" />
              <Stop offset="25%" stopColor="#fcf6ba" />
              <Stop offset="50%" stopColor="#b38728" />
              <Stop offset="75%" stopColor="#fbf5b7" />
              <Stop offset="100%" stopColor="#aa771c" />
            </LinearGradient>
            <LinearGradient id="blackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#222222" />
              <Stop offset="100%" stopColor="#000000" />
            </LinearGradient>
          </Defs>
          <Path d={d} fill="url(#goldGrad)" />
          <Circle cx="50" cy="50" r="41" fill="#000" stroke="#000" strokeWidth="1" />
          <Circle cx="50" cy="50" r="38" fill="url(#blackGrad)" stroke="url(#goldGrad)" strokeWidth="1.5" />
          {/* subtle glare */}
          <Path d="M20,35 Q50,15 80,35 A38,38 0 0,0 20,35 Z" fill="#ffffff" opacity={0.15} />
        </Svg>
      </View>
    );
  };

  const ElegantBackground = () => (
    <View style={styles.backgroundWrapper} fixed>
      <Svg width="100%" height="100%" viewBox="0 0 842 595">
        <Defs>
          <LinearGradient id="bgGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#e2c589" />
            <Stop offset="100%" stopColor="#d3a758" />
          </LinearGradient>
          <LinearGradient id="bgGoldDark" x1="100%" y1="100%" x2="0%" y2="0%">
            <Stop offset="0%" stopColor="#c5a059" />
            <Stop offset="100%" stopColor="#b38728" />
          </LinearGradient>
        </Defs>
        {showCornerShapes && (
          <>
            {/* Elegant wavy lines that stay strictly in the corners, not overlapping text */}
            <Path d="M0,0 L200,0 C100,50 50,150 0,300 Z" fill="url(#bgGoldDark)" opacity={0.3} />
            <Path d="M0,0 L150,0 C80,60 30,120 0,250 Z" fill="url(#bgGoldLight)" opacity={0.5} />
            
            <Path d="M842,595 L600,595 C700,500 750,400 842,200 Z" fill="url(#bgGoldDark)" opacity={0.3} />
            <Path d="M842,595 L650,595 C720,520 780,450 842,250 Z" fill="url(#bgGoldLight)" opacity={0.5} />
            
            <Path d="M842,0 L650,0 C750,50 800,100 842,200 Z" fill="url(#bgGoldDark)" opacity={0.2} />
            <Path d="M0,595 L200,595 C100,540 50,490 0,395 Z" fill="url(#bgGoldLight)" opacity={0.2} />
          </>
        )}
      </Svg>
    </View>
  );
  
  const TrophyLaurel = () => (
    <View style={{ width: 100, height: 100, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width="80" height="80" viewBox="0 0 100 100">
        <Defs>
          <LinearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#fcf6ba" />
            <Stop offset="50%" stopColor="#d3a758" />
            <Stop offset="100%" stopColor="#aa771c" />
          </LinearGradient>
        </Defs>
        {/* Intricate Laurel Wreath Left */}
        <Path d="M45,85 C20,80 5,50 15,25 C10,35 15,55 35,75 Z" fill="url(#trophyGold)" />
        <Path d="M15,35 C20,30 30,30 30,35 C30,40 20,45 15,35 Z" fill="url(#trophyGold)" />
        <Path d="M10,45 C15,40 25,40 25,45 C25,50 15,55 10,45 Z" fill="url(#trophyGold)" />
        <Path d="M10,55 C15,50 25,50 25,55 C25,60 15,65 10,55 Z" fill="url(#trophyGold)" />
        <Path d="M15,65 C20,60 30,60 30,65 C30,70 20,75 15,65 Z" fill="url(#trophyGold)" />
        
        {/* Intricate Laurel Wreath Right */}
        <Path d="M55,85 C80,80 95,50 85,25 C90,35 85,55 65,75 Z" fill="url(#trophyGold)" />
        <Path d="M85,35 C80,30 70,30 70,35 C70,40 80,45 85,35 Z" fill="url(#trophyGold)" />
        <Path d="M90,45 C85,40 75,40 75,45 C75,50 85,55 90,45 Z" fill="url(#trophyGold)" />
        <Path d="M90,55 C85,50 75,50 75,55 C75,60 85,65 90,55 Z" fill="url(#trophyGold)" />
        <Path d="M85,65 C80,60 70,60 70,65 C70,70 80,75 85,65 Z" fill="url(#trophyGold)" />

        {/* Solid Elegant Trophy Cup */}
        <Path d="M35,25 L65,25 C65,50 55,60 50,65 C45,60 35,50 35,25 Z" fill="url(#trophyGold)" />
        <Path d="M48,65 L52,65 L52,78 L48,78 Z" fill="url(#trophyGold)" />
        <Path d="M40,78 L60,78 L60,82 L40,82 Z" fill="url(#trophyGold)" />
        
        {/* Trophy Handles */}
        <Path d="M35,30 C20,30 20,50 38,45 C35,45 25,40 25,35 L35,35 Z" fill="url(#trophyGold)" />
        <Path d="M65,30 C80,30 80,50 62,45 C65,45 75,40 75,35 L65,35 Z" fill="url(#trophyGold)" />
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
                <Text style={styles.signatureImage}>{data.signature_1_name || 'Hannah Porter'}</Text>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureName}>{data.signature_1_name || 'NAME'}</Text>
                <Text style={styles.signatureTitle}>{data.signature_1_title || 'Position'}</Text>
              </View>
            ) : <View style={styles.signatureBlock} />}
            
            {showTrophy ? <TrophyLaurel /> : <View style={{ width: 100 }} />}

            {showSignatures ? (
              <View style={styles.signatureBlock}>
                <Text style={styles.signatureImage}>{data.signature_2_name || 'Callum Price'}</Text>
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
