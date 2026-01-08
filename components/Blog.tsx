
import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowLeft, ArrowRight, BookOpen, Plus, Send, X, MessageSquare, Trash2 } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

interface Comment {
  id: number;
  postId: number;
  author: string;
  text: string;
  date: string;
}

const INITIAL_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The AI Revolution in Short-Form Video: 2026 Edition",
    excerpt: "Hyper-personalized content is the new baseline. Learn how iGROWTHIC uses generative AI to tailor every frame to the viewer's persona...",
    content: `
      <h2>The Shift to Short-Form</h2>
      <p>By 2026, short-form video has evolved. It's no longer just about 'stopping the scroll'; it's about algorithmic resonance. AI now predicts viewer fatigue before the first frame even plays.</p>
      <h3>The AI Hook Strategy</h3>
      <p>The first 1.5 seconds are now the only battleground. We utilize predictive eye-tracking heatmaps to ensure the viewer's focus is locked exactly where the conversion happens.</p>
      <h3>Platform Dominance</h3>
      <p>Instagram and YouTube are now integrated with mixed-reality layers. Short-form isn't just content; it's an immersive entry point into your brand's digital world.</p>
    `,
    author: "Growth Strategy Team",
    date: "Jan 12, 2026",
    category: "Video Production",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Mastering Hyper-Local SEO for Real Estate in 2026",
    excerpt: "Zero-click searches are dominating. Learn how to become the featured snippet for every high-value real estate query in your city.",
    content: `
      <h2>The Local Authority Framework</h2>
      <p>Real estate SEO in 2026 is about 'Answer Engine Optimization'. When a client asks their AI assistant for 'best investment property near me', your brand must be the only answer.</p>
      <h3>Virtual Neighborhood Ownership</h3>
      <p>Google's 2026 updates prioritize real-time social signals. Your local dominance is measured by how often people physically visit and digitally interact with your curated neighborhood tags.</p>
    `,
    author: "SEO Dept",
    date: "Feb 10, 2026",
    category: "Real Estate",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "The Death of Generic Branding",
    excerpt: "In the age of AI saturation, authenticity is the only luxury. Discover how we build brands that feel human in a digital-first world.",
    content: `
      <h2>The Commoditization Trap</h2>
      <p>In 2026, AI can build a logo and a website in 10 seconds. What it can't build is a soul. Brand identity is now the only moat that can't be crossed by code.</p>
      <h3>Building Your Story</h3>
      <p>A brand is the sum of every interaction. In 2026, we focus on 'micro-moments' of delight that prove there's a human behind the screen.</p>
    `,
    author: "Creative Director",
    date: "Mar 08, 2026",
    category: "Branding",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Founder-Led Growth: The B2B Playbook for 2026",
    excerpt: "Enterprise buyers no longer talk to sales reps first. They follow founders. Learn how to scale your personal brand to 7 figures.",
    content: `
      <h2>The Human-to-Human Era</h2>
      <p>B2B marketing has shifted. Companies don't buy from companies; people buy from people they feel they've known for years via LinkedIn and professional networks.</p>
      <h3>The Influence Funnel</h3>
      <p>Your personal brand is your new business development department. By the time a client reaches out, they are already 80% through the sales cycle thanks to your consistent digital presence.</p>
    `,
    author: "B2B Specialist",
    date: "Apr 05, 2026",
    category: "Growth Hacking",
    readTime: "7 min read"
  }
];

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem('igrowthic_comments');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Comment Form State
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  // Persist comments
  useEffect(() => {
    localStorage.setItem('igrowthic_comments', JSON.stringify(comments));
  }, [comments]);

  // Form State for new posts
  const [newPost, setNewPost] = useState({
    title: '',
    category: 'Strategy',
    excerpt: '',
    content: ''
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const wordCount = newPost.content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200)) + " min read";
    
    const postToAdd: BlogPost = {
      id: Date.now(),
      title: newPost.title,
      category: newPost.category,
      excerpt: newPost.excerpt,
      content: newPost.content.replace(/\n/g, '<br />'),
      author: "Admin User",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: readTime
    };

    setPosts([postToAdd, ...posts]);
    setIsCreating(false);
    setNewPost({ title: '', category: 'Strategy', excerpt: '', content: '' });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !commentAuthor.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      postId: selectedPost.id,
      author: commentAuthor,
      text: commentText,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setComments([...comments, newComment]);
    setCommentAuthor('');
    setCommentText('');
  };

  const deleteComment = (id: number) => {
    setComments(comments.filter(c => c.id !== id));
  };

  if (selectedPost) {
    const postComments = comments.filter(c => c.postId === selectedPost.id);

    return (
      <section className="py-20 px-6 max-w-4xl mx-auto min-h-screen">
        <button 
          onClick={() => setSelectedPost(null)}
          className="group mb-12 flex items-center gap-2 text-gray-500 hover:text-blue-500 font-bold transition-colors"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </button>

        <article className="glass-card p-8 md:p-16 rounded-[40px] animate-in slide-in-from-bottom-8 duration-700 mb-12">
          <header className="mb-10 text-center">
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-500 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              {selectedPost.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-black mb-6 leading-tight">
              {selectedPost.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm font-semibold">
              <span className="flex items-center gap-2"><User size={16} /> {selectedPost.author}</span>
              <span className="flex items-center gap-2"><Calendar size={16} /> {selectedPost.date}</span>
              <span className="flex items-center gap-2"><BookOpen size={16} /> {selectedPost.readTime}</span>
            </div>
          </header>

          <div 
            className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6 mb-16 pb-16 border-b border-black/5"
            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          />

          {/* Comments Section */}
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-heading font-black uppercase tracking-tight">Community Discussion</h3>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">{postComments.length} Comments</p>
              </div>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="space-y-4 bg-gray-50/50 p-6 rounded-3xl border border-black/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Your Name</label>
                  <input 
                    type="text"
                    required
                    placeholder="Growth Enthusiast"
                    className="w-full px-4 py-3 bg-white border border-black/5 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-sm font-bold"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Comment</label>
                <textarea 
                  required
                  placeholder="Share your thoughts on this strategy..."
                  className="w-full px-4 py-3 bg-white border border-black/5 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-sm min-h-[100px] resize-none"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className="px-8 py-3 bg-blue-500 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                Post Comment <Send size={14} />
              </button>
            </form>

            {/* Comment List */}
            <div className="space-y-6">
              {postComments.length === 0 ? (
                <p className="text-center py-10 text-gray-400 font-medium italic">Be the first to share your insights on this post.</p>
              ) : (
                postComments.map((comment) => (
                  <div key={comment.id} className="group relative bg-white p-6 rounded-3xl border border-black/5 hover:shadow-lg transition-all animate-in slide-in-from-left-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center font-black text-xs uppercase">
                          {comment.author.charAt(0)}
                        </div>
                        <span className="font-black text-sm text-gray-800">{comment.author}</span>
                        <span className="text-[10px] font-bold text-gray-300 uppercase ml-2">{comment.date}</span>
                      </div>
                      <button 
                        onClick={() => deleteComment(comment.id)}
                        className="p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed pl-10">
                      {comment.text}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <footer className="mt-16 pt-10 border-t border-black/5 text-center">
            <h4 className="text-xl font-heading font-bold mb-4">Want more growth secrets?</h4>
            <a 
              href="https://wa.me/919892299010" 
              className="inline-flex items-center gap-2 px-10 py-4 bg-blue-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
            >
              Consult an Expert <ArrowRight size={18} />
            </a>
          </footer>
        </article>
      </section>
    );
  }

  if (isCreating) {
    return (
      <section className="py-20 px-6 max-w-3xl mx-auto min-h-screen">
        <button 
          onClick={() => setIsCreating(false)}
          className="group mb-8 flex items-center gap-2 text-gray-500 hover:text-blue-500 font-bold transition-colors"
        >
          <X size={20} />
          Cancel Draft
        </button>

        <div className="glass-card p-10 rounded-[32px] animate-in slide-in-from-bottom-8 duration-500">
          <h2 className="text-3xl font-heading font-black mb-8 uppercase">Create New <span className="text-gradient">Insight</span></h2>
          
          <form onSubmit={handleCreateSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Article Title</label>
                <input 
                  required
                  type="text"
                  placeholder="The Future of..."
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none font-bold"
                  value={newPost.title}
                  onChange={e => setNewPost({...newPost, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category</label>
                <select 
                  className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none font-bold appearance-none cursor-pointer"
                  value={newPost.category}
                  onChange={e => setNewPost({...newPost, category: e.target.value})}
                >
                  <option>Strategy</option>
                  <option>Video Production</option>
                  <option>Branding</option>
                  <option>SEO</option>
                  <option>Growth Hacking</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Short Excerpt</label>
              <textarea 
                required
                placeholder="A brief teaser to hook readers..."
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none h-24 resize-none"
                value={newPost.excerpt}
                onChange={e => setNewPost({...newPost, excerpt: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Main Content</label>
              <textarea 
                required
                placeholder="Write your detailed growth secrets here..."
                className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none h-64 resize-none leading-relaxed"
                value={newPost.content}
                onChange={e => setNewPost({...newPost, content: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-3 shadow-xl"
            >
              <Send size={18} />
              Publish Insight
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
        <div className="text-left">
          <p className="text-blue-500 text-xs font-black tracking-widest uppercase mb-4">The Repository</p>
          <h2 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter">
            DIGITAL <span className="text-gradient">INTELLIGENCE</span>
          </h2>
          <p className="text-gray-500 font-medium max-w-2xl mt-4">
            Expert insights for 2026 on scaling brands, optimizing conversions, and dominating the digital ecosystem.
          </p>
        </div>
        
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-blue-500 text-blue-500 font-black uppercase tracking-widest text-xs rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-lg hover:-translate-y-1"
        >
          <Plus size={18} />
          Create New Insight
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article 
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="group glass-card p-8 rounded-[32px] cursor-none flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-transparent hover:border-blue-100"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 bg-blue-50 text-blue-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
                {post.category}
              </span>
              <span className="text-gray-300 font-bold text-xs uppercase">{post.readTime}</span>
            </div>
            
            <h3 className="text-2xl font-heading font-black mb-4 group-hover:text-blue-500 transition-colors">
              {post.title}
            </h3>
            
            <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-black/5">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                {post.date}
              </span>
              <button className="flex items-center gap-2 text-sm font-bold text-blue-500 group-hover:translate-x-1 transition-transform">
                Read Deep Dive <ArrowRight size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blog;
