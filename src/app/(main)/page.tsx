export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}

      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Section 1: Quick Actions */}
        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Dashboard</h2>
              <p className="text-sm text-gray-500">
                Complete your setup and start exploring programs.
              </p>
            </div>
            <span className="inline-flex w-fit rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-[#562C85]">
              Account: Active
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <button className="group rounded-xl border bg-white p-4 text-left hover:border-[#562C85]/40 hover:bg-[#562C85]/5">
              <p className="text-sm font-semibold text-gray-900">Complete Profile</p>
              <p className="mt-1 text-xs text-gray-500">
                Add required details for a better experience.
              </p>
              <p className="mt-3 text-xs font-medium text-[#562C85] group-hover:underline">
                Open →
              </p>
            </button>

            <button className="group rounded-xl border bg-white p-4 text-left hover:border-[#562C85]/40 hover:bg-[#562C85]/5">
              <p className="text-sm font-semibold text-gray-900">Explore Programs</p>
              <p className="mt-1 text-xs text-gray-500">
                Browse learning & mentorship opportunities.
              </p>
              <p className="mt-3 text-xs font-medium text-[#562C85] group-hover:underline">
                Browse →
              </p>
            </button>

            <button className="group rounded-xl border bg-white p-4 text-left hover:border-[#562C85]/40 hover:bg-[#562C85]/5">
              <p className="text-sm font-semibold text-gray-900">My Applications</p>
              <p className="mt-1 text-xs text-gray-500">
                Track submitted forms and updates.
              </p>
              <p className="mt-3 text-xs font-medium text-[#562C85] group-hover:underline">
                View →
              </p>
            </button>

            <button className="group rounded-xl border bg-white p-4 text-left hover:border-[#562C85]/40 hover:bg-[#562C85]/5">
              <p className="text-sm font-semibold text-gray-900">Support</p>
              <p className="mt-1 text-xs text-gray-500">
                Get help with account and onboarding.
              </p>
              <p className="mt-3 text-xs font-medium text-[#562C85] group-hover:underline">
                Contact →
              </p>
            </button>
          </div>
        </section>

        {/* Section 2: Overview */}
        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          {/* Left: Stats */}
          <div className="lg:col-span-2 rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">Overview</h2>
              <span className="text-xs text-gray-500">Last 30 days</span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Programs Enrolled</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">2</p>
                <p className="mt-2 text-xs text-green-700">+1 this month</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Applications</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">5</p>
                <p className="mt-2 text-xs text-gray-600">2 under review</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Profile Completion</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">70%</p>
                <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 w-[70%] rounded-full bg-[#562C85]" />
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-xl border bg-white p-4">
              <p className="text-sm font-semibold text-gray-900">Next recommended step</p>
              <p className="mt-1 text-sm text-gray-600">
                Verify your phone number and add your basic details to unlock more features.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="rounded-lg bg-[#562C85] px-3 py-2 text-sm font-semibold text-white hover:opacity-95">
                  Verify Phone
                </button>
                <button className="rounded-lg border bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Right: Activity */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
            <p className="text-sm text-gray-500 mt-1">Your latest updates</p>

            <div className="mt-4 space-y-3">
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-sm font-medium text-gray-900">Account created</p>
                <p className="text-xs text-gray-500 mt-1">Today • 2:15 PM</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-sm font-medium text-gray-900">OTP verified</p>
                <p className="text-xs text-gray-500 mt-1">Today • 2:20 PM</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-sm font-medium text-gray-900">Profile pending</p>
                <p className="text-xs text-gray-500 mt-1">
                  Add phone/email in profile to complete onboarding.
                </p>
              </div>
            </div>

            <button className="mt-5 w-full rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50">
              View all activity
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}