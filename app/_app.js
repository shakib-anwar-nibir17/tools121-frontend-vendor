
import { persistor, store } from '@/app/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

export default function App({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout( 
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Component {...pageProps} />
    </PersistGate>
  </Provider>
  );
}
