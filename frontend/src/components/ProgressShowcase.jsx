import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Card } from '@/components/ui/card'
import CircularProgress from './CircularProgress'
import { getProfile } from '@/store/authSlice'

const ProgressShowcase = () => {
  const dispatch = useDispatch()
  const { user, status } = useSelector((state) => state.auth)

  const [platformStats, setPlatformStats] = useState({
    total: 0,
    easy:  0,
    medium:0,
    hard:  0
  })

  // load current user if not already loaded
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getProfile())
    }
  }, [dispatch, status])

  // fetch platform-wide question counts
  useEffect(() => {
    const fetchPlatformStats = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/problems/stats', { withCredentials: true })
        if (data.success) {
          setPlatformStats(data.stats)
        }
      } catch (err) {
        console.error('Failed to fetch platform stats:', err)
      }
    }
    fetchPlatformStats()
  }, [])

  if (status === 'loading' || !user) {
    return null
  }

  const { solvedTotal, solvedEasy, solvedMedium, solvedHard } = user
  const { total, easy, medium, hard } = platformStats

  return (
    <div className="flex justify-center w-full">
      <Card className="bg-dark-card border-gray-700 w-full pb-3 pt-2">
        <div className="flex justify-center mb-6">
          <CircularProgress
            solved={solvedTotal}
            total={total}
            attempting={0}
            size={200}
            strokeWidth={10}
          />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center w-[90%] mx-auto">
          {/* Easy */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
            <div className="text-green-500 font-semibold mb-2">Easy</div>
            <div className="text-white text-lg mb-2">{solvedEasy}</div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: total ? `${(solvedEasy / total) * 100}%` : '0%' }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {total ? ((solvedEasy / total) * 100).toFixed(1) : '0.0'}%
            </div>
          </div>

          {/* Medium */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
            <div className="text-yellow-500 font-semibold mb-2">Medium</div>
            <div className="text-white text-lg mb-2">{solvedMedium}</div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                style={{ width: total ? `${(solvedMedium / total) * 100}%` : '0%' }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {total ? ((solvedMedium / total) * 100).toFixed(1) : '0.0'}%
            </div>
          </div>

          {/* Hard */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
            <div className="text-red-600 font-semibold mb-2">Hard</div>
            <div className="text-white text-lg mb-2">{solvedHard}</div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all duration-500"
                style={{ width: total ? `${(solvedHard / total) * 100}%` : '0%' }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {total ? ((solvedHard / total) * 100).toFixed(1) : '0.0'}%
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProgressShowcase
