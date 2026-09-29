import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import {
  TriangleAlert,
  User,
  MapPin,
  Thermometer,
  HeartPulse,
  CircleAlert,
  Navigation,
  Truck,
  Battery,
  Radio,
  LocateFixed,
  X,
} from 'lucide-react'

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import DashboardCard from './DashboardCard'

/*
|--------------------------------------------------------------------------
| Fleet Data
|--------------------------------------------------------------------------
*/

const fleetData = [
  {
    id: '104',
    name: 'Truck #104',
    driver: 'Harry Brooks',
    location: 'Atlanta Road',
    lat: 33.749,
    lng: -84.388,
    temperature: 62,
    battery: 86,
    status: 'healthy',
    speed: 48,
  },
  {
    id: '118',
    name: 'Truck #118',
    driver: 'Michael Carter',
    location: 'Marietta Boulevard',
    lat: 33.804,
    lng: -84.447,
    temperature: 65,
    battery: 72,
    status: 'healthy',
    speed: 52,
  },
  {
    id: '122',
    name: 'Truck #122',
    driver: 'James Wilson',
    location: 'Peachtree Street',
    lat: 33.776,
    lng: -84.386,
    temperature: 68,
    battery: 64,
    status: 'healthy',
    speed: 45,
  },
  {
    id: '156',
    name: 'Truck #156',
    driver: 'Robert Davis',
    location: 'Memorial Drive',
    lat: 33.744,
    lng: -84.35,
    temperature: 71,
    battery: 58,
    status: 'healthy',
    speed: 39,
  },
  {
    id: '231',
    name: 'Truck #231',
    driver: 'Daniel Miller',
    location: 'Northside Drive',
    lat: 33.81,
    lng: -84.404,
    temperature: 78,
    battery: 40,
    status: 'warning',
    speed: 34,
  },
  {
    id: '184',
    name: 'Truck #184',
    driver: 'William Moore',
    location: 'West Midtown',
    lat: 33.789,
    lng: -84.411,
    temperature: 66,
    battery: 91,
    status: 'healthy',
    speed: 55,
  },
  {
    id: '205',
    name: 'Truck #205',
    driver: 'Christopher Taylor',
    location: 'East Atlanta',
    lat: 33.739,
    lng: -84.344,
    temperature: 82,
    battery: 29,
    status: 'critical',
    speed: 28,
  },
  {
    id: '217',
    name: 'Truck #217',
    driver: 'Matthew Anderson',
    location: 'Buckhead',
    lat: 33.848,
    lng: -84.363,
    temperature: 64,
    battery: 78,
    status: 'healthy',
    speed: 51,
  },
  {
    id: '221',
    name: 'Truck #221',
    driver: 'Andrew Thomas',
    location: 'Virginia Highland',
    lat: 33.783,
    lng: -84.354,
    temperature: 67,
    battery: 73,
    status: 'healthy',
    speed: 47,
  },
  {
    id: '244',
    name: 'Truck #244',
    driver: 'Joseph Jackson',
    location: 'Decatur Street',
    lat: 33.774,
    lng: -84.368,
    temperature: 84,
    battery: 24,
    status: 'critical',
    speed: 31,
  },
  {
    id: '239',
    name: 'Truck #239',
    driver: 'Charles White',
    location: 'Howell Mill Road',
    lat: 33.802,
    lng: -84.415,
    temperature: 76,
    battery: 49,
    status: 'warning',
    speed: 42,
  },
  {
    id: '108',
    name: 'Truck #108',
    driver: 'Thomas Harris',
    location: 'Lakewood Avenue',
    lat: 33.704,
    lng: -84.37,
    temperature: 63,
    battery: 88,
    status: 'healthy',
    speed: 49,
  },
  {
    id: '248',
    name: 'Truck #248',
    driver: 'Steven Martin',
    location: 'College Park',
    lat: 33.65,
    lng: -84.449,
    temperature: 79,
    battery: 35,
    status: 'warning',
    speed: 37,
  },
]

/*
|--------------------------------------------------------------------------
| Status Configuration
|--------------------------------------------------------------------------
*/

const statusConfig = {
  healthy: {
    color: '#10b981',
    label: 'Healthy',
    icon: HeartPulse,
  },

  warning: {
    color: '#f59e0b',
    label: 'Warning',
    icon: TriangleAlert,
  },

  critical: {
    color: '#f43f5e',
    label: 'Critical',
    icon: CircleAlert,
  },
}

/*
|--------------------------------------------------------------------------
| Default Map Center
|--------------------------------------------------------------------------
*/

