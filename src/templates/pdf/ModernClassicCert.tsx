import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
  },
  container: {
    border: '2pt solid #10B981', // we will make this dynamic later
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  name: {
    fontSize: 48,
    marginBottom: 40,
    color: '#111',
  },
  description: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 60,
    paddingHorizontal: 40,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
  }
});

export const ModernClassicCert = ({ data, branding }: { data: Record<string, string>, branding?: Record<string, string> }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={[styles.container, branding?.primary_color && { borderColor: branding.primary_color }]}>
        <Text style={styles.title}>{data.title || 'Certificate of Excellence'}</Text>
        <Text style={styles.subtitle}>This is proudly presented to</Text>
        <Text style={styles.name}>{data.recipient_name || 'Recipient Name'}</Text>
        <Text style={styles.description}>{data.description || 'For outstanding achievement and dedication.'}</Text>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>{data.date || new Date().toLocaleDateString()}</Text>
          <Text style={styles.footerText}>{data.event_name || 'Event Name'}</Text>
        </View>
      </View>
    </Page>
  </Document>
);
