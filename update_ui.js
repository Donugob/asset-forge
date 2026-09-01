const fs = require('fs');

let page = fs.readFileSync('src/app/page.tsx', 'utf-8');

// Add to dropdown
page = page.replace(
  '<option value="social_flyer">Social Flyer (Image)</option>',
  '<option value="social_flyer">Social Flyer (Image)</option>\n                    <option value="vertical_pitch">Vertical Pitch (Image)</option>'
);

// Add to preset logic
const presetLogic = `} else if (templateId === "vertical_pitch") {
      setFormat("image");
      setPrimaryColor("#3ef07a");
      setBackgroundColor("#0a0a0a");
      setTitle("Pitch Contestant");
      setEventName("INNOVATION HUB VENTURE NIGHT");
      setRecipientName("Callum Price");
      setSignature1("@reallygreatsite");
      setSignature2("123-456-789");
      setAvatarUrl("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop");
    }
  }, [templateId]);`;

page = page.replace('}\n  }, [templateId]);', presetLogic);

fs.writeFileSync('src/app/page.tsx', page);
