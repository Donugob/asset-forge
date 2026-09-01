const fs = require('fs');

let content = fs.readFileSync('src/templates/pdf/LuxuryGoldCert.tsx', 'utf8');

// Add showTrophy
content = content.replace(
  'const showSignatures = features?.show_signatures ?? true;',
  'const showSignatures = features?.show_signatures ?? true;\n  const showTrophy = features?.show_dot_grid ?? true;'
);

// Add cursive signature text styles
const stylesStart = content.indexOf('signatureBlock: {');
const stylesEnd = content.indexOf('signatureLine: {');
const newStyles = `signatureBlock: {
      alignItems: 'center',
      width: 120,
    },
    signatureImage: {
      fontFamily: 'Great Vibes',
      fontSize: 28,
      color: primaryColor,
      marginBottom: -10,
      transform: 'rotate(-5deg)',
      zIndex: 20,
    },
    `;
content = content.substring(0, stylesStart) + newStyles + content.substring(stylesEnd);

// Add cursive signatures in the JSX
const jsxStart = content.indexOf('          <View style={styles.bottomSection}>');
const jsxEnd = content.indexOf('          </View>', jsxStart);
const newJsx = `          <View style={styles.bottomSection}>
            {showSignatures ? (
              <View style={styles.signatureBlock}>
                <Text style={styles.signatureImage}>{data.signature_1_name || 'Hannah Porter'}</Text>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureName}>{data.signature_1_name || 'NAME'}</Text>
                <Text style={styles.signatureTitle}>{data.signature_1_title || 'Position'}</Text>
              </View>
            ) : <View style={styles.signatureBlock} />}
            
            {showTrophy ? <TrophyLaurel /> : <View style={{ width: 80 }} />}

            {showSignatures ? (
              <View style={styles.signatureBlock}>
                <Text style={styles.signatureImage}>{data.signature_2_name || 'Callum Price'}</Text>
                <View style={styles.signatureLine} />
                <Text style={styles.signatureName}>{data.signature_2_name || 'NAME'}</Text>
                <Text style={styles.signatureTitle}>{data.signature_2_title || 'Position'}</Text>
              </View>
            ) : <View style={styles.signatureBlock} />}`;

content = content.substring(0, jsxStart) + newJsx + content.substring(jsxEnd);

fs.writeFileSync('src/templates/pdf/LuxuryGoldCert.tsx', content);
