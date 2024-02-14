import { Header } from "@/components/header"
import { ProductCartProps, useCartStore } from "@/stores/cart-store"
import {View,Text, ScrollView, Alert, Linking} from "react-native"
import {Product} from "@/components/product";
import { formatCurrency } from "@/utils/funtions/format-currency";
import { Input } from "@/components/input"
import { KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
import { Button } from "@/components/button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/link-button";
import { useState } from "react"
import { useNavigation } from "expo-router"

const PHONE_NUMBER = "5514998490869"


export default function Cart(){
    const [address, setAddress] = useState("")
    const cartStore = useCartStore();
    const navigation = useNavigation()

    function handleRemoveProduct(product:ProductCartProps){
        Alert.alert("Remover",`Deseja remover ${product.title} do carrinho?`,[
            {
                text:"Cancelar"
            },
            {
                text:"Remover",
                onPress: () => cartStore.remove(product.id)
            }
        ])

    }

    function handleOrder(){
        console.log(address)
        if(address.trim().length === 0){
            return Alert.alert("Pedido","Informe os dados para entrega")
        }

        const products = cartStore.products.map((product) => 
        `\n${product.quantity} ${product.title}`).join("")


        const message = `
        NOVO PEDIDO
        \nENTREGAR EM = ${address}
        \n${products}
        \n${total}
        
        `

        Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
        cartStore.clear()
        navigation.goBack()

    }

    const total = formatCurrency(cartStore.products.reduce((total,product) => total+product.price*product.quantity,0) as number)

    return (
        <View className="flex-1 p-2">
            <Header title="Seu carrinho"/>

        {cartStore.products.length > 0 ?(
            <KeyboardAwareScrollView>
            <ScrollView>
            <View className="p-5 flex-1">
                {
                    cartStore.products.map((product) => (
                        <Product key={product.id} data={product} onPress={() => handleRemoveProduct(product)}/>
                    ))
                }
            </View>
            </ScrollView>
            </KeyboardAwareScrollView>
            ) : (
                <Text className="text-slate-400 font-body text-center my-8">Seu carrinho está vazio</Text>
            )
        }
        <View className="flex-row items-center mt-2 mb-4">
            <Text className="text-white text-xl font-body">
                Total: 
            </Text>
            <Text className="text-lime-400 text-2xl font-heading ml-2">
                {total}
            </Text>

        </View>
        <Input placeholder="Informe o endereço de entrega com rua, bairro, CEP, numero e complemento" onChangeText={setAddress}>
        </Input>

        <View className="pt-5 pb-2 gap-5">
            <Button onPress={handleOrder}>
                <Button.Text>Enviar Pedido</Button.Text>
                <Button.Icon>
                    <Feather name="arrow-right-circle" size={20}/>
                </Button.Icon>
            </Button>
            <LinkButton title="Voltar ao cardápio" href="/"></LinkButton>
        </View>

        </View>
    )
}