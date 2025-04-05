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

  const [isCallStarted, setIsCallStarted] = useState(false);
  const [isWaitingForOpponent, setIsWaitingForOpponent] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const initializePeer = async () => {
      const peer = new Peer({
        host: "www.muhammedhashim.online",
        port: 443,
        path: "/peerjs",
        secure: true,
        config: {
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        },
      });

      peerInstance.current = peer;

      peer.on("open", async (id: string) => {
        console.log("My peer ID is:", id);
        setPeerId(id);

        try {
          const response = await api.post(`/meetings/${meetId}/join`, {
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
    setIsCallStarted(true);

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

    if (!otherPeerId) {
      setIsWaitingForOpponent(true);
    }
  };

  const endCall = () => {
    if (peerInstance.current) {
      peerInstance.current.disconnect();
      console.log("Peer connection disconnected");

      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
        console.log("Local media tracks stopped");
      }

      setOtherPeerId(null);
      console.log("Call ended");
    }
    setIsCallStarted(false);
    setIsWaitingForOpponent(false);
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
