import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month

} from './styles'
import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale'

interface TransactionData{
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData{
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string
    percent: string;
}

export function Resume(){
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    const theme = useTheme();

    function handleDateChange(action: 'next' | 'prev'){
        if( action === 'next'){
            setSelectedDate(addMonths(selectedDate, 1));
        }else{
            setSelectedDate(subMonths(selectedDate, 1));
        }
    }

    async function loadData() {
        const dataKey  = '@gofinance:transaction'; /*aplicação:coleção*/
        const response = await AsyncStorage.getItem(dataKey); /*recupera os dados do async*/
        const responseFormatted = response ? JSON.parse(response) : []; /*se tem algo já devolve convertido*/

        const expensives = responseFormatted
        .filter((expensive: TransactionData) => 
        expensive.type === 'negative' && 
        new Date (expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date (expensive.date).getFullYear() === selectedDate.getFullYear());



        const expensivesTotal = expensives
        .reduce((acumullator: number, expensive : TransactionData) => {
            return acumullator + Number(expensive.amount);
        },0 /*valor inicial*/); /*pega a coleçao e soma os elementos*/
        
        const totalByCategory : CategoryData[] = [];

        categories.forEach(category => { /*para cada categoria vai percorrer todos os gastos*/
            let categorySum = 0;

            expensives.forEach((expensive : TransactionData) => {
                if(expensive.category === category.key){
                    categorySum += Number(expensive.amount);
                }
            });

            if (categorySum > 0){
                const totalFormatted = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'brl'
                })

                const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

                totalByCategory.push({
                key: category.key,
                name: category.name,
                color : category.color,
                total: categorySum,
                totalFormatted,
                percent
                });
            }
        });
        setTotalByCategories(totalByCategory);
    }

    useEffect (() => {
        loadData();
    },[selectedDate]);

    return(
        <Container>
            <Header>
                <Title> Resumo por categoria </Title>
            </Header>

            <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                padding: 24,
                paddingBottom: useBottomTabBarHeight(),
            }}
            >
                <MonthSelect>
                    <MonthSelectButton onPress={() => handleDateChange('prev')}>
                        <MonthSelectIcon name="chevron-left"/>
                    </MonthSelectButton >

                    <Month>
                    { format(selectedDate, 'MMM, yyyy', {locale: ptBR})}
                    </Month>

                    <MonthSelectButton onPress={() => handleDateChange('next')}>
                        <MonthSelectIcon name="chevron-right"/>
                    </MonthSelectButton >
                </MonthSelect>

                <ChartContainer>
                <VictoryPie
                    data={totalByCategories}
                    colorScale={totalByCategories.map(category => category.color)}
                    style={{
                        labels: {fontSize: RFValue(18),
                        fontWeight: 'bold'
                        //fill: theme.colors.shape
                        }
                    }}
                    //labelRadius={50}
                    x="percent"
                    y="total"
                />
                </ChartContainer>

                {
                    totalByCategories.map(item => (
                        <HistoryCard
                        key= {item.key}
                        title= {item.name}
                        amount= {item.totalFormatted}
                        color= {item.color}
                        />
                    ))
                }
            </Content>

        </Container>
    )
}