import { useLanguage } from "../../app/useLanguage";
import { useEffect, useState } from "react";
import { site } from "../../data/site";

function currentTime() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

export function LocalTime() {
  const { t } = useLanguage();
  const [time, setTime] = useState("");
  useEffect(() => {
    setTime(currentTime());
    const interval = window.setInterval(() => setTime(currentTime()), 60_000);
    return () => window.clearInterval(interval);
  }, []);
  return (
    <span>
      {time
        ? t(`Yerel saat · ${time}`, `Local time · ${time}`)
        : t("Türkiye saati", "Türkiye time")}
    </span>
  );
}
