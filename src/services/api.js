// OpenRouter API integration for AI-powered receipt analysis

import { ANALYSIS_PROMPT, ERROR_MESSAGES } from '../constants/prompts';
import { validateEnv, validateAnalysisResponse, parseJSON } from '../utils/validation';

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

/**
 * Main function to analyze receipt using OpenRouter API
 */
export const analyzeReceipt = async (imageBase64, country = 'Nepal') => {
    // Validate environment
    const envCheck = validateEnv();
    if (!envCheck.valid) {
        throw new Error(envCheck.error);
    }

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    const model = import.meta.env.VITE_DEFAULT_MODEL || 'anthropic/claude-3.5-sonnet';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.origin,
                'X-Title': 'MedBill Analyzer',
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'image_url',
                                image_url: {
                                    url: `data:image/jpeg;base64,${imageBase64}`
                                }
                            },
                            {
                                type: 'text',
                                text: ANALYSIS_PROMPT(country)
                            }
                        ]
                    }
                ],
                temperature: 0.3, // Lower temperature for more consistent results
                max_tokens: 2000,
            })
        });

        if (!response.ok) {
            // Handle specific error codes
            if (response.status === 429) {
                throw new Error(ERROR_MESSAGES.RATE_LIMIT);
            } else if (response.status === 401) {
                throw new Error(ERROR_MESSAGES.NO_API_KEY);
            } else {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || ERROR_MESSAGES.API_ERROR);
            }
        }

        const data = await response.json();

        // Extract the response content
        const content = data.choices?.[0]?.message?.content;
        if (!content) {
            throw new Error(ERROR_MESSAGES.PARSE_ERROR);
        }

        // Parse the JSON response
        const parsedResult = parseResponse(content);

        // Validate the structure
        const validation = validateAnalysisResponse(parsedResult);
        if (!validation.valid) {
            throw new Error(`Invalid response structure: ${validation.error}`);
        }

        return parsedResult;

    } catch (error) {
        console.error('API Error:', error);

        // Network errors
        if (error.message.includes('fetch')) {
            throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
        }

        // Re-throw with original message
        throw error;
    }
};

/**
 * Parse the AI response (handles JSON extraction from markdown)
 */
const parseResponse = (content) => {
    try {
        // Try direct JSON parse first
        return parseJSON(content);
    } catch (error) {
        // If that fails, try to extract JSON from text
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return parseJSON(jsonMatch[0]);
        }
        throw new Error(ERROR_MESSAGES.PARSE_ERROR);
    }
};

/**
 * Test API connection
 */
export const testConnection = async () => {
    const envCheck = validateEnv();
    if (!envCheck.valid) {
        return { success: false, error: envCheck.error };
    }

    try {
        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        const response = await fetch('https://openrouter.ai/api/v1/models', {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            }
        });

        if (response.ok) {
            return { success: true };
        } else {
            return { success: false, error: 'Invalid API key' };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};
