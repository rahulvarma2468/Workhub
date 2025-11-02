"use client";
import React, { useState, FC, FormEvent } from 'react';

// A small component for the loading spinner
const Spinner: FC = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);


// Types
type ServiceId = 'communication' | 'social' | 'crm' | 'ecommerce' | 'finance' | 'team' | 'content' | 'feedback';

interface Service {
  id: ServiceId;
  title: string;
  description: string;
  color: string;
  icon: string;
}

// Service configuration
const SERVICES: Service[] = [
    {
        id: 'communication',
        title: 'Customer Communication Automation',
        description: 'Automate emails, SMS, and chatbot responses for leads and customers.',
        color: 'bg-blue-100',
        icon: '📧'
      },
      {
        id: 'social',
        title: 'Social Media Management',
        description: 'Schedule posts, track engagement, and generate reports across X, LinkedIn, Instagram.',
        color: 'bg-red-100',
        icon: '🔗'
      },
      {
        id: 'crm',
        title: 'Lead Generation and CRM Sync',
        description: 'Capture leads, enrich data, and sync with CRMs like HubSpot.',
        color: 'bg-green-100',
        icon: '📊'
      },
      {
        id: 'ecommerce',
        title: 'E-Commerce Automation',
        description: 'Automate order notifications, abandoned cart emails, and inventory updates.',
        color: 'bg-yellow-100',
        icon: '🛒'
      },
      {
        id: 'finance',
        title: 'Financial Process Automation',
        description: 'Automate invoicing, payment reminders, and expense tracking.',
        color: 'bg-purple-100',
        icon: '💰'
      },
      {
        id: 'team',
        title: 'Internal Team Coordination',
        description: 'Automate task assignments and project updates.',
        color: 'bg-indigo-100',
        icon: '🤝'
      },
      {
        id: 'content',
        title: 'Content Creation and Publishing',
        description: 'Generate and publish SEO-optimized blog posts or social media content.',
        color: 'bg-pink-100',
        icon: '✍️'
      },
      {
        id: 'feedback',
        title: 'Customer Feedback Analysis',
        description: 'Collect and analyze feedback from surveys or reviews.',
        color: 'bg-orange-100',
        icon: '🧠'
      }
];

const ServiceCard: FC<{ service: Service; onClick: () => void }> = ({ service, onClick }) => (
    <div
      className={`service-card ${service.color} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center text-center`}
      onClick={onClick}
    >
      <div className="text-4xl mb-4">{service.icon}</div>
      <h2 className="text-xl font-bold mb-2">{service.title}</h2>
      <p className="text-gray-600">{service.description}</p>
    </div>
  );

const FeatureCard: FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        {children}
    </div>
)

