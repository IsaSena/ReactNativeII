import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

import { useAuth } from '../hooks/auth'

//user.id tiver dados vai pra AppRoutes senão Auth

export function Routes(){
    const { user } = useAuth(); //ta vindo um vetor vazio
    return (
        <NavigationContainer>
            {user ? <AppRoutes /> : <AuthRoutes/>}
        </NavigationContainer>
    );
}