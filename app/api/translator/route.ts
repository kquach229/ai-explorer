import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

const inference = new HfInference(process.env.HF_ACCESS_TOKEN);

// Define a type for the supported languages
type LanguageModel =
  | 'en-es'
  | 'en-de'
  | 'en-fr'
  | 'en-zh'
  | 'en-ru'
  | 'en-it'
  | 'en-ja'
  | 'en-vi';

export async function POST(req: Request) {
  try {
    // Define the structure of the expected JSON payload
    const { text, lang }: { text: string; lang: LanguageModel } =
      await req.json();

    const languageModels: Record<LanguageModel, string> = {
      'en-es': 'Helsinki-NLP/opus-mt-en-es',
      'en-de': 'Helsinki-NLP/opus-mt-en-de',
      'en-fr': 'Helsinki-NLP/opus-mt-en-fr',
      'en-zh': 'Helsinki-NLP/opus-mt-en-zh',
      'en-ru': 'Helsinki-NLP/opus-mt-en-ru',
      'en-it': 'Helsinki-NLP/opus-mt-en-it',
      'en-ja': 'Helsinki-NLP/opus-mt-en-ja',
      'en-vi': 'Helsinki-NLP/opus-mt-en-vi',
    };

    // Ensure lang is a valid key in languageModels
    if (!(lang in languageModels)) {
      throw new Error(`Unsupported language: ${lang}`);
    }

    const translationResponse = await inference.translation({
      model: languageModels[lang],
      inputs: text,
    });

    // Handle the response based on its type
    let translatedText: string;
    if (Array.isArray(translationResponse)) {
      translatedText = translationResponse[0].translation_text; // Access the first element's translation_text
    } else {
      translatedText = translationResponse.translation_text; // Directly access if it's a single value
    }

    return NextResponse.json({
      translation_text: translatedText,
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Failed to translate text.' },
      { status: 500 }
    );
  }
}
