import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer"
import io from "socket.io-client"
import { FcVideoCall, FcEndCall } from "react-icons/fc";
import { FiPhoneCall } from "react-icons/fi";

const socket = io.connect("http://localhost:4200")


const Chat = () => {
    const [me, setMe] = useState("")
    const [stream, setStream] = useState("")
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setidToCall] = useState("")
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")

    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()



    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setStream(stream)
                myVideo.current.srcObject = stream
            })


        socket.on("me", (id) => {
            setMe(id)
        })

        socket.on("callUser", (data) => {
            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })

    }, [])

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })


        peer.on("signal", (data) => {

            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
        })

        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current = peer

    }

    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })

        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller })
        })

        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()

    }
    return (
        <>
           

            <div className="p-4 text-center">
                <div className="flex justify-between p-2">
                    <div >
                        {stream && <video playsInline muted ref={myVideo} autoPlay className="w-50" />}
                    </div>
                    <div >
                        {callAccepted && !callEnded ?
                            <video playsInline ref={userVideo} autoPlay className="w-50" /> :
                            null}
                    </div>
                </div>
                <div className="p-2 text-center gap-2 flex justify-center">
                    <TextField
                        className="p-2"
                        label="Enter your name"
                        variant="filled"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="p-2">
                        <CopyToClipboard text={me} className="p-4">
                            <Button variant="contained" className="p-4 " >
                                Copy your ID
                            </Button>
                        </CopyToClipboard>
                    </div>

                    <TextField
                        className="p-2"
                        label="Paste ID to call"
                        variant="filled"
                        value={idToCall}
                        onChange={(e) => setidToCall(e.target.value)}
                    />

                </div>
                <div className="text-center justify-self-center">
                    {callAccepted && !callEnded ? (
                        <div style={{ display: "flex", justifyContent: "center", color: "#32CD32" }}>
                            <FcEndCall size={30} onClick={leaveCall}></FcEndCall>
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: "center", color: "#32CD32" }}>
                            <FiPhoneCall size={40} onClick={() => callUser(idToCall)}></FiPhoneCall>
                        </div>
                    )}
                </div>
                <div className="text-center">
                    {receivingCall && !callAccepted ? (
                        <div >
                            <h1 >{name} is calling...</h1>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <FcVideoCall size={50} onClick={answerCall}>
                                    Answer
                                </FcVideoCall>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default Chat;