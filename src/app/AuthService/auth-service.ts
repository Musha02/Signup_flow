import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

// Interfaces for User Metadata and User Data
export interface UserMetadata {
    firstName: string;
    lastName: string;
}

export interface UserData {
    email: string;
    password: string;
    connection: string;
    email_verified: boolean;
}

// Function to log in with email and password
const loginWithEmailPassword = async (email: string, password: string) => {
    try {
        const response = await axios.post(`https://dev-pusdqkmxl7bs7qkk.us.auth0.com/oauth/token`, {
        grant_type: 'password',
        username: email,
        password: password,
        audience: 'https://localhost:3000/signup-api',
        client_id: 'k2fZtXJ42ELRzQZUKIMORcVn9NR89GI2',
        client_secret: 'e-O_lqRmsgvPH1FBVmd2ePykqvh0XT1Uh-rA2f34DH_MCvainh_RWR9jjha2qul1',
        scope: 'openid profile email',
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const authResult = response.data;
      localStorage.setItem('authResult', JSON.stringify(authResult));
      console.log('result', authResult);
  
      // Confirm access token is set
      const accessToken = JSON.parse(localStorage.getItem('authResult') || '{}').access_token;
      if (accessToken) {
        console.log('Access token is set:', accessToken);
      } else {
        console.log('Access token is not set');
      }
      return authResult;
    } catch (error: any) {
      if (error.response) {
        console.error('Auth0 login error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      throw error;
    }
  };

const createUser = async (userData: UserData, token: string) => {
    console.log("token", token);
    console.log("userData", userData);

    try {
        // Step 1: Create the user
        const userResponse = await axios.post(`https://dev-pusdqkmxl7bs7qkk.us.auth0.com/api/v2/users`, userData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return userResponse;
    } catch (error: any) {
        console.error('Error creating user:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const createUserAndAssignRole = async (userData: UserData, token: string) => {
    console.log("token", token);
    console.log("userData", userData);

    try {
        // Step 1: Create the user
        const userResponse = await axios.post(`https://dev-pusdqkmxl7bs7qkk.us.auth0.com/api/v2/users`, userData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const userId = userResponse.data.user_id;

        // Assign the default role to the user
        //   await axios.post(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}/roles`, {
        //     roles: [process.env.NEXT_PUBLIC_USER_ROLE_ID]
        //   }, {
        //     headers: {
        //       'Authorization': `Bearer ${token}`,
        //       'Content-Type': 'application/json'
        //     }
        //   });

        return userResponse;
    } catch (error: any) {
        console.error('Error creating user or assigning role:', error.response ? error.response.data : error.message);
        throw error;
    }
};
/*
const createNewUserAndAssignRole = async (userData: UserData, roleId: string) => {
    const { getAccessTokenSilently } = useAuth0();
    const token = await getAccessTokenSilently();
    console.log("token", token);
    console.log("userData", userData);

    try {
        const userResponse = await axios.post(`https://dev-pusdqkmxl7bs7qkk.us.auth0.com/api/v2/users`, userData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const userId = userResponse.data.user_id;

        const result = await axios.post(`https://dev-pusdqkmxl7bs7qkk.us.auth0.com/api/v2/users/${userId}/roles`,
            { roles: [roleId] }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log('User created:', roleId);

        return result;
    } catch (error: any) {
        console.error('Error creating user or assigning role:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// User role change functions
const getUserByEmail = async (email: string) => {
    const { getAccessTokenSilently } = useAuth0();
    const token = await getAccessTokenSilently();
    try {
        const response = await axios.get(`https://dev-pusdqkmxl7bs7qkk.us.auth0.com/api/v2/users-by-email`, {
            params: { email },
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data[0]; 
    } catch (error: any) {
        console.error('Error fetching user by email:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const getUserRoles = async (userId: string) => {
    const { getAccessTokenSilently } = useAuth0();
    const token = await getAccessTokenSilently();
    try {
        const response = await axios.get(`https://dev-pusdqkmxl7bs7qkk.us.auth0.com/api/v2/users/${userId}/roles`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error: any) {
        console.error('Error fetching user roles:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const removeUserRoles = async (userId: string, roleIds: string[]) => {
    const { getAccessTokenSilently } = useAuth0();
    const token = await getAccessTokenSilently();
    try {
        await axios.delete(`https://dev-pusdqkmxl7bs7qkk.us.auth0.com/api/v2/users/${userId}/roles`, {
            data: { roles: roleIds },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
    } catch (error: any) {
        console.error('Error removing user roles:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const assignUserRole = async (userId: string, roleId: string) => {
    const { getAccessTokenSilently } = useAuth0();
    const token = await getAccessTokenSilently();
    try {
        const result = await axios.post(`https://dev-pusdqkmxl7bs7qkk.us.auth0.com/api/v2/users/${userId}/roles`,
            { roles: [roleId] }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return result;
    } catch (error: any) {
        console.error('Error assigning user role:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const changeUserRoleByEmail = async (email: string, newRoleId: string) => {
    try {
        // Step 1: Get the user by email
        const user = await getUserByEmail(email);

        if (!user) {
            throw new Error(`User with email ${email} not found`);
        }

        const userId = user.user_id;

        // Step 2: Get current roles
        const currentRoles = await getUserRoles(userId);

        // Step 3: Remove existing roles
        const currentRoleIds = currentRoles.map((role: any) => role.id);
        if (currentRoleIds.length > 0) {
            await removeUserRoles(userId, currentRoleIds);
        }

        // Step 4: Assign the new role to the user
        const result = await assignUserRole(userId, newRoleId);

        console.log('User role changed:', newRoleId);
        return result;
    } catch (error: any) {
        console.error('Error changing user role:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const changeUserPassword = async (email: string, newPassword: string) => {
    try {
        const { getAccessTokenSilently } = useAuth0();
        const token = await getAccessTokenSilently();
        const user = await getUserByEmail(email);

        if (!user) {
            throw new Error(`User with email ${email} not found`);
        }

        const userId = user.user_id;

        const response = await axios.patch(`https://dev-pusdqkmxl7bs7qkk.us.auth0.com/api/v2/users/${userId}`, {
            password: newPassword,
            connection: "Username-Password-Authentication"
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Password changed successfully for:', email);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Auth0 API error:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
};*/

export { loginWithEmailPassword, createUserAndAssignRole, createUser };
