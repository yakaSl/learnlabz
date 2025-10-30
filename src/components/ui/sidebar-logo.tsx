
import Image from 'next/image';
import { BookOpenCheck } from 'lucide-react';

export function SidebarLogo() {
  return (
    <div className="flex items-center justify-center p-4">
      {/* Collapsed state */}
      <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center h-10 w-10 bg-primary/20 text-primary rounded-lg">
        <BookOpenCheck className="h-6 w-6" />
      </div>
      
      {/* Expanded state */}
      <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
        <div className="flex items-center justify-center h-8 w-8 bg-primary/20 text-primary rounded-lg">
          <BookOpenCheck className="h-5 w-5" />
        </div>
        <span className="font-bold text-lg">LearnLabz</span>
      </div>
    </div>
  );
}
