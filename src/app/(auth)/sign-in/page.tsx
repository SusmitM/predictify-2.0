'use client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Meteors } from '../../../components/ui/meteor-preview';

const Page = () => {
  return (
    <div className="relative w-full min-h-screen bg-gray-950 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0">
        <Meteors number={20} />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="absolute top-0 -left-4">
          <Link
            href="/"
            className="p-2 rounded-full bg-gray-900 text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
        
        <div className="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-8 mt-16">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Welcome Back
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-400">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-purple-400 hover:text-purple-300">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-colors"
            >
              Sign In
            </button>

            <p className="text-center text-gray-400 text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/sign-up" className="text-purple-400 hover:text-purple-300">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default Page
