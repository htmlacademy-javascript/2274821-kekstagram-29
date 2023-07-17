import './actions-modal.js';
import './form.js';
import './form-validate.js';
import './actions-modal.js';
import { getData } from './api.js';
import { createMiniaturePosts } from './create-miniature-posts.js';
import { showAlert } from './util.js';
import './form-message.js';

// Показываем миниатюры фотографий
try {
  const data = await getData();
  createMiniaturePosts(data);
} catch (err) {
  showAlert(err.message);
}
