"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, Eye, EyeOff } from "lucide-react"
import { testGooglePlacesAPI } from "@/lib/test-api-key"

export function APIKeyTester() {
  const [apiKey, setApiKey] = useState("")
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<{
    isValid: boolean
    error?: string
    message: string
  } | null>(null)
  const [showKey, setShowKey] = useState(false)

  const handleTest = async () => {
    if (!apiKey.trim()) {
      setResult({
        isValid: false,
        error: "Empty key",
        message: "Please enter an API key to test",
      })
      return
    }

    setTesting(true)
    setResult(null)

    try {
      const testResult = await testGooglePlacesAPI(apiKey.trim())
      setResult(testResult)
    } catch (error) {
      setResult({
        isValid: false,
        error: "Test failed",
        message: "Failed to test API key. Please try again.",
      })
    } finally {
      setTesting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">🔑 Google Places API Key Tester</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Enter your Google Places API Key:</label>
          <div className="relative">
            <Input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <Button onClick={handleTest} disabled={testing || !apiKey.trim()} className="w-full">
          {testing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing API Key...
            </>
          ) : (
            "Test API Key"
          )}
        </Button>

        {result && (
          <Alert variant={result.isValid ? "default" : "destructive"}>
            {result.isValid ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            <AlertDescription>
              <div className="font-medium mb-1">{result.isValid ? "✅ API Key is Valid!" : "❌ API Key Issue"}</div>
              <div>{result.message}</div>
              {result.error && <div className="text-sm mt-2 opacity-75">Error: {result.error}</div>}
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-medium text-yellow-800 mb-2">🔒 Security Reminder:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Never share your API key publicly</li>
            <li>• Add domain restrictions in Google Cloud Console</li>
            <li>• Monitor your API usage and billing</li>
            <li>• Revoke and regenerate keys if compromised</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
