/**
 * @fileoverview This file initializes and configures the Genkit AI instance.
 */
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {genkitEval} from 'genkitx-eval';

export const ai = genkit({
  plugins: [
    googleAI(),
    genkitEval({
      judge: 'googleai/gemini-2.5-flash',
      metrics: ['bleu', 'rouge', 'safety', 'sentiment', 'style', 'toxicity'],
      embedder: 'googleai/embedding-004',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
