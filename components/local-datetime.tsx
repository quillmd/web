"use client";
import { cn } from "@/lib/utils";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";


interface LocalDateTimeProps extends React.HTMLAttributes<HTMLElement> {
  isoString: string;
}
export default function LocalDateTime({
  isoString,
  className,
}: LocalDateTimeProps) {
  const [LocalDateTime, setLocalDateTime] = useState<string | undefined>();

  useEffect(() => {
    setLocalDateTime(
      DateTime.fromISO(isoString, { zone: "utc" })
        .toLocal()
        .toLocaleString(DateTime.DATETIME_SHORT)
    );
  }, [isoString]);

  return <span className={cn(className, LocalDateTime? "" : "text-transparent")}>{LocalDateTime || isoString}</span>;
}
