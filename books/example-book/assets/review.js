/* End-of-lesson review quiz for lovable-teach.
 *
 * Why this exists, so a future lesson does not water it down:
 * recognition feels like knowing and is not. A review section at the end of a
 * lesson is retrieval practice — the thing that actually builds storage strength.
 * Three design choices follow from that and should survive any redesign:
 *
 *   1. Options SHUFFLE on every load and every retake. Re-taking a lesson must
 *      not become muscle memory for "it was the third one".
 *   2. An answer LOCKS immediately and cannot be walked back. Retrieval only
 *      counts when you had to commit.
 *   3. Missed questions produce a REVISIT link, not just a red box. The point is
 *      to send you back to the paragraph, and interleaved questions send you
 *      back to an *earlier lesson* — spacing, on purpose.
 *
 * Markup contract:
 *   <section class="review" data-key="lesson-0001">
 *     <p class="review-meta"></p>              <- filled with last attempt
 *     <div class="rq" data-revisit="#anchor" data-revisit-label="Section name">
 *       <p class="q">…</p>
 *       <div class="opts">
 *         <button data-correct>…</button>
 *         <button>…</button>
 *       </div>
 *       <div class="why">…</div>
 *     </div>
 *     <div class="scorecard"></div>
 *   </section>
 *
 * data-revisit may be a bare "#anchor" (this lesson) or "file.html#anchor"
 * (an earlier lesson — mark those questions with class "rq interleaved").
 */
(function () {
  'use strict';

  var DAY = 86400000;

  /* localStorage is a per-viewer convenience here and nothing depends on it.
     On file:// some browsers hand back an opaque origin or throw outright, so
     every read and write is guarded and the page renders identically without it. */
  function load(key) {
    try { return JSON.parse(localStorage.getItem('review:' + key) || 'null'); }
    catch (e) { return null; }
  }
  function save(key, value) {
    try { localStorage.setItem('review:' + key, JSON.stringify(value)); }
    catch (e) { /* private window, blocked storage, file:// — all fine */ }
  }

  /* Fisher-Yates over the element list, then re-append in the new order.
     appendChild on an existing child moves it, so the DOM ends up matching. */
  function shuffle(container) {
    var kids = Array.prototype.slice.call(container.children);
    for (var i = kids.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = kids[i]; kids[i] = kids[j]; kids[j] = tmp;
    }
    kids.forEach(function (k) { container.appendChild(k); });
  }

  function fmtDate(ts) {
    try {
      return new Date(ts).toLocaleDateString(undefined,
        { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) { return 'earlier'; }
  }

  function initReview(review) {
    var key = review.getAttribute('data-key') || 'unkeyed';
    var questions = Array.prototype.slice.call(review.querySelectorAll('.rq'));
    var scorecard = review.querySelector('.scorecard');
    var meta = review.querySelector('.review-meta');
    var total = questions.length;

    function renderMeta() {
      if (!meta) return;
      var prev = load(key);
      if (!prev || typeof prev.score !== 'number') {
        meta.textContent = '';
        meta.classList.remove('has-prev');
        return;
      }
      var age = Date.now() - prev.at;
      var line = 'Last attempt: ' + prev.score + ' / ' + prev.total +
                 ' on ' + fmtDate(prev.at) + '.';
      if (age > 6 * DAY) {
        line += ' That was a while ago — good. A cold retrieval is worth three warm ones.';
      } else if (age > 2 * DAY) {
        line += ' Well spaced. Answer from memory, not from last time.';
      } else {
        line += ' Very recent, so expect this to feel easy — that feeling is not evidence.';
      }
      meta.textContent = line;
      meta.classList.add('has-prev');
    }

    function reset() {
      questions.forEach(function (rq) {
        rq.classList.remove('answered', 'got-it', 'missed');
        var opts = rq.querySelector('.opts');
        if (opts) {
          Array.prototype.slice.call(opts.querySelectorAll('button')).forEach(function (b) {
            b.disabled = false;
            b.classList.remove('is-right', 'is-wrong', 'picked');
          });
          shuffle(opts);
        }
      });
      if (scorecard) { scorecard.innerHTML = ''; scorecard.classList.remove('shown'); }
      renderMeta();
    }

    function finish() {
      var missed = questions.filter(function (rq) { return rq.classList.contains('missed'); });
      var score = total - missed.length;
      save(key, { score: score, total: total, at: Date.now() });

      var html = '<p class="score"><span class="n">' + score + '</span> / ' + total + '</p>';

      if (missed.length === 0) {
        html += '<p>Clean sweep. The useful thing now is <strong>not</strong> to read it ' +
                'again — it is to come back in three or four days and take this cold. ' +
                'Retrieval after forgetting is what builds the durable kind of memory.</p>';
      } else {
        html += '<p>Go back to these before you close the tab. One paragraph each, ' +
                'then retake — the gap between what you thought you knew and what came ' +
                'back under pressure is the whole value of this section.</p><ul>';
        missed.forEach(function (rq) {
          var href = rq.getAttribute('data-revisit');
          var label = rq.getAttribute('data-revisit-label') || 'that section';
          var where = rq.classList.contains('interleaved')
            ? ' <em>(earlier lesson)</em>' : '';
          html += href
            ? '<li><a href="' + href + '">' + label + '</a>' + where + '</li>'
            : '<li>' + label + where + '</li>';
        });
        html += '</ul>';
      }

      html += '<button class="retake" type="button">Retake &mdash; options reshuffle</button>';
      scorecard.innerHTML = html;
      scorecard.classList.add('shown');

      var retake = scorecard.querySelector('.retake');
      if (retake) {
        retake.addEventListener('click', function () {
          reset();
          review.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
      scorecard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    review.addEventListener('click', function (e) {
      var btn = e.target.closest('.rq .opts button');
      if (!btn) return;
      var rq = btn.closest('.rq');
      if (rq.classList.contains('answered')) return;   // one commit per question

      var right = btn.hasAttribute('data-correct');
      rq.classList.add('answered', right ? 'got-it' : 'missed');
      btn.classList.add('picked');

      Array.prototype.slice.call(rq.querySelectorAll('.opts button')).forEach(function (b) {
        b.disabled = true;
        b.classList.add(b.hasAttribute('data-correct') ? 'is-right' : 'is-wrong');
      });

      if (questions.every(function (q) { return q.classList.contains('answered'); })) {
        finish();
      }
    });

    questions.forEach(function (rq) {
      var opts = rq.querySelector('.opts');
      if (opts) shuffle(opts);
    });
    renderMeta();
  }

  function boot() {
    Array.prototype.slice.call(document.querySelectorAll('.review')).forEach(initReview);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
