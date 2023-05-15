import React, { 
    createContext, 
    ReactNode, 
    useContext
 } from "react";

 //tipagem elemento filho
interface AuthProviderProps{
    children: ReactNode;
}

interface User{
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData{
    user: User;
}

//o objeto do contexto do tipo I
const AuthContext = createContext({} as IAuthContextData );

//exporta o contexto e o provider
function AuthProvider({ children } : AuthProviderProps){ /**/
    const user = {
        id: '1',
        name: 'Isa',
        email: 'isa@example.com',
    };

    return (
        <AuthContext.Provider value={{ user }}>
            { children }
        </AuthContext.Provider>
    )
}

//cria o contexto e pega o use context
function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }