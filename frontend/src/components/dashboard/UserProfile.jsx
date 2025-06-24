import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Trophy } from 'lucide-react';

const UserProfile = () => {
  const userData = {
    name: 'Alex Johnson',
    username: 'alexj_coder',
    avatar: '/placeholder.svg',
    location: 'San Francisco, CA',
    joinDate: 'January 2023',
    rank: 'Expert',
    globalRank: '#1,247',
    contestRating: 1856,
  };

  return (
    <Card className="bg-dark-card border-gray-700">
      <CardHeader className="text-center">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage src={userData.avatar} alt={userData.name} />
          <AvatarFallback className="bg-code-blue text-white text-lg">
            {userData.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl font-bold text-white">
          {userData.name}
        </CardTitle>
        <p className="text-code-blue font-medium">@{userData.username}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge className="bg-code-purple/20 text-code-purple border-code-purple">
            {userData.rank}
          </Badge>
          <span className="text-sm font-medium text-gray-300">
            {userData.globalRank}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-300">
            <MapPin className="w-4 h-4 mr-2" />
            {userData.location}
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <Calendar className="w-4 h-4 mr-2" />
            Joined {userData.joinDate}
          </div>
          <div className="flex items-center text-sm text-gray-300">
            <Trophy className="w-4 h-4 mr-2" />
            Contest Rating: {userData.contestRating}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
