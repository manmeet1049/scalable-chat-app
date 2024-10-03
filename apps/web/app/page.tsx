"use client";
import classes from "./page.module.css";
import { useSocket } from "../context/SocketProvider";
import { useState } from "react";

export default function Page() {
  const { sendMessage } = useSocket();
  const [message, setMessage] = useState("");
  ("");
  return (
    <>
      <div>
        <h1>messages</h1>
      </div>
      <div>
        <input
          onChange={(e) => setMessage(e.target.value)}
          className={classes["chat-input"]}
          type="text"
          placeholder="Enter your message here..."
        />
        <button
          onClick={(e) => sendMessage(message)}
          className={classes["send-button"]}
        >
          send
        </button>
      </div>
    </>
  );
}
