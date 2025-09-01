'use client';

import { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';
import { GetTagsList } from '@/actions/BlogActions';

interface TagInputProps {
  initialTags?: string[];
  onTagsChange?: (tags: string[]) => void;
}

export default function TagInput({ initialTags = [], onTagsChange }: TagInputProps) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadSuggestions = async () => {
      const results = await GetTagsList()
      const filtered = results.filter((tag) => !tags.includes(tag));
      setSuggestions(filtered);
    };
    loadSuggestions();
  }, [tags]);

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag)) {
      const updatedTags = [...tags, tag.trim()];
      setTags(updatedTags);
      onTagsChange?.(updatedTags);
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const removeTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    onTagsChange?.(updatedTags);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border border-black p-4 max-w-3xl relative bg-white">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center border border-black px-3 py-1 rounded font-semibold text-sm"
        >
          <span>{tag}</span>
          <button
            onClick={() => removeTag(index)}
            className="ml-2 text-xl leading-none hover:text-red-600"
          >
            ×
          </button>
        </div>
      ))}

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setTimeout(() => setShowSuggestions(true), 150)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder="Type a tag..."
          className="border border-gray-400 px-2 py-1 text-sm focus:outline-none focus:ring focus:border-blue-400"
        />

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 w-full mt-1 border border-black bg-white max-h-40 overflow-y-auto z-10 shadow">
            {suggestions.map((sugg, i) => (
              <div
                key={`suggestion${i}`}
                onClick={() => addTag(sugg)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer font-semibold text-sm"
              >
                {sugg}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
