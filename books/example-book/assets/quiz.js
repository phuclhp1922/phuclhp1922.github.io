/* Reusable predict-then-reveal quiz for lovable-teach lessons.
   Markup contract:
     <div class="quiz">
       <p class="q">...</p>
       <button data-correct>...</button>
       <button>...</button>
       <div class="verdict">...</div>
     </div>
   One commit per question: the first click locks the answer, marks every option,
   and reveals the verdict. Retrieval only counts if you cannot walk it back. */
document.addEventListener('click', function (e) {
  var btn = e.target.closest('.quiz button');
  if (!btn) return;
  var quiz = btn.closest('.quiz');
  if (quiz.classList.contains('answered')) return;

  quiz.classList.add('answered');
  quiz.querySelectorAll('button').forEach(function (b) {
    b.disabled = true;
    b.classList.add(b.hasAttribute('data-correct') ? 'is-right' : 'is-wrong');
  });
  if (!btn.hasAttribute('data-correct')) btn.classList.add('is-wrong');

  quiz.querySelector('.verdict').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
