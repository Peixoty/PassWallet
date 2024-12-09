import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from "react-native"
import { useState, useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Entypo } from "@expo/vector-icons"
import { Poppins_500Medium, Poppins_600SemiBold } from "@expo-google-fonts/poppins"
import { useFonts } from "expo-font"
import { AddAccountModal,PickerModal } from "@/components/modal/Modals"


export interface Conta {
  servico: string
  user: string
  senha: string
  imagem: string
}

export default function Index() {

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold, // Carregar a fonte personalizada
  });
  // Se a fonte não foi carregada, exibe um indicador de carregamento
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  const [addAccountModalVisible, setAddAccountModalVisible] = useState(false);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);
  const [conta, setConta] = useState<Conta[]>([])
  const [novaConta, setNovaConta] = useState<Conta>({servico: "", user: "", senha: "", imagem: ""})  

  return (
    <SafeAreaView style={styles.screen}>

      {/*Espaço do menu*/} 
      <View style={styles.menu}> 

        {/*Área do menu*/} 
        <View style={styles.menuArea}> 

          {/*Botão para adicionar nova senha*/}
          <TouchableOpacity onPress={() => setPickerModalVisible(true)}>
            <Entypo name="circle-with-plus" size={30} color="black" style={{marginRight: 20}}/>
          </TouchableOpacity>

          {/*Botão para pesquisar uma senha*/}
          <TouchableOpacity>
            <Entypo name="magnifying-glass" size={30} color="black" />
          </TouchableOpacity>

        </View>
        
      </View>

      {/*Espaço da Carteira de Senhas*/}
      <View style={styles.list}>
        <Text style={styles.listTitle}>
          Minha Carteira
        </Text>
        <FlatList 
          data={conta}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
            </View>
          )}
        />
      </View>
      
      <PickerModal
        visible={pickerModalVisible}
        onClose={() => setPickerModalVisible(false)}
        onConfirm={(serviceName) => {
          setPickerModalVisible(false)
          setAddAccountModalVisible(true)
          setNovaConta((prev) => ({...prev, servico: serviceName || ""}))
        }}
        skip={() => {
          setPickerModalVisible(false)
          setAddAccountModalVisible(true)
        }}
      />

      <AddAccountModal
        visible={addAccountModalVisible}
        onClose={() => setAddAccountModalVisible(false)}
        onConfirm={() => {
          setAddAccountModalVisible(false);
        }}
        initialService={novaConta.servico}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  menu: {
    flex: 1,
    justifyContent: "center"
  },
  menuArea: {
    flexDirection: "row",
    paddingHorizontal: 40,
    justifyContent: "flex-end"
  },
  list: {
    flex: 9,
    paddingHorizontal: 15
  },
  listTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize:25
  }
})