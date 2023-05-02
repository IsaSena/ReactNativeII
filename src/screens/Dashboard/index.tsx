import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Container,
        Header,
        UserInfo,
        Photo,
        User,
        UserGreeting,
        UserName,
        UserWrapper,
        Icon,
        HighlightCards
 } from './styles'
import { HighlightCard } from '../../components/HighlightCard';

export function Dashboard(){
    return (
        <Container>
            <Header>
                <UserWrapper>
                        <UserInfo>
                            <Photo 
                                source={{uri: 'https://avatars.githubusercontent.com/u/124616032?v=4'}}
                            />
                            <User>
                                <UserGreeting>Olá, </UserGreeting>
                                <UserName>Isabela</UserName>
                            </User>
                        </UserInfo>
                        
                    <Icon name="power" />
                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard 
                type="up"
                title="Entradas" 
                amount="R$ 17.400,00" 
                lastTransaction="Última entada dia 13 de abril"/>
                <HighlightCard 
                type="down"
                title="Saídas"
                amount="R$ 1.259,00"
                lastTransaction="Última saída dia 03 de abril"/>
                <HighlightCard 
                type="total"
                title="Total"
                amount="R$ 16.141,00"
                lastTransaction="01 à 16 de abril"/>
            </HighlightCards>
        </Container>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1, //o container ocupa a tela toda
//         justifyContent: 'center', //vertical
//         alignItems: 'center', //tem content tbm, centro horizontal
//         backgroundColor: '#999'
//     }
// })