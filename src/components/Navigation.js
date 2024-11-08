import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  HomeIcon,
  Dumbbell,
  BarChart2,
  ClockIcon,
  BookOpenIcon,
  Settings 
} from 'lucide-react'

export default function Navigation() {
  const location = useLocation()
  
  const navigation = [
    { 
      name: 'Home', 
      href: '/', 
      icon: HomeIcon 
    },
    { 
      name: 'Workout', 
      href: '/select-location', 
      icon: Dumbbell 
    },
    { 
      name: 'Progress', 
      href: '/progress',
      icon: BarChart2
    },
    { 
      name: 'History', 
      href: '/history',
      icon: ClockIcon
    },
    { 
      name: 'Exercise Library', 
      href: '/exercise-library', 
      icon: BookOpenIcon 
    },
    { 
      name: 'Settings', 
      href: '/settings', 
      icon: Settings 
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center p-2 rounded-lg ${
                  isActive 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}