import { setupWorker } from 'msw/browser';
import { handlers } from '@/mocks/handlers';
import { scenarios } from '@/mocks/scenarios';

const scenarioName = new URLSearchParams(window.location.search).get(
  'scenario',
);
const scenario = scenarioName ?? 'error';
const runtimeScenarios = scenarios[scenario as keyof typeof scenarios] || [];

export const worker = setupWorker(...runtimeScenarios, ...handlers);
