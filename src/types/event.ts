// src/types/event.ts

export type Event = {
  id: string;
  title: string;
  image: string;
  date: string;
  category: string;
  language: string;
  members: number;
  price: number;
  description?: string;
  instructor?: string;
  rating?: number;
};

export type EventFilter = {
  category: string;
  language: string;
  priceRange: string;
};


export interface IEvent {
  id: string;
  thumbnailUrl: string;
  title: string;
  speaker: {
    name: string;
    title: string;
    avatarUrl: string;
  };
  time: string;
  date: string;
}