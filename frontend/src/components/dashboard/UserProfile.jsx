import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Trophy } from 'lucide-react';
import { useDispatch,useSelector } from 'react-redux';
function monthName(monthNumber) {
  const monthNames = [
    'January', 'February', 'March',     'April',
    'May',     'June',     'July',      'August',
    'September','October', 'November',  'December'
  ];

  if (monthNumber < 1 || monthNumber > 12) return null;
  return monthNames[monthNumber - 1];
}
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
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const [year,month] = user?.createdAt.toString().split('T')[0].split('-');
  const joinDate = `${monthName(parseInt(month))} ${year}`;
  return (
    <Card className="bg-dark-card border-gray-700">
      <CardHeader className="text-center">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage src={userData.avatar} alt={userData.name} />
          <AvatarFallback className="bg-indigo-500 text-white text-xl font-bold">
            {user.name
              .split(' ')
              .map((n) => n[0].toUpperCase())
              .join('')}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl font-bold text-white">
          {user.name}
        </CardTitle>
        <p className="text-indigo-500 font-medium">{user.email}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge className="bg-code-purple/20 text-code-purple border-code-purple">
            {user.codingTitle}
          </Badge>
          <span className="text-sm font-medium text-gray-300">
            {user.globalRank === 0 ? '' : user.globalRank}
          </span>
        </div>

        <div className="space-y-3"> 
          <div className="flex items-center text-sm text-gray-300">
            <Calendar className="w-4 h-4 mr-2" />
            Joined {joinDate}
          </div>
         
          <div className="flex items-center text-sm text-gray-300">
            <Trophy className="w-4 h-4 mr-2" />
            No Contest Yet
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
