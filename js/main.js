import './actions-modal.js';
import './form.js';
import './form-validate.js';
import { data } from './api.js';
import { createMiniaturePosts } from './create-miniature-posts.js';
import { showAlert } from './util.js';
import './form-message.js';

// Показываем миниатюры фотографий
try {
  createMiniaturePosts(data);
} catch (err) {
  showAlert(err.message);
}
