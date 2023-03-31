import { styleReset } from 'react95';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import windowsTheme from 'react95/dist/themes/original';
// @ts-ignore
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
// @ts-ignore
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import AppWindow from './AppWindow';
import { AppProvider } from './AppContext';
import { ClippyProvider } from '@react95/clippy'

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    //src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <ClippyProvider>
        <ThemeProvider theme={windowsTheme}>
          <AppProvider>
            <AppWindow />
          </AppProvider>
        </ThemeProvider>
      </ClippyProvider>
    </div>
  )
}

export default App
