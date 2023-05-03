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
        HighlightCards,
        Transactions,
        Title,
        TransactionsList
 } from './styles'
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

export interface DataListProps extends TransactionCardProps{
    id: string;
}

export function Dashboard(){
    const data: DataListProps[] = [
        {
        id : '1',
        type: 'positive',
        title:"Desenvolvimento de site",
        amount:'R$ 12.000,00',
        category:{
            name: 'Vendas',
            icon: 'dollar-sign'
        },
        date:"03/05/2023"
                
    },
    {
        id: '2',
        type: 'negative',
        title: "Hamburguer Pizzy",
        amount:'R$ 59,00',
        category:{
            name: 'Alimentação',
            icon: 'coffee'
        },
        date:"01/05/2023"
            
    },
    {
        id: '3',
        type: 'negative',
        title:"Aluguel do apartamento",
        amount:'R$ 1.200,00',
        category:{
            name: 'Casa',
            icon: 'shopping-bag'
        },
        date:"06/04/2023"
            
    }
];
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

            <Transactions>
                <Title>Listagem</Title>

                <TransactionsList 
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item} />}
                />
            </Transactions>
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