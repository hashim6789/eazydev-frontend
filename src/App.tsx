// App.tsx
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routers/AppRoutes";
import { Provider } from "react-redux";
import store from "./store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ENV } from "./configs";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={ENV.GOOGLE_AUTH_CLIENT_ID}>
        <Toaster />
        <Router>
          <AppRoutes />
        </Router>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
