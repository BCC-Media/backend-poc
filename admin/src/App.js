import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

// admin imports
import { Admin, EditGuesser, ListGuesser, Resource, ShowGuesser } from 'react-admin';
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
import { MediaCreate, MediaEdit, MediaListWithFilter, MediaShow } from './pages/media';
import { SeasonCreate, SeasonEdit, SeasonList } from './pages/seasons';
import { customBuildFields } from './utils/customBuildFields';
import { customBuildVariables, customBuildQuery } from './utils/customBuildVariables';
import addUploadFeature from './utils/uploadFeature';
import { Menu } from './components/menu';
import { CategoryCreate, CategoryEdit, CategoryList } from './pages/categories/categories';
import { VideoCreate, VideoEdit, VideoList } from './pages/videos/videos';
import { QueryCreate, QueryEdit, QueryList } from './pages/queries';
const history = createHistory();

const createApolloClient = () => {
    return new ApolloClient({
        uri: 'https://btv-poc.hasura.app/v1/graphql',
        cache: new InMemoryCache(),
        headers: {
            //'Authorization': `Bearer ${token}`
            'x-hasura-admin-secret': process.env.REACT_APP_HASURA_SECRET
        }
    })
}

const App = () => { 
    const [dataProvider, setDataProvider] = useState(undefined);

    useEffect(() => {
        const buildDataProvider = async () => {
            const apolloClient = createApolloClient();
            let dataProvider = await buildHasuraProvider({
                introspection: {
                    operationNames: {/* 
                      ['UPDATE']: (resource) => `insert_${resource.name}_one`, */
                    },
                },
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
            menu={Menu}
            customRoutes={[
                <Route exact path="/shows" component={MediaListWithFilter({ type: 'show' })} />,
                <Route exact path="/seasons" component={MediaListWithFilter({ type: 'season' })} />,
                <Route exact path="/episodes" component={MediaListWithFilter({ type: 'episode' })} />,
                <Route exact path="/standalones" component={MediaListWithFilter({ type: 'standalone' })} />
            ]}
            history={history}
            loginPage={LoginPage}
        >
            <Resource name="media" list={MediaListWithFilter()} create={MediaCreate} edit={MediaEdit} show={MediaShow} ></Resource>
            <Resource name="media_t"></Resource>
            <Resource name="categories" list={CategoryList} create={CategoryCreate} edit={CategoryEdit}></Resource>
            <Resource name="category_t"></Resource>
            <Resource name="category_media"></Resource>
            <Resource name="videos" create={VideoCreate} list={VideoList}></Resource>
            <Resource name="queries" create={QueryCreate} list={QueryList} edit={QueryEdit}></Resource>
        </Admin>
    )
};
export default App;
