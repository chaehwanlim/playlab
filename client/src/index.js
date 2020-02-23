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
});

function footer() {
    return (
        <footer style={{backgroundColor: 'whitesmoke', color: 'grey', fontWeight: '500', textAlign: 'center'}}>
            <p>Copyright © 2020 PlayLab.co.,Ltd. All rights reserved.</p>
            <p>Contact webmaster for more information. <a href="mailto: chlim428@gmail.com" color="black">chlim428@gmail.com</a></p>
            <p>Open Source | <a href="https://github.com/chaehwanlim/playlab" color="black">GitHub</a></p>
        </footer>
    )
}

ReactDOM.render(<MuiThemeProvider theme={theme}><App />{footer()}</MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
