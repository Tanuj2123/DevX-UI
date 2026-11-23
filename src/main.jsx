import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import appStore from './store/appStore.js'
import './index.css'



createRoot(document.getElementById('root')).render(
    <Provider store={appStore}>
        <App/>
    </Provider>
)
