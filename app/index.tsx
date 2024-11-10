import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useAssets } from 'expo-asset';
import { ResizeMode, Video } from 'expo-av';
import { Link } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';

const Page = () => {
  const [assets] = useAssets([
    require('@/assets/videos/7579572-uhd_2160_4096_25fps.mp4'),
  ]);
  return (
    <View style={styles.container}>
      {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
          source={{ uri: assets[0].uri }}
          style={styles.video}
        ></Video>
      )}
      <View style={{ padding: 20, marginTop: 80 }}>
        <Text style={styles.header}>
          Ready to change the way you make money ?
        </Text>
      </View>

      <View style={styles.buttons}>
        <Link
          href={'/login'}
          asChild
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: Colors.dark.background },
          ]}
        >
          <TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '500' }}>
              Login
            </Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={'/register'}
          asChild
          style={[
            defaultStyles.pillButton,
            { flex: 1, backgroundColor: Colors.light.background },
          ]}
        >
          <TouchableOpacity>
            <Text style={{ color: 'black', fontSize: 22, fontWeight: '500' }}>
              Register
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.dark.background,
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  header: {
    fontSize: 36,
    fontWeight: '900',
    color: 'white',
    textTransform: 'uppercase',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 80,
    paddingHorizontal: 20,
  },
});
