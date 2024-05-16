import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration'); // get token's expiration
    const expirationDate = new Date(storedExpirationDate); //Reshape it from string to date
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime(); // getTime() gives the time in milliseconds
    return duration;
}
export function getAuthToken() {
    const token = localStorage.getItem('token');

    if(!token){
        return null;
    }

    const tokenDuration = getTokenDuration();
    if(tokenDuration < 0){
        return 'EXPIRED';
    };
    
    return token;
};

export function tokenLoader(){
    return getAuthToken();
};

// If not loggedin (no token) redirects us away from the App.js routes 
export function checkAuthLoader() {
    const token = getAuthToken();
    if(!token){
        return redirect('/auth');
    };

    return null; // this is missing in the next lecture video and should be added by you
}