export default function HomePage() {
  const [activeService, setActiveService] = useState<ServiceId | null>(null);

  // --- State for Blog Publisher ---
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogStatus, setBlogStatus] = useState({ message: '', type: '' });
  const [isPublishing, setIsPublishing] = useState(false);

  // --- State for E-commerce ---
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [ecommerceStatus, setEcommerceStatus] = useState({ message: '', type: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  // --- State for Feedback Analyzer ---
  const [feedback, setFeedback] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [taskStatus, setTaskStatus] = useState({ message: '', type: '' });
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [trelloTitle, setTrelloTitle] = useState('');

  // --- State for Social Poster ---
  const [postText, setPostText] = useState('');
  const [postStatus, setPostStatus] = useState({ message: '', type: '' });
  const [isPosting, setIsPosting] = useState(false);

    // --- State for Lead Follow-up ---
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [leadStatus, setLeadStatus] = useState({ message: '', type: '' });
  const [isSendingFollowUp, setIsSendingFollowUp] = useState(false);


  const handleServiceClick = (serviceId: ServiceId) => {
    setActiveService(serviceId);
  };

  const handleBackClick = () => {
    setActiveService(null);
  };

  const handlePublishBlog = async (e: FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogContent) {
      setBlogStatus({ message: 'Please fill in all fields', type: 'error' });
      return;
    }
    setIsPublishing(true);
    setBlogStatus({ message: 'Publishing blog post...', type: 'info' });
    
    try {
      const response = await fetch('http://localhost:5678/webhook-test/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: blogTitle, content: blogContent })
      });

      if (!response.ok) {
        throw new Error('Failed to publish blog post');
      }

      const result = await response.text();
      setBlogStatus({ message: result, type: 'success' });
      setBlogTitle('');
      setBlogContent('');
    } catch (error) {
      setBlogStatus({ message: 'Failed to publish blog post. Please try again.', type: 'error' });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleUpdateProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!productName || !productPrice) {
      setEcommerceStatus({ message: 'Please fill in all fields', type: 'error' });
      return;
    }
    setIsUpdating(true);
    setEcommerceStatus({ message: 'Updating product...', type: 'info' });
    
    try {
      const response = await fetch('http://localhost:5678/webhook-test/ecommerce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: productName, price: productPrice })
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const result = await response.text();
      setEcommerceStatus({ message: result, type: 'success' });
      setProductName('');
      setProductPrice('');
    } catch (error) {
      setEcommerceStatus({ message: 'Failed to update product. Please try again.', type: 'error' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAnalyzeClick = async (e: FormEvent) => {
    e.preventDefault();
    if (!feedback) return;
    setIsLoading(true);
    setSummary('');
    try {
      const response = await fetch('http://localhost:5678/webhook-test/feedback-summarizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze feedback');
      }

      const result = await response.text();
      setSummary(result);
    } catch (error) {
      setSummary('Failed to analyze feedback. Please try again.');
    }
    setIsLoading(false);
  };

  const handleCreateTaskClick = async (e: FormEvent) => {
    e.preventDefault();
    if (!trelloTitle) {
      setTaskStatus({ message: 'Please enter a task title', type: 'error' });
      return;
    }
    setIsCreatingTask(true);
    setTaskStatus({ message: 'Creating task...', type: 'info' });
    
    try {
      const response = await fetch('http://localhost:5678/webhook-test/trello', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: trelloTitle,
          summary: summary 
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const result = await response.text();
      setTaskStatus({ message: result, type: 'success' });
      setTrelloTitle('');
    } catch (error) {
      setTaskStatus({ message: 'Failed to create task. Please try again.', type: 'error' });
    } finally {
      setIsCreatingTask(false);
    }
  };

  const handlePostToSocial = async (e: FormEvent) => {
    e.preventDefault();
    if (!postText) {
      setPostStatus({ message: 'Please enter text for your post', type: 'error' });
      return;
    }
    setIsPosting(true);
    setPostStatus({ message: 'Posting...', type: 'info' });
    
    try {
      const response = await fetch('http://localhost:5678/webhook-test/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: postText })
      });

      if (!response.ok) {
        throw new Error('Failed to post to social media');
      }

      const result = await response.text();
      setPostStatus({ message: result, type: 'success' });
      setPostText('');
    } catch (error) {
      setPostStatus({ message: 'Failed to post to social media. Please try again.', type: 'error' });
    } finally {
      setIsPosting(false);
    }
  };

  const handleSendFollowUp = async (e: FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail || !leadPhone || !leadMessage) {
      setLeadStatus({ message: 'Please fill in all fields', type: 'error' });
      return;
    }
    setIsSendingFollowUp(true);
    setLeadStatus({ message: 'Sending follow-up...', type: 'info' });
    
    try {
      const response = await fetch('http://localhost:5678/webhook-test/communication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: leadName,
          email: leadEmail,
          phone: leadPhone,
          message: leadMessage
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send follow-up');
      }

      const result = await response.text();
      setLeadStatus({ message: result, type: 'success' });
      setLeadName('');
      setLeadEmail('');
      setLeadPhone('');
      setLeadMessage('');
    } catch (error) {
      setLeadStatus({ message: 'Failed to send follow-up. Please try again.', type: 'error' });
    } finally {
      setIsSendingFollowUp(false);
    }
  };

  const renderServiceContent = () => {
    if (!activeService) return null;

    const service = SERVICES.find(s => s.id === activeService);
    if (!service) return null;

    let content;

    switch (activeService) {
        case 'content':
            content = (
                <form onSubmit={handlePublishBlog} className="space-y-4">
                    <input type="text" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} placeholder="Blog Post Title" className="w-full p-2 border rounded" />
                    <textarea value={blogContent} onChange={(e) => setBlogContent(e.target.value)} placeholder="Write your blog post content..." rows={8} className="w-full p-2 border rounded" />
                    <button type="submit" disabled={isPublishing} className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-400 flex items-center justify-center">
                        {isPublishing && <Spinner />}
                        {isPublishing ? 'Publishing...' : 'Publish to WordPress'}
                    </button>
                    {blogStatus.message && <div className={`p-2 rounded text-center ${blogStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{blogStatus.message}</div>}
                </form>
            );
            break;
        case 'ecommerce':
            content = (
                <form onSubmit={handleUpdateProduct} className="space-y-4">
                    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" className="w-full p-2 border rounded" />
                    <input type="text" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="Product Price" className="w-full p-2 border rounded" />
                    <button type="submit" disabled={isUpdating} className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-400 flex items-center justify-center">
                        {isUpdating && <Spinner />}
                        {isUpdating ? 'Updating...' : 'Update Product'}
                    </button>
                    {ecommerceStatus.message && <div className={`p-2 rounded text-center ${ecommerceStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{ecommerceStatus.message}</div>}
                </form>
            );
            break;
        case 'communication':
            content = (
                <form onSubmit={handleSendFollowUp} className="space-y-4">
                    <input type="text" value={leadName} onChange={(e) => setLeadName(e.target.value)} placeholder="Lead's Name" className="w-full p-2 border rounded" />
                    <input type="email" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} placeholder="Lead's Email" className="w-full p-2 border rounded" />
                    <input type="text" value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} placeholder="Lead's Phone (e.g., +15551234567)" className="w-full p-2 border rounded" />
                    <textarea value={leadMessage} onChange={(e) => setLeadMessage(e.target.value)} placeholder="Initial message or query..." rows={3} className="w-full p-2 border rounded" />
                    <button type="submit" disabled={isSendingFollowUp} className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-400 flex items-center justify-center">
                        {isSendingFollowUp && <Spinner />}
                        {isSendingFollowUp ? 'Sending...' : 'Trigger Follow-Up'}
                    </button>
                    {leadStatus.message && <div className={`p-2 rounded text-center ${leadStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{leadStatus.message}</div>}
                </form>
            );
            break;
        case 'feedback':
            content = (
                <form onSubmit={handleAnalyzeClick} className="space-y-4">
                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Paste customer feedback here..." rows={4} className="w-full p-2 border rounded" />
                    <button type="submit" disabled={isLoading} className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-400 flex items-center justify-center">
                        {isLoading && <Spinner />}
                        {isLoading ? 'Analyzing...' : 'Analyze Feedback'}
                    </button>
                    {summary && (
                        <div className="space-y-4 pt-4 border-t">
                            <h3 className="font-bold">AI Summary:</h3>
                            <p className="bg-gray-100 p-2 rounded">{summary}</p>
                            <input type="text" value={trelloTitle} onChange={(e) => setTrelloTitle(e.target.value)} placeholder="Enter title for Trello task..." className="w-full p-2 border rounded" />
                            <button onClick={handleCreateTaskClick} disabled={isCreatingTask || !trelloTitle} className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-400 flex items-center justify-center">
                                {isCreatingTask && <Spinner />}
                                {isCreatingTask ? 'Creating...' : 'Create Trello Task'}
                            </button>
                        </div>
                    )}
                    {taskStatus.message && <div className={`p-2 rounded text-center ${taskStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{taskStatus.message}</div>}
                </form>
            );
            break;
        case 'social':
            content = (
                <form onSubmit={handlePostToSocial} className="space-y-4">
                    <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Write your social media post here..." rows={5} className="w-full p-2 border rounded" />
                    <button type="submit" disabled={isPosting} className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-400 flex items-center justify-center">
                        {isPosting && <Spinner />}
                        {isPosting ? 'Posting...' : 'Post to Social Media'}
                    </button>
                    {postStatus.message && <div className={`p-2 rounded text-center ${postStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{postStatus.message}</div>}
                </form>
            );
            break;
        default:
            content = <p>This service is not yet implemented.</p>;
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl relative">
                <button onClick={handleBackClick} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                <FeatureCard title={service.title} description={service.description}>
                    {content}
                </FeatureCard>
            </div>
        </div>
    )
  };

  return (
    <main className="p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800">WorkflowHub Dashboard 🚀</h1>
        <p className="text-xl text-gray-500 mt-2">Your Automation Powerhouse</p>
      </header>
      
      {!activeService ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map(service => (
            <ServiceCard key={service.id} service={service} onClick={() => handleServiceClick(service.id)} />
          ))}
        </div>
      ) : (
        renderServiceContent()
      )}
    </main>
  );
}