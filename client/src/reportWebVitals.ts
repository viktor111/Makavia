import type { MetricType } from 'web-vitals';
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

type ReportHandler = (metric: MetricType) => void;

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (typeof onPerfEntry !== 'function') {
    return;
  }

  onCLS(onPerfEntry);
  onFCP(onPerfEntry);
  onINP(onPerfEntry);
  onLCP(onPerfEntry);
  onTTFB(onPerfEntry);
};

export default reportWebVitals;
