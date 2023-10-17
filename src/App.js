import { CookiesProvider } from "react-cookie";
import AppRouter from "./router";
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react";
import { store,persistor } from "./redux/store";

function App() {
  return (
    <CookiesProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
      </PersistGate>
    </Provider>
  </CookiesProvider>
  )
}

export default App;
