import React, {useState} from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native'
import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
 } from './styles'
import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect'

interface FormData {
    name?: string;
    amount?: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório')
})

type NavigationProps = {
    navigate: (screen: string) => void;
}
export function Register(){
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const navigation = useNavigation<NavigationProps>();

    const{
        control, /*registra os inputs*/
        handleSubmit, /*pega os valores de todos os inputs e envia 1 vez só*/
        reset,
        formState:{ errors }
    } = useForm({
        resolver : yupResolver(schema)/*faz com que o form siga um padrao criado*/
    })
    
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    function handleTransactionTypeSelect(type: 'positive' | 'negative'){
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
    }

    async function handleRegister(form: FormData){
        
        if (!transactionType)
            return Alert.alert('Selecione o tipo da transação');
        if (category.key === 'category')
        return Alert.alert('Selecione a categoria');
        
        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        try{ /*o await aguarda ele terminar de salvar os dados, por isso async*/
            const dataKey  = '@gofinance:transaction'; /*aplicação:coleção*/
            const data = await AsyncStorage.getItem(dataKey); /*recupera os dados do async*/
            const currentData = data ? JSON.parse(data) : []; /*se tem algo já devolve convertido*/

            const dataFormatted =[ /*pega todos os dados que ja estavam e salva mais um*/
                ...currentData,
                newTransaction
            ]

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted)); /*o json converte o dado inteiro pra string*/
            
            reset(); /*reseta o formulário*/
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria',
            });

            navigation.navigate('Listagem');

        
        } catch (error){
            console.log(error);
            Alert.alert('Não foi possível salvar');
        }
    }

    // useEffect(() => {/*Ao cadastrar um item vem pra cá*/
    //     async function loadData(){
    //         const data = await AsyncStorage.getItem(dataKey);/*Vem como uma string*/
    //         console.log(JSON.parse(data!)); /*o TS garante ! que vai ter algo lá dentro*/
    //     }
    //     loadData();

    //     async function removeAll(){
    //         await AsyncStorage.removeItem(dataKey);
    //     }
    //     removeAll();
    // },[]);

    return (
        <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        >
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            
            <Form>
                <Fields>
                    <InputForm
                        name="name"
                        control={control}
                        placeholder='Nome'
                        autoCapitalize='sentences' /*deixa só a primeira letar maiuscula de cada palavra*/
                        autoCorrect={false}
                        error={errors.name && errors.name.message}
                    />
                    <InputForm
                        name="amount"
                        control={control}
                        placeholder='Preço' 
                        keyboardType='numeric'
                        error={errors.amount && errors.amount.message}
                    />

                    <TransactionTypes>
                        <TransactionTypeButton 
                        type="up"
                        title="Income"
                        onPress={() => handleTransactionTypeSelect('positive')}
                        isActive={transactionType === 'positive'}
                        />
                        <TransactionTypeButton 
                        type="down"
                        title="Outcome"
                        onPress={() => handleTransactionTypeSelect('negative')}
                        isActive={transactionType === 'negative'}
                        />
                    </TransactionTypes>

                    <CategorySelectButton 
                    title={category.name}
                    onPress={handleOpenSelectCategoryModal}
                    />
                </Fields>
                <Button 
                title="Enviar"
                onPress={handleSubmit(handleRegister)}
                />
                
            </Form>

            <Modal visible={categoryModalOpen}>
                <CategorySelect 
                category={category}
                setCategory={setCategory}
                closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
        </Container>
        </TouchableWithoutFeedback>
    );
}