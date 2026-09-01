const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf-8');

// 1. Add social_flyer to template select options
content = content.replace(
  '<option value="luxury_gold">Luxury Gold</option>',
  '<option value="luxury_gold">Luxury Gold</option>\n                    <option value="social_flyer">Social Flyer (Image)</option>'
);

// 2. Add avatarUrl and logoUrl states
content = content.replace(
  'const [signature2, setSignature2] = useState("Callum Price");',
  'const [signature2, setSignature2] = useState("Callum Price");\n  const [avatarUrl, setAvatarUrl] = useState("");\n  const [logoUrl, setLogoUrl] = useState("");'
);

// 3. Add social_flyer preset in useEffect
const presetString = `} else if (templateId === "social_flyer") {
      setFormat("image");
      setPrimaryColor("#3b82f6");
      setBackgroundColor("#0a0a0a");
      setTitle("NOMINATED FOR");
      setEventName("BEST STARTUP 2026");
      setRecipientName("Jane Doe");
      setAvatarUrl("https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop");
      setLogoUrl("");
    }
  }, [templateId]);`;

content = content.replace('}\n  }, [templateId]);', presetString);

// 4. Update payload to include avatarUrl and logoUrl
content = content.replace(
  'signature_2_name: signature2,',
  'signature_2_name: signature2,\n          avatar_url: avatarUrl,\n          logo_url: logoUrl,'
);

// 5. Update dependency array
content = content.replace(
  'signature1, signature2,',
  'signature1, signature2, avatarUrl, logoUrl,'
);

fs.writeFileSync('src/app/page.tsx', content);
