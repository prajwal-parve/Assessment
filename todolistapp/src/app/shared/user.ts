export interface User {
    userId:number;
    id?: number;             // Unique identifier for the user
    name: string;          // User's full name
    email?: string;         // User's email address
    phone?: string;        // Optional user's phone number
    password: string;     // Optional (should not be returned in API response)
    token?: string;        // Optional token for authentication
    profilePictureUrl?: string; // Optional URL for user's profile picture
    role?: string;         // Optional user role (e.g., 'admin', 'user')
}
