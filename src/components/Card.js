'use client';

import { user } from "@/data/profile";
import Image from "next/image";
import { FiMail, FiGithub } from "react-icons/fi";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Card() {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    fetch("api/github")
      .then((res) => res.json())
      .then((data) => {
        console.log("API data:", data);
        setAvatar(data.avatar)
      })


    console.log(avatar);
  }, []);

  return (
    <div className="w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md p-6 sm:p-8 transition-colors duration-300">
      {/* Top: Avatar and Name */}
      <div className="flex items-center space-x-4">
        {avatar ? (
          <Image
            src={avatar}
            alt={user.name}
            width={64}
            height={64}
            className="rounded-full border-2 border-purple-500"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse" />
        )}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
            {user.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            {user.handle}
          </p>
        </div>
      </div>

      {/* Social / Contact */}
      <div className="flex items-center mt-4 space-x-4 text-gray-600 dark:text-gray-400">
        {user.email && (
          <a href={`mailto:${user.email}`} className="hover:text-blue-500 transition-colors">
            <FiMail size={18} />
          </a>
        )}
        {user.github && (
          <a href={user.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors">
            <FiGithub size={18} />
          </a>
        )}
        {user.linkedin && (
          <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
            <FaLinkedin size={18} />
          </a>
        )}
        {user.twitter && (
          <a href={user.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
            <FaTwitter size={18} />
          </a>
        )}
      </div>

      {/* Stats / Metrics */}
      <div className="flex justify-between mt-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Repos</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.stats.repos}</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Followers</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.stats.followers}</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Stars</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.stats.stars}</p>
        </div>
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