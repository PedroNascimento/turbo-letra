import { useState, useEffect, useRef } from 'react';
import { Settings, setBlocks as saveBlocks, setSettings as saveSettings } from '@/lib/storage';

interface UseAutosaveProps {
  blocks: string[];
  settings: Settings;
  onSave?: () => void;
}

export function useAutosave({ blocks, settings, onSave }: UseAutosaveProps) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Avoid saving on initial load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setStatus('saving');

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      saveBlocks(blocks);
      saveSettings(settings); // Assume setSettings is exported
      
      setStatus('saved');
      if (onSave) onSave();

      // Reset to idle after a delay to clear the checkmark
      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    }, 300); // 300ms debounce

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [blocks, settings, onSave]);

  return status;
}
