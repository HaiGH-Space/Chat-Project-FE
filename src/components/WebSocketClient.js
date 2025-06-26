'use client'
import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
export default function WebSocketClient() {
    const ws = useRef(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        ws.current = new SockJS('http://localhost:8080/api/ws?token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIwMTIzNDU2Nzg5IiwiYXZhdGFyVXJsIjoiaHR0cHM6Ly9pbWdzLnNlYXJjaC5icmF2ZS5jb20vX2l5TE5udW5PRW9zZG1sRTBGZ01QdXZ6LURQaVJNU09aZ3pOUHlwdUdndy9yczpmaXQ6ODYwOjA6MDowL2c6Y2UvYUhSMGNITTZMeTlqWkc0eC9MbWxqYjI1bWFXNWtaWEl1L1kyOXRMMlJoZEdFdmFXTnYvYm5NdmRYTmxjaTF3YVdOMC9kWEpsY3k4eE1EQXZkVzVyL2JtOTNiaTAxTVRJdWNHNW4iLCJpYXQiOjE3NTA3NTgwNTAsImV4cCI6MTc1MDc1ODk1MH0.wRWUMez1-bJXNq_BzDXLoB9gCsZgkJ6JfW3nYZNGUCk'); // Dùng http:// khi dùng SockJS

        ws.current.onopen = () => {
            console.log('SockJS connected');
            ws.current.send('Hello server!');
        };

        ws.current.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };

        ws.current.onerror = (error) => {
            console.error('SockJS error:', error);
        };

        ws.current.onclose = () => {
            console.log('SockJS disconnected');
        };

        // Cleanup khi unmount
        return () => {
            ws.current.close();
        };
    }, []);

    return (
        <div>
            <h2>SockJS Messages</h2>
            <ul>
                {messages.map((msg, idx) => (
                    <li key={idx}>{msg}</li>
                ))}
            </ul>
        </div>
    );
}