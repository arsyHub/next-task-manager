import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AvatarGroupProps {
  avatars: { src?: string; alt?: string }[];
}

export function AvatarGroup({ avatars }: AvatarGroupProps) {
  const maxAvatars = 3;
  const displayedAvatars = avatars.slice(0, maxAvatars); // Avatar yang akan dirender
  const extraCount = avatars.length - maxAvatars; // Sisa avatar yang tidak dirender

  return (
    <div className="flex -space-x-2">
      {displayedAvatars.map((avatar, index) => (
        <Avatar key={index} className="w-8 h-8 border-2 border-white">
          {avatar.src ? (
            <AvatarImage
              src={avatar.src}
              alt={avatar.alt || `Avatar ${index}`}
            />
          ) : (
            <AvatarFallback>{avatar.alt?.charAt(0) || "?"}</AvatarFallback>
          )}
        </Avatar>
      ))}
      {extraCount > 0 && (
        <Avatar className="w-8 h-8 border-2 border-white bg-gray-200">
          <AvatarFallback className="text-sm">+{extraCount}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
