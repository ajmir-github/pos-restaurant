import { useEffect, useState } from "react";

export default function useNotification(
  depArray,
  url = "RZFWLXE-bell-hop-bell.mp3"
) {
  const [depArrayLength, setDepArraylength] = useState(0);
  const audio = new Audio(url);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const listener = audio.addEventListener("canplaythrough", () =>
      setReady(true)
    );

    return () => removeEventListener("canplaythrough", listener);
  }, []);

  useEffect(() => {
    if (depArrayLength !== depArray.length) {
      setDepArraylength(depArray.length);
      if (ready) audio.play();
    }
  }, [depArray]);
  return audio;
}
