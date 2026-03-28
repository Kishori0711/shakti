// help/_data/helpData.ts

import { ReactNode } from "react";

export type HelpCategory = {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  count: number;
  iconName: string; // store icon name, render in component
};

export type HelpArticle = {
  id: string;
  categoryId: string;
  title: string;
  desc: string;
  meta: string;
  readTime: string;
  content: string[];
};

export type HelpFAQ = {
  id: string;
  q: string;
  a: string;
};

// ---------- Categories ----------
export const categories: HelpCategory[] = [
  {
    id: "community",
    title: "Community",
    desc: "Loved the market research and planning modules. Easy to follow and beginner friendly.",
    tags: ["Career Growth", "Networking"],
    count: 4,
    iconName: "Users",
  },
  {
    id: "course",
    title: "Course",
    desc: "Loved the market research and planning modules. Easy to follow and beginner friendly.",
    tags: ["Career Growth", "Learning"],
    count: 4,
    iconName: "BookOpen",
  },
  {
    id: "account",
    title: "Account",
    desc: "Loved the market research and planning modules. Easy to follow and beginner friendly.",
    tags: ["Profile", "Password"],
    count: 4,
    iconName: "User",
  },
  {
    id: "mentors",
    title: "Mentors",
    desc: "Loved the market research and planning modules. Easy to follow and beginner friendly.",
    tags: ["Career Growth", "Guidance"],
    count: 4,
    iconName: "Users",
  },
  {
    id: "event",
    title: "Event",
    desc: "Loved the market research and planning modules. Easy to follow and beginner friendly.",
    tags: ["Career Growth", "Workshops"],
    count: 4,
    iconName: "Users",
  },
  {
    id: "newsfeed",
    title: "News Feed",
    desc: "Loved the market research and planning modules. Easy to follow and beginner friendly.",
    tags: ["Career Growth", "Updates"],
    count: 4,
    iconName: "Users",
  },
];

