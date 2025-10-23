import UINavigator from '@/components/ui-navigator';

export default function UIPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <main className="flex-1 container py-8">
        <h1 className="text-4xl font-bold mb-4">UI Development Page</h1>
        <p className="text-muted-foreground mb-8">
          This page contains links to all the UI components and pages built in this project.
        </p>
        <UINavigator />
      </main>
    </div>
  );
}
