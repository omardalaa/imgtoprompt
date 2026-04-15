import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Auth Error — PromptShot AI",
  robots: { index: false, follow: false },
};

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const errorMessages: Record<string, string> = {
    Configuration: "Server configuration error. Please contact support.",
    AccessDenied: "You do not have permission to sign in.",
    Verification: "The verification link has expired or already been used.",
    OAuthAccountNotLinked:
      "An account already exists with the same email. Try a different sign-in method.",
    Default: "An authentication error occurred.",
  };

  const message =
    errorMessages[searchParams.error ?? "Default"] ?? errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle>Authentication Error</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">{message}</p>
          <Button asChild className="w-full">
            <Link href="/auth/signin">Try again</Link>
          </Button>
          <Button variant="ghost" asChild className="w-full">
            <Link href="/">Go home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
