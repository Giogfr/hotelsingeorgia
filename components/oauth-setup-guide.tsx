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
  Users,
} from "lucide-react"
import Link from "next/link"

export function OAuthSetupGuide() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const envFileContent = `# Google OAuth2 Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=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

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_here

# Generate a random secret with: openssl rand -base64 32`

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">🔐 OAuth2 Setup Guide</h2>
        <p className="text-muted-foreground">Set up Google OAuth2 for social login functionality</p>
      </div>

      <Alert className="border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-200">
        <Users className="h-4 w-4" />
        <AlertDescription>
          <strong>Good news!</strong> I've already added your Google Client Secret to the configuration. You just need
          to get your Client ID and set up a few more things.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="setup" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="google">Google Console</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Step 1: Update Environment File
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Update your <code className="bg-muted px-2 py-1 rounded">.env.local</code> file with OAuth2
                configuration:
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
                  <strong>Your Client Secret is already set!</strong> You need to:
                  <br />
                  1. Get your Google Client ID from Google Cloud Console
                  <br />
                  2. Generate a NextAuth secret (or use any random string)
                  <br />
                  3. Replace the placeholder values above
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Step 2: Install NextAuth
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Install NextAuth.js for authentication:</p>

              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <code>npm install next-auth</code>
              </div>

              <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>I've already created all the NextAuth configuration files for you!</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="google" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Google Cloud Console Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Follow these steps to get your Google Client ID and configure OAuth2:
              </p>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">1. Create OAuth2 Credentials</h4>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Go to Google Cloud Console</li>
                    <li>Navigate to "APIs & Services" → "Credentials"</li>
                    <li>Click "Create Credentials" → "OAuth client ID"</li>
                    <li>Choose "Web application"</li>
                    <li>Name it "GeorgiaStay OAuth"</li>
                  </ol>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">2. Configure Redirect URIs</h4>
                  <div className="space-y-2">
                    <p className="text-sm">Add these authorized redirect URIs:</p>
                    <div className="bg-muted p-2 rounded font-mono text-sm">
                      <div>http://localhost:3000/api/auth/callback/google</div>
                      <div>https://yourdomain.com/api/auth/callback/google</div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">3. Get Your Client ID</h4>
                  <p className="text-sm">
                    After creating the OAuth client, copy the <strong>Client ID</strong> and add it to your .env.local
                    file.
                  </p>
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
                Test Social Login
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">After setting up OAuth2, test the social login:</p>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Testing Steps:</h4>
                <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
                  <li>Restart your development server</li>
                  <li>Go to /login/social</li>
                  <li>Click "Continue with Google"</li>
                  <li>Complete the Google OAuth flow</li>
                  <li>You should be redirected back and logged in</li>
                </ol>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  If you see errors, check the browser console (F12) and make sure your redirect URIs are correctly
                  configured in Google Cloud Console.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Production Deployment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">For production deployment:</p>

              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <h4 className="font-medium mb-2">Environment Variables</h4>
                  <p className="text-sm mb-2">Add these to your hosting platform:</p>
                  <ul className="text-sm space-y-1 font-mono">
                    <li>GOOGLE_CLIENT_ID</li>
                    <li>GOOGLE_CLIENT_SECRET</li>
                    <li>NEXTAUTH_URL (your production URL)</li>
                    <li>NEXTAUTH_SECRET</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-3">
                  <h4 className="font-medium mb-2">Update Google Cloud Console</h4>
                  <p className="text-sm">
                    Add your production domain to the authorized redirect URIs:
                    <br />
                    <code className="bg-muted px-1 rounded">https://yourdomain.com/api/auth/callback/google</code>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <Button asChild>
          <Link href="/login/social">Test Social Login</Link>
        </Button>
      </div>
    </div>
  )
}