// ---------- Articles ----------
export const articles: HelpArticle[] = [
  // Community
  {
    id: "community-1",
    categoryId: "community",
    title: "How to join a community group",
    desc: "Step-by-step guide to finding and joining community groups",
    meta: "Community",
    readTime: "3 min read",
    content: [
      "Joining a community group is simple and straightforward. This guide will walk you through the entire process from start to finish.",
      "First, log into your account and navigate to the Community section from the sidebar.",
      "Browse through available groups or use the search bar to find groups that match your interests.",
      "Click on a group to view its details, including member count, description, and recent activity.",
      "Click the 'Join Group' button and you'll be added to the community immediately.",
      "Once joined, you can participate in discussions, share resources, and connect with other members.",
      "You can manage your group memberships from your profile settings at any time.",
    ],
  },
  {
    id: "community-2",
    categoryId: "community",
    title: "Community guidelines and rules",
    desc: "Understanding our community standards and best practices",
    meta: "Community",
    readTime: "5 min read",
    content: [
      "Our community thrives on mutual respect and constructive engagement.",
      "Be respectful to all members regardless of their background or experience level.",
      "Share knowledge generously — the community grows when everyone contributes.",
      "Avoid spam, self-promotion, or off-topic content in group discussions.",
      "Report any inappropriate behavior to moderators using the report button.",
      "Violations of community guidelines may result in warnings or account restrictions.",
    ],
  },
  {
    id: "community-3",
    categoryId: "community",
    title: "Creating your own community",
    desc: "Learn how to start and manage your own community group",
    meta: "Community",
    readTime: "4 min read",
    content: [
      "Creating your own community group allows you to build a space around your interests.",
      "Navigate to the Community section and click 'Create New Group'.",
      "Fill in the group name, description, and select relevant tags.",
      "Choose whether your group is public or requires approval to join.",
      "Invite members by sharing the group link or searching for users.",
      "As a group admin, you can moderate discussions and manage members.",
    ],
  },
  {
    id: "community-4",
    categoryId: "community",
    title: "Managing notifications for communities",
    desc: "Control how and when you receive community updates",
    meta: "Community",
    readTime: "2 min read",
    content: [
      "Stay updated without being overwhelmed by managing your notification preferences.",
      "Go to Settings > Notifications > Community to customize your alerts.",
      "Choose between real-time, daily digest, or weekly summary notifications.",
      "You can mute specific groups while keeping others active.",
      "Push notifications can be enabled or disabled independently from email notifications.",
    ],
  },

  // Course
  {
    id: "course-1",
    categoryId: "course",
    title: "Understanding subscription plans",
    desc: "Compare features across different pricing tiers",
    meta: "Billing & Plans",
    readTime: "5 min read",
    content: [
      "We offer multiple subscription plans designed to fit different learning needs.",
      "The Free plan gives you access to introductory courses and community features.",
      "The Pro plan unlocks all courses, mentorship sessions, and certificates.",
      "The Enterprise plan is designed for organizations with team management features.",
      "You can upgrade or downgrade your plan at any time from your account settings.",
      "All paid plans come with a 7-day free trial so you can explore before committing.",
    ],
  },
  {
    id: "course-2",
    categoryId: "course",
    title: "How to enroll in a course",
    desc: "Quick guide to finding and starting courses",
    meta: "Courses",
    readTime: "3 min read",
    content: [
      "Finding and enrolling in courses is designed to be quick and easy.",
      "Browse the course catalog from the Learn section in the sidebar.",
      "Use filters to narrow down by category, difficulty, or duration.",
      "Click on a course card to view the syllabus, instructor info, and reviews.",
      "Click 'Enroll Now' to add the course to your learning dashboard.",
      "You can start learning immediately or schedule it for later.",
    ],
  },
  {
    id: "course-3",
    categoryId: "course",
    title: "Tracking your course progress",
    desc: "Monitor your learning journey and achievements",
    meta: "Courses",
    readTime: "3 min read",
    content: [
      "Track your learning progress from the My Courses section.",
      "Each course shows a progress bar indicating completion percentage.",
      "Completed modules are marked with a checkmark for easy reference.",
      "You can resume any course exactly where you left off.",
      "Earn certificates upon completing all modules and passing assessments.",
    ],
  },
  {
    id: "course-4",
    categoryId: "course",
    title: "Getting course certificates",
    desc: "How to earn and download your completion certificates",
    meta: "Certificates",
    readTime: "4 min read",
    content: [
      "Certificates validate your learning achievements on the platform.",
      "Complete all modules and pass the final assessment to earn a certificate.",
      "Certificates are automatically generated and available for download.",
      "You can share certificates directly to LinkedIn from your profile.",
      "Each certificate includes a unique verification code for authenticity.",
    ],
  },

  // Account
  {
    id: "account-1",
    categoryId: "account",
    title: "How to reset your password",
    desc: "Step-by-step password reset guide",
    meta: "Account Security",
    readTime: "2 min read",
    content: [
      'Click on "Forgot Password" on the login page.',
      "Enter your registered email address.",
      "Check your inbox for the password reset link.",
      "Click the link and enter your new password.",
      "The reset link expires after 24 hours for security reasons.",
      "If you don't receive the email, check your spam folder or contact support.",
    ],
  },
  {
    id: "account-2",
    categoryId: "account",
    title: "Updating your profile information",
    desc: "Keep your profile details current and accurate",
    meta: "Profile",
    readTime: "3 min read",
    content: [
      "Keeping your profile updated helps others connect with you.",
      "Go to Settings > My Profile to edit your information.",
      "You can update your name, photo, bio, and career stage.",
      "Changes are saved automatically when you click the save button.",
      "Your profile photo should be a clear, professional image.",
    ],
  },
  {
    id: "account-3",
    categoryId: "account",
    title: "Managing email preferences",
    desc: "Control which emails you receive from us",
    meta: "Email",
    readTime: "2 min read",
    content: [
      "We respect your inbox — customize exactly which emails you receive.",
      "Go to Settings > Notifications > Email Preferences.",
      "Toggle individual email categories on or off.",
      "Essential security emails cannot be disabled for your protection.",
      "Changes take effect immediately.",
    ],
  },
  {
    id: "account-4",
    categoryId: "account",
    title: "Deleting your account",
    desc: "How to permanently delete your account and data",
    meta: "Account",
    readTime: "3 min read",
    content: [
      "We're sorry to see you go. Here's how to delete your account.",
      "Go to Settings > Account > Delete Account.",
      "You'll be asked to confirm your decision and enter your password.",
      "Account deletion is permanent and cannot be undone.",
      "All your data, courses, and certificates will be permanently removed.",
      "You have 30 days to cancel the deletion by logging back in.",
    ],
  },

  // Mentors
  {
    id: "mentors-1",
    categoryId: "mentors",
    title: "Finding the right mentor",
    desc: "Tips for selecting a mentor that matches your goals",
    meta: "Mentorship",
    readTime: "4 min read",
    content: [
      "Finding the right mentor can accelerate your career growth significantly.",
      "Browse mentors by industry, expertise, and availability.",
      "Read mentor profiles carefully — check their background and reviews.",
      "Look for mentors whose experience aligns with your career goals.",
      "Start with a discovery session to see if it's a good fit.",
      "You can switch mentors at any time if your needs change.",
    ],
  },
  {
    id: "mentors-2",
    categoryId: "mentors",
    title: "Booking a mentorship session",
    desc: "How to schedule and prepare for mentor meetings",
    meta: "Mentorship",
    readTime: "3 min read",
    content: [
      "Booking a session is simple through the mentor's profile page.",
      "Select an available time slot that works for both of you.",
      "Add a brief description of what you'd like to discuss.",
      "You'll receive a confirmation email with the meeting details.",
      "Prepare questions in advance to make the most of your session.",
    ],
  },
  {
    id: "mentors-3",
    categoryId: "mentors",
    title: "Becoming a mentor",
    desc: "Share your expertise and guide others on their journey",
    meta: "Mentorship",
    readTime: "5 min read",
    content: [
      "Becoming a mentor is a rewarding way to give back to the community.",
      "Apply through the Mentor Application form in your profile settings.",
      "Complete your mentor profile with your expertise and availability.",
      "Our team will review your application within 5 business days.",
      "Once approved, your profile will be visible to mentees.",
      "Set your own schedule and communication preferences.",
    ],
  },
  {
    id: "mentors-4",
    categoryId: "mentors",
    title: "Mentor session etiquette",
    desc: "Best practices for productive mentoring sessions",
    meta: "Guidelines",
    readTime: "3 min read",
    content: [
      "Respect both your time and your mentor's time.",
      "Join sessions on time and come prepared with specific questions.",
      "Take notes during the session for future reference.",
      "Follow up on action items discussed during the meeting.",
      "Provide feedback after each session to help improve the experience.",
    ],
  },

  // Event
  {
    id: "event-1",
    categoryId: "event",
    title: "Registering for events",
    desc: "How to find and register for upcoming events",
    meta: "Events",
    readTime: "2 min read",
    content: [
      "Stay informed about upcoming events from the Events section.",
      "Browse events by category, date, or format (online/offline).",
      "Click on an event to view details, speakers, and agenda.",
      "Click 'Register' to secure your spot.",
      "You'll receive confirmation and reminders via email.",
      "Some events have limited capacity, so register early.",
    ],
  },
  {
    id: "event-2",
    categoryId: "event",
    title: "Attending virtual events",
    desc: "Everything you need to know about online events",
    meta: "Virtual Events",
    readTime: "3 min read",
    content: [
      "Virtual events are hosted on our integrated video platform.",
      "Join using the link provided in your registration confirmation.",
      "Test your audio and video before the event starts.",
      "Use the chat feature to ask questions during the session.",
      "Event recordings are available for registered attendees within 48 hours.",
    ],
  },
  {
    id: "event-3",
    categoryId: "event",
    title: "Cancelling event registration",
    desc: "How to cancel your registration and refund policy",
    meta: "Events",
    readTime: "2 min read",
    content: [
      "You can cancel your registration up to 24 hours before the event.",
      "Go to My Events and click 'Cancel Registration'.",
      "Free events can be cancelled without any restrictions.",
      "Paid events follow our refund policy — check event details for specifics.",
      "Cancelling frees up your spot for other interested attendees.",
    ],
  },
  {
    id: "event-4",
    categoryId: "event",
    title: "Hosting your own event",
    desc: "Guide to creating and managing events on the platform",
    meta: "Event Management",
    readTime: "5 min read",
    content: [
      "Share your knowledge by hosting events on the platform.",
      "Go to Events > Create Event to get started.",
      "Fill in event details including title, description, date, and format.",
      "Set capacity limits and registration deadlines.",
      "Promote your event through the community and social features.",
      "Manage attendees and send updates from your event dashboard.",
    ],
  },

  // News Feed
  {
    id: "newsfeed-1",
    categoryId: "newsfeed",
    title: "Customizing your news feed",
    desc: "Personalize the content you see in your feed",
    meta: "News Feed",
    readTime: "3 min read",
    content: [
      "Your news feed is personalized based on your interests and activity.",
      "Follow topics and people to see more relevant content.",
      "Use the filter options to sort by recent, popular, or trending.",
      "You can hide posts or mute topics you're not interested in.",
      "The algorithm learns from your interactions to improve recommendations.",
    ],
  },
  {
    id: "newsfeed-2",
    categoryId: "newsfeed",
    title: "Creating and sharing posts",
    desc: "How to create engaging posts for the community",
    meta: "Content Creation",
    readTime: "4 min read",
    content: [
      "Share your thoughts, experiences, and knowledge with the community.",
      "Click the 'Create Post' button at the top of your feed.",
      "Write your content — you can add images, links, and formatting.",
      "Tag relevant topics to help others discover your post.",
      "Engage with comments on your posts to build discussions.",
    ],
  },
  {
    id: "newsfeed-3",
    categoryId: "newsfeed",
    title: "Reporting inappropriate content",
    desc: "How to report content that violates guidelines",
    meta: "Safety",
    readTime: "2 min read",
    content: [
      "Help us maintain a safe community by reporting inappropriate content.",
      "Click the three-dot menu on any post and select 'Report'.",
      "Choose the reason for reporting from the provided options.",
      "Our moderation team reviews all reports within 24 hours.",
      "You'll be notified of the action taken on your report.",
    ],
  },
  {
    id: "newsfeed-4",
    categoryId: "newsfeed",
    title: "Bookmarking and saving posts",
    desc: "Save important posts for later reference",
    meta: "News Feed",
    readTime: "2 min read",
    content: [
      "Never lose track of valuable content by bookmarking posts.",
      "Click the bookmark icon on any post to save it.",
      "Access your saved posts from Profile > Bookmarks.",
      "Organize bookmarks into collections for easy access.",
      "You can remove bookmarks at any time.",
    ],
  },
];

// ---------- FAQs ----------
export const faqs: HelpFAQ[] = [
  {
    id: "faq-1",
    q: "How do I reset my password?",
    a: `Click on "Forgot Password" on the login page. Enter your email address and we'll send you a password reset link. The link expires after 24 hours for security reasons.`,
  },
  {
    id: "faq-2",
    q: "How do I change my email address?",
    a: "Go to Settings > My Profile > Email. Click 'Change Email', enter your new email, and verify it with the OTP sent to your new address.",
  },
  {
    id: "faq-3",
    q: "Can I download courses for offline viewing?",
    a: "Currently, courses are available for online streaming only. We're working on adding offline download support in a future update.",
  },
  {
    id: "faq-4",
    q: "How do I contact customer support?",
    a: "You can reach us via the 'Chat with Support' button, call us at +91 123 456 7890, or email support@shakti2047.com. Our team is available Monday to Friday, 9 AM to 6 PM IST.",
  },
];

// ---------- Helpers ----------
export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id) || null;
}

export function getArticlesByCategory(categoryId: string) {
  return articles.filter((a) => a.categoryId === categoryId);
}

export function getArticleById(articleId: string) {
  return articles.find((a) => a.id === articleId) || null;
}