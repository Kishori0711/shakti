import type { ImageProps } from "next/image";
import type { Post, Story, User } from "../type";

const u = (
  id: string,
  name: string,
  handle: string,
  avatar: ImageProps["src"],
  location?: string
): User => ({
  id,
  name,
  handle,
  avatar,
  location,
});

export const currentUser = u(
  "me",
  "Riya Solanki",
  "@riya.solanki_official",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60"
);

export const stories: Story[] = [
  { id: "s0", user: currentUser, isYourStory: true, seen: false },
  {
    id: "s1",
    user: u(
      "1",
      "Aarohi Singh",
      "@aarohi.s",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=60"
    ),
    seen: false,
  },
  {
    id: "s2",
    user: u(
      "2",
      "Pari Vyas",
      "@pari.v",
      "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=200&q=60"
    ),
    seen: false,
  },
  {
    id: "s3",
    user: u(
      "3",
      "Nupur Tiwari",
      "@nupur.t",
      "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=200&q=60"
    ),
    seen: true,
  },
  {
    id: "s4",
    user: u(
      "4",
      "Esha Mathur",
      "@esha.m",
      "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=200&q=60"
    ),
    seen: true,
  },
  {
    id: "s6",
    user: u(
      "1b",
      "Aarohi Singh",
      "@aarohi.s",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=60"
    ),
    seen: false,
  },
  {
    id: "s7",
    user: u(
      "2b",
      "Pari Vyas",
      "@pari.v",
      "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=200&q=60"
    ),
    seen: false,
  },
  {
    id: "s8",
    user: u(
      "3b",
      "Nupur Tiwari",
      "@nupur.t",
      "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=200&q=60"
    ),
    seen: true,
  },
  {
    id: "s9",
    user: u(
      "4b",
      "Esha Mathur",
      "@esha.m",
      "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=200&q=60"
    ),
    seen: true,
  },
];

export const posts: Post[] = [
  {
    id: "p1",
    author: u(
      "11",
      "Mehek Kaur",
      "@mehek.kaur",
      "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=200&q=60",
      "Delhi, India"
    ),
    createdAt: "12h ago",
    text: "In the fast-paced world of corporate life, it's crucial to prioritize your mental peace. Take moments to breathe, reflect, and recharge. Seek solace in small rituals, like morning walks, deep breaths, or a quick meditation session during breaks.",
    tags: ["mentalpeace", "corporatelife"],
    likes: 2800,
    comments: 7,
  },
  {
    id: "p2",
    author: u(
      "12",
      "Hridaan Khurana",
      "@hridaan.k",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60",
      "Delhi, India"
    ),
    createdAt: "12h ago",
    text: "Creativity is intelligence having fun!",
    tags: ["design", "stevejobs"],
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=70",
    likes: 2800,
    comments: 7,
  },
  {
    id: "p3",
    author: u(
      "13",
      "Deeksha Yadav",
      "@deeksha.y",
      "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=200&q=60",
      "Delhi, India"
    ),
    createdAt: "12h ago",
    text: "Creativity is intelligence having fun!",
    tags: ["design", "stevejobs"],
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=70",
    likes: 2800,
    comments: 7,
  },
];

export const suggestedUsers: User[] = [
  u(
    "21",
    "Aanya Mehra",
    "@aanya.mehra_",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60"
  ),
  u(
    "22",
    "Kavya Sharma",
    "@kavya.sharmaa",
    "https://images.unsplash.com/photo-1524503033411-f9f3a9a977bd?auto=format&fit=crop&w=200&q=60"
  ),
  u(
    "23",
    "Sania Verma",
    "@sania.vermaa",
    "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=200&q=60"
  ),
  u(
    "24",
    "Ishita Joshi",
    "@ishita.j_official",
    "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=200&q=60"
  ),
  u(
    "25",
    "Naina Gupta",
    "@naina.gupta_",
    "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=200&q=60"
  ),
  u(
    "26",
    "Tanya Arora",
    "@tanya.aroraa",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=60"
  ),
  u(
    "27",
    "Muskan Sharma",
    "@muskan.sharmaa",
    "https://images.unsplash.com/photo-1524503033411-f9f3a9a977bd?auto=format&fit=crop&w=200&q=60"
  ),
];

export const friends: User[] = [
  u(
    "31",
    "Tanvi Sood",
    "@tanvi.sood_",
    "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=200&q=60"
  ),
  u(
    "32",
    "Shreya Jain",
    "@shreya.jain.official",
    "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=200&q=60"
  ),
  u(
    "33",
    "Kriti Nanda",
    "@kriti.nanda_",
    "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=200&q=60"
  ),
];