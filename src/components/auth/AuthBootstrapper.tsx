"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthStatus } from "@/features/auth/authSlice"; 

export default function AuthBootstrapper({ authed }: { authed: boolean }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthStatus(authed));
  }, [authed, dispatch]);

  return null;
}