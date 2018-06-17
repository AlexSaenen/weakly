import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import './index.css';

const renderApp = AppComponent =>
  render(
    <AppContainer>
      <Provider store={store}>
        <AppComponent />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );

renderApp(App);
registerServiceWorker();

if (module.hot) {
  module.hot.accept('./components/App', () => { renderApp(App); });
}
