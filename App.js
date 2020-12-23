import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

const App = () => {

  const [ busqueda, guardarBusqueda ] = useState({
    ciudad: '',
    pais: ''
  });

  const { ciudad, pais} = busqueda;

  const [ consultar, guardarConsultar ] = useState(false);
  const [ resultado, guardarResultado ] = useState({});
  const [ bgColor, guardarBgcolor ] = useState('rgb(71, 149, 212)');

  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        const appId = '81444fa884dc53f459d16eafb854c04e';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  
        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          guardarResultado(resultado);
          guardarConsultar(false);

          //modifica el color de fondo en base a resultados de la temperatra

          const kelvin = 273.15;
          const {main} = resultado;
          const actual = main.temp - kelvin;

          if (actual < 10) {
            guardarBgcolor('rgb(105, 108, 149)');
          }else if(actual >= 10 && actual < 25){
            guardarBgcolor('rgb(71, 149, 212)');  
          }else{
            guardarBgcolor('rgb(178, 28, 61)');
          }

        } catch (error) {
          mostrarAlerta();
        }
      }
    }
    consultarClima();
  }, [consultar]);

  const mostrarAlerta = () => {
    Alert.alert(
        'Error',
        'No hay resultados intenta con otra ciudad o pais',
        [{ text: 'Ok '}]
    )
}

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  }

  const bgColorApp = {
    backgroundColor: bgColor
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={ () => ocultarTeclado() }>

        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima 
              resultado={resultado}
            />
            <Formulario
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultar={guardarConsultar}
            />
          </View>
        </View>

      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
