import { UserRole } from "../types/User";

// Helper function to get role-specific content
export const getRoleContentForErrorPages = (role: UserRole) => {
  switch (role) {
    case "admin":
      return {
        title: "Admin Dashboard",
        description404:
          "The requested administrative resource could not be found.",
        description500:
          "Our systems encountered an error while processing your administrative request.",
        descriptionMaintenance:
          "The admin panel is currently undergoing scheduled maintenance.",
        actionText: "Return to Admin Dashboard",
        supportText: "Contact IT Department",
      };
    case "learner":
      return {
        title: "Learning Portal",
        description404: `The learning material you're looking for isn't here.`,
        description500:
          "We encountered a problem while loading your learning resources.",
        descriptionMaintenance:
          "Your learning portal is being updated with new features.",
        actionText: "Back to My Courses",
        supportText: "Contact Learning Support",
      };
    case "mentor":
      return {
        title: "Mentor Workspace",
        description404: `The mentoring resource you requested doesn't exist.`,
        description500:
          "We ran into an issue while processing your mentoring tools.",
        descriptionMaintenance:
          "The mentoring platform is being upgraded with new tools.",
        actionText: "Return to Mentees",
        supportText: "Contact Technical Support",
      };
  }
};

// Role based titles and descriptions
export const getRoleContentForLogin = (role: UserRole) => {
  switch (role) {
    case "admin":
      return {
        loginTitle: "Admin Login",
        loginDescription: "Access your administrative dashboard",
        signupTitle: "Admin Registration",
        signupDescription: "Create a new administrator account",
        welcomeTitle: "Admin Dashboard",
        welcomeDescription: "Manage your platform with ease",
      };
    case "mentor":
      return {
        loginTitle: "Mentor Login",
        loginDescription: "Access your mentor dashboard",
        signupTitle: "Mentor Registration",
        signupDescription: "Join as a mentor on our platform",
        welcomeTitle: "Mentor Portal",
        welcomeDescription: "Guide learners to success",
      };
    case "learner":
    default:
      return {
        loginTitle: "Learner Login",
        loginDescription: "Access your learning materials",
        signupTitle: "Learner Registration",
        signupDescription: "Start your learning journey today",
        welcomeTitle: "Learning Portal",
        welcomeDescription: "Your gateway to knowledge",
      };
  }
};
