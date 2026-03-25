// Clerk redirects the OAuth provider callback here before forwarding the user
// to the final destination URL passed as `redirectUrl` in signIn.sso() /
// signUp.sso(). ClerkProvider detects the OAuth state in the URL automatically,
// so this page just needs to exist and be rendered inside ClerkProvider.
export default function SSOCallbackPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-foreground" />
    </div>
  );
}
