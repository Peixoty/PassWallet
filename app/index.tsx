import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";


interface Conta {
  servico: string
  user: string
  senha: string
  imagem: string
}

export default function Index() {

  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold, // Carregar a fonte personalizada
  });
  // Se a fonte não foi carregada, exibe um indicador de carregamento
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const [conta, setConta] = useState<Conta[]>([])
  const [novaConta, setNovaConta] = useState<Conta>({
    servico: "",
    user: "",
    senha: "",
    imagem: ""
  })
  const [isAdding, setIsAdding] = useState(false)

  return (
    <SafeAreaView style={styles.screen}>

      {/*Espaço do menu*/} 
      <View style={styles.menu}> 
        {/*Área do menu*/} 
        <View style={styles.menuArea}> 
          {/*Botão para adicionar nova senha*/}
          <TouchableOpacity onPress={() => setIsAdding(true)}>
            <Entypo name="circle-with-plus" size={30} color="black" style={{marginRight: 15}}/>
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
      </View>

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
    paddingHorizontal: 10
  },
  listTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize:25
  }
})