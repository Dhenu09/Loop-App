import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Sell() {
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleClose = () => {
    router.back();
    };
  const handleCapture = () => {
    Alert.alert('Add photo', 'Choose a source', [
      { text: 'Take Photo', onPress: pickFromCamera },
      { text: 'Choose from Library', onPress: pickFromLibrary },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const pickFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera access is required.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled) return;

    const uri = result.assets[0]?.uri;
    if (uri) setImageUri(uri);
  };

  const pickFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Photo library access is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled) return;

    const uri = result.assets[0]?.uri;
    if (uri) setImageUri(uri);
  };

  const handleListItem = () => {
    if (!imageUri) {
      Alert.alert('No image', 'Please add a photo first.');
      return;
    }


    Alert.alert('Listing', 'Here you would create the listing with this image.');
  };

  return (
    <View style={styles.container}>
  
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleClose}>
          <Text style={styles.crossText}>✕</Text>
        </Pressable>
        <Text style={styles.title}>Scan an item</Text>
        <Text style={styles.blank}></Text>
      </View>

      <View style={styles.cameraBox}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        ) : (
          <Text style={styles.placeholderText}>
            Tap the button below to take a photo or pick from your library.
          </Text>
        )}
      </View>

   
      <Pressable style={styles.captureButton} onPress={handleCapture}>
        <View style={styles.innerCircle} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: 'rgb(228, 226, 226)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  crossText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -1,
  },
  title: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
    marginTop: 10,
  },
  blank: {
    width: 30,
  },
  cameraBox: {
    width: 300,
    height: 400,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'cover',
  },
  placeholderText: {
    color: '#9ca3af',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  captureButton: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderColor: 'rgb(228, 226, 226)',
    borderWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 45,
    borderColor: 'rgb(38, 36, 36)',
    borderWidth: 4,
    backgroundColor: 'white',
  },
});
