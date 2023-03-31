import { Window, WindowHeader, WindowContent, Frame, Button, TextInput, Hourglass } from 'react95'
import styled from 'styled-components'
import { useAppContext } from './AppContext'
import { dosify, randomFromArray } from './utils'
import MessagesScrollView from './MessagesScrollView'
import { useRef } from 'react'
import { useClippy } from '@react95/clippy'

const Wrapper = styled.div`
  max-width: 600px;
  padding: 2rem;
  font-family: 'ms_sans_serif';
  .window-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .close-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: -1px;
    margin-top: -1px;
    transform: rotateZ(45deg);
    position: relative;
    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.materialText};
    }
    &:before {
      height: 100%;
      width: 3px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:after {
      height: 3px;
      width: 100%;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .field-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    marginBottom: 1rem;
  }
  .checkbox-field-row {
    display: flex;
    align-items: center;
  }
  .window: {
    width: 600px;
    min-height: 200px;
  }
  .footer {
    display: block;
    margin: 0.25rem;
    height: 31px;
    line-height: 31px;
    padding-left: 0.25rem;
  }
`

const AppWindow = () => {

  const appRef = useRef<HTMLDivElement|null>(null)

  const { inputValue, setInputValue, closeClickCount, incrementCloseClickCount, isProcessing, ask } = useAppContext();
  const { clippy } = useClippy()

  const onAskButtonClick = async () => {
    await ask();
  }

  const onCloseButtonClick = () => {

    incrementCloseClickCount()

    if (closeClickCount < 25) {
      clippy.stop()
      clippy.speak(randomFromArray([
        'No, no, no, no, no, no, no!',
        'I\'m not going!',
        'I\'m not leaving!',
        'I\'m not going anywhere!',
        'Do you want me to go?',
        'I like it here!',
        'I live here!',
        'bruh 😢😭😭'
      ]))
    } else {
      clippy.speak('You sure are persistant. I\'ll leave. But I\'ll be back.')
      document.getElementById('root')?.style.setProperty('display', 'none');
      // TODO: Exit
    }

  }

  return (
    <Wrapper ref={appRef}>
      {/* <Draggable> */}
      <Window resizable className='window'>
        <WindowHeader className='window-header'>
          <span className='window-title'>{dosify('Clippy')}</span>
          <Button className='close-button' onClick={onCloseButtonClick}>
            <span className='close-icon' />
          </Button>
        </WindowHeader>
        <WindowContent>

          <MessagesScrollView />

          <div className='field-row'>
            <TextInput
              value={inputValue}
              disabled={isProcessing || !clippy}
              placeholder={`Ask clippy anything...`}
              onChange={e => setInputValue(e.target.value)}
              fullWidth
            />
            <Button
              disabled={isProcessing || !clippy || inputValue.length < 3}
              onClick={onAskButtonClick}
              style={{ marginLeft: 4 }}
            >
              Ask
            </Button>
          </div>
        </WindowContent>
        <Frame
          variant='well'
          className='footer'
        >
          {isProcessing || !clippy ? <><Hourglass size={16} /> {randomFromArray(['Scouring the internet for data...', 'Sweating profusely to find the answer', 'Digging through files looking for the answer', 'Searching...', 'Getting your data...', 'Conversing with the other terminators...', 'Hacking SpaceX....'])}</> : 'Ready'}
        </Frame>
      </Window>
      {/* </Draggable> */}
    </Wrapper>
  )

}

export default AppWindow