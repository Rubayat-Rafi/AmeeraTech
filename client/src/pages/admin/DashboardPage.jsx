import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const fmt = (d) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const isThisWeek = (d) => (Date.now() - new Date(d)) / 86400000 <= 7

function StatCard({ icon, label, value, highlight, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-[#0f0f0f] border rounded-2xl p-6 flex items-start gap-4 ${highlight ? 'border-orange-500/30' : 'border-[#1a1a1a]'}`}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${highlight ? 'bg-orange-500/20 text-orange-400' : 'bg-[#161616] text-[#555]'}`}>
        {icon}
      </div>
      <div>
        <p className="text-[#6b7280] text-xs uppercase tracking-wider font-semibold mb-1">{label}</p>
        <p className={`text-4xl font-bold ${highlight ? 'text-orange-400' : 'text-white'}`}>{value}</p>
        {sub && <p className="text-[#6b7280] text-xs mt-1">{sub}</p>}
      </div>
    </motion.div>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('admin_token')

  useEffect(() => {
    fetch(`${API}/api/contacts`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.status === 401) { navigate('/admin/login'); return }
        return res.json()
      })
      .then((data) => { if (data) setContacts(data) })
      .finally(() => setLoading(false))
  }, [])

  const unread = contacts.filter((c) => !c.read).length
  const thisWeek = contacts.filter((c) => isThisWeek(c.createdAt)).length
  const recent = contacts.slice(0, 5)

  return (
    <div className="p-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-[#6b7280]">Overview of your incoming leads</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard
          label="Total Leads"
          value={loading ? '—' : contacts.length}
          sub="All time submissions"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
        <StatCard
          label="New / Unread"
          value={loading ? '—' : unread}
          highlight={!loading && unread > 0}
          sub={unread > 0 ? 'Needs attention' : 'All caught up'}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          }
        />
        <StatCard
          label="This Week"
          value={loading ? '—' : thisWeek}
          sub="Last 7 days"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
      </div>

      {/* Recent leads */}
      <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1a1a1a] flex items-center justify-between">
          <h2 className="font-semibold text-white">Recent Leads</h2>
          <Link
            to="/admin/leads"
            className="flex items-center gap-1.5 text-orange-400 text-sm font-medium hover:text-orange-300 transition-colors"
          >
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-[#6b7280]">
            <svg className="w-5 h-5 animate-spin mr-3" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading…
          </div>
        ) : recent.length === 0 ? (
          <div className="text-center py-16 text-[#6b7280]">
            <svg className="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-sm font-medium">No leads yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  {['Name', 'Email', 'Project Type', 'Date', 'Status'].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((c, i) => (
                  <motion.tr
                    key={c._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-[#141414] last:border-0"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        {!c.read && <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />}
                        <span className={`font-medium text-sm ${c.read ? 'text-[#9ca3af]' : 'text-white'}`}>
                          {c.firstName} {c.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#9ca3af] text-sm">{c.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-[#161616] border border-[#222] rounded-lg text-xs text-[#9ca3af] font-medium">
                        {c.projectType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#6b7280] text-sm">{fmt(c.createdAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${c.read ? 'bg-[#161616] text-[#6b7280]' : 'bg-orange-500/20 text-orange-400'}`}>
                        {c.read ? 'Seen' : 'New'}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {contacts.length > 5 && (
              <div className="px-6 py-4 border-t border-[#1a1a1a]">
                <Link
                  to="/admin/leads"
                  className="text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors"
                >
                  + {contacts.length - 5} more leads — view all →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
