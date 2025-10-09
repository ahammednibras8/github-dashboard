'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiGithub } from "react-icons/fi";
import { FaGlobe, FaXTwitter } from "react-icons/fa6";

export default function Card() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile data");
        return res.json();
      })
      .then(setProfile)
      .catch((error) => console.error("Profile fetch error:", error));
  }, []);

  if (!profile) {
    return (
      <div className="w-full max-w-sm sm:max-w-md p-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md animate-pulse">
        <div className="flex space-x-4 items-center">
          <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
            <div className="w-1/3 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
        <div className="mt-4 w-full h-3 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-6 sm:p-8 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Image
          src={profile.avatar || ""}
          alt={profile.name || "GitHub Profile"}
          width={72}
          height={72}
          className="rounded-full border border-gray-300 dark:border-gray-600 shadow-sm"
        />
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {profile.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            @{profile.handle}
          </p>
        </div>
      </div>

      {/* Bio */}
      {profile.bio && (
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {profile.bio}
        </p>
      )}

      {/* Social Links */}
      <div className="flex items-center mt-5 space-x-5 text-gray-500 dark:text-gray-400">
        {profile.github && (
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FiGithub size={20} />
          </a>
        )}
        {profile.x && (
          <a
            href={`https://x.com/${profile.x}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            aria-label="X (Twitter)"
          >
            <FaXTwitter size={20} />
          </a>
        )}
        {profile.blog && (
          <a
            href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            aria-label="Website"
          >
            <FaGlobe size={20} />
          </a>
        )}
      </div>

      {/* Organizations */}
      {profile.orgs?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
            Organizations
          </h3>
          <div className="flex flex-wrap gap-3">
            {profile.orgs.map((org, idx) => (
              <a
                key={idx}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Image
                  src={org.avatar || ""}
                  alt={org.login}
                  width={32}
                  height={32}
                  className="rounded-full border border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform w-8 h-8 object-cover"
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
