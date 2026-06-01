import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const PER_PAGE = 10

const fmt = (d) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

// Smart page number list with ellipsis
function getPageNums(cur, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (cur <= 3) return [1, 2, 3, 4, 5, '…', total]
  if (cur >= total - 2) return [1, '…', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '…', cur - 1, cur, cur + 1, '…', total]
}

function Pagination({ total, page, perPage, onChange }) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null

  const nums = getPageNums(page, totalPages)
  const from = (page - 1) * perPage + 1
  const to = Math.min(page * perPage, total)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-[#1a1a1a]">
      <p className="text-[#6b7280] text-sm">
        Showing <span className="text-white font-medium">{from}–{to}</span> of{' '}
        <span className="text-white font-medium">{total}</span> leads
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6b7280] hover:text-white hover:bg-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {nums.map((n, i) =>
          n === '…' ? (
            <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-[#6b7280] text-sm select-none">
              …
            </span>
          ) : (
            <button
              key={n}
              onClick={() => onChange(n)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                n === page
                  ? 'bg-orange-500 text-white shadow-glow'
                  : 'text-[#6b7280] hover:text-white hover:bg-[#1a1a1a]'
              }`}
            >
              {n}
            </button>
          )
        )}

        <button
          onClick={() => onChange(page + 1)}
          disabled={page === Math.ceil(total / perPage)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6b7280] hover:text-white hover:bg-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function DetailModal({ contact, onClose, onMarkRead, onDelete }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

        <motion.div
          className="relative z-10 w-full max-w-lg bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-8 shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.22 }}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Lead Details</h2>
              <p className="text-[#6b7280] text-sm mt-0.5">{fmt(contact.createdAt)}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${contact.read ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}`}>
                {contact.read ? 'Seen' : 'New'}
              </span>
              <button onClick={onClose} className="text-[#555] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-[#151515] rounded-xl p-4">
              <p className="text-[#6b7280] text-xs uppercase tracking-wider mb-1">Name</p>
              <p className="text-white font-medium">{contact.firstName} {contact.lastName}</p>
            </div>
            <div className="bg-[#151515] rounded-xl p-4">
              <p className="text-[#6b7280] text-xs uppercase tracking-wider mb-1">Project Type</p>
              <p className="text-white font-medium">{contact.projectType}</p>
            </div>
          </div>
          <div className="bg-[#151515] rounded-xl p-4 mb-3">
            <p className="text-[#6b7280] text-xs uppercase tracking-wider mb-1">Email</p>
            <a href={`mailto:${contact.email}`} className="text-orange-400 font-medium hover:underline break-all">
              {contact.email}
            </a>
          </div>
          <div className="bg-[#151515] rounded-xl p-4 mb-6">
            <p className="text-[#6b7280] text-xs uppercase tracking-wider mb-2">Message</p>
            <p className="text-[#d1d5db] text-sm leading-relaxed whitespace-pre-wrap">{contact.details}</p>
          </div>

          <div className="flex items-center gap-3">
            {!contact.read && (
              <button
                onClick={() => onMarkRead(contact._id)}
                className="flex-1 py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm font-semibold hover:bg-emerald-500/20 transition-colors"
              >
                Mark as Read
              </button>
            )}
            <button
              onClick={() => { onDelete(contact._id); onClose() }}
              className="flex-1 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-semibold hover:bg-red-500/20 transition-colors"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function LeadsPage() {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState(1)
  const token = localStorage.getItem('admin_token')

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API}/api/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.status === 401) { navigate('/admin/login'); return }
      const data = await res.json()
      setContacts(data)
    } finally {
      setLoading(false)
    }
  }

  const markRead = async (id) => {
    await fetch(`${API}/api/contacts/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    })
    setContacts((prev) => prev.map((c) => c._id === id ? { ...c, read: true } : c))
    setSelected((prev) => prev?._id === id ? { ...prev, read: true } : prev)
  }

  const deleteContact = async (id) => {
    await fetch(`${API}/api/contacts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    setContacts((prev) => prev.filter((c) => c._id !== id))
    // Adjust page if deleting the last item on the current page
    const remaining = contacts.length - 1
    const maxPage = Math.max(1, Math.ceil(remaining / PER_PAGE))
    if (page > maxPage) setPage(maxPage)
  }

  const openDetail = (contact) => {
    setSelected(contact)
    if (!contact.read) markRead(contact._id)
  }

  useEffect(() => { fetchContacts() }, [])
  // Reset to page 1 when data reloads
  useEffect(() => { setPage(1) }, [contacts.length === 0])

  const totalPages = Math.ceil(contacts.length / PER_PAGE)
  const paginated = contacts.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const unread = contacts.filter((c) => !c.read).length

  return (
    <div className="p-8">
      {/* Page header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Contact Submissions</h1>
          <p className="text-[#6b7280]">
            {loading ? 'Loading…' : `${contacts.length} total lead${contacts.length !== 1 ? 's' : ''}${unread > 0 ? ` · ${unread} unread` : ''}`}
          </p>
        </div>
        <button
          onClick={fetchContacts}
          title="Refresh"
          className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#222] rounded-xl text-[#6b7280] hover:text-white hover:border-[#333] text-sm font-medium transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Table card */}
      <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl overflow-hidden">

        {loading ? (
          <div className="flex items-center justify-center py-20 text-[#6b7280]">
            <svg className="w-5 h-5 animate-spin mr-3" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading submissions…
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-20 text-[#6b7280]">
            <svg className="w-12 h-12 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="font-medium">No submissions yet</p>
            <p className="text-sm mt-1">Leads from the contact form will appear here</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1a1a1a]">
                    {['Name', 'Email', 'Project Type', 'Date', 'Status', ''].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((c, i) => (
                    <motion.tr
                      key={c._id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => openDetail(c)}
                      className="border-b border-[#141414] last:border-0 hover:bg-[#141414] cursor-pointer transition-colors group"
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
                        <span className="px-2.5 py-1 bg-[#161616] border border-[#222] rounded-lg text-xs text-[#9ca3af] font-medium whitespace-nowrap">
                          {c.projectType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#6b7280] text-sm whitespace-nowrap">{fmt(c.createdAt)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${c.read ? 'bg-[#161616] text-[#6b7280]' : 'bg-orange-500/20 text-orange-400'}`}>
                          {c.read ? 'Seen' : 'New'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteContact(c._id) }}
                          className="opacity-0 group-hover:opacity-100 text-[#555] hover:text-red-400 transition-all"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              total={contacts.length}
              page={page}
              perPage={PER_PAGE}
              onChange={setPage}
            />
          </>
        )}
      </div>

      {selected && (
        <DetailModal
          contact={selected}
          onClose={() => setSelected(null)}
          onMarkRead={markRead}
          onDelete={(id) => { deleteContact(id); setSelected(null) }}
        />
      )}
    </div>
  )
}
