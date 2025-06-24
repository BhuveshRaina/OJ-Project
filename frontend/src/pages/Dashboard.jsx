import React, { useState } from 'react';
import UserProfile from '@/components/dashboard/UserProfile';
import UpcomingContests from '@/components/dashboard/UpcomingContests';
import SolvedStats from '@/components/dashboard/SolvedStats';
import RatingChart from '@/components/dashboard/RatingChart';
import ActivityHeatmap from '@/components/dashboard/ActivityHeatmap';
import RecentSubmissions from '@/components/dashboard/RecentSubmissions';
import SubmissionModal from '@/components/dashboard/SubmissionModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const Dashboard = () => {
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <UserProfile />
            <UpcomingContests />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SolvedStats />
              <RatingChart />
            </div>

            {/* Activity Heatmap */}
            <ActivityHeatmap />

            {/* Recent Submissions */}
            <RecentSubmissions onSubmissionClick={setSelectedSubmission} />
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      <SubmissionModal 
        submission={selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
      />
    </div>
    <Footer/>
    </>
    
  );
};

export default Dashboard;
