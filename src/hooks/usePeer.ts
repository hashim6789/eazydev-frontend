import { useEffect, useRef, useState } from "react";
import Peer, { MediaConnection } from "peerjs";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../types";
import { joinMeeting } from "../services/meeting.service";
import { ENV } from "../configs";
import { getAxiosErrorMessage, showErrorToast } from "../utils";
import { MeetingMessages } from "../constants";
import { AxiosInstance } from "axios";

export const usePeerConnection = (
  meetId: string,
  api: AxiosInstance,
  role: UserRole
) => {
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
      console.log("peer", ENV.PEER_DOMAIN);

      const peer = new Peer({
        host: "eazydev.muhammedhashim.online",
        // host: ENV.PEER_DOMAIN,
        port: ENV.NODE_ENV === "production" ? 443 : 80,
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
          const data = await joinMeeting(meetId, peerId);
          if (data && data.otherPeerId) {
            setOtherPeerId(data.otherPeerId);
          }
        } catch (error: unknown) {
          const message = getAxiosErrorMessage(
            error,
            MeetingMessages.ERROR.JOIN
          );
          showErrorToast(message);
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
        } catch (error: unknown) {
          const message = getAxiosErrorMessage(
            error,
            MeetingMessages.ERROR.MEDIA
          );
          showErrorToast(message);
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
      .catch((error: unknown) => {
        const message = getAxiosErrorMessage(
          error,
          MeetingMessages.ERROR.MEDIA
        );
        showErrorToast(message);
      });

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
