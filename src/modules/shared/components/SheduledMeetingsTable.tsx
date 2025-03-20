import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { ErrorState, LoadingState, NoContentState } from "../Error";
import { SubRole } from "../../../types";
import { IMeeting } from "../../../types/meeting";

interface Props {
  role: SubRole;
}

const ScheduledMeetingsTable: React.FC<Props> = ({ role }) => {
  const navigate = useNavigate();
  const {
    data: meetings,
    loading,
    error,
  } = useFetch<IMeeting[]>("/api/meetings");
  const [searchTerm, setSearchTerm] = useState("");

  if (error) {
    return <ErrorState />;
  }

  if (loading) {
    return <LoadingState />;
  }

  if (!meetings || meetings.length === 0) {
    return <NoContentState />;
  }

  const filteredMeetings = meetings.filter(
    (meeting) =>
      meeting.course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${meeting.learner.firstName} ${meeting.learner.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleJointCall = (meetId: string) => {
    navigate(`/${role}/call/${meetId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Scheduled Meetings
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by course or learner..."
            className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute right-3 top-3 h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {filteredMeetings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No meetings match your search criteria
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  {role === "mentor" ? "Learner" : "Mentor"}
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Date
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMeetings.map((meeting) => (
                <tr
                  key={meeting.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {meeting.course.title}
                    </div>
                    {/* <div className="text-xs text-gray-500">
                      ID: {meeting.course._id.substring(0, 8)}...
                    </div> */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {role === "mentor"
                        ? `${meeting.learner.firstName} ${
                            meeting.learner.lastName || ""
                          }`
                        : `${meeting.mentor.firstName} ${
                            meeting.mentor.lastName || ""
                          }`}

                      {`${meeting.learner.firstName} ${
                        meeting.learner.lastName || ""
                      }`}
                    </div>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {meeting.slot.time}
                    </div>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {meeting.slot.time > 12
                        ? `${meeting.slot.time % 12} : 00 PM`
                        : `${meeting.slot.time} : 00 AM`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleJointCall(meeting.id)}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Join Call
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredMeetings.length} of {meetings.length} meetings
      </div>
    </div>
  );
};

export default ScheduledMeetingsTable;
