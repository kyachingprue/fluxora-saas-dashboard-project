import { LayoutDashboard, Sparkles, MapPinned, Users, Store, Truck, Wrench, ClipboardCheck, TriangleAlert, BellRing, Cog, MapPin, FileText, ChartPie, Settings } from 'lucide-react'

export const mainNav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/ai-assistant', label: 'AI Assistant', icon: Sparkles },
  { to: '/fleet-map', label: 'Fleet Map', icon: MapPinned },
  { to: '/contacts', label: 'Contacts', icon: Users },
  { to: '/vendors', label: 'Vendors', icon: Store },
  { to: '/vehicles', label: 'Vehicles', icon: Truck },
  { to: '/tools', label: 'Tools', icon: Wrench },
  { to: '/inspections', label: 'Inspections', icon: ClipboardCheck },
  { to: '/issues', label: 'Issues', icon: TriangleAlert },
  { to: '/reminders', label: 'Reminders', icon: BellRing },
  { to: '/service', label: 'Service', icon: Cog },
]
export const otherNav = [
  { to: '/places', label: 'Places', icon: MapPin },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/reports', label: 'Reports', icon: ChartPie },
  { to: '/settings', label: 'Settings', icon: Settings },
]

const N = ['Serina Helen','Jamina Hean','Saif Hasan','Sabbir Rahman','Fariya Talukder','Harry Brooks','Tahsan Khan','Nadia Islam']
const V = ['Truck #231','Truck #118','Van #042','Truck #307','Box #075','Truck #190','Van #221','Truck #264']
const S = ['Healthy','Warning','Critical','Active','Pending','Done']
const gen = {
  name: i => N[i % 8], vehicle: i => V[i % 8], status: i => S[(i * 2 + 1) % 6],
  date: i => `Sep ${28 - i * 2}, 2026`, amount: i => `$${(320 + i * 137) % 2400}`,
  id: i => `#${1040 + i * 7}`, email: i => `${N[i % 8].split(' ')[0].toLowerCase()}@fleer.io`,
  place: i => ['Atalanta Road','Depot North','Harbor Yard','Central Hub','Riverside Lot','East Garage'][i % 6],
  file: i => ['Insurance.pdf','Permit-2026.pdf','Invoice-812.pdf','Manual.pdf','Contract.docx','Audit.xlsx'][i % 6],
  type: i => ['Brake check','Oil change','Tire rotation','Battery test','Engine scan','Coolant flush'][i % 6],
}
export const rowsFor = (keys) => Array.from({ length: 7 }, (_, i) => keys.map(k => gen[k](i)))

const P = (title, sub, stats, cols, keys, action) => ({ title, sub, stats, cols, keys, action })
export const pages = {
  'ai-assistant': P('AI Assistant', 'Ask questions, get maintenance forecasts and route tips.', [['Chats today','48','+12%'],['Insights','126','+8%'],['Alerts avoided','31','+5%'],['Time saved','14h','+9%']], ['Insight','Vehicle','Status','Date'], ['type','vehicle','status','date'], 'New chat'),
  'fleet-map': P('Fleet Map', 'Live positions of every truck and van.', [['Online','192','+4%'],['Idle','34','-2%'],['Offline','22','-1%'],['Geofences','16','+3%']], ['Vehicle','Location','Status','Updated'], ['vehicle','place','status','date'], 'Add geofence'),
  contacts: P('Contacts', 'Drivers, managers and partners in one place.', [['Total','312','+6%'],['Drivers','204','+4%'],['Managers','38','+2%'],['Partners','70','+8%']], ['Name','Email','Location','Status'], ['name','email','place','status'], 'Add contact'),
  vendors: P('Vendors', 'Repair shops, fuel providers and suppliers.', [['Vendors','58','+5%'],['Preferred','21','+3%'],['Open orders','17','-4%'],['Spend','$48k','+7%']], ['Vendor ID','Contact','Amount','Status'], ['id','name','amount','status'], 'Add vendor'),
  vehicles: P('Vehicles', 'All 248 vehicles with health and utilization.', [['Total','248','+8.4%'],['Active','192','+7.4%'],['In shop','19','-3%'],['Retired','37','+1%']], ['Vehicle','Driver','Status','Last service'], ['vehicle','name','status','date'], 'Add vehicle'),
  tools: P('Tools', 'Equipment, diagnostics kits and spare parts.', [['Tools','426','+3%'],['Checked out','63','+9%'],['Low stock','12','-5%'],['Value','$92k','+4%']], ['Tool ID','Type','Status','Location'], ['id','type','status','place'], 'Add tool'),
  inspections: P('Inspections', 'Daily walk-arounds and compliance checks.', [['Due today','24','+2%'],['Passed','171','+6%'],['Failed','9','-8%'],['Overdue','5','-12%']], ['Vehicle','Inspector','Result','Date'], ['vehicle','name','status','date'], 'Start inspection'),
  issues: P('Issues', 'Reported defects sorted by priority.', [['Open','43','-6%'],['Critical','7','-14%'],['Resolved','218','+11%'],['Avg. fix','2.4d','-9%']], ['Issue','Vehicle','Priority','Reported'], ['id','vehicle','status','date'], 'Report issue'),
  reminders: P('Reminders', 'Renewals, services and scheduled tasks.', [['Upcoming','37','+5%'],['Today','8','+1%'],['Snoozed','6','-2%'],['Completed','412','+10%']], ['Task','Vehicle','Status','Due'], ['type','vehicle','status','date'], 'New reminder'),
  service: P('Service', 'Work orders and maintenance history.', [['Work orders','64','+4%'],['In progress','18','+2%'],['Scheduled','29','+6%'],['Cost','$21k','-3%']], ['Service','Vehicle','Cost','Status'], ['type','vehicle','amount','status'], 'New work order'),
  places: P('Places', 'Depots, yards and customer sites.', [['Places','41','+3%'],['Depots','8','0%'],['Sites','27','+5%'],['Fuel stops','6','+1%']], ['Place','Manager','Vehicles','Status'], ['place','name','id','status'], 'Add place'),
  documents: P('Documents', 'Permits, insurance and contracts.', [['Files','1,284','+9%'],['Expiring','14','-4%'],['Shared','96','+7%'],['Storage','62%','+2%']], ['File','Owner','Uploaded','Status'], ['file','name','date','status'], 'Upload file'),
  reports: P('Reports', 'Cost, utilization and health reports.', [['Reports','36','+4%'],['Scheduled','12','+2%'],['Exports','208','+13%'],['Shared','19','+6%']], ['Report','Owner','Generated','Status'], ['type','name','date','status'], 'New report'),
  settings: P('Settings', 'Profile, notifications, billing and team.', [['Members','24','+2%'],['Integrations','9','+1%'],['Plan','Pro','0%'],['API calls','82k','+15%']], ['Setting','Owner','Updated','Status'], ['type','name','date','status'], 'Save changes'),
}
