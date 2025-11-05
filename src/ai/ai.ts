/**
 * @fileoverview This file initializes and configures the Genkit AI instance.
 */
import {genkit} from 'genkit';
import {googleAI, genkitEval} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI(),
    genkitEval({
      judge: googleAI.model('gemini-2.5-flash'),
      metrics: ['bleu', 'rouge', 'safety', 'sentiment', 'style', 'toxicity'],
      embedder: googleAI.embedder('embedding-004'),
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
