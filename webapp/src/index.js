import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { loadTasks } from './ducks/tasks';
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
/* TODO: check hereafter if we have state left in the serviceWorker, if we do
  then we should inject that into the store before dispatching a refresh */

/* TODO: move this somewhere else and maybe trigger a global data fetch
  that through an epic, triggers all other listening fetchers */
store.dispatch(loadTasks());

if (module.hot) {
  module.hot.accept('./components/App', () => { renderApp(App); });
}
