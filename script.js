const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const models = {
  seed: { type: 'KM / 001 · LANGUAGE', title: 'Arabic Seed', copy: 'تجربة مفاهيمية تبدأ من سؤال اللغة: شلون نكتب نص عربي يبقى واضح، قريب، ومفتوح للخيال؟' },
  frame: { type: 'KM / 002 · VISION', title: 'Frame Finder', copy: 'دراسة بصرية عن اللحظة التي تتوقف بيها العين. النموذج هنا ملاحظات وتصميم، مو وعد بنتيجة آلية.' },
  echo: { type: 'KM / 003 · AUDIO', title: 'Echo Room', copy: 'مساحة صوتية صغيرة تسأل شلون نرتب الإيقاع، الهدوء، والفراغ حتى يصير للصوت حضور.' }
};
const search = $('#search');
const tabs = $$('.tab');
const cards = $$('.model-card');
function filterCards() {
  const query = search.value.trim().toLowerCase();
  const category = $('.tab.active').dataset.category;
  let visible = 0;
  cards.forEach((card) => {
    const matchCategory = category === 'all' || card.dataset.category === category;
    const matchQuery = !query || card.dataset.search.includes(query);
    const show = matchCategory && matchQuery;
    card.classList.toggle('is-hidden', !show);
    if (show) visible += 1;
  });
  $('#emptyState').classList.toggle('show', visible === 0);
}
tabs.forEach((tab) => tab.addEventListener('click', () => { tabs.forEach((item) => item.classList.remove('active')); tab.classList.add('active'); filterCards(); }));
search.addEventListener('input', filterCards);
$$('.details').forEach((button) => button.addEventListener('click', () => {
  const model = models[button.dataset.model];
  $('#modalType').textContent = model.type;
  $('#modalTitle').textContent = model.title;
  $('#modalCopy').textContent = model.copy;
  $('#modelModal').classList.add('open');
  $('#modelModal').setAttribute('aria-hidden', 'false');
}));
$$('[data-close]').forEach((button) => button.addEventListener('click', () => { $('#modelModal').classList.remove('open'); $('#modelModal').setAttribute('aria-hidden', 'true'); }));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') $('#modelModal').classList.remove('open'); });
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .12 });
$$('.reveal').forEach((element) => observer.observe(element));

