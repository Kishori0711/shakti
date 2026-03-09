import type { ImageProps } from "next/image";

export type User = {
  id: string;
  name: string;
  handle: string;
  avatar: ImageProps["src"]; 
  location?: string;
};

export type Story = {
  id: string;
  user: User;
  isYourStory?: boolean;
  seen?: boolean;
};

export type Post = {
  id: string;
  author: User;
  createdAt: string;
  text: string;
  tags: string[];
  image?: ImageProps["src"]; 
  likes: number;
  comments: number;
};