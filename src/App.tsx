import React from 'react';
import LoginButton from './components/login-button/login-button';
import LogoutButton from './components/logout-button/logout-button';
import Profile from './components/profile/profile';

function App() {
    return (
        <div>
            <LoginButton />
            <LogoutButton />
            <Profile />
        </div>
    );
}

export default App;
