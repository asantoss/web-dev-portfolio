/* eslint-disable @typescript-eslint/no-explicit-any */
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

export async function summarizeWithAI(content: string, maxTokens = 100): Promise<string> {
	if (!content.trim()) return '';

	const prompt = `Summarize the following content in 1-2 sentences:\n\n${content}`;

	const completion = await openai.chat.completions.create({
		model: 'gpt-4',
		messages: [
			{
				role: 'system',
				content: 'You are a helpful assistant that summarizes technical blog posts.'
			},
			{ role: 'user', content: prompt }
		],
		max_tokens: maxTokens,
		temperature: 0.7
	});

	return completion.choices[0]?.message?.content?.trim() ?? '';
}
