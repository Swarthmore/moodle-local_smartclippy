import { createContext, useContext, useState } from 'react'
import { truncate } from './utils'
import { useClippy } from '@react95/clippy'

type OpenAIMessage = { role: 'user' | 'system' | 'assistant', content: string }
type AgentName = 'Merlin' | 'Links' | 'Genius' | 'Genie' | 'Rover' | 'Peedy' | 'Bonzi' | 'Clippy' | 'F1' | 'Rocky'

export const Agents: AgentName[] = ['Merlin', 'Links', 'Genius', 'Genie', 'Rover', 'Peedy', 'Bonzi', 'Clippy', 'F1', 'Rocky' ]

export const AppContext = createContext({
    apiURL: 'http://localhost:7777',
    messages: [] as OpenAIMessage[],
    isProcessing: false,
    inputValue: '',
    closeClickCount: 0,
    incrementCloseClickCount: () => {},
    setInputValue: (state: string) => {},
    ask: () => {}
})

const getCourseName = () => {
	if (document.getElementsByTagName("body")[0].getAttribute("id") == 'page-course-view-topics') {
		// This is a course page
		// Get title of course (contained in H1)
		const moodlefullname = document.getElementsByTagName("h1")[0].textContent as string
		const re = /^.*[-.*]?- (.*)$/;
		const found = moodlefullname.match(re);
		if (found && found.length > 1) {
			return found[1];
        } else {
            return 'moodle course';
        }
    }
}

type Props = {
    children: any
}
export const AppProvider = ({ children }: Props) => {

    const apiURL = 'http://localhost:7777'
    const [isProcessing, setIsProcessing] = useState(false)
    const [messages, setMessages] = useState<OpenAIMessage[]>([])
    const [inputValue, setInputValue] = useState('')
    const [closeClickCount, setCloseClickCount] = useState(0)

    const { clippy } = useClippy()

    // // ask the agent a question
    const ask = async () => {

        if (!clippy) {
            console.error('agent is not loaded.')
            return
        }

        setIsProcessing(true)

        clippy.stopCurrent()
        clippy.animate()

        // create the request body
        const body = {
            input: inputValue,
            messages,
            agent: 'Clippy',
            course: getCourseName()
        }

        // make the request
        const requestOptions = {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body)
        }
        
        try {
            const response = await fetch(`${apiURL}/chat`, requestOptions);
            const json = await response.json();
            // add the messages to the message list
            setMessages([
                ...messages,
                { role: 'user', content: inputValue },
                { role: 'system', content: json.firstChoice }
            ])
            // agent speaks the answer
            clippy.stopCurrent()
            clippy.speak(truncate(json.firstChoice, 280))
        } catch (error) {
            clippy.stopCurrent()
            clippy.speak('I am having trouble connecting to the server. please try again later.')
            console.error(error)
        }

        // Clear the input value
        setInputValue('')
        setIsProcessing(false);
    }
    
    const incrementCloseClickCount = () => {
        setCloseClickCount(closeClickCount + 1)
    }

    return <AppContext.Provider
        value={{
            apiURL,
            isProcessing,
            closeClickCount,
            incrementCloseClickCount,
            messages,
            inputValue,
            setInputValue,
            ask
        }}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
