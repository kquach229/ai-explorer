'use client';

import React, { useState, useEffect } from 'react';
import { SyncLoader } from 'react-spinners';
import { FaVolumeHigh } from 'react-icons/fa6';
import ResultCard from '@/components/ResultCard'; // Assuming you want to reuse the ResultCard component

export default function Translator() {
  const [translatedText, setTranslatedText] = useState('');
  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState('en-es');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          setVoices(window.speechSynthesis.getVoices());
        };
      }
    };

    loadVoices();
  }, []);

  const fetchTranslation = async () => {
    setIsLoading(true);
    setError(false);
    setTranslatedText('');
    try {
      const response = await fetch('/api/translator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          lang: language,
        }),
      });

      const data = await response.json();
      if (data.translation_text) {
        setTranslatedText(data.translation_text);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.error('Error fetching translation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextAudio = () => {
    if (voices.length > 0 && translatedText) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      const languageAudio = language.split('-')[1];
      const voice = voices.find((v) => v.lang.startsWith(languageAudio));
      utterance.voice = voice || null;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-teal-700 to-green-600 w-full'>
      <div className='pt-20 max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-around'>
        <div className='relative'>
          <div className='relative px-4 sm:px-8 bg-white shadow-lg rounded-xl sm:rounded-3xl h-[70vh] flex items-center ml-10'>
            <div className='mx-auto'>
              <h1 className='text-2xl sm:text-3xl font-semibold text-teal-600 mb-3 sm:mb-4 text-center'>
                AI Explorer - Translator
              </h1>
              <div className='divide-y divide-gray-200'>
                <div className='py-6 sm:py-8 text-base leading-6 space-y-3 sm:space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
                  <div className='flex flex-col'>
                    <label className='text-teal-600 leading-loose'>
                      Select Language
                    </label>
                    <select
                      onChange={(e) => setLanguage(e.target.value)}
                      value={language}
                      className='p-2 sm:p-3 border border-teal-300 rounded text-gray-700 focus:outline-none focus:border-teal-500 bg-teal-50'>
                      <option value='en-es'>English to Spanish</option>
                      <option value='en-de'>English to German</option>
                      <option value='en-fr'>English to French</option>
                      <option value='en-zh'>English to Chinese</option>
                      <option value='en-ru'>English to Russian</option>
                      <option value='en-vi'>English to Vietnamese</option>
                      <option value='en-it'>English to Italian</option>
                      <option value='en-ja'>English to Japanese</option>
                    </select>
                  </div>
                  <div className='flex flex-col'>
                    <label className='text-teal-600 leading-loose'>
                      Input Text
                    </label>
                    <input
                      type='text'
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder='Enter text to translate...'
                      className='p-2 sm:p-3 border border-teal-300 rounded text-gray-700 focus:outline-none focus:border-teal-500 bg-teal-50'
                    />
                  </div>
                  <button
                    onClick={fetchTranslation}
                    className='mt-3 sm:mt-5 px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-teal-500 to-green-400 text-white rounded shadow-md hover:shadow-lg transition duration-300'>
                    Translate Text
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='sm:pl-20 p-10 w-full sm:w-[70vw]'>
          <ResultCard loading={isLoading} error={error}>
            {translatedText && (
              <div className='pt-4 sm:pt-6 text-lg sm:text-xl font-semibold text-teal-700 flex items-center gap-2'>
                {translatedText}
                <FaVolumeHigh
                  className='cursor-pointer'
                  onClick={handleTextAudio}
                />
              </div>
            )}
          </ResultCard>
        </div>
      </div>
    </div>
  );
}
