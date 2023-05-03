import { Button, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { useEffect,useState } from 'react';
import MapView, {Marker} from 'react-native-maps';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

 
  let text = 'Waiting..';
  let coordenadas='';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    coordenadas=[JSON.parse(location.coords.altitude),JSON.parse(location.coords.latitude),JSON.parse(location.coords.longitude)]
    
  }
 


  

  return (
    <View style={styles.container}>
        <Text style={styles.text}>APP Mapas</Text>
     <Text>{errorMsg}</Text>
      <MapView style={styles.map}>
        {location && <Marker coordinate={location.coords} />}
      </MapView>
      
      
      <Button title={ errorMsg==null ? "Mostrar ubicacion": "Dar Permisos de ubicación" } onPress={
        errorMsg==null ?
       async () => 
       {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);  
       }
   : async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      <TextField localizacion ="location"/>
    }} />
    
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '70%',
    height: '50%',
  },
  text:{
    fontSize:20,
    fontWeight:"bold",
    margin:10,
    paddingTop:50
  }
});

