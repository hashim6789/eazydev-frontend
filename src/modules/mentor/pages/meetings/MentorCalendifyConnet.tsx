// import React from "react";
// import { InlineWidget } from "react-calendly";

// const MentorCalendlyIntegration: React.FC = () => {
//   return (
//     <div>
//       <h2>Set Your Availability</h2>
//       <InlineWidget url="https://calendly.com/muhammedhashim6789" />
//     </div>
//   );
// };

// export default MentorCalendlyIntegration;

import React, { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";
import axios from "axios";
import { config } from "../../../../configs";

const MentorCalendlyIntegration: React.FC = () => {
  const [calendlyLink, setCalendlyLink] = useState<string>("");

  useEffect(() => {
    const fetchCalendlyLink = async () => {
      try {
        // Simulate OAuth authentication flow for the mentor
        const mentorToken = localStorage.getItem("authToken");
        if (!mentorToken) {
          // Redirect to Calendly OAuth authorization
          const clientId = config.CALENDLY_CLINT_ID; // Replace with your Calendly Client ID
          const redirectUri = "https://muhammedhashim.online"; // Replace with your redirect URI
          window.location.href = `https://auth.calendly.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=read`;
          return;
        }

        // Fetch Calendly link for the authenticated mentor
        const response = await axios.get("/api/mentors/calendly-link", {
          headers: {
            Authorization: `Bearer ${mentorToken}`,
          },
        });
        setCalendlyLink(response.data.calendly_link);
      } catch (error) {
        console.error("Error fetching Calendly link:", error);
      }
    };

    fetchCalendlyLink();
  }, []);

  return (
    <div>
      <h2>Set Your Availability</h2>
      {calendlyLink ? (
        <InlineWidget url={calendlyLink} />
      ) : (
        <p>Loading Calendly widget...</p>
      )}
    </div>
  );
};

export default MentorCalendlyIntegration;
