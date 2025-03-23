import { useEffect, useRef, useState } from "react";
import Peer, { MediaConnection } from "peerjs";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../types";

export const usePeerConnection = (meetId: string, api: any, role: UserRole) => {
  const [peerId, setPeerId] = useState<string>("");
  const [otherPeerId, setOtherPeerId] = useState<string | null>(null);
  const peerInstance = useRef<Peer | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);

  // State to track call status
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [isWaitingForOpponent, setIsWaitingForOpponent] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const initializePeer = async () => {
      const peer = new Peer({
        host: "localhost",
        port: 3001,
        path: "/peerjs",
        secure: false,
        config: {
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        },
      });

      peerInstance.current = peer;

      peer.on("open", async (id: string) => {
        console.log("My peer ID is:", id);
        setPeerId(id);

        try {
          const response = await api.post(`/api/meetings/${meetId}/join`, {
            peerId: id,
          });
          if (response.status === 200 && response.data.otherPeerId) {
            console.log(response.data.otherPeerId);
            setOtherPeerId(response.data.otherPeerId);
          }
        } catch (error) {
          console.error("Error joining meeting:", error);
        }
      });

      peer.on("call", async (call: MediaConnection) => {
        try {
          console.log("call started");
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          setLocalStream(stream);
          call.answer(stream);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }

          call.on("stream", (remoteStream: MediaStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
              remoteVideoRef.current.play();
              setIsWaitingForOpponent(false);
              setIsCallStarted(true);
            }
          });
        } catch (error) {
          console.error("Media devices error:", error);
        }
      });
    };

    initializePeer();

    return () => peerInstance.current?.destroy();
  }, [meetId, api]);

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const initiateCall = () => {
    if (!peerInstance.current || !otherPeerId) return;
    setIsCallStarted(true); // Hide "Start Call" button and show "End Call"

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        const call = peerInstance.current!.call(otherPeerId, stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }

        call.on("stream", (remoteStream: MediaStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
            setIsWaitingForOpponent(false);
            setIsCallStarted(true);
          }
        });
      })
      .catch((error) => console.error("Media devices error:", error));

    // Simulate waiting for opponent
    if (!otherPeerId) {
      setIsWaitingForOpponent(true); // Show "Waiting for Opponent"
    }
  };

  const endCall = () => {
    if (peerInstance.current) {
      // Close the peer connection
      peerInstance.current.disconnect();
      console.log("Peer connection disconnected");

      // Stop local media tracks
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
        console.log("Local media tracks stopped");
      }

      // Clear local states (if needed)
      setOtherPeerId(null);
      console.log("Call ended");
    }
    setIsCallStarted(false); // Reset to initial state
    setIsWaitingForOpponent(false); // Reset waiting state
    if (role === "learner") {
      navigate(`/learner/learnings`);
    } else {
      navigate(`/mentor/meetings`);
    }
  };

  return {
    peerId,
    otherPeerId,
    videoRef,
    remoteVideoRef,
    isVideoEnabled,
    isAudioEnabled,
    toggleVideo,
    toggleAudio,
    initiateCall,
    endCall,
    isCallStarted,
    isWaitingForOpponent,
  };
};
