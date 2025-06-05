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
  

  