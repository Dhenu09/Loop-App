
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    zIndex: 999,
  },
  help: {
    color: 'rgba(0, 122, 255, 1)',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Albert Sans',
  },
  title: {
    fontWeight: '900',
    fontSize: 18,
    textAlign: 'center',
    right: -6.5
  },
  balanceBadge: {
    backgroundColor: 'rgba(255, 234, 236, 1)',
    width: 74,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  balanceText: {
    color: 'rgba(250, 61, 80, 1)',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontSize: 15,
    fontFamily:'Albert Sans',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeBtn: {
    marginTop: 20,
    backgroundColor: '#FA3D50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    color: 'rgb(0, 0, 0)',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Albert Sans',
  },
});

