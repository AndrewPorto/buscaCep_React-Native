import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, Keyboard } from 'react-native';
import api from './src/services/api'




export default function App() {
  const [cep, setCep] = useState('');
  const inputRef = useRef(null)
  const [cepUser, setCepUser] = useState(null)

  function limpar(){
    setCep('')
    inputRef.current.focus()
    setCepUser(null)
  }

  async function buscar(){
    if (cep == ''){
      alert('Digite um cep valido');
      setCep('');
      return;
    }

    try{
      const response = await api.get(`/${cep}/json`)
          console.log(response.data)
          setCepUser(response.data)
          Keyboard.dismiss(); //fechar teclado
    }catch(error){
      console.log('ERROR: ' + error)
    }

   

  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" translucent={false} backgroundColor='#989898'/>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.text}>Digite o cep desejado</Text>
          <TextInput 
          style={styles.input}
          placeholder='Ex: 7461654'
          value={cep}
          onChangeText={ (texto) => setCep(texto) }
          keyboardType='numeric'
          ref={inputRef}
          />
        </View>

        <View style={styles.areaBtn}>
          <TouchableOpacity 
          style={[styles.botao, {backgroundColor: '#1D75CD'}]}
          onPress={buscar}
          >
            <Text style={styles.botaoText}>Buscar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
           style={[styles.botao, {backgroundColor: '#CD3E1D'}]}
           onPress={limpar}
           >
            <Text style={styles.botaoText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {cepUser && 
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
        </View>
        }
        
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
 
  },
  text:{
    marginTop: 25,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  input:{
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  areaBtn:{
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  botao: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    
  },
  botaoText: {
    fontSize: 20,
    color: '#FFF'
  },
  resultado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 22
  }
});
