import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import type { Player } from '../types/billing'
import { formatCid } from '../utils/nui'

interface PlayerSelectProps {
  players: Player[]
  value: string
  onChange: (id: string) => void
  placeholder?: string
}

const PlayerSelect = ({ players, value, onChange, placeholder = "Choose a player..." }: PlayerSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const selectedPlayer = players.find(p => p.id === value)
  const filteredPlayers = players.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.cid.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-700/70 border border-gray-600 rounded-xl px-3 h-11 flex items-center justify-between text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        <div className="flex items-center gap-3 min-w-0">
          {selectedPlayer ? (
            <>
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-medium">{selectedPlayer.name.charAt(0)}</span>
              </div>
              <span className="truncate">{selectedPlayer.name} ({formatCid(selectedPlayer.cid)})</span>
            </>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <FontAwesomeIcon 
          icon="chevron-down" 
          className={`text-gray-400 text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-xl shadow-lg z-10 max-h-60 overflow-hidden">
          <div className="p-2 border-b border-gray-600">
            <div className="relative">
              <FontAwesomeIcon icon="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search players..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-8 pr-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                autoFocus
              />
            </div>
          </div>
          <div className="overflow-y-auto max-h-48">
            {filteredPlayers.length === 0 ? (
              <div className="p-3 text-gray-400 text-sm text-center">No players found</div>
            ) : (
              filteredPlayers.map((player) => (
                <button
                  key={player.id}
                  onClick={() => {
                    onChange(player.id)
                    setIsOpen(false)
                    setSearchQuery('')
                  }}
                  className="w-full p-3 flex items-center gap-3 hover:bg-gray-700 transition-colors text-left"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-medium">{player.name.charAt(0)}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-white font-medium truncate">{player.name}</div>
                    <div className="text-gray-400 text-xs">{formatCid(player.cid)}</div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PlayerSelect
