export const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .page {
    min-height: 100vh;
    background: #f0f0ed;
    background-image:
      radial-gradient(circle at 20% 20%, rgba(99,102,241,0.06) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(236,72,153,0.04) 0%, transparent 50%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Outfit', sans-serif;
    padding: 24px;
    position: relative;
    overflow: hidden;
  }

  /* Subtle grid pattern on page */
  .page::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  /* Floating blobs */
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    pointer-events: none;
    animation: blobFloat 8s ease-in-out infinite alternate;
  }

  .blob-1 {
    width: 320px; height: 320px;
    background: rgba(99,102,241,0.09);
    top: -80px; left: -80px;
    animation-delay: 0s;
  }

  .blob-2 {
    width: 240px; height: 240px;
    background: rgba(236,72,153,0.07);
    bottom: -60px; right: -60px;
    animation-delay: -3s;
  }

  @keyframes blobFloat {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(20px, 20px) scale(1.06); }
  }

  /* ─── TRIGGER BUTTON ─── */
  .trigger-btn {
    padding: 14px 32px;
    background: #fff;
    border: 1.5px solid #e2e2e0;
    border-radius: 100px;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #1a1a2e;
    cursor: pointer;
    letter-spacing: 0.03em;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
    position: relative;
    z-index: 1;
  }

  .trigger-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(0,0,0,0.12);
    border-color: #c8c8c4;
  }

  /* ─── OVERLAY ─── */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 15, 20, 0.45);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    padding: 24px;
    animation: overlayIn 0.25s ease both;
  }

  @keyframes overlayIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .overlay.closing {
    animation: overlayOut 0.22s ease both;
  }

  @keyframes overlayOut {
    from { opacity: 1; }
    to   { opacity: 0; }
  }

  /* ─── MODAL CARD ─── */
  .modal {
    background: #ffffff;
    border-radius: 20px;
    width: 100%;
    max-width: 420px;
    overflow: hidden;
    position: relative;
    box-shadow:
      0 0 0 1px rgba(0,0,0,0.04),
      0 24px 60px rgba(0,0,0,0.14),
      0 8px 20px rgba(0,0,0,0.06);
    animation: modalIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.88) translateY(16px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  .modal.closing {
    animation: modalOut 0.22s ease both;
  }

  @keyframes modalOut {
    from { opacity: 1; transform: scale(1); }
    to   { opacity: 0; transform: scale(0.94); }
  }

  /* Decorative top bar */
  .modal-bar {
    height: 4px;
    background: linear-gradient(90deg, #6366f1, #a78bfa, #ec4899);
  }

  /* ─── MODAL HEADER ─── */
  .modal-header {
    padding: 32px 36px 0;
    position: relative;
  }

  .modal-close {
    position: absolute;
    top: 22px;
    right: 26px;
    width: 32px;
    height: 32px;
    border: none;
    background: #f4f4f2;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #888;
    transition: background 0.18s, color 0.18s, transform 0.18s;
  }

  .modal-close:hover {
    background: #ebebea;
    color: #333;
    transform: rotate(90deg);
  }

  .modal-logo {
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, #6366f1 0%, #a78bfa 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    box-shadow: 0 6px 16px rgba(99,102,241,0.28);
  }

  .modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 30px;
    font-weight: 600;
    color: #0f0f1a;
    line-height: 1.15;
    margin-bottom: 6px;
  }

  .modal-sub {
    font-size: 13px;
    color: #9b9ba8;
    font-weight: 300;
    margin-bottom: 0;
    line-height: 1.5;
  }

  .modal-sub a {
    color: #6366f1;
    text-decoration: none;
    font-weight: 500;
  }

  .modal-sub a:hover { text-decoration: underline; }

  /* ─── MODAL BODY ─── */
  .modal-body {
    padding: 28px 36px 36px;
  }

  /* ─── FIELD ─── */
  .field {
    margin-bottom: 18px;
  }

  .field-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 7px;
  }

  .label-text {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #6b6b7a;
  }

  .forgot-link {
    font-size: 12px;
    color: #6366f1;
    text-decoration: none;
    font-weight: 400;
  }

  .forgot-link:hover { text-decoration: underline; }

  .input-wrap {
    position: relative;
  }

  .field-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #bbbbc6;
    pointer-events: none;
    transition: color 0.2s;
    display: flex;
  }

  .input-wrap:focus-within .field-icon {
    color: #6366f1;
  }

  .field-input {
    width: 100%;
    padding: 13px 14px 13px 42px;
    border: 1.5px solid #e8e8ec;
    border-radius: 12px;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #0f0f1a;
    background: #fafafa;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    letter-spacing: 0.01em;
  }

  .field-input::placeholder { color: #c2c2cc; }

  .field-input:focus {
    border-color: #6366f1;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(99,102,241,0.1);
  }

  .field-input.has-error {
    border-color: #f43f5e;
    background: #fff5f6;
  }

  .field-input.has-error:focus {
    box-shadow: 0 0 0 4px rgba(244,63,94,0.1);
  }

  .pass-toggle {
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #bbbbc6;
    padding: 4px;
    display: flex;
    transition: color 0.2s;
  }

  .pass-toggle:hover { color: #6366f1; }

  .field-error {
    margin-top: 6px;
    font-size: 12px;
    color: #f43f5e;
    display: flex;
    align-items: center;
    gap: 5px;
    animation: errSlide 0.25s ease both;
  }

  @keyframes errSlide {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ─── OPTIONS ROW ─── */
  .options-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .check-label {
    display: flex;
    align-items: center;
    gap: 9px;
    cursor: pointer;
    font-size: 13px;
    color: #6b6b7a;
    user-select: none;
    transition: color 0.18s;
  }

  .check-label:hover { color: #333; }

  .check-box {
    width: 17px;
    height: 17px;
    border: 1.5px solid #d0d0da;
    border-radius: 5px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: border-color 0.18s, background 0.18s;
  }

  .check-box.on {
    background: #6366f1;
    border-color: #6366f1;
  }

  /* ─── SUBMIT ─── */
  .btn-submit {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: #fff;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.18s, box-shadow 0.2s, opacity 0.2s;
    box-shadow: 0 6px 20px rgba(99,102,241,0.32);
  }

  .btn-submit::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 60%);
    pointer-events: none;
  }

  .btn-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(99,102,241,0.38);
  }

  .btn-submit:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(99,102,241,0.25);
  }

  .btn-submit:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .btn-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .spinner {
    width: 15px; height: 15px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.65s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ─── DIVIDER ─── */
  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 22px 0;
  }

  .div-line {
    flex: 1;
    height: 1px;
    background: #ebebef;
  }

  .div-text {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #c2c2cc;
  }

  /* ─── SOCIAL ─── */
  .social-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .btn-social {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px 16px;
    border: 1.5px solid #e8e8ec;
    border-radius: 10px;
    background: #fff;
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #3d3d50;
    cursor: pointer;
    transition: border-color 0.18s, background 0.18s, transform 0.15s, box-shadow 0.18s;
    letter-spacing: 0.01em;
  }

  .btn-social:hover {
    border-color: #c8c8d4;
    background: #fafafc;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  }

  /* ─── SUCCESS ─── */
  .success-body {
    padding: 40px 36px 44px;
    text-align: center;
    animation: fadeIn 0.4s ease both;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.96); }
    to   { opacity: 1; transform: scale(1); }
  }

  .success-ring {
    width: 68px; height: 68px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #a78bfa);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 22px;
    box-shadow: 0 10px 28px rgba(99,102,241,0.3);
    animation: popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.1s both;
  }

  @keyframes popIn {
    from { transform: scale(0); }
    to   { transform: scale(1); }
  }

  .success-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 600;
    color: #0f0f1a;
    margin-bottom: 8px;
  }

  .success-msg {
    font-size: 13px;
    color: #9b9ba8;
    line-height: 1.6;
    font-weight: 300;
  }

  .success-close {
    margin-top: 28px;
    padding: 12px 32px;
    border-radius: 100px;
    border: 1.5px solid #e8e8ec;
    background: #fff;
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #3d3d50;
    cursor: pointer;
    transition: background 0.18s, border-color 0.18s;
  }

  .success-close:hover {
    background: #f4f4f8;
    border-color: #d0d0dc;
  }

  /* ─── PASSWORD STRENGTH ─── */
  .strength-bar {
    display: flex;
    gap: 4px;
    margin-top: 8px;
  }

  .strength-seg {
    flex: 1;
    height: 3px;
    border-radius: 10px;
    background: #e8e8ec;
    transition: background 0.3s;
  }

  .strength-seg.active-weak   { background: #f43f5e; }
  .strength-seg.active-fair   { background: #f59e0b; }
  .strength-seg.active-strong { background: #10b981; }

  .strength-label {
    font-size: 11px;
    margin-top: 4px;
    font-weight: 500;
    transition: color 0.3s;
  }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 480px) {
    .page { padding: 12px; }
    .modal { max-width: 100%; border-radius: 16px; }
    .modal-header { padding: 26px 22px 0; }
    .modal-body { padding: 22px 22px 28px; }
    .modal-title { font-size: 24px; }
    .modal-logo { width: 40px; height: 40px; margin-bottom: 16px; }
    .field-input { padding: 12px 12px 12px 40px; font-size: 16px; }
    .btn-submit { padding: 13px; }
    .success-body { padding: 32px 22px 36px; }
  }

  @media (max-width: 360px) {
    .modal-header { padding: 22px 16px 0; }
    .modal-body { padding: 18px 16px 24px; }
  }

  /* Respect reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    .blob, .overlay, .modal, .modal.closing, .overlay.closing,
    .success-ring, .success-body, .spinner, .field-error {
      animation: none !important;
    }
  }
`;