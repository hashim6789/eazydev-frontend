// App.tsx
import { BrowserRouter as Router } from "react-router-dom";
// import MainRoutes from "./router/MainRoutes";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./routers/AppRoutes";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;

// <GoogleOAuthProvider clientId="928386759524-9tflikf8cdtpuiavjnq3a65lm0sgjf55.apps.googleusercontent.com">
{
  /* <SocketProvider> */
}
// <ToastContainer />
{
  /* </SocketProvider> */
}
// </GoogleOAuthProvider>
