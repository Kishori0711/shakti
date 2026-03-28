"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiPlus, FiUser, FiTrash2 } from "react-icons/fi";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchUserProfileThunk,
  sendEmailOtpThunk,
  updateEmailWithOtpThunk,
  updateProfileInfoThunk,
  deleteProfilePhotoThunk,
  fetchProfileCompletionThunk,
} from "@/features/profile/profileThunks";
import { resetOtpState } from "@/features/profile/profileSlice";

type ProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  careerStage: string;
  preferredLanguage: string;
  timezone: string;
};

/* ─── Skeleton Components ─── */
function SkeletonBox({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-neutral-200 ${className ?? ""}`}
    />
  );
}

function ProfilePictureSkeleton() {
  return (
    <div className="rounded-2xl border border-neutral-200 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 shrink-0 animate-pulse rounded-full bg-neutral-200" />
          <div className="space-y-2">
            <SkeletonBox className="h-4 w-28" />
            <SkeletonBox className="h-3 w-36" />
          </div>
        </div>
        <SkeletonBox className="h-9 w-16 rounded-lg" />
      </div>
    </div>
  );
}

function PersonalInfoSkeleton() {
  return (
    <div className="rounded-2xl border border-neutral-200 p-4">
      <div className="mb-3 flex items-center justify-between">
        <SkeletonBox className="h-4 w-36" />
        <SkeletonBox className="h-9 w-16 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <SkeletonBox className="h-3 w-20" />
          <SkeletonBox className="h-10 w-full" />
        </div>
        <div className="space-y-1">
          <SkeletonBox className="h-3 w-20" />
          <SkeletonBox className="h-10 w-full" />
        </div>
        <div className="space-y-1 md:col-span-2">
          <SkeletonBox className="h-3 w-24" />
          <SkeletonBox className="h-10 w-full" />
        </div>
        <div className="space-y-1">
          <SkeletonBox className="h-3 w-16" />
          <SkeletonBox className="h-10 w-full" />
        </div>
        <div className="space-y-1">
          <SkeletonBox className="h-3 w-24" />
          <SkeletonBox className="h-10 w-full" />
        </div>
        <div className="space-y-1">
          <SkeletonBox className="h-3 w-24" />
          <SkeletonBox className="h-10 w-full" />
        </div>
        <div className="space-y-1">
          <SkeletonBox className="h-3 w-20" />
          <SkeletonBox className="h-10 w-full" />
        </div>
        <div className="space-y-1">
          <SkeletonBox className="h-3 w-32" />
          <SkeletonBox className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="space-y-4">
      <ProfilePictureSkeleton />
      <PersonalInfoSkeleton />
    </div>
  );
}

/* ─── Progress Bar Component ─── */
function ProfileCompletionBar({
  percentage,
  isLoading,
}: {
  percentage: number;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <SkeletonBox className="h-2.5 w-48 rounded-full" />
        <SkeletonBox className="h-4 w-20" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Progress track */}
      <div className="h-2.5 w-48 overflow-hidden rounded-full bg-primary-100">
        <div
          className="h-full rounded-full bg-primary-500 transition-all duration-500 ease-out"
          style={{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }}
        />
      </div>

      {/* Percentage text */}
      <span className="text-sm font-semibold text-neutral-700 whitespace-nowrap">
        {percentage}%{" "}
        <span className="font-normal text-neutral-500">completed</span>
      </span>
    </div>
  );
}

/* ─── Main Page ─── */
export default function MyProfilePage() {
  const dispatch = useAppDispatch();

  const {
    data,
    fetchStatus,
    otpStatus,
    updateEmailStatus,
    updateProfileStatus,
    deletePhotoStatus,
    otpSent,
    completion,
    completionStatus,
  } = useAppSelector((state) => state.profile);

  const originalEmail = useMemo(() => data?.email || "", [data]);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [otp, setOtp] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [form, setForm] = useState<ProfileForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    careerStage: "",
    preferredLanguage: "",
    timezone: "",
  });

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchUserProfileThunk());
    dispatch(fetchProfileCompletionThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!data) return;
    if (isEditing || isEmailEditing) return;

    setForm((p) => ({
      ...p,
      firstName: data.profile?.first_name || "",
      lastName: data.profile?.last_name || "",
      email: data.email || "",
      phone: data.phone || "",
      dob: data.profile?.dob || "",
      careerStage: data.profile?.career_stage || "",
      preferredLanguage: data.profile?.preferred_language || "",
      timezone: data.profile?.timezone || "",
    }));

    if (!selectedFile) {
      setAvatarUrl(data.profile?.profile_photo_url || null);
    }
  }, [data, isEditing, isEmailEditing, selectedFile]);

  const onPickFile = () => fileRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxBytes = 15 * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error("File size must be under 15MB");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
    toast.success("Image selected successfully");
  };

  const onSavePhoto = async () => {
    if (!selectedFile) return toast.error("Please select an image first");

    try {
      await dispatch(updateProfileInfoThunk({ file: selectedFile })).unwrap();
      toast.success("Profile photo updated successfully");
      setSelectedFile(null);
      if (fileRef.current) fileRef.current.value = "";
      dispatch(fetchProfileCompletionThunk());
    } catch (err: any) {
      toast.error(err || "Photo upload failed");
    }
  };

  const onDeletePhoto = async () => {
    try {
      await dispatch(deleteProfilePhotoThunk()).unwrap();
      toast.success("Profile photo deleted successfully");
      setAvatarUrl(null);
      setSelectedFile(null);
      if (fileRef.current) fileRef.current.value = "";
      dispatch(fetchProfileCompletionThunk());
    } catch (err: any) {
      toast.error(err || "Failed to delete profile photo");
    }
  };

  const hasPhoto = !!(avatarUrl || selectedFile);

  const inputBase =
    "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 outline-none";

  const field = (
    label: string,
    key: keyof ProfileForm,
    type: React.HTMLInputTypeAttribute = "text",
    placeholder?: string,
    readOnly?: boolean
  ) => (
    <div className="space-y-1" key={String(key)}>
      <label className="text-xs text-neutral-500">{label}</label>
      <input
        type={type}
        value={form[key]}
        placeholder={placeholder}
        readOnly={readOnly ?? !isEditing}
        onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
        className={inputBase}
      />
    </div>
  );

  const onToggleEdit = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      await dispatch(
        updateProfileInfoThunk({
          first_name: form.firstName,
          last_name: form.lastName,
          dob: form.dob || undefined,
          career_stage: form.careerStage || undefined,
          preferred_language: form.preferredLanguage || undefined,
          timezone: form.timezone || undefined,
        })
      ).unwrap();

      toast.success("Profile updated successfully");
      setIsEditing(false);
      dispatch(fetchProfileCompletionThunk());
    } catch (err: any) {
      toast.error(err || "Profile update failed");
    }
  };

  const onClickEmailEdit = () => {
    setIsEmailEditing(true);
    setOtp("");
    dispatch(resetOtpState());
  };

  const onSendOtp = async () => {
    if (!form.email?.trim()) return toast.error("Email required");
    if (form.email.trim() === originalEmail.trim())
      return toast.error("New email enter karo (current email same hai)");

    try {
      await dispatch(sendEmailOtpThunk({ email: form.email.trim() })).unwrap();
      toast.success("OTP sent successfully");
    } catch (err: any) {
      toast.error(err || "OTP send failed");
    }
  };

  const onUpdateEmail = async () => {
    if (!form.email?.trim()) return toast.error("Email required");
    if (!otp.trim()) return toast.error("OTP required");

    try {
      await dispatch(
        updateEmailWithOtpThunk({ email: form.email.trim(), otp: otp.trim() })
      ).unwrap();

      toast.success("Email updated successfully");
      setIsEmailEditing(false);
      setOtp("");
      dispatch(fetchProfileCompletionThunk());
    } catch (err: any) {
      toast.error(err || "Email update failed");
    }
  };

  const showOtpBox = isEmailEditing && (otpSent || otpStatus === "succeeded");

  const isLoading = fetchStatus === "loading";

  // Parse completion percentage
  const completionPercentage = completion
    ? parseInt(completion.profile_completion, 10) || 0
    : 0;

  return (
    <div className="space-y-4">
      {/* ── Title + Progress Bar ── */}
      <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-base font-semibold text-neutral-900">My Profile</h2>
        <ProfileCompletionBar
          percentage={completionPercentage}
          isLoading={completionStatus === "loading"}
        />
      </div>

      {/* ── Skeleton or Actual Content ── */}
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <>
          {/* Profile Picture */}
          <div className="rounded-2xl border border-neutral-200 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="group relative h-14 w-14 shrink-0 cursor-pointer"
                  onClick={onPickFile}
                >
                  <div className="h-full w-full overflow-hidden rounded-full bg-neutral-200">
                    {avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={avatarUrl}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-500">
                        <FiUser className="text-lg text-white" />
                      </div>
                    )}
                  </div>

                  <span
                    className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5
                               items-center justify-center rounded-full
                               bg-primary-500 text-white shadow-md
                               transition-colors duration-200
                               hover:bg-primary-600"
                  >
                    <FiPlus className="h-3 w-3 stroke-3" />
                  </span>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={onFileChange}
                    className="hidden"
                  />
                </div>

                <div>
                  <div className="text-sm font-medium text-neutral-900">
                    Profile picture
                  </div>
                  <div className="text-xs text-neutral-500">
                    PNG, JPEG under 15MB
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {hasPhoto && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeletePhoto();
                    }}
                    disabled={deletePhotoStatus === "loading"}
                    className="flex h-9 w-9 items-center justify-center rounded-lg cursor-pointer
                               border border-red-200 bg-red-50 text-red-500
                               transition-colors hover:bg-red-100 hover:text-red-600
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete profile photo"
                  >
                    {deletePhotoStatus === "loading" ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                    ) : (
                      <FiTrash2 className="h-4 w-4" />
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={onSavePhoto}
                  disabled={!selectedFile || updateProfileStatus === "loading"}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors
                    ${
                      selectedFile
                        ? "bg-primary-500 text-white hover:bg-primary-600"
                        : "bg-primary-400 text-white cursor-not-allowed"
                    }
                    disabled:opacity-70`}
                >
                  {updateProfileStatus === "loading" ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="rounded-2xl border border-neutral-200 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold text-neutral-900">
                Personal Information
              </div>

              <button
                type="button"
                onClick={onToggleEdit}
                disabled={updateProfileStatus === "loading"}
                className="rounded-lg bg-primary-50 px-3 py-2 text-sm text-primary-600 hover:bg-primary-100 disabled:opacity-60"
              >
                {updateProfileStatus === "loading"
                  ? "Saving..."
                  : isEditing
                  ? "Save changes"
                  : "Edit"}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {field("First Name", "firstName")}
              {field("Last Name", "lastName")}

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs text-neutral-500">
                  Email Address
                </label>

                <div className="relative">
                  <input
                    type="email"
                    value={form.email}
                    readOnly={!isEmailEditing}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className={`${inputBase} pr-10`}
                  />

                  {!isEmailEditing ? (
                    <button
                      type="button"
                      onClick={onClickEmailEdit}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-neutral-600 hover:bg-neutral-100"
                      aria-label="Edit email"
                      title="Edit email"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>

                {isEmailEditing ? (
                  <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={onSendOtp}
                      disabled={otpStatus === "loading"}
                      className="w-full rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-60 sm:w-auto"
                    >
                      {otpStatus === "loading" ? "Sending..." : "Send OTP"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsEmailEditing(false);
                        setOtp("");
                        dispatch(resetOtpState());
                        setForm((p) => ({ ...p, email: originalEmail }));
                      }}
                      className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                ) : null}

                {showOtpBox ? (
                  <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
                    <div className="space-y-1">
                      <label className="text-xs text-neutral-500">
                        Enter OTP
                      </label>
                      <input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456"
                        className={inputBase}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={onUpdateEmail}
                      disabled={updateEmailStatus === "loading"}
                      className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-60"
                    >
                      {updateEmailStatus === "loading"
                        ? "Updating..."
                        : "Update Email"}
                    </button>
                  </div>
                ) : null}
              </div>

              {field("Phone", "phone", "tel", "", true)}
              {field("Date of Birth", "dob", "date")}
              {field("Career Stage", "careerStage")}
              {field("Location", "timezone")}
              {field("Preferred Language", "preferredLanguage")}
            </div>
          </div>
        </>
      )}
    </div>
  );
}