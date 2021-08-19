import React, { useState, useEffect } from 'react';

// admin imports
import { Admin, EditGuesser, Resource } from 'react-admin';
import buildHasuraProvider from 'ra-data-hasura';

// client import
import { ApolloClient, InMemoryCache } from '@apollo/client';

// components
import Dashboard from './components/Dashboard';

// pages
import LoginPage from './pages/login.js';
import { EpisodeList, EpisodeCreate } from './pages/episodes';

// browser history
import { createBrowserHistory as createHistory } from 'history';
import { SeriesCreate, SeriesEdit, SeriesList, SeriesShow } from './pages/series';
import { SeasonCreate, SeasonEdit, SeasonList } from './pages/seasons';
import { customBuildFields } from './utils/customBuildFields';
import { customBuildVariables, customBuildQuery } from './utils/customBuildVariables';
import addUploadFeature from './utils/uploadFeature';
const history = createHistory();

const createApolloClient = () => {
    return new ApolloClient({
        uri: 'https://btv-poc.hasura.app/v1/graphql',
        cache: new InMemoryCache(),
        headers: {
            //'Authorization': `Bearer ${token}`
            'x-hasura-admin-secret': ''
        }
    })
}

const App = () => { 
    const [dataProvider, setDataProvider] = useState(undefined);

    useEffect(() => {
        const buildDataProvider = async () => {
            const apolloClient = createApolloClient();
            let dataProvider = await buildHasuraProvider({
                client: apolloClient
            }, { buildFields: customBuildFields, buildArgs: customBuildQuery }, customBuildVariables);
            dataProvider = addUploadFeature(dataProvider);
            setDataProvider(() => dataProvider);
        }
        buildDataProvider();
    }, []);

    return (
        dataProvider == null ? <div>loading</div> :
        <Admin 
            dataProvider={dataProvider} 
            title="Hasura Dashboard"
            dashboard={Dashboard}
            history={history}
            loginPage={LoginPage}
        >
            <Resource name="episode" list={EpisodeList} create={EpisodeCreate}></Resource>
            <Resource name="season" list={SeasonList} edit={SeasonEdit} create={SeasonCreate}></Resource>
            <Resource name="series" list={SeriesList} create={SeriesCreate} edit={SeriesEdit} show={SeriesShow} ></Resource>
            <Resource name="localizablestring"></Resource>
            <Resource name="localizedstring"></Resource>
        </Admin>
    )
};
export default App;
