// src/pages/Dashboard.jsx
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UserProfile from '@/components/dashboard/UserProfile'
import UpcomingContests from '@/components/dashboard/UpcomingContests'
import SolvedStats from '@/components/dashboard/SolvedStats'
import RatingChart from '@/components/dashboard/RatingChart'
import RecentSubmissions from '@/components/dashboard/RecentSubmissions'
import SubmissionModal from '@/components/dashboard/SubmissionModal'
import ProgressShowcase from '@/components/ProgressShowCase'
import ActivityHeatmap from '@/components/ActivityHeatMap'

const Dashboard = () => {
  const [selectedSubmission, setSelectedSubmission] = useState(null)

  const { user , isAuthenticated } = useSelector((state) => state.auth)
  console.log(isAuthenticated);
  const rawActivity = user?.activity || {}  

  const heatmapData = Object.entries(rawActivity).map(([date, count]) => ({
    date,
    count
  }))

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 py-8 w-full">
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <UserProfile />
            <UpcomingContests />
          </div>
          <div className="lg:col-span-9 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <ProgressShowcase />
              <RatingChart />
            </div>

            <ActivityHeatmap data={heatmapData} />

            <RecentSubmissions onSubmissionClick={setSelectedSubmission} />
          </div>
        </div>
      </div>

      <SubmissionModal 
        submission={selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
      />
    </div>
  )
}

export default Dashboard
