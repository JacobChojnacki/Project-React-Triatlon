import {Link} from 'react-router-dom';

import classes from './MainNavigation.module.css';
import {useContext} from "react";
import authContext from "../../store/auth-context";
import paths from '../../utils/constants/paths';

const menuOptions = [
    {
        label: 'Profile',
        link: paths.PROFILE
    },
    {
        label: 'History',
        link: paths.HISTORY
    },
    {
        label: 'Records',
        link: paths.RECORDS
    },
    {
        label: 'Add score',
        link: paths.ADD_SCORE
    }
]

const MainNavigation = () => {
    const authCtx = useContext(authContext);

    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
    }
    return (
        <header className={classes.header}>
            <Link to={paths.HOME}>
                <div className={classes.logo}>Main Page</div>
            </Link>
            <nav>
                <ul>
                    {!isLoggedIn && (
                        <li>
                            <Link to={paths.AUTH}>Login</Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <>
                            {menuOptions.map(({ label, link }) => (
                                <li id={label}>
                                    <Link to={link}>{label}</Link>
                                </li>
                            ))}
                            <li>
                                <button onClick={logoutHandler}>Logout</button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
