import React, { useContext } from 'react';
import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth'
import { 
    Container,
    Header,
    TittleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInSocialButton } from '../../components/SignInSocialButton';


export function SignIn(){
    const { user } = useAuth(); /*acessa o context*/
    console.log(user);
    return (
        <Container>
            <Header>
                <TittleWrapper>
                    <LogoSvg 
                    width= {RFValue(120)}
                    height= {RFValue(68)}
                    />

                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TittleWrapper>

                <SignInTitle>
                    Faça seu login com uma das contas abaixo
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInSocialButton 
                    title='Entrar com Google'
                    svg={GoogleSvg}
                    />
                    <SignInSocialButton 
                    title='Entrar com Apple'
                    svg={AppleSvg}
                    />
                </FooterWrapper>
            </Footer>
        </Container>
    );
}