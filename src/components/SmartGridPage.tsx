import React from 'react';
import { useLanguage } from './LanguageContext';
import { SmartGridVisualization } from './SmartGridVisualization';

export function SmartGridPage() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t.smartGrid}</h1>
          <p className="text-muted-foreground">
            {language === 'mr' 
              ? "महाराष्ट्राच्या विद्युत नेटवर्कचे रिअल-टाइम निरीक्षण" 
              : "Real-time monitoring of Maharashtra's electricity network"
            }
          </p>
        </div>
        <SmartGridVisualization />
      </div>
    </div>
  );
}