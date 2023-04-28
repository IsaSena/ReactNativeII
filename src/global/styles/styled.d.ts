import 'styled-components';
import theme from './theme';

declare module 'styled-components'{
    type ThemeType = typeof theme 
    //cria um tipo que copia exatamente o tipo de outro objeto
    export interface DefaultTheme extends ThemeType {}
}