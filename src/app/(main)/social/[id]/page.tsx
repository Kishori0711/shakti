"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";

import { ProfileLeftPanel } from "@/components/social/socialUserProfile/ProfileLeftPanel";

// right cards
import SuggestedCard from "@/components/social/card/SuggestedCard";
import FriendsCard from "@/components/social/card/FriendsCard";

import {
  friends,
  suggestedUsers,
} from "@/components/social/mockdata/mock";

export default function ProfilePageClient({ userId }: { userId: string }) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  // NOTE: Abhi demo data hardcoded hai.
  // Aap userId use karke yahan API call / fetch bhi kar sakte ho.
  // console.log("Profile userId:", userId);

  return (
    <div className="min-h-screen px-4 py-2">
      <div className="mx-auto w-full">
        <button
          type="button"
          onClick={handleBack}
          className="mb-4 inline-flex items-center gap-1 text-sm text-black"
        >
          <IoIosArrowRoundBack className="h-6 w-6" />
          Back to Feed
        </button>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* LEFT */}
          <main className="min-w-0">
            <ProfileLeftPanel
              onCreate={() => console.log("create")}
              user={{
                name: "Riya Solanki",
                username: "riya.solanki_official",
                avatarUrl:
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
                postsCount: 120,
                followersCount: "4.3k",
                followingCount: 580,
                bio: "Learner. Creator. Exploring art, culture, and personal growth every day.",
              }}
              posts={[
                {
                  id: "1",
                  imageUrl:
                    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&fit=crop",
                },
                {
                  id: "2",
                  imageUrl:
                    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&fit=crop",
                },
                {
                  id: "3",
                  imageUrl:
                    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&fit=crop",
                },
                {
                  id: "4",
                  imageUrl:
                    "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=800&fit=crop",
                },
                {
                  id: "5",
                  imageUrl:
                    "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=800&fit=crop",
                },
                {
                  id: "6",
                  imageUrl:
                    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&fit=crop",
                },
                {
                  id: "7",
                  imageUrl:
                    "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&fit=crop",
                },
                {
                  id: "8",
                  imageUrl:
                    "https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=800&fit=crop",
                },
                {
                  id: "9",
                  imageUrl:
                    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&fit=crop",
                },
              ]}
            />
          </main>

          {/* RIGHT */}
          <aside className="space-y-6 lg:sticky lg:top-6">
            <SuggestedCard users={suggestedUsers} />
            <FriendsCard users={friends} total={28} />
          </aside>
        </div>
      </div>
    </div>
  );
}