import { useStorage } from "@/composables/useStorage";
import { scriptLoader } from "@/lib/utils";
import axios from "axios";

const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/drive.readonly';
let tokenClient: google.accounts.oauth2.TokenClient;

const useGoogleSheets = () => {

  const { useIndexedDB } = useStorage()

  const loadGapiScript = async (): Promise<void> => {
    await scriptLoader("https://apis.google.com/js/api.js", () => gapi.load('client', initializeGapiClient));
  };

  const loadGisClientScript = async (): Promise<void> => {
    await scriptLoader("https://accounts.google.com/gsi/client", initializeGisClient);
  };

  const getGoogleToken = async (): Promise<Ref<string | null>> => {
    return await useIndexedDB('access_token') || 'NO Token'
  }

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
        useIndexedDB('access_token', tokenResponse.access_token)
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

  async function getAllSpreadsheets(accessToken: string) {
    const response = await axios.get('https://www.googleapis.com/drive/v3/files', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      params: {
        q: "mimeType='application/vnd.google-apps.spreadsheet'",
        fields: 'nextPageToken, files(id, name)',
        spaces: 'drive',
      }
    });

    return await response.data
  }


  // Function to list sheets in the spreadsheet
  async function listSheets() {
    const accessToken: Ref<string | null> = await getGoogleToken()
    const spreadsheetData = await getAllSpreadsheets(accessToken.value || '');

    if (spreadsheetData.sheets) {
      const sheetNames = spreadsheetData.sheets.map(sheet => sheet.properties.title);
      console.log('Sheet Names:', sheetNames);
    } else {
      console.error('No sheets found or unable to access spreadsheet data.');
    }
  }

  return {
    getGoogleToken,
    loadGapiScript,
    loadGisClientScript,
    authenticateUser,
    listSheets
  };
};

export default useGoogleSheets;
