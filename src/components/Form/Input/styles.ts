import styled from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TextInput)` /*sem isso daria erro de tipagem*/
    width: 100%;
    padding: 16px 18px; /*da letra com o input*/

    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular} ;
    color: ${({ theme }) => theme.colors.text_dark}; /*cor ao ser escrito*/

    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;

    margin-bottom: 8px;
`;