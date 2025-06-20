"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Key,
  Shield,
  CheckCircle,
  AlertTriangle,
  Copy,
  ExternalLink,
  FileText,
  Settings,
  Globe,
  CreditCard,
} from "lucide-react"
import Link from "next/link"

export function APISetupGuide() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const envFileContent = `# Google Places API Configuration
GOOGLE_PLACES_API_KEY=your_actual_api_key_here

# Replace 'your_actual_api_key_here' with your real API key
# Example: GOOGLE_PLACES_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">🔑 API Key Setup Guide</h2>
        <p className="text-muted-foreground">Follow these steps to securely add your Google Places API key</p>
      </div>

      <Tabs defaultValue="setup" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Step 1: Create Environment File
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Create a file called <code className="bg-muted px-2 py-1 rounded">.env.local</code> in your project root
                directory
              </p>

              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative">
                <pre>{envFileContent}</pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(envFileContent)}
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>

              <Alert>
                <Key className="h-4 w-4" />
                <AlertDescription>
                  Replace <code>your_actual_api_key_here</code> with your real Google Places API key that starts with
                  "AIza..."
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Step 2: File Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-mono text-sm">
                  📁 your-project/
                  <br />
                  ├── 📁 app/
                  <br />
                  ├── 📁 components/
                  <br />
                  ├── 📁 lib/
                  <br />
                  ├── 📄 .env.local <span className="text-green-600">← Create this file here</span>
                  <br />
                  ├── 📄 .gitignore
                  <br />
                  ├── 📄 next.config.mjs
                  <br />
                  └── 📄 package.json
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Step 3: Restart Development Server
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                After creating the .env.local file, restart your development server:
              </p>

              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div>
                  1. Stop the server: <kbd className="bg-gray-700 px-2 py-1 rounded">Ctrl + C</kbd>
                </div>
                <div>
                  2. Start again: <code>npm run dev</code>
                </div>
              </div>

              <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>The API key will now be available to your application securely!</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-700 dark:text-green-400">✅ Do This:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Keep API key in .env.local file</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Add .env.local to .gitignore</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Use server-side API calls only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Set up API restrictions in Google Cloud</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-red-700 dark:text-red-400">❌ Don't Do This:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <span>Put API key directly in code</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <span>Commit .env.local to Git</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <span>Use API key on client-side</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <span>Share API key publicly</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Google Cloud Console Restrictions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Set up these restrictions in Google Cloud Console for maximum security:
              </p>

              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h4 className="font-medium mb-2">API Restrictions</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Places API</li>
                    <li>• Maps JavaScript API</li>
                    <li>• Geocoding API (optional)</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-3">
                  <h4 className="font-medium mb-2">Application Restrictions</h4>
                  <ul className="text-sm space-y-1">
                    <li>• HTTP referrers (websites)</li>
                    <li>• Add your domain: yourdomain.com/*</li>
                    <li>• Add localhost for development: localhost:3000/*</li>
                  </ul>
                </div>
              </div>

              <Button variant="outline" asChild>
                <Link href="https://console.cloud.google.com/apis/credentials" target="_blank">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Google Cloud Console
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Test Your API Key
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                After setting up your API key, test it using the button on the main page:
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Testing Steps:</h4>
                <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
                  <li>Go back to the main page</li>
                  <li>Click "Load Real Hotels from Google Places"</li>
                  <li>Check if real hotel data loads</li>
                  <li>Look for the green "Using Real Data" badge</li>
                </ol>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  If you see errors, check the browser console (F12) for detailed error messages.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Production Deployment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">When deploying to production (Vercel, Netlify, etc.):</p>

              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h4 className="font-medium mb-2">Vercel Deployment</h4>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Go to your Vercel project dashboard</li>
                    <li>Navigate to Settings → Environment Variables</li>
                    <li>
                      Add: <code>GOOGLE_PLACES_API_KEY</code>
                    </li>
                    <li>Paste your API key as the value</li>
                    <li>Redeploy your application</li>
                  </ol>
                </div>

                <div className="border rounded-lg p-3">
                  <h4 className="font-medium mb-2">Other Platforms</h4>
                  <p className="text-sm">
                    Add the environment variable <code>GOOGLE_PLACES_API_KEY</code> in your hosting platform's
                    environment variables section.
                  </p>
                </div>
              </div>

              <Alert className="border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Update your Google Cloud Console restrictions to include your production
                  domain!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <Button asChild>
          <Link href="/">Test API Key on Main Page</Link>
        </Button>
      </div>
    </div>
  )
}
