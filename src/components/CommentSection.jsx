import React, { useState } from 'react';
import { postComment } from '../services/hotelService.js';
import { useAuth } from '../hooks/useAuth.js';

/**
 * CommentSection — Reviews with validation
 * - .trim() on comment text; disable Send if only whitespace
 * - maxLength=500
 * - Image upload with accept + JS file.type check
 */
export default function CommentSection({ hotelId, comments: initialComments }) {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState(initialComments || []);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  const trimmedText = text.trim();
  const canSubmit = trimmedText.length > 0 && !submitting && isAuthenticated;

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFileError('');

    if (!selected) {
      setFile(null);
      setFileName('');
      return;
    }

    // JavaScript file.type check as second layer of security
    if (!ALLOWED_TYPES.includes(selected.type)) {
      setFileError('Sadece JPEG, PNG ve WebP dosyaları kabul edilir.');
      setFile(null);
      setFileName('');
      e.target.value = '';
      return;
    }

    setFile(selected);
    setFileName(selected.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      let imageUrl = null;
      if (file) {
        // In production, upload to server; here we create a local URL
        imageUrl = URL.createObjectURL(file);
      }

      const newComment = await postComment(hotelId, {
        author: user?.name || 'Misafir',
        text: trimmedText,
        rating,
        image: imageUrl,
      });

      setComments((prev) => [newComment, ...prev]);
      setText('');
      setRating(5);
      setFile(null);
      setFileName('');
    } catch (err) {
      console.error('Yorum gönderilemedi:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (count) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className="comment-section" id="comment-section">
      <h2>Değerlendirmeler ({comments.length})</h2>

      {/* Comment Form */}
      {isAuthenticated ? (
        <form className="comment-form" onSubmit={handleSubmit} id="comment-form">
          <div className="form-group">
            <label htmlFor="comment-rating">Puanınız</label>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  style={{
                    background: 'none',
                    fontSize: '1.5rem',
                    color: star <= rating ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    transition: 'color 0.15s ease',
                    padding: '2px',
                  }}
                  id={`star-${star}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comment-text">Yorumunuz</label>
            <textarea
              id="comment-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={500}
              placeholder="Deneyiminizi paylaşın..."
              rows={4}
            />
            <div className="char-count">{text.length}/500</div>
          </div>

          <div className="comment-actions">
            <div className="file-upload-wrapper">
              <label htmlFor="comment-image">
                Fotograf Ekle
              </label>
              <input
                type="file"
                id="comment-image"
                accept="image/jpeg, image/png, image/webp"
                onChange={handleFileChange}
              />
              {fileName && <span className="file-name">{fileName}</span>}
              {fileError && (
                <span style={{ color: 'var(--color-danger)', fontSize: 'var(--fs-xs)' }}>
                  {fileError}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={!canSubmit}
              id="submit-comment-btn"
            >
              {submitting ? 'Gönderiliyor...' : 'Gönder'}
            </button>
          </div>
        </form>
      ) : (
        <div className="comment-form" style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
          Yorum yapmak için <a href="/login" style={{ color: 'var(--color-accent)' }}>giriş yapın</a>.
        </div>
      )}

      {/* Comment List */}
      <div className="comment-list">
        {comments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">--</div>
            <h3>Henüz yorum yok</h3>
            <p>İlk yorumu siz yapın!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div className="comment-card" key={comment.id} id={`comment-${comment.id}`}>
              <div className="comment-header">
                <div className="comment-avatar">
                  {comment.author?.charAt(0).toUpperCase()}
                </div>
                <div className="comment-meta">
                  <div className="comment-author">{comment.author}</div>
                  <div className="comment-date">{comment.date}</div>
                </div>
              </div>
              {comment.rating && (
                <div className="comment-rating">
                  {renderStars(comment.rating)}
                </div>
              )}
              <div className="comment-body">{comment.text}</div>
              {comment.image && (
                <div className="comment-image">
                  <img src={comment.image} alt="Yorum görseli" />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
