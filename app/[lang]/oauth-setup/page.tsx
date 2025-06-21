import { OAuthSetupGuide } from "@/components/oauth-setup-guide"

export default function OAuthSetupPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <OAuthSetupGuide />
      </div>
    </div>
  )
}
