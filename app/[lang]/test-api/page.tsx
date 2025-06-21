import { APIKeyTester } from "@/components/api-key-tester"

export default function TestAPIPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Test Your Google Places API Key</h1>
          <p className="text-muted-foreground">
            Use this tool to verify if your Google Places API key is working correctly
          </p>
        </div>

        <APIKeyTester />

        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6">📋 Setup Instructions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">1. Get Your API Key</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  Go to{" "}
                  <a
                    href="https://console.cloud.google.com/"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Google Cloud Console
                  </a>
                </li>
                <li>Create a new project or select existing</li>
                <li>Enable "Places API" and "Maps JavaScript API"</li>
                <li>Go to "Credentials" → "Create Credentials" → "API Key"</li>
                <li>Copy your new API key</li>
              </ol>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">2. Secure Your Key</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Click "Restrict Key" in Google Cloud Console</li>
                <li>Add your domain to "HTTP referrers"</li>
                <li>Restrict to "Places API" only</li>
                <li>Set up billing (required for API usage)</li>
                <li>Monitor usage in the console</li>
              </ol>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">💰 Pricing Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Places Nearby Search:</strong>
                <br />
                $32 per 1,000 requests
              </div>
              <div>
                <strong>Place Details:</strong>
                <br />
                $17 per 1,000 requests
              </div>
              <div>
                <strong>Place Photos:</strong>
                <br />
                $7 per 1,000 requests
              </div>
            </div>
            <p className="text-sm mt-3 text-blue-700">💡 Google provides $200 free credit monthly for new users</p>
          </div>
        </div>
      </div>
    </div>
  )
}
