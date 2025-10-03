'use client';

import { user } from "@/data/profile";
import Image from "next/image";
import { FiMail, FiGithub } from "react-icons/fi";
import { FaGlobe, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Card() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("api/github")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data)
      })
  }, []);

  return (
    <div className="w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md p-6 sm:p-8 transition-colors duration-300">
      {/* Top: Avatar and Name */}
      <div className="flex items-center space-x-4">
        {profile?.avatar ? (
          <Image
            src={profile.avatar}
            alt={profile.name | ""}
            width={64}
            height={64}
            className="rounded-full border-2 border-purple-500"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse" />
        )}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
            {profile?.name || ""}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            @{profile?.handle || ""}
          </p>
        </div>
      </div>

      {/* Social / Contact */}
      <div className="flex items-center mt-4 space-x-4 text-gray-600 dark:text-gray-400">
        {profile?.blog && (
          <a
            href={profile.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            <FaGlobe size={18} />
          </a>
        )}
        {user.email && (
          <a href={`mailto:${user.email}`} className="hover:text-blue-500 transition-colors">
            <FiMail size={18} />
          </a>
        )}
        {profile?.github && (
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <FiGithub size={18} />
          </a>
        )}
        {user.linkedin && (
          <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
            <FaLinkedin size={18} />
          </a>
        )}
        {profile?.twitter && (
          <a
            href={`https://x.com/${profile.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaTwitter size={18} />
          </a>
        )}
      </div>

      {/* Organizations */}
      {user.orgs.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
            Organizations
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.orgs.map((org, idx) => (
              <span
                key={idx}
                className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium"
              >
                {org}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}