import React, { useCallback, useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
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
        TransactionsList,
        LogoutButton
 } from './styles'
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

export interface DataListProps extends TransactionCardProps{
    id: string;
}

interface HighlightProps{
    amount: string;
    lastTransaction: string
}

interface HighlightData{
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export function Dashboard(){
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData); /*começa vazio de x tipo, cards*/

    function getLasTransactionDate(collection : DataListProps[], type : 'positive' | 'negative'){

        const lastTransaction = 
        new Date(
            Math.max.apply(Math, collection
                .filter(transaction => transaction.type === type)
                .map(transaction => new Date (transaction.date).getTime())/*percorre as transações e retorna as datas*/
            )
        ) /*devolve o maior numero da data da ultima transaçao e já formata pra data normal novamente*/

        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR',{month: 'long'})}` /*sem isso voltaria xx/yy/zz*/
    }

    async function loadTransactions(){
        const dataKey  = '@gofinance:transaction'; /*aplicação:coleção*/
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions
        .map((item : DataListProps) =>{ /*percorre cada item e abaixo o formato*/

            if (item.type === 'positive'){
                entriesTotal += Number(item.amount);
            }else {
                expensiveTotal += Number(item.amount);
            }

            const amount = Number(item.amount)
            .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            const date = Intl.DateTimeFormat('pt-Br', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date));

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,
            }
        });
        setTransactions(transactionsFormatted);

        const lastTransactionEntries = getLasTransactionDate(transactions, 'positive');
        const lastTransactionExpensives = getLasTransactionDate(transactions, 'negative');
        const totalInterval = `01 a ${lastTransactionExpensives}`

        const total = entriesTotal - expensiveTotal;

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última saída dia ${lastTransactionExpensives}`,
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction : totalInterval
            },
        })
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() =>{ /*Volta pra listagem e atualiza a listagem*/
        loadTransactions();
    }, []));

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

                    <LogoutButton onPress={() => {}}>  
                        <Icon name="power" />
                    </LogoutButton> 
                </UserWrapper>
            </Header>

            <HighlightCards>
                <HighlightCard 
                type="up"
                title="Entradas" 
                amount={highlightData.entries?.amount || '0'}
                lastTransaction={highlightData.entries?.lastTransaction}
                />
                <HighlightCard 
                type="down"
                title="Saídas"
                amount={highlightData.expensives?.amount || '0'} /*Sem ? falha a tipagem, pq?*/
                lastTransaction={highlightData.expensives?.lastTransaction}
                />
                <HighlightCard 
                type="total"
                title="Total"
                amount={highlightData.total?.amount || '0'}
                lastTransaction={highlightData.total?.lastTransaction}
                />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>

                <TransactionsList 
                data={transactions}
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