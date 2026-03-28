export type Speaker = {
  id: string;
  email: string | null;
  phone: string | null;
  first_name: string | null;
  last_name: string | null;
  profile_photo_url: string | null;
};

export type EventTag = {
  id: string;
  tag_name: string;
};

export type EventReminder = {
  id: string;
  event_id: string;
  reminder_order: number;
  reminder_offset_minutes: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type EventApiItem = {
  id: string;
  title: string;
  description: string;
  format: string;
  event_date: string;
  start_time: string;
  end_time: string;
  venue: string | null;
  price: string;
  capacity: number;
  capacity_remaining: number;
  registration_deadline: string;
  scarcity_threshold: number;
  banner_image: string;
  status: string;
  created_by: string | null;
  event_type: string | null;
  career_stage: string | null;
  language: string | null;
  what_you_will_learn: string[] | string | null;
  who_should_attend: string[] | string | null;
  is_recommended: boolean;
  is_deleted: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  speakers: Speaker[];
  tags: EventTag[];
  reminders: EventReminder[];
  is_registered?: boolean;
  registration_status?: string | null;
};

export type EventDetailResponse = EventApiItem;

export type EventListResponse = {
  success: boolean;
  count: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: EventApiItem[];
};

export type EventCardItem = {
  id: string;
  title: string;
  image: string;
  date: string;
  mentorName: string;
  mentorRole: string;
  mentorAvatar: string;
  price: number;
};

export type EventFilters = {
  price?: string;
  format?: string;
  language?: string;
  career_stage?: string;
  event_type?: string;
  limit?: number;
  page?: number;
};
