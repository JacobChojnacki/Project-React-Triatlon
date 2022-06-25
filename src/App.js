import {Switch, Route, Redirect} from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import HistoryPage from "./pages/HistoryPage";
import UserProfile from "./components/Profile/UserProfile";
import {useContext} from "react";
import AuthContext from "./store/auth-context";
import RecordsPage from './pages/RecordsPage';
import paths from './utils/constants/paths';
import AddScorePage from './pages/AddScorePage';


function App() {
    const authCtx = useContext(AuthContext);
    return (
        <Layout>
            <Switch>
                <Route path={paths.HOME} exact>
                    <HomePage/>
                </Route>
                {!authCtx.isLoggedIn && (
                    <Route path={paths.AUTH}>
                        <AuthPage/>
                    </Route>
                )}
                {authCtx.isLoggedIn && (
                    <>
                        <Route path={paths.PROFILE}>
                            <UserProfile/>
                        </Route>
                        <Route path={paths.HISTORY}>
                            <HistoryPage />
                        </Route>
                        <Route path={paths.RECORDS}>
                            <RecordsPage />
                        </Route>
                        <Route path={paths.ADD_SCORE}>
                            <AddScorePage />
                        </Route>
                    </>
                )}
                <Route path="*">
                    <Redirect to={paths.HOME} />
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
