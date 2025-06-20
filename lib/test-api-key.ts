// Utility to test Google Places API key
export async function testGooglePlacesAPI(apiKey: string): Promise<{
  isValid: boolean
  error?: string
  message: string
}> {
  if (!apiKey) {
    return {
      isValid: false,
      error: "No API key provided",
      message: "Please provide a Google Places API key",
    }
  }

  try {
    // Test with a simple place search in Tbilisi
    const testUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.7151,44.8271&radius=1000&type=lodging&key=${apiKey}`

    const response = await fetch(testUrl)
    const data = await response.json()

    if (data.status === "OK") {
      return {
        isValid: true,
        message: `API key is working! Found ${data.results?.length || 0} hotels in Tbilisi.`,
      }
    } else if (data.status === "REQUEST_DENIED") {
      return {
        isValid: false,
        error: data.error_message || "Request denied",
        message: "API key is invalid or doesn't have proper permissions. Check your Google Cloud Console settings.",
      }
    } else if (data.status === "OVER_QUERY_LIMIT") {
      return {
        isValid: false,
        error: "Over query limit",
        message: "API key is valid but you've exceeded your quota. Check your billing settings.",
      }
    } else {
      return {
        isValid: false,
        error: data.error_message || `Status: ${data.status}`,
        message: `API returned status: ${data.status}. Check Google Cloud Console for more details.`,
      }
    }
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to test API key. Check your internet connection and try again.",
    }
  }
}
