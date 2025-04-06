import React from 'react';
import { BarChart, CheckCircle, Star } from 'lucide-react';

const Progress = () => {
  const progress = {
    alphabet: 75,
    vocabulary: 45,
    grammar: 30,
    pronunciation: 60,
  };

  const achievements = [
    {
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      title: 'Alphabet Master',
      description: 'Completed all alphabet lessons',
      achieved: true,
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: 'Vocabulary Explorer',
      description: 'Learned 100 words',
      achieved: false,
    },
    // Add more achievements
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Progress</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Progress</h2>
          
          {Object.entries(progress).map(([category, value]) => (
            <div key={category} className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700 capitalize">{category}</span>
                <span className="text-gray-900 font-medium">{value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
          
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  achievement.achieved
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  {achievement.icon}
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center text-gray-700">
            <BarChart className="h-5 w-5 mr-2" />
            <span>Completed Lesson 5: Basic Consonants</span>
            <span className="ml-auto text-gray-500">2 hours ago</span>
          </div>
          {/* Add more activity items */}
        </div>
      </div>
    </div>
  );
};

export default Progress;