const DEFAULT_CENTER = [33.749, -84.388]

/*
|--------------------------------------------------------------------------
| Custom Truck Marker
|--------------------------------------------------------------------------
*/

const createTruckIcon = (truck, selected = false) => {
  const config = statusConfig[truck.status]

  return L.divIcon({
    className: 'fleet-truck-marker',

    html: `
      <div
        style="
          position: relative;
          width: ${selected ? '46px' : '38px'};
          height: ${selected ? '46px' : '38px'};
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >

        <!-- Pulse -->
        <div
          style="
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            background: ${config.color};
            opacity: 0.18;
            animation: fleetPulse 2s infinite;
          "
        ></div>

        <!-- Marker -->
        <div
          style="
            position: relative;
            width: ${selected ? '36px' : '30px'};
            height: ${selected ? '36px' : '30px'};
            border-radius: 9999px;
            background: ${config.color};
            border: 3px solid white;
            box-shadow: 0 5px 16px rgba(0,0,0,.28);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2;
          "
        >

          <svg
            width="${selected ? '19' : '16'}"
            height="${selected ? '19' : '16'}"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M10 17h4V5H2v12h3"/>
            <path d="M14 8h4l4 4v5h-8z"/>
            <circle cx="7.5" cy="17.5" r="2.5"/>
            <circle cx="17.5" cy="17.5" r="2.5"/>
          </svg>

        </div>

        ${
          selected
            ? `
              <div
                style="
                  position: absolute;
                  bottom: -25px;
                  left: 50%;
                  transform: translateX(-50%);
                  white-space: nowrap;
                  padding: 3px 7px;
                  border-radius: 6px;
                  background: rgba(15,23,42,.94);
                  color: white;
                  font-size: 9px;
                  font-weight: 700;
                  box-shadow: 0 3px 10px rgba(0,0,0,.2);
                  z-index: 5;
                "
              >
                ${truck.name}
              </div>
            `
            : ''
        }

      </div>
    `,

    iconSize: selected ? [46, 46] : [38, 38],

    iconAnchor: selected
      ? [23, 23]
      : [19, 19],

    popupAnchor: [0, -20],
  })
}

/*
|--------------------------------------------------------------------------
| Map Controller
|--------------------------------------------------------------------------
*/

function MapController({ selectedTruck }) {
  const map = useMap()

  useEffect(() => {
    if (!selectedTruck) return

    map.flyTo(
      [selectedTruck.lat, selectedTruck.lng],
      13,
      {
        duration: 0.8,
      },
    )
  }, [selectedTruck, map])

  return null
}

/*
|--------------------------------------------------------------------------
| Zoom Controller
|--------------------------------------------------------------------------
*/

function MapZoomControls() {
  const map = useMap()

  const handleZoomIn = () => {
    map.zoomIn()
  }

  const handleZoomOut = () => {
    map.zoomOut()
  }

  const handleLocate = () => {
    map.flyTo(DEFAULT_CENTER, 11, {
      duration: 0.8,
    })
  }

  return (
    <div className="absolute bottom-3 right-3 z-[500] flex overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">

      <button
        type="button"
        onClick={handleLocate}
        title="Reset map"
        className="p-2 text-slate-600 transition hover:bg-slate-100 hover:text-blue-500 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        <LocateFixed size={15} />
      </button>

      <div className="w-px bg-slate-200 dark:bg-slate-700" />

      <button
        type="button"
        onClick={handleZoomIn}
        title="Zoom in"
        className="p-2 text-slate-600 transition hover:bg-slate-100 hover:text-blue-500 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        +
      </button>

      <div className="w-px bg-slate-200 dark:bg-slate-700" />

      <button
        type="button"
        onClick={handleZoomOut}
        title="Zoom out"
        className="p-2 text-slate-600 transition hover:bg-slate-100 hover:text-blue-500 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        −
      </button>

    </div>
  )
}

/*
|--------------------------------------------------------------------------
| Fleet Map
|--------------------------------------------------------------------------
*/

