'use client';

interface SidebarProps {
  activeItem: string;
  onNavigate: (item: string) => void;
}

const mainNav = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'generate-leads', label: 'Generate Leads', icon: '⚡' },
  { id: 'manage-leads', label: 'Manage Leads', icon: '👥' },
];

const controlNav = [
  { id: 'team-members', label: 'Team Members', icon: '👤' },
  { id: 'lead-sources', label: 'Lead Sources', icon: '📂' },
];

export default function Sidebar({ activeItem, onNavigate }: SidebarProps) {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-6 py-5 dark:border-gray-700">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-sm font-bold text-white">
          G
        </div>
        <div>
          <h1 className="text-base font-semibold text-gray-900 dark:text-white">
            GrowEasy
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">CRM</p>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Main
        </p>
        <nav className="space-y-1">
          {mainNav.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                activeItem === item.id
                  ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Control Center */}
        <p className="mb-3 mt-8 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Control Center
        </p>
        <nav className="space-y-1">
          {controlNav.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                activeItem === item.id
                  ? 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
