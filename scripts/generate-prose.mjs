#!/usr/bin/env node
/**
 * Generic OpenRouter completion caller.
 *
 * Usage:
 *   OPENROUTER_API_KEY=sk-or-... node scripts/generate-prose.mjs <model> <prompt-file>
 *
 * Example:
 *   OPENROUTER_API_KEY=sk-or-... node scripts/generate-prose.mjs x-ai/grok-4 my-prompt.txt > out.txt
 *
 * The key comes from the environment — never hardcode it or commit it.
 * The prompt file and the output are entirely yours.
 */

import { readFileSync } from 'node:fs';

const [model, promptPath] = process.argv.slice(2);
const key = process.env.OPENROUTER_API_KEY;

if (!key || !model || !promptPath) {
    console.error('Usage: OPENROUTER_API_KEY=... node scripts/generate-prose.mjs <model> <prompt-file>');
    process.exit(1);
}

const prompt = readFileSync(promptPath, 'utf8');

const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
    }),
});

if (!res.ok) {
    console.error(`OpenRouter error ${res.status}: ${await res.text()}`);
    process.exit(1);
}

const data = await res.json();
console.log(data.choices?.[0]?.message?.content ?? '');
