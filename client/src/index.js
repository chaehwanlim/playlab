import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Noto Sans KR", "Roboto", serif',
    },
    palette: {
        primary: {
            main: '#2196F3',
        },
        secondary: {
            main: '#FE6B8B',
        },
    }
});

function footer() {
    return (
        <footer style={{backgroundColor: 'whitesmoke', color: 'grey', fontSize: '1.4rem', fontWeight: '500', textAlign: 'center'}}>
            <p>Copyright © 2020 PlayLab</p>
            <p>Contact webmaster for more information. <a href="mailto: chlim428@gmail.com" color="black">chlim428@gmail.com</a></p>
            <p><a href="https://github.com/chaehwanlim/playlab" color="black" target="_blank">GitHub</a></p>
        </footer>
    )
}

ReactDOM.render(<MuiThemeProvider theme={theme}><App />{footer()}</MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
