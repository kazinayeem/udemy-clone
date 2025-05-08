"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
      <Card className="p-3 shadow-md border text-xs bg-background text-muted-foreground">
        <div className="flex items-center justify-between gap-3">
          <p className="leading-snug">
            We use cookies. See our{" "}
            <Link href="/privacy-policy" className="underline text-primary">
              Privacy Policy
            </Link>
            .
          </p>
          <Button size="sm" className="h-7 px-3 text-xs" onClick={acceptCookies}>
            Accept
          </Button>
        </div>
      </Card>
    </div>
  );
}
