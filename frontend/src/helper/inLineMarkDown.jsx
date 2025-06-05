export function parseInlineMarkdown(text) {
    if (!text) return text;
  
    // Split text by bold (**text**) first
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        // Remove ** and return bold element
        const boldText = part.slice(2, -2);
        return <strong key={idx}>{boldText}</strong>;
      }
      // Could add more parsing here for italics etc.
      return part; // plain text
    });
  }