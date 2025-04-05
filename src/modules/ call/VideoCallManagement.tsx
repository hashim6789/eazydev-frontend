import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { MicIcon, PhoneOffIcon, VideoIcon } from "lucide-react";
import { SubRole } from "../../types";
import { usePeerConnection } from "../../hooks/usePeer";
import { api } from "../../configs";

interface MeetingRoomProps {
  role: SubRole;
}

const MeetingRoom: React.FC<MeetingRoomProps> = ({ role }) => {
  const { meetId } = useParams();
  const {
    otherPeerId,
    videoRef,
    remoteVideoRef,
    initiateCall,
    toggleAudio,
    toggleVideo,
    endCall,
    isCallStarted,
    isWaitingForOpponent,
    isAudioEnabled,
    isVideoEnabled,
  } = usePeerConnection(meetId!, api, role);

  // Handle call initiation
  const handleInitiateCall = () => {
    initiateCall(); // Call the function to start the call
  };

  // Handle call end
  const handleEndCall = () => {
    endCall(); // Call the function to end the call
  };

  const preventBackNavigation = () => {
    window.history.pushState(null, "", window.location.href);
  };

  useEffect(() => {
    // Add a fake entry to the browser history
    window.history.pushState(null, "", window.location.href);

    // Add event listener to intercept the back button
    window.addEventListener("popstate", preventBackNavigation);

    return () => {
      // Cleanup event listener when component unmounts
      window.removeEventListener("popstate", preventBackNavigation);
    };
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h1 className="text-xl font-semibold">Version Control System</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Video Area */}
            <div className="lg:col-span-2">
              <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video">
                {/* Main Video Stream */}
                <video
                  ref={remoteVideoRef}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Waiting Message */}
                {isWaitingForOpponent && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white">
                    <p className="text-lg font-semibold">
                      Waiting for Opponent...
                    </p>
                  </div>
                )}

                {/* Small Preview Window */}
                <div className="absolute top-4 right-4">
                  <div className="w-32 h-32 bg-gray-800 rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50">
                  <div className="flex justify-center space-x-4">
                    {!isCallStarted && (
                      <button
                        onClick={handleInitiateCall}
                        disabled={!otherPeerId}
                        className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Start Call
                      </button>
                    )}
                    {isCallStarted && (
                      <button
                        onClick={handleEndCall}
                        className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white"
                      >
                        <PhoneOffIcon />
                      </button>
                    )}
                    <button
                      onClick={toggleAudio}
                      className={`p-3 rounded-full ${
                        isAudioEnabled
                          ? " bg-blue-600 hover:bg-blue-700"
                          : " bg-red-600 hover:bg-red-700"
                      } text-white`}
                    >
                      <MicIcon />
                    </button>
                    <button
                      onClick={toggleVideo}
                      className={`p-3 rounded-full ${
                        isVideoEnabled
                          ? " bg-blue-600 hover:bg-blue-700"
                          : " bg-red-600 hover:bg-red-700"
                      } text-white`}
                    >
                      <VideoIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingRoom;
