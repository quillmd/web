import { useEffect, useState } from "react";

export default function ScribingEffect({
  text = "Squire is scribing this note...",
  speed = 150,
}) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      // Reset the animation after a pause
      const resetTimer = setTimeout(() => {
        setDisplayText("");
        setIndex(0);
      }, 1000);

      return () => clearTimeout(resetTimer);
    }
  }, [index, text, speed]);

  return (
    <pre className="font-mono text-sm whitespace-pre-wrap">
      {displayText}
      <span className="animate-blink">|</span>
    </pre>
  );
}
