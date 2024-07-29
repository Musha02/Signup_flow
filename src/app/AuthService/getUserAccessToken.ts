import axios from 'axios';

export const getManagementToken = async (): Promise<string> => {
  try {
    const response = await axios.post('https://dev-pusdqkmxl7bs7qkk.us.auth0.com/oauth/token', {
      client_id: 'cB0HIkZF2l3hA3xZR3qAg9jqCfMkIFA7',
      client_secret: '2wfH54tcj9dpvxkFFDVjxISGgzz9ePBTk7rDcQrkXXJ-wEX1DLSGT5osYKqmj2CR',
      audience: `https://dev-pusdqkmxl7bs7qkk.us.auth0.com/api/v2/`,
      grant_type: 'client_credentials',
    });
    console.log ("check getmanage= ", response.data.access_token );

    return response.data.access_token;
    
  } catch (error: any) {
    console.error('Error getting management token:', error.response ? error.response.data : error.message);
    throw new Error('Failed to get management token');
  }
};



export const getUserAccessToken = async (email: string, password: string): Promise<string> => {
  try {
    const response = await axios.post('https://dev-pusdqkmxl7bs7qkk.us.auth0.com/oauth/token', {
      grant_type: 'password',
      username: email,
      password: password,
      audience: 'sign_up_new',
      client_id: 'cB0HIkZF2l3hA3xZR3qAg9jqCfMkIFA7',
      client_secret: '2wfH54tcj9dpvxkFFDVjxISGgzz9ePBTk7rDcQrkXXJ-wEX1DLSGT5osYKqmj2CR',
      
    });

    console.log ("check getUser= ", response.data.access_token );

    return response.data.access_token;
  } catch (error: any) {
    console.error('Error getting user access token:', error.response ? error.response.data : error.message);
    throw new Error('Failed to get user access token');
  }
};
