import './src/components/scrolltop.js';
import './src/components/menu.js';
import './src/components/workplaces.js';
import './src/components/community.js';
import './src/components/skills.js';

(() => {
  fetch('./resume.json')
    .then(res => res.json())
    .then(displayResume);

  const portfolioDismiss = document.querySelector('p.art-portfolio > a.dismiss');
  portfolioDismiss.addEventListener('click', () => {
    portfolioDismiss.parentElement.classList.add('fadeout');
    setTimeout(() => portfolioDismiss.parentElement.remove(), 300);
  });
})();

function displayResume(json) {
    const menu = document.querySelector('side-menu');
    menu.currentCount = json.current.length;
    menu.items = Object.keys(json).filter((s) => s !== "version");

    const current = document.getElementById('current-content');
    current.item = json.current;

    const skills = document.getElementById('skillset-content');
    skills.items = json.skills;

    const community = document.getElementById('community-content');
    community.items = json.community;

    const past = document.getElementById('past-content');
    past.items = json.past;
}