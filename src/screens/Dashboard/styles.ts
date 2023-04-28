import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled.View `
    flex: 1; /*O container ocupa a tela toda*/
    /*justify-content: center; Vertical*/
    /*align-items: center; Centro horizontal, tem content tbm*/
    background-color: ${({ theme }) => theme.colors.background} ;
`;

export const Header = styled.View `
    width: 100% ;
    height: ${RFPercentage(42)}; /*Trabalha com %, relativo. Diferente de pixels*/

    background-color: ${({ theme }) => theme.colors.primary};
`

