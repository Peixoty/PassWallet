import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput} from "react-native"
import { useState, useEffect } from "react"
import { Picker } from "@react-native-picker/picker"
import { Conta } from "@/app"


interface ModalProps{
    initialService?: string
    visible: boolean
    onClose: () => void
    onConfirm: (serviceName?: string) => void
    skip?: () => void
}

const servicos = [
    {label: "Amazon", value: "amazon", url: "\assets\images\amazon.png"},
    {label: "Gmail", value: "gmail", url: "\assets\images\gmail.png"},
    {label: "Facebook", value: "facebook", url: "\assets\images\facebook.png"},
    {label: "Instagram", value: "instagram", url: "\assets\images\instagram.png"},
    {label: "Netflix", value: "netflix", url: "\assets\images\netflix.png"},

]

export function AddAccountModal({visible, onClose, onConfirm, initialService}:ModalProps){

    const [novaConta, setNovaConta] = useState<Conta>({servico: initialService || "", user: "", senha: "", imagem: ""})
    useEffect(() => {
        if (initialService !== undefined) {
          setNovaConta((prev) => ({
            ...prev,
            servico: initialService || "", // Garante que servico é atualizado
          }));
        }
      }, [initialService]); // Depende de initialService

    return(

        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View>
                        <Text style={styles.modalTitle}>Adicionar uma Conta</Text>
                    </View>

                    <View style={styles.dataArea}>
                        {/*Input para o tipo de serviço, i.e., Gmail, Instagram, Netflix, etc.*/}
                        <Text style={styles.fieldText}>Nome do Serviço</Text>
                        <TextInput 
                            style={styles.input}
                            value={novaConta.servico.charAt(0).toUpperCase() + novaConta.servico.slice(1)}
                            onChangeText={(text) =>
                                setNovaConta((prev) => ({ ...prev, servico: text }))
                              }
                            placeholder="Ex.: Gmail"
                            placeholderTextColor={"#999999"}
                        />

                        <Text style={styles.fieldText}>Usuário</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="Ex.: meuemail@gmail.com"
                            placeholderTextColor={"#999999"}
                        />

                        <Text style={styles.fieldText}>Senha</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="Ex.: Senha_123"
                            placeholderTextColor={"#999999"}
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.buttonsArea}>
                        <TouchableOpacity onPress={() => {
                            onClose()
                            setNovaConta({servico: "", user: "", senha: "", imagem: ""})
                            }}>
                            <Text>Fechar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => onConfirm}>
                            <Text>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </Modal>
    )
}

export function PickerModal({visible, onClose, onConfirm, skip}:ModalProps){

    const [selectedService, setSelectedService] = useState("")

    return(
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View>
                        <Text style={styles.modalTitle}>Escolha o serviço</Text>
                    </View>

                    <View style={{marginBottom: 35}}>
                        <Picker
                            style={styles.picker}
                            prompt="Escolha um serviço"
                            selectedValue={selectedService}
                            onValueChange={(item,index) => setSelectedService(item)}
                        >
                            <Picker.Item label="Clique para escolher"  value="" />
                            {servicos.map((servico,index) => (
                                <Picker.Item key={index} label={servico.label} value={servico.value}/>
                            ))}

                        </Picker>

                        <TouchableOpacity style={styles.notListedButton} onPress={skip}>
                            <Text style={{textDecorationLine: "underline"}}>Não achei o serviço!</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.buttonsArea}>
                        <TouchableOpacity onPress={() => {
                            onClose()
                            setSelectedService("")
                            }}>
                            <Text>Fechar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            if (selectedService) {
                                onConfirm(selectedService); // Passa o serviço selecionado
                                setSelectedService(""); // Limpa o estado local
                              } else {
                                alert("Por favor, selecione um serviço.");
                              }
                        }}>
                            <Text>Confirmar</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>

            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.15)",
      justifyContent: "center",
      alignItems: "center"
    },
    modalContainer: {
        width: "85%",
        backgroundColor: "#FBFCF8",
        padding: 25,
        borderRadius: 10
    },
    modalTitle: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 23,
        textAlign: "center"
    },
    dataArea: {
        marginVertical: 10
    },
    fieldText:{
        fontFamily: "Poppins_500Medium",
        fontSize: 13
    },
    input:{
        backgroundColor: "#e9ecef",
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 12,
        height: 45
    },
    buttonsArea: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    picker: {
        backgroundColor: "#e9ecef",
        marginBottom: 15
    },
    notListedButton: {
        alignItems: "center"
    }
  })