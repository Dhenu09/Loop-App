import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  tabRow: {
    flexDirection: 'row',
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    padding: 4,
    marginHorizontal: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 7,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontWeight: '600',
    fontSize: 16,
    color: '',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '900',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 40, 
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  arrow: {
  position: 'absolute',
  bottom: 8,
  left: 22,
  width: 48,
  height: 48,
  resizeMode: 'contain',
  zIndex: 100,
},

});
