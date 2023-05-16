import React, { 
    createContext, 
    ReactNode, 
    useContext,
    useState
 } from "react";

 import * as AppleAuthentication from 'expo-apple-authentication';

 const { CLIENT_ID } = process.env; /*busca do arquivo de ambiente*/
 const { REDIRECT_URI } = process.env;

 import * as AuthSession from 'expo-auth-session';

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
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>;
}

interface AuthorizationResponse{
    params: {
        access_token: string;
    };
    type: string;
}

//o objeto do contexto do tipo I
const AuthContext = createContext({} as IAuthContextData );

//exporta o contexto e o provider
function AuthProvider({ children } : AuthProviderProps){ /**/
    const [user, setUser] = useState<User>({} as User);

    async function signInWithGoogle(){
        try{
            //const CLIENT_ID = '206836865137-7ghkm7rcchuv880lq89s71nlt6d66r3l.apps.googleusercontent.com';/*credencial configurada*/
            //const REDIRECT_URI = 'https://auth.expo.io/@isasena/gofinance';     /*onde o usuario vai dps q termina o processo de autenticação*/
            const RESPONSE_TYPE = 'token'; /*o que quero*/
            const SCOPE = encodeURI('profile email'); /*o que quero acessar do usuario*/

            const authUrl = `https://accounts.google.com/o/auth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}` /*endpoint de autent da google e os parametros*/
        
            //aqui tava como response
            const { type, params} = await AuthSession
            .startAsync({ authUrl }) as AuthorizationResponse;

            if (type === 'sucess'){
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json();
                //console.log(userInfo);

                setUser({
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture
                });

            }
            //console.log(response);

        } catch ( error ) {
            throw new Error( error as string);
        }
    }

    async function signInWithApple(){
        try{
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes:[
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            });

            if (credential){
                const userLogged ={
                    id: credential.user,
                    email: credential.email!, /*indica que sempre vai ter*/
                    name: credential.fullName!.givenName!,
                    photo: undefined
                };
                setUser(userLogged);
                //await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged));
            }

        } catch (error){
            throw new Error(error as string);
        }
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple }}>
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