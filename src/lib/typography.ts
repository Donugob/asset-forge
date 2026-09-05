export const formatContestantName = (rawName: string): string[] => {
  if (!rawName) return [""];

  // 1. Clean and split
  let rawParts = rawName.trim().replace(/\s+/g, " ").split(" ");
  
  // 2. Identify Title Block
  const titleKeywords = new Set([
    "mr", "mr.", "mrs", "mrs.", "miss", "ms", "ms.", "dr", "dr.", "prof", "prof.", "chief",
    "hon", "hon.", "engr", "engr.", "pastor", "pst", "pst.", "rev", "rev.", 
    "fr", "fr.", "apostle", "sir", "lady", "alhaji", "hajiya", "sen", "sen.", 
    "gov", "gov.", "amb", "amb.", "&", "and", "h.e.", "h.e"
  ]);

  let titleBlock: string[] = [];
  let nameBlock: string[] = [];
  
  let i = 0;
  while (i < rawParts.length) {
    const cleanWord = rawParts[i].toLowerCase().replace(/[^a-z&]/g, "");
    if (titleKeywords.has(cleanWord)) {
      titleBlock.push(rawParts[i]);
      i++;
    } else {
      break;
    }
  }
  
  nameBlock = rawParts.slice(i);
  
  // Fallback if everything was a title
  if (nameBlock.length === 0) {
    nameBlock = titleBlock;
    titleBlock = [];
  }

  // 3. Smart Abbreviation
  if (nameBlock.length > 2) {
    let totalLen = nameBlock.join(" ").length;
    if (totalLen > 14) {
      for (let j = 1; j < nameBlock.length - 1; j++) {
        if (nameBlock[j].length > 2) {
          nameBlock[j] = nameBlock[j][0].toUpperCase() + ".";
        }
      }
    }
    totalLen = nameBlock.join(" ").length;
    if (totalLen > 18) {
      if (nameBlock[0].length > 2) {
        nameBlock[0] = nameBlock[0][0].toUpperCase() + ".";
      }
    }
  }

  // 4. Tokenize for line balancing
  const tokens: string[] = [];
  if (titleBlock.length > 0) {
    tokens.push(titleBlock.join(" ")); // Keep titles clustered as one atomic unit
  }
  tokens.push(...nameBlock);

  // 5. Line Balancing
  const totalChars = tokens.join(" ").length;
  // If string is short enough, keep it on one line for elegance
  if (totalChars <= 13 && tokens.length <= 2) {
    return [tokens.join(" ")];
  }

  let bestSplitIdx = 1;
  let minDiff = Infinity;
  let bestCost = Infinity;

  if (tokens.length > 1) {
    for (let split = 1; split < tokens.length; split++) {
      const l1 = tokens.slice(0, split).join(" ");
      const l2 = tokens.slice(split).join(" ");
      
      const cost = Math.max(l1.length, l2.length);
      const diff = Math.abs(l1.length - l2.length);
      
      if (cost < bestCost || (cost === bestCost && diff < minDiff)) {
        bestCost = cost;
        minDiff = diff;
        bestSplitIdx = split;
      }
    }
    
    return [
      tokens.slice(0, bestSplitIdx).join(" "),
      tokens.slice(bestSplitIdx).join(" ")
    ];
  }

  return [tokens[0]];
};
