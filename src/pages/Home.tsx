import React from 'react';
import ImageSlider from '../components/ImageSlider';
import { BookOpen, Users, Trophy, Clock } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Interactive Lessons',
    description:
      'Learn Korean alphabet and vocabulary through engaging interactive lessons',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Community Support',
    description: 'Join our community of learners and practice with peers',
  },
  {
    icon: <Trophy className="h-6 w-6" />,
    title: 'Achievement System',
    description: 'Track your progress and earn rewards as you learn',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Flexible Learning',
    description: 'Learn at your own pace with our structured curriculum',
  },
];

const Home = () => {
  // **IMPORTANT:** Replace this URL with the actual URL of your online PDF file
  const pdfUrl = 'https://learning-korean.com/DL/Hangul-Table.pdf';

  return (
    <div>
      <ImageSlider />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Learn with Us?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Start your Korean language journey with our comprehensive learning
            platform
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-indigo-600">{feature.icon}</div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Ready to Start?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Begin your journey to Korean language mastery today
          </p>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 inline-block"
          >
            Start Learning Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
