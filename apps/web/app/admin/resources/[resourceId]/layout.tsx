'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const tabs = [
  { href: 'availability-rules', label: 'Availability Rules' },
  { href: 'pricing-rules', label: 'Pricing Rules' },
  { href: 'slot-overrides', label: 'Slot Overrides' },
];

export default function ResourceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resourceId } = useParams();
  const pathname = usePathname();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const fullPath = `/admin/resources/${resourceId}/${tab.href}`;
            const isActive = pathname === fullPath || pathname.startsWith(`${fullPath}/`);
            return (
              <Link
                key={tab.href}
                href={fullPath}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
      {children}
    </div>
  );
}