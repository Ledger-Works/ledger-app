import { scriptLoader } from "@/lib/utils";

const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

let tokenClient: google.accounts.oauth2.TokenClient;

const useGoogleSheets = () => {

  const loadGapiScript = (): void => {
    scriptLoader("https://apis.google.com/js/api.js", () => gapi.load('client', initializeGapiClient));
  };

  const loadGisClientScript = (): void => {
    scriptLoader("https://accounts.google.com/gsi/client", initializeGisClient);
  };

  /**
   * Initialize the Google API client
   */
  const initializeGapiClient = async (): Promise<void> => {
    try {
      await gapi.client.init({
        apiKey: import.meta.env.VITE_API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
    } catch (error) {
      console.error("Error initializing GAPI client:", error);
    }
  };

  /**
   * Initialize the Google Identity Services client
   */
  const initializeGisClient = (): void => {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_CLIENT_ID,
      scope: SCOPES,
      callback: (tokenResponse: google.accounts.oauth2.TokenResponse) => {
        console.log("Token response received:", tokenResponse);
      }
    });
  };

  /**
   * Handle user authentication
   */
  const authenticateUser = async (): Promise<void> => {
    try {
      if (gapi.client.getToken() === null) {
        // Prompt user to select an account and consent to share data
        tokenClient.requestAccessToken({ prompt: 'consent' });
      } else {
        // Request access token without prompting user
        tokenClient.requestAccessToken({ prompt: '' });
      }
    } catch (error) {
      console.error("Error handling authentication:", error);
    }
  };

  return {
    loadGapiScript,
    loadGisClientScript,
    authenticateUser
  };
};

export default useGoogleSheets;
