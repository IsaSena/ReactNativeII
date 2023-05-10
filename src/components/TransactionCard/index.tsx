import React from 'react';
import { 
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date
    } from './style'
import { categories } from '../../utils/categories';

export interface TransactionCardProps{
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

 interface Props{
     data: TransactionCardProps;
 }

export function TransactionCard({ data } : Props) {
    const [ category ] = categories.filter( /*nomeia a primeira posição*/
        item => item.key === data.category
    ); /*ou colocar o vetor aqui em baixo e tirar lá de cima*/
    return (
        <Container>
            <Title>
                {data.name}
            </Title>

            <Amount type={data.type}>
                {data.type === 'negative' && '- '}
                {data.amount}
            </Amount>

            <Footer>
                <Category>
                    <Icon name={category.icon}/>
                    <CategoryName>
                        {category.name}
                    </CategoryName>
                </Category>

                <Date>
                    {data.date}
                </Date>

            </Footer>
        </Container>
    )
}