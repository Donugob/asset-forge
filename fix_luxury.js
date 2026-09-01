const fs = require('fs');

let content = fs.readFileSync('src/templates/pdf/LuxuryGoldCert.tsx', 'utf8');

// just manually construct the JSX part by finding the index
const jsxStart = content.indexOf('          <View style={styles.bottomSection}>');
// find exactly the end of the return statement
const jsxEnd = content.indexOf('        </View>\n\n      </Page>');

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
            ) : <View style={styles.signatureBlock} />}
          </View>
`;

content = content.substring(0, jsxStart) + newJsx + content.substring(jsxEnd);

fs.writeFileSync('src/templates/pdf/LuxuryGoldCert.tsx', content);
