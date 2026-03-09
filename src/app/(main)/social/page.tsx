import AppShell from "@/components/social/Layout";
import StoriesBar from "@/components/social/story/StoriesBar";
import PostCard from "@/components/social/feed/PostCard";
import ProfileCard from "@/components/social/card/ProfileCard";
import SuggestedCard from "@/components/social/card/SuggestedCard";
import FriendsCard from "@/components/social/card/FriendsCard";

import { currentUser, friends, posts, stories, suggestedUsers } from "@/components/social/mockdata/mock";

export default function SocialFeed() {
  return (
    <AppShell
      stories={<StoriesBar stories={stories} />}
      feed={
        <>
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </>
      }
      sidebar={
        <div className="space-y-6">
          <ProfileCard user={currentUser} />
          <SuggestedCard users={suggestedUsers} />
          <FriendsCard users={friends} total={28} />
        </div>
      }
    />
  );
}