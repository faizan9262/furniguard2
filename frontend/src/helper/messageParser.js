export const parseMessageBlocks = ({messageObj}) => {
    if (!messageObj || typeof messageObj !== "string") {
      return [];
    }
  
    const regex = /```(\w+)?\n([\s\S]*?)```/g;
    const blocks = [];
  
    let lastIndex = 0;
    let match;
  
    while ((match = regex.exec(messageObj)) !== null) {
      const index = match.index;
      const lang = match[1] || "text";
      const code = match[2];
  
      if (index > lastIndex) {
        blocks.push({
          type: "text",
          content: messageObj.slice(lastIndex, index),
        });
      }
  
      blocks.push({
        type: "code",
        content: code.trim(),
        language: lang,
      });
  
      lastIndex = regex.lastIndex;
    }
  
    if (lastIndex < messageObj.length) {
      blocks.push({
        type: "text",
        content: messageObj.slice(lastIndex),
      });
    }
  
    return blocks;
  };
  

  // Parses simple inline markdown for bold (**text**) and italics (*text*)
// export function parseInlineMarkdown(text) {
//     if (!text) return text;
  
//     // Split text by bold (**text**) first
//     const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
//     return parts.map((part, idx) => {
//       if (part.startsWith("**") && part.endsWith("**")) {
//         // Remove ** and return bold element
//         const boldText = part.slice(2, -2);
//         return <strong key={idx}>{boldText}</strong>;
//       }
//       // Could add more parsing here for italics etc.
//       return part; // plain text
//     });
//   }
  