import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { Download, BookOpen, Play } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface Letter {
  character: string;
  romanization: string;
  type: 'consonant' | 'vowel';
  ipa: string;
  strokeOrder: string[];
  commonMistakes: string[];
  exampleWord: {
    word: string;
    meaning: string;
    pronunciation: string;
  };
  audioSrc: string; // New property for audio
}

const alphabet: Letter[] = [
  {
    character: 'ㄱ',
    romanization: 'g/k',
    type: 'consonant',
    ipa: '[k̚], [g]',
    strokeOrder: [
      'https://images.unsplash.com/photo-1234/g-stroke-1.png',
      'https://images.unsplash.com/photo-1234/g-stroke-2.png',
    ],
    commonMistakes: [
      'Making the angle too rounded',
      'Incorrect proportions between vertical and horizontal lines',
    ],
    exampleWord: {
      word: '가방',
      meaning: 'bag',
      pronunciation: 'gabang',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-g.mp3',
  },
  {
    character: 'ㅈ',
    romanization: 'j',
    type: 'consonant',
    ipa: '[ja]',
    strokeOrder: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Hangul_Jieut.svg/256px-Hangul_Jieut.svg.png',
    ],
    commonMistakes: [
      'confusing it with the double consonant "ㅉ"',
      'Uneven line lengths',
    ],
    exampleWord: {
      word: '자',
      meaning: 'ok',
      pronunciation: 'ja',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-j.mp3',
  },
  {
    character: 'ㅏ',
    romanization: 'a',
    type: 'vowel',
    ipa: '[a]',
    strokeOrder: [
      'https://images.unsplash.com/photo-1234/a-stroke-1.png',
      'https://images.unsplash.com/photo-1234/a-stroke-2.png',
    ],
    commonMistakes: [
      'Making the vertical line too short',
      'Incorrect angle of the short line',
    ],
    exampleWord: {
      word: '아기',
      meaning: 'baby',
      pronunciation: 'agi',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-a.mp3',
  },
  {
    character: 'ㄴ',
    romanization: 'n',
    type: 'consonant',
    ipa: '[n]',
    strokeOrder: [
      'https://example.com/n-stroke-1.png', // Replace with actual image URL
    ],
    commonMistakes: [
      'Making the horizontal line too long',
      'Not keeping the vertical line straight',
    ],
    exampleWord: {
      word: '나비',
      meaning: 'butterfly',
      pronunciation: 'nabi',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-n.mp3',
  },
  {
    character: 'ㅁ',
    romanization: 'm',
    type: 'consonant',
    ipa: '[m]',
    strokeOrder: [
      'https://example.com/m-stroke-1.png', // Replace with actual image URL
      'https://example.com/m-stroke-2.png', // Replace with actual image URL
      'https://example.com/m-stroke-3.png', // Replace with actual image URL
    ],
    commonMistakes: [
      'Uneven sides of the square',
      'Incorrect order of strokes',
    ],
    exampleWord: {
      word: '미소',
      meaning: 'smile',
      pronunciation: 'miso',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-m.mp3',
  },
  {
    character: 'ㅗ',
    romanization: 'o',
    type: 'vowel',
    ipa: '[o]',
    strokeOrder: [
      'https://example.com/o-stroke-1.png', // Replace with actual image URL
      'https://example.com/o-stroke-2.png', // Replace with actual image URL
    ],
    commonMistakes: [
      'Making the horizontal line too high or low',
      'Vertical line not centered',
    ],
    exampleWord: {
      word: '오이',
      meaning: 'cucumber',
      pronunciation: 'oi',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-o.mp3',
  },
  {
    character: 'ㄷ',
    romanization: 'd/t',
    type: 'consonant',
    ipa: '[t̚], [d]',
    strokeOrder: [
      'https://example.com/d-stroke-1.png', // Replace with actual image URL
      'https://example.com/d-stroke-2.png', // Replace with actual image URL
    ],
    commonMistakes: [
      'Uneven horizontal lines',
      'Making the vertical line too short',
    ],
    exampleWord: {
      word: '다리',
      meaning: 'leg/bridge',
      pronunciation: 'dari',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-d.mp3',
  },
  {
    character: 'ㄹ',
    romanization: 'r/l',
    type: 'consonant',
    ipa: '[ɾ], [l]',
    strokeOrder: [
      'https://example.com/r-stroke-1.png', // Replace with actual image URL
      'https://example.com/r-stroke-2.png', // Replace with actual image URL
      'https://example.com/r-stroke-3.png', // Replace with actual image URL
    ],
    commonMistakes: [
      'Rounding the corners too much',
      'Incorrect order of strokes',
    ],
    exampleWord: {
      word: '라디오',
      meaning: 'radio',
      pronunciation: 'radio',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-l.mp3',
  },
  {
    character: 'ㅂ',
    romanization: 'b/p',
    type: 'consonant',
    ipa: '[p̚], [b]',
    strokeOrder: [
      'https://example.com/b-stroke-1.png', // Replace with actual image URL
      'https://example.com/b-stroke-2.png', // Replace with actual image URL
      'https://example.com/b-stroke-3.png', // Replace with actual image URL
      'https://example.com/b-stroke-4.png', // Replace with actual image URL
    ],
    commonMistakes: ['Uneven top parts', 'Vertical lines not aligned'],
    exampleWord: {
      word: '바다',
      meaning: 'sea',
      pronunciation: 'bada',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-b.mp3',
  },
  {
    character: 'ㅅ',
    romanization: 's',
    type: 'consonant',
    ipa: '[s]',
    strokeOrder: [
      'https://example.com/s-stroke-1.png', // Replace with actual image URL
      'https://example.com/s-stroke-2.png', // Replace with actual image URL
    ],
    commonMistakes: [
      'Making the angle too sharp or too rounded',
      'Uneven lengths of the strokes',
    ],
    exampleWord: {
      word: '사람',
      meaning: 'person',
      pronunciation: 'saram',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-s.mp3',
  },
  {
    character: 'ㅇ',
    romanization: '', // Silent initial, 'ng' final
    type: 'consonant',
    ipa: '[(∅) initial], [ŋ] final',
    strokeOrder: [
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-l.mp3', // Replace with actual image URL
    ],
    commonMistakes: [
      'Not making a perfect circle',
      'Starting and ending the stroke in the wrong place',
    ],
    exampleWord: {
      word: '눈',
      meaning: 'eye/snow',
      pronunciation: 'nun',
    },
    audioSrc: 'https://example.com/audio/ㅇ.mp3',
  },
  {
    character: 'ㅎ',
    romanization: 'h',
    type: 'consonant',
    ipa: '[h]',
    strokeOrder: [
      'https://example.com/h-stroke-1.png', // Replace with actual image URL
      'https://example.com/h-stroke-2.png', // Replace with actual image URL
      'https://example.com/h-stroke-3.png', // Replace with actual image URL
    ],
    commonMistakes: ['Uneven top lines', 'Circle too small or too large'],
    exampleWord: {
      word: '하나',
      meaning: 'one',
      pronunciation: 'hana',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-h.mp3',
  },
  {
    character: 'ㅑ',
    romanization: 'ya',
    type: 'vowel',
    ipa: '[ja]',
    strokeOrder: [
      'https://example.com/ya-stroke-1.png', // Replace with actual image URL
      'https://example.com/ya-stroke-2.png', // Replace with actual image URL
      'https://example.com/ya-stroke-3.png', // Replace with actual image URL
    ],
    commonMistakes: [
      'Uneven lengths of the short lines',
      'Vertical line not centered',
    ],
    exampleWord: {
      word: '야구',
      meaning: 'baseball',
      pronunciation: 'yagu',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-ya.mp3',
  },
  {
    character: 'ㅓ',
    romanization: 'eo',
    type: 'vowel',
    ipa: '[ʌ]',
    strokeOrder: [
      'https://example.com/eo-stroke-1.png', // Replace with actual image URL
      'https://example.com/eo-stroke-2.png', // Replace with actual image URL
    ],
    commonMistakes: [
      'Making the vertical line too short',
      'Incorrect angle of the short line',
    ],
    exampleWord: {
      word: '어머니',
      meaning: 'mother',
      pronunciation: 'eomeoni',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-eo.mp3',
  },
  {
    character: 'ㅕ',
    romanization: 'yeo',
    type: 'vowel',
    ipa: '[jʌ]',
    strokeOrder: [
      'https://example.com/yeo-stroke-1.png', // Replace with actual image URL
      'https://example.com/yeo-stroke-2.png', // Replace with actual image URL
      'https://example.com/yeo-stroke-3.png', // Replace with actual image URL
    ],
    commonMistakes: [
      'Uneven lengths of the short lines',
      'Vertical line not centered',
    ],
    exampleWord: {
      word: '여기',
      meaning: 'here',
      pronunciation: 'yeogi',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-yeo.mp3',
  },
  {
    character: 'ㅛ',
    romanization: 'yo',
    type: 'vowel',
    ipa: '[jo]',
    strokeOrder: [
      'https://example.com/yo-stroke-1.png', // Replace with actual image URL
      'https://example.com/yo-stroke-2.png', // Replace with actual image URL
      'https://example.com/yo-stroke-3.png', // Replace with actual image URL
    ],
    commonMistakes: [
      'Uneven lengths of the short lines',
      'Vertical line not centered',
    ],
    exampleWord: {
      word: '요리',
      meaning: 'cooking',
      pronunciation: 'yori',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-yo.mp3',
  },
  {
    character: 'ㅜ',
    romanization: 'u',
    type: 'vowel',
    ipa: '[u]',
    strokeOrder: [
      'https://example.com/u-stroke-1.png', // Replace with actual image URL
      'https://example.com/u-stroke-2.png', // Replace with actual image URL
    ],
    commonMistakes: [
      'Making the horizontal line too high or low',
      'Vertical line not centered',
    ],
    exampleWord: {
      word: '우유',
      meaning: 'milk',
      pronunciation: 'uyu',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-u.mp3',
  },
  {
    character: 'ㅠ',
    romanization: 'yu',
    type: 'vowel',
    ipa: '[ju]',
    strokeOrder: [
      'https://example.com/yu-stroke-1.png', // Replace with actual image URL
      'https://example.com/yu-stroke-2.png', // Replace with actual image URL
      'https://example.com/yu-stroke-3.png', // Replace with actual image URL
    ],
    commonMistakes: [
      'Uneven lengths of the short lines',
      'Vertical line not centered',
    ],
    exampleWord: {
      word: '유명',
      meaning: 'famous',
      pronunciation: 'yumyeong',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-yu.mp3',
  },
  {
    character: 'ㅡ',
    romanization: 'eu',
    type: 'vowel',
    ipa: '[ɯ]',
    strokeOrder: [
      'https://example.com/eu-stroke-1.png', // Replace with actual image URL
    ],
    commonMistakes: ['Making the line slanted', 'Line too short or too long'],
    exampleWord: {
      word: '크다',
      meaning: 'to be big',
      pronunciation: 'keuda',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-eu.mp3',
  },
  {
    character: 'ㅣ',
    romanization: 'i',
    type: 'vowel',
    ipa: '[i]',
    strokeOrder: [
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-i.mp3', // Replace with actual image URL
    ],
    commonMistakes: ['Making the line slanted', 'Line too short or too long'],
    exampleWord: {
      word: '아이',
      meaning: 'child',
      pronunciation: 'ai',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-i.mp3',
  },
  {
    character: 'ㅊ',
    romanization: 'ch',
    type: 'consonant',
    ipa: '[t͡ɕʰ]',
    strokeOrder: [
      'https://example.com/ch-stroke-1.png', // Replace with actual image URL
      'https://example.com/ch-stroke-2.png', // Replace with actual image URL
      'https://example.com/ch-stroke-3.png', // Replace with actual image URL
    ],
    commonMistakes: [
      'Not clearly distinguishing it from ㅈ',
      'Uneven top strokes',
    ],
    exampleWord: {
      word: '차',
      meaning: 'car/tea',
      pronunciation: 'cha',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-ch.mp3',
  },
  {
    character: 'ㅋ',
    romanization: 'k',
    type: 'consonant',
    ipa: '[kʰ]',
    strokeOrder: [
      'https://example.com/k-stroke-1.png', // Replace with actual image URL
      'https://example.com/k-stroke-2.png', // Replace with actual image URL
      'https://example.com/k-stroke-3.png', // Replace with actual image URL
    ],
    commonMistakes: [
      'Making the diagonal lines too curved',
      'Incorrect proportions',
    ],
    exampleWord: {
      word: '코',
      meaning: 'nose',
      pronunciation: 'ko',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-k.mp3',
  },
  {
    character: 'ㅌ',
    romanization: 't',
    type: 'consonant',
    ipa: '[tʰ]',
    strokeOrder: [
      'https://example.com/t-stroke-1.png', // Replace with actual image URL
      'https://example.com/t-stroke-2.png', // Replace with actual image URL
      'https://example.com/t-stroke-3.png', // Replace with actual image URL
    ],
    commonMistakes: [
      'Uneven top horizontal lines',
      'Vertical line not centered',
    ],
    exampleWord: {
      word: '타조',
      meaning: 'ostrich',
      pronunciation: 'tajo',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-t.mp3',
  },
  {
    character: 'ㅍ',
    romanization: 'p',
    type: 'consonant',
    ipa: '[pʰ]',
    strokeOrder: [
      'https://example.com/p-stroke-1.png', // Replace with actual image URL
      'https://example.com/p-stroke-2.png', // Replace with actual image URL
      'https://example.com/p-stroke-3.png', // Replace with actual image URL
      'https://example.com/p-stroke-4.png', // Replace with actual image URL
    ],
    commonMistakes: ['Uneven horizontal lines', 'Vertical lines not aligned'],
    exampleWord: {
      word: '포도',
      meaning: 'grape',
      pronunciation: 'podo',
    },
    audioSrc:
      'https://d27hu3tsvatwlt.cloudfront.net/mfsource/kr/main/alpha_m/kr-m-zy-p.mp3',
  },
];

// Filter vowels and consonants as before
const vowels = alphabet.filter((letter) => letter.type === 'vowel');
const consonants = alphabet.filter((letter) => letter.type === 'consonant');

// Define an array for common verbs chapters (10 chapters)
const verbsChapters = [
  {
    chapter: 1,
    audioSrc:
      'https://traffic.libsyn.com/clean/secure/talktomeinkorean/TTMIK-Lesson-L1L3.mp3?dest-id=12619',
  },
  {
    chapter: 2,
    audioSrc:
      'https://traffic.libsyn.com/clean/secure/talktomeinkorean/My_Recent_Trip_to_London__Paris.mp3?dest-id=12619',
  },
  {
    chapter: 3,
    audioSrc:
      'https://traffic.libsyn.com/clean/secure/talktomeinkorean/Our_Small_and_Strange_Obsessions.mp3?dest-id=12619 ',
  },
  {
    chapter: 4,
    audioSrc:
      'https://traffic.libsyn.com/clean/secure/talktomeinkorean/ttmik-l6l1.mp3?dest-id=12619',
  },
  {
    chapter: 5,
    audioSrc:
      'https://traffic.libsyn.com/clean/secure/talktomeinkorean/ttmik-l7l1.mp3?dest-id=12619',
  },
  {
    chapter: 6,
    audioSrc:
      'https://traffic.libsyn.com/clean/secure/talktomeinkorean/ttmik-l4l2.mp3?dest-id=12619',
  },
  {
    chapter: 7,
    audioSrc:
      'https://traffic.libsyn.com/clean/secure/talktomeinkorean/ttmik-l4l2.mp3?dest-id=12619',
  },
  {
    chapter: 8,
    audioSrc:
      'https://traffic.libsyn.com/clean/secure/talktomeinkorean/ttmik-l6l1.mp3?dest-id=12619',
  },
  {
    chapter: 9,
    audioSrc:
      'https://traffic.libsyn.com/clean/secure/talktomeinkorean/ttmik-l7l1.mp3?dest-id=12619',
  },
  {
    chapter: 10,
    audioSrc:
      'https://traffic.libsyn.com/clean/secure/talktomeinkorean/ttmik-l9l1.mp3?dest-id=12619',
  },
];

const Alphabet = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

  const generatePDF = async () => {
    const element = document.getElementById('alphabet-content');
    const canvas = await html2canvas(element!);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('hangul-guide.pdf');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">한글 (Hangul)</h1>
          <p className="mt-2 text-gray-600">
            Master the Korean alphabet system
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={generatePDF}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Guide
          </button>
          <button className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            <BookOpen className="w-4 h-4 mr-2" />
            Start Practice
          </button>
        </div>
      </div>

      <div id="alphabet-content">
        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List className="flex space-x-4 mb-8">
            <Tabs.Trigger
              value="overview"
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Overview
            </Tabs.Trigger>
            <Tabs.Trigger
              value="consonants"
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'consonants'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Consonants (자음)
            </Tabs.Trigger>
            <Tabs.Trigger
              value="vowels"
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'vowels'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Vowels (모음)
            </Tabs.Trigger>
            <Tabs.Trigger
              value="practice"
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'practice'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Practice
            </Tabs.Trigger>
            <Tabs.Trigger
              value="verbs"
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'verbs'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Verbs
            </Tabs.Trigger>
          </Tabs.List>

          {/* Overview Tab */}
          <Tabs.Content value="overview" className="outline-none">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Introduction to Hangul
              </h2>
              <p className="text-gray-700 mb-6">
                Hangul is the Korean alphabet system, created by King Sejong the
                Great in 1443. It consists of 14 consonants (자음) and 10 basic
                vowels (모음), which can be combined to form syllable blocks.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Overview of Basic Consonants */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Basic Consonants (자음)
                  </h3>
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {consonants.map((letter) => (
                      <div
                        key={letter.character}
                        onClick={() => setSelectedLetter(letter)}
                        className="p-2 rounded-lg text-xl font-bold bg-white shadow-sm hover:shadow-md transition-shadow relative cursor-pointer"
                      >
                        <span>{letter.character}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            new Audio(letter.audioSrc).play();
                          }}
                          className="absolute top-1 right-1 p-1"
                        >
                          <Play className="w-4 h-4 text-indigo-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Overview of Basic Vowels */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Basic Vowels (모음)
                  </h3>
                  <div className="grid grid-cols-5 gap-2 text-center">
                    {vowels.map((letter) => (
                      <div
                        key={letter.character}
                        onClick={() => setSelectedLetter(letter)}
                        className="p-2 rounded-lg text-xl font-bold bg-white shadow-sm hover:shadow-md transition-shadow relative cursor-pointer"
                      >
                        <span>{letter.character}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            new Audio(letter.audioSrc).play();
                          }}
                          className="absolute top-1 right-1 p-1"
                        >
                          <Play className="w-4 h-4 text-indigo-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Content>

          {/* Consonants Tab with Letter Cards */}
          <Tabs.Content value="consonants" className="outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consonants.map((letter) => (
                <LetterCard
                  key={letter.character}
                  letter={letter}
                  onSelect={setSelectedLetter}
                />
              ))}
            </div>
          </Tabs.Content>

          {/* Vowels Tab with Letter Cards */}
          <Tabs.Content value="vowels" className="outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vowels.map((letter) => (
                <LetterCard
                  key={letter.character}
                  letter={letter}
                  onSelect={setSelectedLetter}
                />
              ))}
            </div>
          </Tabs.Content>

          {/* Practice Tab */}
          <Tabs.Content value="practice" className="outline-none">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Writing Practice Guidelines
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Basic Principles
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Write from top to bottom</li>
                      <li>Write from left to right</li>
                      <li>Maintain consistent character size</li>
                      <li>Follow proper stroke order</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Syllable Structure
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Initial consonant (초성)</li>
                      <li>Medial vowel (중성)</li>
                      <li>Optional final consonant (종성)</li>
                      <li>Example: 한 (han) = ㅎ + ㅏ + ㄴ</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Tabs.Content>

          {/* Verbs Tab */}
          <Tabs.Content value="verbs" className="outline-none">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Common Verbs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {verbsChapters.map((verb) => (
                  <div
                    key={verb.chapter}
                    className="bg-gray-50 p-4 rounded-lg text-center"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      Chapter {verb.chapter}
                    </h3>
                    <button
                      onClick={() => new Audio(verb.audioSrc).play()}
                      className="flex items-center justify-center p-2 bg-indigo-600 text-white rounded-full w-12 h-12 mx-auto"
                    >
                      <Play className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>

      {/* Details Dialog */}
      <Dialog.Root
        open={!!selectedLetter}
        onOpenChange={() => setSelectedLetter(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl">
            {selectedLetter && (
              <div>
                <Dialog.Title className="flex items-center text-2xl font-bold text-gray-900 mb-4">
                  <span>
                    {selectedLetter.character} ({selectedLetter.romanization})
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      new Audio(selectedLetter.audioSrc).play();
                    }}
                    className="ml-3 p-1"
                  >
                    <Play className="w-6 h-6 text-indigo-600" />
                  </button>
                </Dialog.Title>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Stroke Order</h3>
                    <div className="space-y-4">
                      {selectedLetter.strokeOrder.map((stroke, index) => (
                        <div key={index} className="relative">
                          <img
                            src={stroke}
                            alt={'Stroke ${index + 1}'}
                            className="w-full rounded-lg border"
                          />
                          <span className="absolute top-2 left-2 bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                            {index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Details</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          IPA Pronunciation
                        </p>
                        <p className="text-lg font-medium font-mono">
                          {selectedLetter.ipa}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Example Word</p>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xl font-bold">
                            {selectedLetter.exampleWord.word}
                          </p>
                          <p className="text-sm text-gray-600">
                            {selectedLetter.exampleWord.pronunciation}
                          </p>
                          <p className="text-sm text-gray-600">
                            Meaning: {selectedLetter.exampleWord.meaning}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">
                    Common Mistakes to Avoid
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {selectedLetter.commonMistakes.map((mistake, index) => (
                      <li key={index}>{mistake}</li>
                    ))}
                  </ul>
                </div>
                <Dialog.Close className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Dialog.Close>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

interface LetterCardProps {
  letter: Letter;
  onSelect: (letter: Letter) => void;
}

const LetterCard: React.FC<LetterCardProps> = ({ letter, onSelect }) => {
  const handlePlayAudio = (event: React.MouseEvent) => {
    event.stopPropagation();
    new Audio(letter.audioSrc).play();
  };

  return (
    <button
      onClick={() => onSelect(letter)}
      className="bg-white rounded-xl shadow-lg p-6 text-left hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-6xl font-bold text-indigo-600">
            {letter.character}
          </span>
          <span className="text-2xl font-bold text-gray-400 ml-2">
            {letter.romanization}
          </span>
        </div>
        <button onClick={handlePlayAudio} className="p-1">
          <Play className="w-6 h-6 text-indigo-600" />
        </button>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Example Word</p>
          <div className="bg-gray-50 px-3 py-2 rounded-lg mt-1">
            <p className="text-lg font-bold">{letter.exampleWord.word}</p>
            <p className="text-sm text-gray-600">
              {letter.exampleWord.meaning}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            Click to view stroke order and details
          </p>
        </div>
      </div>
    </button>
  );
};

export default Alphabet;
