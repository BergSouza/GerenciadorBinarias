import { StatusBar } from 'expo-status-bar';
import React,{ useState,useEffect, } from 'react';
import { StyleSheet, Text, View,Button, TextInput ,Pressable} from 'react-native';

export default function App() {
  const [payout,setPayout] = useState(87);
  const [banca,setBanca] = useState(0);
  const [lucro,setLucro] = useState(0);
  const [lucroTotal,setLucroTotal] = useState(0);
  const [valorDispostoPerder,setValorDispostoPerder] = useState(15);
  const [valorEntrada,setValorEntrada] = useState(5);
  const [qtdWin,setQtdWin] = useState(0);
  const [qtdLoss,setQtdLoss] = useState(0);
  const [numTotalEntradas,setnumTotalEntradas] = useState(0);
  const [valorPerdido,setValorPerdido] = useState(0);
  const [stopLoss,setStopLoss] = useState(15);
  const [stopWin,setStopWin] = useState(15);
  const [start,setStart] = useState(false);
 
  const init = () => {
        if(parseInt(banca) <= 250){
          const value = ((parseInt(banca)/4)/3);
          setValorEntrada(value);
          setValorDispostoPerder(value);
          setStopWin((100/100)*value);
          setStopLoss(value);
          setStart(true);
        }
  }

  
  const Win = () => {
    if(start){
      setQtdLoss((qtdLoss - 1));
      setQtdWin((qtdWin + 1));
      const lucros = ((payout/100)*valorEntrada);
      setBanca((parseInt(banca) + lucros)) //adicionando lucros a banca
      const valorDeGanhoPerdido = (lucros - (valorPerdido*-1)); //diminuido o valor de percas
      if(valorDeGanhoPerdido < 0){
        setValorPerdido(valorDeGanhoPerdido);//diminuindo o valor perdido com o valor de ganho
      }else{
        setValorPerdido(0);
      }
      const lucrosSoma = (lucro + lucros) //pegando o valor atual do lucro e somando com lucros
      setLucro(lucrosSoma) //somando o valor do lucro com o novo lucro
      if(valorDeGanhoPerdido < 0 && (valorDispostoPerder/3 + valorDeGanhoPerdido) <= stopLoss){
        setValorEntrada((valorDispostoPerder/3))
      }else if((lucrosSoma/2) >= 2){
        setValorEntrada(lucrosSoma);
        //setando o valor de entrada
      }
      if(qtdWin >= 3){ //stop win
        alert("stop win")
        setBanca((parseInt(banca) + lucrosSoma))
        setStart(false);
        reset()
        return;
      }
    }else{
      alert("inicie seu gerenciamento!")
    }
  }

  const Loss = () => {
    if(start){
      setQtdLoss((qtdLoss + 1))
      const valorPerdidoCalculo = (valorPerdido - valorEntrada) //pegar o valor que está sendo perdido
      setLucro((lucro + (valorPerdidoCalculo)))//diminuindo as percas do lucro
      setBanca((parseInt(banca) - (valorPerdidoCalculo*-1)))//diminuindo o valor de banca com as percas
      setQtdWin((qtdWin - 1));//diminuindo o contador de win para controle
  
      if((valorEntrada/2) >= 2){
        setValorEntrada((valorEntrada/2))
      }
      if((qtdLoss) >= 2){
          setQtdLoss(0);
          setValorEntrada((valorDispostoPerder/3))
      }
      if(((valorPerdidoCalculo * -1)+valorEntrada) >= stopLoss){
        alert("stop loss")
        setStart(false);
        reset()
        return;
      }else{
        setValorPerdido(valorPerdidoCalculo); //diminuindo as percas do valor perdido
      }
    }else{
      alert("inicie seu gerenciamento!")
    }
  
  }
  const reset = () => {
   setValorEntrada(5);
   setQtdWin(0);
   setLucroTotal(0);
   setLucro(0);
   setQtdWin(0);
   setQtdLoss(0);
   setValorPerdido(0);
  }

  return (
    <View style={styles.container}>
    <View style={[styles.view,{alignItems:"center",flexDirection:"row"}]}>
    <View style={[styles.bloco]}>
        <Text style={[styles.text,{fontWeight:"800",color : "green"}]}>BANCA</Text>
        <TextInput 
            value={banca.toString()}
            onChangeText={(text)=>setBanca(text)}
            style={{minHeight:50,minWidth:100,backgroundColor: "green",color:"white",fontSize:25,textAlign: "center"}}
        />
      </View>
    <View style={styles.bloco}>
        <Text style={[styles.text,{fontWeight:"800",color : "green"}]}>LUCRO</Text>
        <Text style={[styles.textLucro,{fontWeight:"200"}]}>R$ {parseFloat(lucro).toFixed(2)}</Text>
      </View>
      
    </View>
      <View style={styles.view}>
      <Pressable disabled onPress={()=>alert("ok")} style={[styles.button,{backgroundColor:"#ccc"}]}>
            <Text style={[styles.text,{color:"black"}]}>{parseFloat(valorEntrada).toFixed(2)}</Text>
      </Pressable>
      </View>
      <View style={{flex:1,flexDirection:"row", alignItems : "center",justifyContent:"space-around",width:"100%"}}>
      <Pressable onPress={Win} style={[styles.button]}>
            <Text style={styles.text}>WIN</Text>
      </Pressable>
      <Pressable onPress={Loss} style={[styles.button,{backgroundColor:"red"}]}>
            <Text style={styles.text}>LOSS</Text>
      </Pressable>
      </View>
    
      <Button title="Iniciar" onPress={init} />
      <Button title="RESET" onPress={reset} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  button : {
    minHeight : 100,
    minWidth : 100,
    borderRadius : 380,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : "green"
  },
  text : {
    color : "white",
    fontSize : 20,
    fontWeight:"bold"
  },
  view : {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLucro : {
    color : "green",
    fontSize : 28,
    fontWeight:"bold"
  },
  bloco : {
    minHeight : 100,
    minWidth : 100,
    backgroundColor : "#DDD",
    alignItems:"center",
    justifyContent:"center",
    margin : 4
  }
});
