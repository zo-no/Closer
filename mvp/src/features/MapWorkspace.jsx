import { AnimatePresence, motion } from 'framer-motion'
import {
  CalendarClock,
  Flame,
  MapPinned,
  MessageCircleMore,
  Route,
} from 'lucide-react'
import { CircleMarker, MapContainer, TileLayer } from 'react-leaflet'
import Fact from '../components/Fact'
import FilterTabs from '../components/FilterTabs'
import MapFocus from '../components/MapFocus'

const MotionDiv = motion.div

function MapWorkspace({
  budgetOptions,
  filters,
  sceneOptions,
  scoredVenues,
  selectedVenue,
  onSelectVenue,
  onUpdateFilter,
}) {
  return (
    <>
      <section className="panel panel-stage">
        <div className="panel-head stage-head">
          <div>
            <div className="section-kicker">
              <MapPinned size={16} />
              2 挑地点和开场方式
            </div>
            <h2>先选一个不费劲、也不容易出错的见面方式。</h2>
          </div>

          <div className="filter-row">
            <FilterTabs
              label="场景"
              options={sceneOptions}
              value={filters.scene}
              onChange={(value) => onUpdateFilter('scene', value)}
            />
            <FilterTabs
              label="预算"
              options={budgetOptions}
              value={filters.budget}
              onChange={(value) => onUpdateFilter('budget', value)}
            />
          </div>
        </div>

        <div className="map-stage">
          <div className="map-shell">
            <MapContainer
              center={[31.2304, 121.4737]}
              zoom={12}
              className="map-canvas"
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapFocus venue={selectedVenue} />
              {scoredVenues.map((venue) => (
                <CircleMarker
                  key={venue.id}
                  center={[venue.lat, venue.lng]}
                  radius={venue.id === selectedVenue?.id ? 14 : 9}
                  pathOptions={{
                    color: venue.id === selectedVenue?.id ? '#111111' : '#ec6d37',
                    fillColor: venue.id === selectedVenue?.id ? '#f4d8ba' : '#ec6d37',
                    fillOpacity: venue.id === selectedVenue?.id ? 1 : 0.84,
                    weight: venue.id === selectedVenue?.id ? 3 : 1,
                  }}
                  eventHandlers={{
                    click: () => onSelectVenue(venue.id),
                  }}
                />
              ))}
            </MapContainer>
          </div>

          <div className="venue-rail">
            {scoredVenues.map((venue) => (
              <button
                key={venue.id}
                type="button"
                className={`venue-item ${venue.id === selectedVenue?.id ? 'selected' : ''}`}
                onClick={() => onSelectVenue(venue.id)}
              >
                <div>
                  <strong>{venue.name}</strong>
                  <p>
                    {venue.area} · {venue.vibe}
                  </p>
                </div>
                <span>{venue.score} 分</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="detail-grid">
        <section className="panel detail-panel">
          <div className="panel-head">
            <div className="section-kicker">
              <Route size={16} />
              为什么推荐这里
            </div>
          </div>
          <AnimatePresence mode="wait">
            {selectedVenue ? (
              <MotionDiv
                key={selectedVenue.id}
                className="venue-detail"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.28 }}
              >
                <div className="detail-topline">
                  <h3>{selectedVenue.name}</h3>
                  <span className="pill accent">{selectedVenue.scene}</span>
                </div>
                <p className="detail-text">{selectedVenue.angle}</p>
                <div className="detail-facts">
                  <Fact icon={<CalendarClock size={15} />} text={selectedVenue.duration} />
                  <Fact icon={<MapPinned size={15} />} text={selectedVenue.transit} />
                  <Fact icon={<Flame size={15} />} text={selectedVenue.crowd} />
                </div>
                <div className="tip-row">
                  {selectedVenue.tags.map((tag) => (
                    <span key={tag} className="pill">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="reason-list">
                  {selectedVenue.reasons.map((reason) => (
                    <p key={reason}>{reason}</p>
                  ))}
                </div>
              </MotionDiv>
            ) : (
              <p className="empty-state">当前筛选下没有可推荐地点。</p>
            )}
          </AnimatePresence>
        </section>

        <section className="panel detail-panel">
          <div className="panel-head">
            <div className="section-kicker">
              <MessageCircleMore size={16} />
              可以直接发的话
            </div>
          </div>
          <AnimatePresence mode="wait">
            {selectedVenue ? (
              <MotionDiv
                key={`${selectedVenue.id}-script`}
                className="script-block"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.28 }}
              >
                <p>{selectedVenue.script}</p>
                <div className="script-footer">
                  <span>{selectedVenue.budget}预算</span>
                  <span>{selectedVenue.area}</span>
                  <span>{selectedVenue.score} 分匹配</span>
                </div>
              </MotionDiv>
            ) : (
              <p className="empty-state">先选择一个地点再生成文案。</p>
            )}
          </AnimatePresence>
        </section>
      </div>
    </>
  )
}

export default MapWorkspace
