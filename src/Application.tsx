import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import { initializeApp } from 'firebase/app';
import { config } from './config/config';
import AuthRoute from './components/AuthRoute';
import Header from './components/Header';
import tw from "tailwind-styled-components"

initializeApp(config.firebaseConfig);

export interface IApplicationProps {}

const App = tw.div`
min-h-screen
`

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    return (
        <App>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/"
                    element={
                        <AuthRoute>
                            <HomePage />
                        </AuthRoute>
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </BrowserRouter>
        </App>
    );
};

export default Application;
