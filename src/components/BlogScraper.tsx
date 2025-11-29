import React, { useState } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Textarea } from '@heroui/input';

interface ScrapeResult {
  title: string;
  filename: string;
  filePath: string;
  date: string;
}

const BlogScraper: React.FC = () => {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState('');
  const [selectors, setSelectors] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSingleScrape = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const selectorsObj = selectors ? JSON.parse(selectors) : {};
      
      const response = await fetch('http://localhost:3001/api/scrape/single', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, selectors: selectorsObj }),
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error || 'Failed to scrape blog post');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while scraping');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMultipleScrape = async () => {
    if (!urls) {
      setError('Please enter URLs');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const urlsArray = urls.split('\n').filter(u => u.trim());
      const selectorsObj = selectors ? JSON.parse(selectors) : {};
      
      const response = await fetch('http://localhost:3001/api/scrape/multiple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: urlsArray, selectors: selectorsObj }),
      });

      const data = await response.json();
      
      if (data.success) {
        setResult({
          message: data.message,
          count: data.count,
          results: data.results
        });
      } else {
        setError(data.error || 'Failed to scrape blog posts');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while scraping');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Blog Scraper</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Single URL Scraping</h3>
          <Input
            placeholder="Enter blog post URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mb-3"
          />
          <Button
            onPress={handleSingleScrape}
            isLoading={isLoading}
            color="primary"
            className="w-full"
          >
            Scrape Single Post
          </Button>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-3">Multiple URLs Scraping</h3>
          <Textarea
            placeholder="Enter URLs (one per line)"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            className="mb-3"
            minRows={3}
          />
          <Button
            onPress={handleMultipleScrape}
            isLoading={isLoading}
            color="secondary"
            className="w-full"
          >
            Scrape Multiple Posts
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">CSS Selectors (Optional)</h3>
        <Textarea
          placeholder='{ "title": "h1", "content": "article", "date": "time" }'
          value={selectors}
          onChange={(e) => setSelectors(e.target.value)}
          minRows={3}
        />
        <p className="text-sm text-default-500 mt-1">
          JSON object with CSS selectors for extracting content. Leave empty to use defaults.
        </p>
      </div>
      
      {error && (
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-danger-800">Error</h4>
          <p className="text-danger-700">{error}</p>
        </div>
      )}
      
      {result && (
        <div className="bg-success-50 border border-success-200 rounded-lg p-4">
          <h4 className="font-semibold text-success-800">Success!</h4>
          {result.message && <p className="text-success-700">{result.message}</p>}
          {result.filename && (
            <p className="text-success-700 mt-2">
              Saved as: <code className="bg-success-100 p-1 rounded">{result.filename}</code>
            </p>
          )}
          {result.count && (
            <p className="text-success-700 mt-2">
              Scraped {result.count} blog posts
            </p>
          )}
          {result.results && (
            <div className="mt-3">
              <h5 className="font-medium text-success-800">Scraped Posts:</h5>
              <ul className="list-disc pl-5 mt-2">
                {result.results.map((res: ScrapeResult, index: number) => (
                  <li key={index} className="text-success-700">
                    {res.title} → {res.filename}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-8 p-4 bg-default-100 rounded-lg">
        <h4 className="font-semibold mb-2">How to use:</h4>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Start the scraping API server: <code className="bg-default-200 p-1 rounded">npm run scrape-api</code></li>
          <li>Enter a blog post URL or multiple URLs</li>
          <li>Optionally customize CSS selectors for the target website</li>
          <li>Click "Scrape Single Post" or "Scrape Multiple Posts"</li>
          <li>Scraped content will be saved as Markdown files in <code className="bg-default-200 p-1 rounded">src/blog</code></li>
          <li>Run <code className="bg-default-200 p-1 rounded">npm run dev:watch</code> to see the new posts in your blog</li>
        </ol>
      </div>
    </div>
  );
};

export default BlogScraper;