
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  list: { paddingHorizontal: 12, paddingBottom: 100 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },

  image: {
    width: '100%',
    height: 500,
    borderRadius: 5,
    alignItems: 'center',
  },
  

  details: {
    padding: 16,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 24,
    width: '100%',
  },
  

  price: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
  },

  title: {
    fontSize: 17,
    fontWeight: '500',
    fontFamily: 'Albert Sans',
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 1)',

  },


  button: {
    backgroundColor: 'rgba(250, 61, 80, 1)',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 65,
    borderRadius: 5,
    marginTop: 10,
  },
  

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'Albert Sans',
    lineHeight: 22,
    letterSpacing:0,
    textAlign: 'center',

  },

  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    textAlign: 'center', 
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  closeBtn: {
    marginTop: 15,
    padding: 8,
    backgroundColor: 'rgba(250, 61, 80, 1)',
    borderRadius: 8,
    fontWeight: 'bold',
  },
  closeText: { color: 'white', fontWeight: 'bold', fontSize: 15 },
  
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
  
});
