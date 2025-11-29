import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import chokidar from 'chokidar';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '..', 'src', 'blog');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'data');

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function generateBlogData() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.log('Blog directory does not exist');
    return;
  }

  const fileNames = fs.readdirSync(BLOG_DIR);
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(BLOG_DIR, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      
      // Get the first 100 characters of the content as excerpt
      const content = matterResult.content;
      const excerpt = content.substring(0, 100).trim() + (content.length > 100 ? '...' : '');
      
      // Combine the data with the id
      return {
        id,
        title: matterResult.data.title,
        categories: matterResult.data.categories,
        tags: matterResult.data.tags,
        date: matterResult.data.date,
        excerpt,
        content
      };
    });
  
  // Sort posts by date
  const sortedPosts = allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  // Write to a JSON file
  const outputPath = path.join(OUTPUT_DIR, 'blogData.json');
  fs.writeFileSync(outputPath, JSON.stringify(sortedPosts, null, 2));
  
  console.log(`[${new Date().toISOString()}] Generated blog data for ${sortedPosts.length} posts`);
}

// Generate initial data
generateBlogData();

// Watch for changes
const watcher = chokidar.watch(BLOG_DIR, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

console.log(`Watching for changes in ${BLOG_DIR}...`);

watcher
  .on('add', path => {
    console.log(`File ${path} has been added`);
    generateBlogData();
  })
  .on('change', path => {
    console.log(`File ${path} has been changed`);
    generateBlogData();
  })
  .on('unlink', path => {
    console.log(`File ${path} has been removed`);
    generateBlogData();
  });