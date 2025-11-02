"use client";

import { useState } from 'react';

// A small component for the loading spinner
const Spinner = () => <div className="spinner"></div>;

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
    color: 'rgb(252, 249, 234)',
    icon: '📧'
  },
  {
    id: 'social',
    title: 'Social Media Management',
    description: 'Schedule posts, track engagement, and generate reports across X, LinkedIn, Instagram.',
    color: 'rgb(255, 164, 164)',
    icon: '🔗'
  },
  {
    id: 'crm',
    title: 'Lead Generation and CRM Sync',
    description: 'Capture leads, enrich data, and sync with CRMs like HubSpot.',
    color: 'rgb(186, 223, 219)',
    icon: '📊'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Automation',
    description: 'Automate order notifications, abandoned cart emails, and inventory updates.',
    color: 'rgb(252, 249, 234)',
    icon: '🛒'
  },
  {
    id: 'finance',
    title: 'Financial Process Automation',
    description: 'Automate invoicing, payment reminders, and expense tracking.',
    color: 'rgb(255, 189, 189)',
    icon: '💰'
  },
  {
    id: 'team',
    title: 'Internal Team Coordination',
    description: 'Automate task assignments and project updates.',
    color: 'rgb(186, 223, 219)',
    icon: '🤝'
  },
  {
    id: 'content',
    title: 'Content Creation and Publishing',
    description: 'Generate and publish SEO-optimized blog posts or social media content.',
    color: 'rgb(252, 249, 234)',
    icon: '✍️'
  },
  {
    id: 'feedback',
    title: 'Customer Feedback Analysis',
    description: 'Collect and analyze feedback from surveys or reviews.',
    color: 'rgb(255, 164, 164)',
    icon: '🧠'
  }
];

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

  // --- State for Document Drafter ---
  const [topic, setTopic] = useState('');
  const [docStatus, setDocStatus] = useState({ message: '', type: '' });
  const [isDrafting, setIsDrafting] = useState(false);

  // --- State for Lead Follow-up ---
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [leadStatus, setLeadStatus] = useState({ message: '', type: '' });
  const [isSendingFollowUp, setIsSendingFollowUp] = useState(false);

  // --- Logic for Blog Publisher ---
  const handlePublishBlog = async () => {
    if (!blogTitle || !blogContent) return;
    setIsPublishing(true);
    setBlogStatus({ message: 'Publishing blog post...', type: '' });
    const blogWebhookUrl = 'http://localhost:5678/webhook-test/1d500b38-21fd-4ae2-9960-3ecc8d8cc81b';

    try {
      const response = await fetch(blogWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: blogTitle,
          content: blogContent
        }),
      });
      if (!response.ok) throw new Error();
      const resultText = await response.text();
      setBlogStatus({ message: resultText, type: 'success' });
      setBlogTitle('');
      setBlogContent('');
    } catch (error) {
      setBlogStatus({ message: '❌ Failed to publish blog post.', type: 'error' });
    } finally {
      setIsPublishing(false);
    }
  };

  // --- Logic for E-commerce ---
  const handleUpdateProduct = async () => {
    if (!productName || !productPrice) return;
    setIsUpdating(true);
    setEcommerceStatus({ message: 'Updating product...', type: '' });
    const ecommerceWebhookUrl = 'http://localhost:5678/webhook-test/ecommerce';

    try {
      const response = await fetch(ecommerceWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: productName,
          price: productPrice
        }),
      });
      if (!response.ok) throw new Error();
      const resultText = await response.text();
      setEcommerceStatus({ message: resultText, type: 'success' });
      setProductName('');
      setProductPrice('');
    } catch (error) {
      setEcommerceStatus({ message: '❌ Failed to update product.', type: 'error' });
    } finally {
      setIsUpdating(false);
    }
  };

  // --- Logic for Feedback Analyzer ---
  const handleAnalyzeClick = async () => {
    if (!feedback) return;
    setIsLoading(true);
    setSummary('');
    setTaskStatus({ message: '', type: '' });
    const feedbackWebhookUrl = 'http://localhost:5678/webhook-test/feedback-summarizer';

    try {
      const response = await fetch(feedbackWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const resultText = await response.text();
      setSummary(resultText);
    } catch (error) {
      setSummary('❌ Failed to get summary.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- Logic for Trello Task Creator ---
  const handleCreateTaskClick = async () => {
    if (!trelloTitle) return;
    setIsCreatingTask(true);
    setTaskStatus({ message: 'Creating task...', type: '' });
    const trelloWebhookUrl = 'http://localhost:5678/webhook-test/ee5f25a5-eeda-4f65-bbdd-c722b922ad8c';

    try {
      const response = await fetch(trelloWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: trelloTitle, summary }),
      });
      if (!response.ok) throw new Error();
      const resultText = await response.text();
      setTaskStatus({ message: resultText, type: 'success' });
    } catch (error) {
      setTaskStatus({ message: '❌ Failed to create task.', type: 'error' });
    } finally {
      setIsCreatingTask(false);
    }
  };

  // --- Logic for Social Poster ---
  const handlePostToSocial = async () => {
    if (!postText) return;
    setIsPosting(true);
    setPostStatus({ message: 'Posting...', type: '' });
    const socialWebhookUrl = 'http://localhost:5678/webhook-test/social-media';

    try {
      const response = await fetch(socialWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postText }),
      });
      if (!response.ok) throw new Error();
      const resultText = await response.text();
      setPostStatus({ message: resultText, type: 'success' });
    } catch (error) {
      setPostStatus({ message: '❌ Failed to post.', type: 'error' });
    } finally {
      setIsPosting(false);
    }
  };

  // --- Logic for Document Drafter ---
  const handleDraftDoc = async () => {
    if (!topic) return;
    setIsDrafting(true);
    setDocStatus({ message: 'AI is drafting the document...', type: '' });
    const docWebhookUrl = 'http://localhost:5678/webhook-test/061033c4-37fc-493b-8d13-8cc5fad53649';

    try {
      const response = await fetch(docWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      if (!response.ok) throw new Error();
      const resultText = await response.text();
      setDocStatus({ message: resultText, type: 'success' });
    } catch (error) {
      setDocStatus({ message: '❌ Failed to draft document.', type: 'error' });
    } finally {
      setIsDrafting(false);
    }
  };

  // --- Logic for Lead Follow-up ---
  const handleSendFollowUp = async () => {
    if (!leadName || !leadEmail || !leadPhone || !leadMessage) return;
    setIsSendingFollowUp(true);
    setLeadStatus({ message: 'Sending follow-up...', type: '' });
    const leadWebhookUrl = 'http://localhost:5678/webhook-test/02ffee88-ab73-43e2-9899-91f43546efae';

    try {
      const response = await fetch(leadWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          phone: leadPhone,
          message: leadMessage
        }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const resultText = await response.text();
      setLeadStatus({ message: resultText, type: 'success' });
      setLeadName('');
      setLeadEmail('');
      setLeadPhone('');
      setLeadMessage('');
    } catch (error) {
      setLeadStatus({ message: '❌ Failed to send follow-up.', type: 'error' });
    } finally {
      setIsSendingFollowUp(false);
    }
  };

  const renderServiceCard = (service: Service) => (
    <div
      className="service-card"
      style={{ backgroundColor: service.color }}
      onClick={() => setActiveService(service.id)}
      key={service.id}
    >
      <div className="icon">{service.icon}</div>
      <h2>{service.title}</h2>
      <p className="description">{service.description}</p>
    </div>
  );

  const renderServiceContent = () => {
    switch (activeService) {
      case 'content':
        return (
          <div className="feature-card">
            <h2>🌐 AI Blog Post Publisher</h2>
            <p className="description">Write and publish blog posts directly to your WordPress site.</p>
            <input
              type="text"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              placeholder="Blog Post Title"
            />
            <textarea
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              placeholder="Write your blog post content..."
              rows={8}
            />
            <button onClick={handlePublishBlog} disabled={isPublishing}>
              {isPublishing && <Spinner />} {isPublishing ? 'Publishing...' : 'Publish to WordPress'}
            </button>
            {blogStatus.message && <div className={`status-message ${blogStatus.type}`}>{blogStatus.message}</div>}
          </div>
        );
      case 'ecommerce':
        return (
          <div className="feature-card">
            <h2>🛒 E-Commerce Automation</h2>
            <p className="description">Update product information across your e-commerce platforms.</p>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Product Name"
            />
            <input
              type="text"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Product Price"
            />
            <button onClick={handleUpdateProduct} disabled={isUpdating}>
              {isUpdating && <Spinner />} {isUpdating ? 'Updating...' : 'Update Product'}
            </button>
            {ecommerceStatus.message && <div className={`status-message ${ecommerceStatus.type}`}>{ecommerceStatus.message}</div>}
          </div>
        );
      case 'communication':
        return (
          <div className="feature-card">
            <h2>📧 Customer Communication Automation</h2>
            <p className="description">Enter lead details to trigger a personalized follow-up email and SMS after 5 minutes.</p>
            <input type="text" value={leadName} onChange={(e) => setLeadName(e.target.value)} placeholder="Lead's Name" />
            <input type="email" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} placeholder="Lead's Email" />
            <input type="text" value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} placeholder="Lead's Phone (e.g., +15551234567)" />
            <textarea value={leadMessage} onChange={(e) => setLeadMessage(e.target.value)} placeholder="Initial message or query..." rows={3} />
            <button onClick={handleSendFollowUp} disabled={isSendingFollowUp}>
              {isSendingFollowUp && <Spinner />} {isSendingFollowUp ? 'Sending...' : 'Trigger Follow-Up'}
            </button>
            {leadStatus.message && <div className={`status-message ${leadStatus.type}`}>{leadStatus.message}</div>}
          </div>
        );
      case 'feedback':
        return (
          <div className="feature-card">
            <h2>🧠 Customer Feedback Analyzer</h2>
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Paste customer feedback here..." rows={4} />
            <button onClick={handleAnalyzeClick} disabled={isLoading}>
              {isLoading && <Spinner />} {isLoading ? 'Analyzing...' : 'Analyze Feedback'}
            </button>
            {summary && (
              <div className="summary-section">
                <h3>AI Summary:</h3>
                <p>{summary}</p>
                <input
                  type="text"
                  value={trelloTitle}
                  onChange={(e) => setTrelloTitle(e.target.value)}
                  placeholder="Enter title for Trello task..."
                />
                <button onClick={handleCreateTaskClick} disabled={isCreatingTask || !trelloTitle}>
                  {isCreatingTask && <Spinner />} {isCreatingTask ? 'Creating...' : 'Create Trello Task'}
                </button>
              </div>
            )}
            {taskStatus.message && <div className={`status-message ${taskStatus.type}`}>{taskStatus.message}</div>}
          </div>
        );
      case 'social':
        return (
          <div className="feature-card">
            <h2>🔗 Social Media Poster</h2>
            <p className="description">Draft a post and send it to your chosen social media platform via n8n.</p>
            <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Write your social media post here..." rows={5} />
            <button onClick={handlePostToSocial} disabled={isPosting}>
              {isPosting && <Spinner />} {isPosting ? 'Posting...' : 'Post to Social Media'}
            </button>
            {postStatus.message && <div className={`status-message ${postStatus.type}`}>{postStatus.message}</div>}
          </div>
        );
      case 'crm':
        return (
          <div className="feature-card">
            <h2>📊 Lead Generation and CRM Sync</h2>
            <p className="description">Capture leads and sync them with your CRM.</p>
            {/* Add your CRM form here */}
          </div>
        );
      case 'finance':
        return (
          <div className="feature-card">
            <h2>💰 Financial Process Automation</h2>
            <p className="description">Automate your financial processes.</p>
            {/* Add your finance form here */}
          </div>
        );
      case 'team':
        return (
          <div className="feature-card">
            <h2>🤝 Internal Team Coordination</h2>
            <p className="description">Automate your team's coordination.</p>
            {/* Add your team coordination form here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main>
      <h1><b>WorkflowHub Dashboard 🚀</b></h1>
      
      {!activeService ? (
        <div className="dashboard-grid">
          {SERVICES.map(renderServiceCard)}
        </div>
      ) : (
        <div className="service-view">
          <div className="service-view-header">
            <button className="back-button" onClick={() => setActiveService(null)}>←</button>
            <h2>{SERVICES.find(s => s.id === activeService)?.title}</h2>
          </div>
          {renderServiceContent()}
        </div>
      )}
    </main>
  );
}