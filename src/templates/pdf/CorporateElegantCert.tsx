import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Svg, Circle, Path, Defs, LinearGradient, Stop, Polygon, Polyline } from '@react-pdf/renderer';

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

  const bgColor = branding?.background_color || '#1f2937'; // Default dark slate
  const primaryColor = branding?.primary_color || '#d4af37'; // Default gold

  // Features Defaults
  const showTopBanner = features?.show_corner_shapes ?? true; 
  const showRibbonBadge = features?.show_ribbon_badge ?? true;
  const showSignatures = features?.show_signatures ?? true;
  const showLogo = features?.show_dot_grid ?? true; 

  const title = data.title || 'CERTIFICATE';
  const subtitle = data.event_name || 'OF ACHIEVEMENT';
  const name = data.recipient_name || 'Harumi Kobayashi';
  
  // Calculate dynamic font sizes
  const nameLength = name.length;
  const nameFontSize = nameLength > 20 ? 32 : nameLength > 15 ? 40 : 48;

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: bgColor,
      position: 'relative',
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
      flexDirection: 'row',
      paddingTop: 120,
      paddingLeft: 60,
      paddingRight: 60,
    },
    leftCol: {
      flex: 0.4,
      paddingRight: 20,
      alignItems: 'flex-start',
    },
    rightCol: {
      flex: 0.6,
      alignItems: 'center',
      paddingTop: 60, // Push content down
    },
    title: {
      fontFamily: 'Montserrat',
      fontSize: 42,
      fontWeight: 900,
      color: '#ffffff',
      marginBottom: 4,
      letterSpacing: -1,
    },
    subtitle: {
      fontFamily: 'Montserrat',
      fontSize: 12,
      fontWeight: 400,
      letterSpacing: 4,
      color: '#ffffff',
      textTransform: 'uppercase',
    },
    badgeContainer: {
      marginTop: 80,
      marginLeft: 20,
      width: 140,
      height: 140,
    },
    presentedTo: {
      fontFamily: 'Montserrat',
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 4,
      color: '#ffffff',
      textTransform: 'uppercase',
      marginBottom: 20,
    },
    nameContainer: {
      marginBottom: 20,
      width: '100%',
      alignItems: 'center',
    },
    name: {
      fontFamily: 'Great Vibes',
      fontSize: nameFontSize,
      color: primaryColor,
    },
    divider: {
      width: '100%',
      height: 1,
      backgroundColor: '#ffffff',
      opacity: 0.2,
      marginBottom: 15,
    },
    description: {
      fontFamily: 'Montserrat',
      fontSize: 10,
      color: '#a0aec0',
      lineHeight: 1.6,
      textAlign: 'center',
      width: '100%',
      paddingHorizontal: 20,
    },
    bottomSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 60,
      paddingHorizontal: 40,
    },
    signatureBlock: {
      alignItems: 'center',
      width: 120,
    },
    signatureLine: {
      width: '100%',
      height: 1,
      backgroundColor: '#ffffff',
      opacity: 0.3,
      marginBottom: 8,
    },
    signatureText: {
      fontFamily: 'Montserrat',
      fontWeight: 700,
      fontSize: 9,
      color: '#ffffff',
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
  });

  const CorporateBackground = () => (
    <View style={styles.backgroundWrapper} fixed>
      <Svg width="100%" height="100%" viewBox="0 0 842 595">
        <Defs>
          <LinearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={primaryColor} />
            <Stop offset="50%" stopColor="#fdf0b0" />
            <Stop offset="100%" stopColor={primaryColor} />
          </LinearGradient>
          <LinearGradient id="darkOverlay1" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#111827" />
            <Stop offset="100%" stopColor="#1f2937" />
          </LinearGradient>
          <LinearGradient id="darkOverlay2" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#0f172a" />
            <Stop offset="100%" stopColor="#1e293b" />
          </LinearGradient>
        </Defs>

        {showTopBanner && (
          <>
            {/* Top-most triangle gold accent */}
            <Polygon points="100,0 450,0 350,150" fill="url(#goldGrad)" />
            
            {/* Dark overlay 2 (Middle layer) */}
            <Polygon points="0,0 842,0 842,210 400,90 0,200" fill="url(#darkOverlay2)" />
            {/* Gold trim for overlay 2 */}
            <Polyline points="0,200 400,90 842,210" fill="none" stroke="url(#goldGrad)" strokeWidth="4" />
            
            {/* Dark overlay 1 (Top-most left layer) */}
            <Polygon points="0,0 320,0 0,230" fill="url(#darkOverlay1)" />
          </>
        )}
        
        {/* Bottom subtle shadow/gradient */}
        <Polygon points="0,550 842,500 842,595 0,595" fill="#111827" opacity={0.3} />
      </Svg>
    </View>
  );

  const RibbonSeal = () => {
    // Generate scalloped points
    let d = "";
    for (let i = 0; i < 36; i++) {
      const radius = i % 2 === 0 ? 35 : 32;
      const angle = (i * Math.PI) / 18;
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      if (i === 0) d += `M${x},${y} `;
      else d += `L${x},${y} `;
    }
    d += "Z";

    return (
      <View style={styles.badgeContainer}>
        <Svg width="100" height="130" viewBox="0 0 100 130">
          <Defs>
            <LinearGradient id="sealGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={primaryColor} />
              <Stop offset="50%" stopColor="#fdf0b0" />
              <Stop offset="100%" stopColor="#b18f27" />
            </LinearGradient>
          </Defs>
          
          {/* Ribbons */}
          <Path d="M25,45 L15,115 L35,100 L55,115 Z" fill="url(#sealGold)" />
          <Path d="M75,45 L85,115 L65,100 L45,115 Z" fill="url(#sealGold)" />
          
          {/* Seal Base */}
          <Path d={d} fill="url(#sealGold)" />
          
          {/* Inner Circles */}
          <Circle cx="50" cy="50" r="28" fill="#1f2937" />
          <Circle cx="50" cy="50" r="26" fill="none" stroke="url(#sealGold)" strokeWidth="1" />
        </Svg>
        <View style={{ position: 'absolute', top: 38, width: 100, alignItems: 'center' }}>
          <Text style={{ fontSize: 10, fontFamily: 'Montserrat', color: primaryColor, fontWeight: 700 }}>2026</Text>
          <Text style={{ fontSize: 8, fontFamily: 'Montserrat', color: '#ffffff', fontWeight: 400 }}>AWARD</Text>
        </View>
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <CorporateBackground />

        <View style={styles.content}>
          <View style={styles.leftCol}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            
            {showRibbonBadge && <RibbonSeal />}
          </View>

          <View style={styles.rightCol}>
            <Text style={styles.presentedTo}>PROUDLY PRESENTED TO</Text>
            
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{name}</Text>
            </View>
            
            <View style={styles.divider} />

            <Text style={styles.description}>
              {data.description || 'Awarded with great honor and appreciation for exceptional performance, dedication, and valuable contributions. This achievement reflects determination, passion, and a strong commitment to success.'}
            </Text>

            <View style={styles.bottomSection}>
              {showSignatures && (
                <View style={styles.signatureBlock}>
                  <View style={styles.signatureLine} />
                  <Text style={styles.signatureText}>DATE</Text>
                </View>
              )}
              
              {showSignatures && (
                <View style={styles.signatureBlock}>
                  <View style={styles.signatureLine} />
                  <Text style={styles.signatureText}>SIGNATURE</Text>
                </View>
              )}
            </View>
          </View>
        </View>

      </Page>
    </Document>
  );
};
