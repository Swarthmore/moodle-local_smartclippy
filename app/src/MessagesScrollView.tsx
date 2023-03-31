import { Button, ScrollView, Window, WindowContent, WindowHeader, Separator } from "react95"
import styled from "styled-components"
import { useAppContext } from "./AppContext"

function MessagesScrollView() {

    const { messages } = useAppContext()

    return (
        <ScrollView className='scroll-view' style={{ height: '16rem', width: '100%', maxWidth: '460px', marginBottom: '1rem' }}>
            {messages.length === 0 && <p>There are no messages. Ask clippy a question to get started.</p>}
            {messages.map((message, index) => (
                <div key={index}>
                    <p>{message.role === 'user' ? 'You:' : 'Clippy:'} {message.content}</p>
                    {index !== messages.length && <Separator />}
                </div>
            ))}
        </ScrollView>
    )
}

export default MessagesScrollView