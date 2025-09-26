'use client';

import { useTheme } from '../components/ThemeProvider';
import { AppShell } from '../components/AppShell';
import { TrackerList } from '../components/TrackerList';
import { TokenBalanceDisplay } from '../components/TokenBalanceDisplay';

const themes = [
  { id: 'default', name: 'Professional Finance', description: 'Dark navy with gold accents' },
  { id: 'celo', name: 'Celo', description: 'Black background with yellow accents' },
  { id: 'solana', name: 'Solana', description: 'Dark purple with magenta accents' },
  { id: 'base', name: 'Base', description: 'Dark blue with Base blue accents' },
  { id: 'coinbase', name: 'Coinbase', description: 'Dark navy with Coinbase blue' },
] as const;

export default function ThemePreviewPage() {
  const { theme, setTheme } = useTheme();

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="glass-card p-6">
          <h1 className="text-2xl font-bold text-fg mb-4">Theme Preview</h1>
          <p className="text-fg/70 mb-6">
            Choose your preferred theme for Tracker Tokens. Each theme is optimized for different blockchain ecosystems.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id as any)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  theme === themeOption.id
                    ? 'border-accent bg-accent/10'
                    : 'border-border bg-surface/30 hover:border-accent/50'
                }`}
              >
                <div className="font-semibold text-fg mb-1">{themeOption.name}</div>
                <div className="text-sm text-fg/70">{themeOption.description}</div>
                {theme === themeOption.id && (
                  <div className="mt-2 text-xs text-accent font-medium">✓ Active</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Preview Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TokenBalanceDisplay />
          <TrackerList variant="compact" />
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-fg mb-4">Color Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="w-full h-12 bg-bg rounded border border-border"></div>
              <div className="text-sm text-fg/70">Background</div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-surface rounded border border-border"></div>
              <div className="text-sm text-fg/70">Surface</div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-accent rounded"></div>
              <div className="text-sm text-fg/70">Accent</div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-primary rounded"></div>
              <div className="text-sm text-fg/70">Primary</div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
