"use client"; // çünkü localStorage kullanıyoruz

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/useAuthStore";

export default function LogoutPage() {
  const logout = useAuthStore((state) => state.logout)

  const router = useRouter();

  useEffect(() => {
    // Token temizle
    logout()
    // Login sayfasına yönlendir
    router.push("/login");
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Çıkış yapılıyor...</p>
    </div>
  );
}
