"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

interface GitHubUser {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
}

export default function GitHubProfileSearchFigma() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const searchQuery = username.trim();
      let response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(searchQuery)}`
      );

      if (!response.ok && response.status === 404) {
        const searchResponse = await fetch(
          `https://api.github.com/search/users?q=${encodeURIComponent(
            searchQuery
          )}&per_page=1`
        );

        if (!searchResponse.ok) throw new Error("User not found");

        const searchData = await searchResponse.json();
        if (searchData.items && searchData.items.length > 0) {
          response = await fetch(
            `https://api.github.com/users/${searchData.items[0].login}`
          );
        } else {
          throw new Error("User not found");
        }
      }

      if (!response.ok) throw new Error("User not found");

      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError("Nenhum perfil foi encontrado com esse nome de usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #2C2C2C 0%, #1a1a1a 100%)",
      }}
    >
      {/* elipse */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: 32,
          left: 68,
          width: 239,
          height: 200,
          backgroundImage:
            "radial-gradient(circle, rgba(112, 112, 112, 0.15) 3px, transparent 2px)",
          backgroundSize: "13.5px 13.5px",
        }}
      />

      <img
        src="/Ellipse1.png"
        alt="Ellipse 1 Glow"
        className="absolute pointer-events-none z-0 right-0 top-0"
        style={{
          top: 0,
          width: "40vw",
          height: "90vh",
          objectFit: "contain",
        }}
      />

      <img
        src="/Ellipse2.png"
        alt="Ellipse 2 Glow"
        className="absolute pointer-events-none z-0"
        style={{
          left: "-120px",
          top: "40%",
          bottom: "0px",
          width: "35vw",
          height: "65vh",
          objectFit: "contain",
        }}
      />

      <div className="relative z-10 w-full flex justify-center">
        <div className="bg-black shadow-2xl rounded-sm flex flex-col items-center transition-all duration-300 ease-in-out w-full max-w-[1560px] md:min-h-[610px] px-6 md:px-14 py-8 md:py-12">
          {/* header */}
          <div className="flex items-center justify-center gap-4 mb-8 md:mb-10">
            <svg
              className="w-12 h-12 md:w-[60px] md:h-[60px] text-white flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>

            <h1 className="flex items-center gap-3 text-white text-2x1 md:text-[60px] font-semibold tracking-tight">
              Perfil{" "}
              <img
                src="logo.png"
                alt="GitHub Logo"
                className="h-[48px] w-auto md:h-[44px] object-contain"
              />
            </h1>
          </div>

          {/* search */}
          <form onSubmit={handleSearch} className="w-full max-w-[580px]">
            <div className="flex">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite um usuário do Github"
                className="flex-1 bg-white text-black rounded-l-[8px] focus:outline-none placeholder:text-gray-900 placeholder:font-semibold"
                style={{ padding: "16px 24px", fontSize: 17, fontWeight: 400 }}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#0066FF] text-white rounded-r-[8px] hover:bg-[#0052CC] transition-colors disabled:opacity-50 flex items-center justify-center"
                style={{ padding: "16px 28px" }}
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="w-6 h-6" strokeWidth={2.5} />
                )}
              </button>
            </div>
          </form>

          {/* space for results */}
          {(user || error) && <div style={{ height: 24 }} />}

          {user && (
            <div
              className="bg-[#D9D9D9] rounded-[20px] w-[900px] mx-auto mt-6 overflow-visible"
              style={{ padding: "82px 50px", height: "275px" }}
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0 -mt-16">
                  <div
                    className="rounded-full"
                    style={{
                      width: 240,
                      height: 240,
                      background: "linear-gradient(135deg, #0066FF 0%, #00A3FF 100%)",
                      padding: 2,
                    }}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                      <img
                        src={user.avatar_url || "/placeholder.svg"}
                        alt={user.name || user.login}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 pt-2">
                  <h2 className="text-[#0066FF] mb-3 text-xl md:text-[28px] font-bold">
                    {user.name || user.login}
                  </h2>
                  <p
                    className="text-black text-sm md:text-base"
                    style={{ color: "#3d3d3d", lineHeight: 1.2 }}
                  >
                    {user.bio || "Este usuário não possui uma bio."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div
              className="bg-[#D9D9D9] rounded-[10px] text-center w-[800px] mx-auto mt-6"
              style={{ padding: "16px 10px" }}
            >
              <p className="text-[#FF0000] text-base">
                Nenhum perfil foi encontrado com esse nome de usuário.
              </p>
              <p className="text-[#FF0000] text-base mt-1">Tente novamente</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
