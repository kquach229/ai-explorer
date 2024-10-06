'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SyncLoader } from 'react-spinners';
import { FaVolumeHigh } from 'react-icons/fa6';

const Translator = () => {
  const [translatedText, setTranslatedText] = useState('');
  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState('en-es');
  const [isLoading, setIsLoading] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]); // Specify the type explicitly

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
    setTranslatedText('');
    try {
      const response = await axios.post('/api/translator', {
        text: inputText,
        lang: language,
      });

      if (response.data.translation_text) {
        setTranslatedText(response.data.translation_text);
      }
    } catch (error) {
      console.error('Error fetching translation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextAudio = () => {
    if (voices.length > 0) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      const languageAudio = language.split('-')[1];
      const voice = voices.find((v) => v.lang.startsWith(languageAudio));

      utterance.voice = voice || null;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-700 to-gray-900'>
      <div className='relative py-4 sm:py-6 max-w-full sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-teal-600 to-gray-800 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 sm:px-8 py-8 sm:py-10 bg-white shadow-lg rounded-xl sm:rounded-3xl'>
          <div className='max-w-full sm:max-w-md mx-auto'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-semibold text-teal-600 mb-3 sm:mb-4 text-center'>
                AI Explorer - Translator
              </h1>
            </div>
            <div className='divide-y divide-gray-200'>
              <div className='py-6 sm:py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
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
                    onChange={(e) => setInputText(e.target.value)}
                    value={inputText}
                    className='p-2 sm:p-3 border border-teal-300 rounded text-gray-700 focus:outline-none focus:border-teal-500 bg-teal-50'
                  />
                </div>
                <button
                  onClick={fetchTranslation}
                  className='mt-4 sm:mt-6 px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-teal-500 to-green-400 text-white font-semibold rounded shadow-md hover:shadow-lg transition duration-300'>
                  Translate
                </button>
              </div>

              {isLoading ? (
                <div className='flex justify-center items-center py-3'>
                  <SyncLoader color='#38b2ac' loading={isLoading} />
                </div>
              ) : (
                translatedText && (
                  <div className='pt-4 sm:pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7'>
                    <p className='text-lg flex items-center gap-2 sm:text-xl text-teal-700'>
                      {translatedText}
                      <FaVolumeHigh
                        className='cursor-pointer'
                        onClick={handleTextAudio}
                      />
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;
