"use client"; // çünkü localStorage kullanıyoruz

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Token temizle
    localStorage.removeItem("access_token");
    // Login sayfasına yönlendir
    router.replace("/login");
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Çıkış yapılıyor...</p>
    </div>
  );
}
