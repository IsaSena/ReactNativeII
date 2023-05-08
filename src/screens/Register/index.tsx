import React, {useState} from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
 } from './styles'
import { InputForm } from '../../components/Form/InputForm';
import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect'

interface FormData {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório')
})

export function Register(){
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const{
        control, /*registra os inputs*/
        handleSubmit, /*pega os valores de todos os inputs e envia 1 vez só*/
        formState:{ errors }
    } = useForm({
        resolver : yupResolver(schema)/*faz com que o form siga um padrao criado*/
    })
    
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    function handleTransactionTypeSelect(type: 'up' | 'down'){
        setTransactionType(type);
    }
    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
    }
    function handleCloseSelectCategoryModal(){
        setCategoryModalOpen(false);
    }
    function handleRegister(form: FormData){
        if (!transactionType)
            return Alert.alert('Selecione o tipo da transação');
        if (category.key === 'category')
        return Alert.alert('Selecione a categoria');
        
        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }
        console.log(data)
    }
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
                        onPress={() => handleTransactionTypeSelect('up')}
                        isActive={transactionType === 'up'}
                        />
                        <TransactionTypeButton 
                        type="down"
                        title="Outcome"
                        onPress={() => handleTransactionTypeSelect('down')}
                        isActive={transactionType === 'down'}
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