export default function FleetMap() {
  const [selectedId, setSelectedId] = useState(null)

  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark'),
  )

  /*
  |--------------------------------------------------------------------------
  | Detect Dark / Light Mode
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(
        document.documentElement.classList.contains('dark'),
      )
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  /*
  |--------------------------------------------------------------------------
  | Selected Truck
  |--------------------------------------------------------------------------
  */

  const selectedTruck = useMemo(
    () => fleetData.find(truck => truck.id === selectedId) || null,
    [selectedId]
  )

  /*
  |--------------------------------------------------------------------------
  | Status Counts
  |--------------------------------------------------------------------------
  */

  const counts = useMemo(() => {
    return fleetData.reduce(
      (acc, truck) => {
        acc[truck.status] += 1
        return acc
      },
      {
        healthy: 0,
        warning: 0,
        critical: 0,
      },
    )
  }, [])

  /*
  |--------------------------------------------------------------------------
  | Select Status Truck
  |--------------------------------------------------------------------------
  */

  const handleStatusClick = (status) => {
    const truck = fleetData.find(
      (item) => item.status === status,
    )

    if (!truck) return

    setSelectedId(truck.id)
  }

  return (
    <DashboardCard
      title="Active Fleet Tactical Map"
      className="lg:col-span-2"
      delay={0.05}
    >
      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-900">
        {/*
        |--------------------------------------------------------------------------
        | Map
        |--------------------------------------------------------------------------
        */}

        <MapContainer
          center={DEFAULT_CENTER}
          zoom={11}
          scrollWheelZoom={true}
          zoomControl={false}
          attributionControl={true}
          className="h-[300px] w-full sm:h-[360px] lg:h-[400px]"
        >
          {isDark ? (
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
            />
          ) : (
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
          )}

          {/* Move map to selected truck */}

          <MapController selectedTruck={selectedTruck} />

          {/* Custom zoom buttons */}

          <MapZoomControls />

          {/*
          |--------------------------------------------------------------------------
          | Truck Markers
          |--------------------------------------------------------------------------
          */}

          {fleetData.map(truck => (
            <Marker
              key={truck.id}
              position={[truck.lat, truck.lng]}
              icon={createTruckIcon(truck, truck.id === selectedId)}
              eventHandlers={{
                click: () => {
                  setSelectedId(truck.id)
                }
              }}
            >
              <Popup closeButton={true} className="fleet-popup">
                <div className="min-w-[190px]">
                  <div className="mb-2 flex items-center gap-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{
                        background: `${statusConfig[truck.status].color}20`,
                        color: statusConfig[truck.status].color
                      }}
                    >
                      <Truck size={15} />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {truck.name}
                      </p>

                      <p
                        className="text-[10px] font-semibold"
                        style={{
                          color: statusConfig[truck.status].color
                        }}
                      >
                        {statusConfig[truck.status].label}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[10px] text-slate-600">
                    <p className="flex items-center gap-1.5">
                      <User size={11} />
                      {truck.driver}
                    </p>

                    <p className="flex items-center gap-1.5">
                      <MapPin size={11} />
                      {truck.location}
                    </p>

                    <p className="flex items-center gap-1.5">
                      <Thermometer size={11} />
                      {truck.temperature}°F
                    </p>

                    <p className="flex items-center gap-1.5">
                      <Battery size={11} />
                      {truck.battery}%
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/*
        |--------------------------------------------------------------------------
        | Top Left Live Fleet Badge
        |--------------------------------------------------------------------------
        */}

        <div className="absolute left-3 top-3 z-[500]">
          <motion.div
            initial={{
              opacity: 0,
              y: -8
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/90"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
              <Navigation size={14} />
            </div>

            <div>
              <p className="text-[10px] font-semibold text-slate-900 dark:text-white">
                Live Fleet
              </p>

              <p className="text-[9px] text-slate-500 dark:text-slate-400">
                {fleetData.length} vehicles online
              </p>
            </div>

            <span className="ml-1 h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          </motion.div>
        </div>

        {/*
        |--------------------------------------------------------------------------
        | Selected Truck Panel
        |--------------------------------------------------------------------------
        */}

        {selectedTruck && (
          <motion.div
            key={selectedTruck.id}
            initial={{
              opacity: 0,
              x: 20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.2
            }}
            className="absolute right-3 top-3 z-[500] w-[min(18rem,calc(100%-1.5rem))] overflow-hidden rounded-xl border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95"
          >
            {/* Header */}

            <div
              className="flex items-center justify-between px-3 py-2.5"
              style={{
                background: `${statusConfig[selectedTruck.status].color}18`,
                borderBottom: `1px solid ${statusConfig[selectedTruck.status].color}35`
              }}
            >
              <div className="flex min-w-0 items-center gap-2">
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: `${statusConfig[selectedTruck.status].color}20`,
                    color: statusConfig[selectedTruck.status].color
                  }}
                >
                  <Truck size={14} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-[11px] font-bold text-slate-900 dark:text-white">
                    {selectedTruck.name}
                  </p>

                  <p
                    className="text-[9px] font-medium"
                    style={{
                      color: statusConfig[selectedTruck.status].color
                    }}
                  >
                    {statusConfig[selectedTruck.status].label}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedId(selectedTruck.id)}
                className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-blue-500 dark:hover:bg-slate-800"
                title="Locate truck"
              >
                <LocateFixed size={13} />
              </button>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-rose-500 dark:hover:bg-slate-800"
              >
                <X size={14} />
              </button>
            </div>

            {/* Details */}

            <div className="space-y-2.5 p-3">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                Route Information
              </p>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-600 dark:text-slate-300">
                  <User size={11} className="text-slate-400" />

                  <span className="truncate">{selectedTruck.driver}</span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-600 dark:text-slate-300">
                  <MapPin size={11} className="text-slate-400" />

                  <span className="truncate">{selectedTruck.location}</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-2 dark:border-slate-800">
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                  System Status
                </p>

                {/* Temperature */}

                <div className="mb-2">
                  <div className="mb-1 flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <Thermometer size={11} className="text-violet-500" />
                      Temperature
                    </span>

                    <b className="text-slate-800 dark:text-white">
                      {selectedTruck.temperature}°F
                    </b>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-violet-500 transition-all"
                      style={{
                        width: `${Math.min(selectedTruck.temperature, 100)}%`
                      }}
                    />
                  </div>
                </div>

                {/* Battery */}

                <div className="mb-2">
                  <div className="mb-1 flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <Battery size={11} className="text-emerald-500" />
                      Battery
                    </span>

                    <b className="text-slate-800 dark:text-white">
                      {selectedTruck.battery}%
                    </b>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={`h-full rounded-full transition-all ${
                        selectedTruck.battery < 30
                          ? 'bg-rose-500'
                          : selectedTruck.battery < 50
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                      }`}
                      style={{
                        width: `${selectedTruck.battery}%`
                      }}
                    />
                  </div>
                </div>

                {/* Speed */}

                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1.5 dark:bg-slate-800/70">
                  <span className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                    <Radio size={11} />
                    Current Speed
                  </span>

                  <span className="text-[10px] font-bold text-slate-800 dark:text-white">
                    {selectedTruck.speed} mph
                  </span>
                </div>
              </div>

              {/* Track Button */}

              <button
                type="button"
                onClick={() => setSelectedId(selectedTruck.id)}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-500 py-2 text-[10px] font-semibold text-white shadow-sm transition hover:bg-blue-600"
              >
                <Navigation size={11} />
                Track Vehicle
              </button>
            </div>
          </motion.div>
        )}

        {/*
        |--------------------------------------------------------------------------
        | Bottom Status Cards
        |--------------------------------------------------------------------------
        */}

        <div className="absolute bottom-3 left-3 right-3 z-[500]">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              {
                status: 'healthy',
                icon: HeartPulse
              },
              {
                status: 'warning',
                icon: TriangleAlert
              },
              {
                status: 'critical',
                icon: CircleAlert
              }
            ].map(({ status, icon: Icon }) => {
              const config = statusConfig[status]

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => handleStatusClick(status)}
                  className="flex items-center gap-1.5 rounded-lg border border-white/70 bg-white/95 px-2.5 py-1.5 text-[10px] font-medium text-slate-700 shadow-lg backdrop-blur-sm transition hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-200"
                >
                  <Icon
                    size={12}
                    style={{
                      color: config.color
                    }}
                  />

                  <span>{config.label}</span>

                  <b className="text-slate-900 dark:text-white">
                    {counts[status]}
                  </b>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/*
      |--------------------------------------------------------------------------
      | Marker Animation + Leaflet Styling
      |--------------------------------------------------------------------------
      */}

      <style>{`

        @keyframes fleetPulse {
          0% {
            transform: scale(0.8);
            opacity: 0.35;
          }

          50% {
            transform: scale(1.35);
            opacity: 0.08;
          }

          100% {
            transform: scale(0.8);
            opacity: 0.35;
          }
        }

        .fleet-truck-marker {
          background: transparent !important;
          border: none !important;
        }

        .leaflet-container {
          font-family: inherit;
        }

        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
        }

        .leaflet-popup-content {
          margin: 12px;
        }

        .leaflet-popup-tip {
          box-shadow: none;
        }

        .leaflet-control-attribution {
          font-size: 8px !important;
          opacity: 0.8;
        }

      `}</style>
    </DashboardCard>
  )
}

