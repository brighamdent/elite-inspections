import React, { useEffect } from "react";

export default function useScrollToBottom(htmlElement: string, items: any[]) {
  useEffect(() => {
    const el = document.getElementById(htmlElement);

    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [items]);
}
