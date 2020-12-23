import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
const Formulario = ({busqueda,guardarBusqueda,guardarConsultar}) => {


    const {pais, ciudad} = busqueda;

    const [ animacionBoton ] = useState(new Animated.Value(1)); 

    const consultarClima = () => {
        if(pais.trim() === '' || ciudad.trim() === ''){
            mostrarAlerta();
            return; 
        }
        //consultar la API
        guardarConsultar(true);
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Agrega una ciudad y pais para la busqueda',
            [{ text: 'Entendido '}]
        )
    }

    const animacionEntrada = () => {
        Animated.spring(animacionBoton, {
            toValue: .9
        }).start();
    }

    const animacionSalida = () => {
        Animated.spring(animacionBoton, {
            toValue: 1,
            friction: 4,
            tension: 30
        }).start();
    }

    const estiloAnimacion = {
        transform: [{ scale: animacionBoton }]
    }

    return ( 
        <>
            <View style={styles.formulario}>
                <View>
                    <TextInput
                        value={ciudad}
                        style={styles.input}
                        onChangeText={ ciudad => guardarBusqueda({ ...busqueda, ciudad }) }
                        placeholder="Ciudad"
                        placeholderTextColor="#666"
                    />
                </View>
                <View>
                    <Picker 
                        onValueChange={pais => guardarBusqueda({ ...busqueda, pais }) }
                        selectedValue={pais}
                        itemStyle={{ height: 120, backgroundColor: '#FFF' }}
                    >
                        <Picker.item label="--seleccione un pais--" value="" />
                        <Picker.item label="Estados Unidos" value="US" />
                        <Picker.item label="Mexico" value="MX" />
                        <Picker.item label="Argentina" value="AR" />
                        <Picker.item label="Colombia" value="CO" />
                        <Picker.item label="Costa Rica" value="CR" />
                        <Picker.item label="España" value="ES" />
                        <Picker.item label="´Peru" value="PE" />
                    </Picker>
                </View>

                <TouchableWithoutFeedback 
                    onPressIn={ () => animacionEntrada() }
                    onPressOut={ () => animacionSalida() }
                    onPress={ () => consultarClima() }
                >
                    <Animated.View style={[styles.btnBuscar, estiloAnimacion ]}>
                        <Text style={styles.textoBuscar}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    textoBuscar: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    }
})
 
export default Formulario;