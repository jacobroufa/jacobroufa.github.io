'use strict';

const STORAGE_KEY = 'jacobroufa_resume';
const sectionRenderers = {
  current: displayProject,
  past: displayProject,
  skills: displaySkill,
  talks: displayTalk
};
const sectionTitles = {
  current: "Current Projects",
  past: "Past Work",
  skills: "Relevant Skills",
  talks: "Talks"
};

const resume = getResume();

(() => {
  if (!resume) {
    fetch('./resume.json')
      .then(parseJSON)
      .then(displayResume);
  } else {
    displayResume(resume);
  }
})();

// APP

function displayProject(project) {
  const items = [ 'title', 'workplace', 'start', 'end', 'description' ];

  return c('div', items.map((item) => {
    switch (item) {
      case 'title':
        return c('h3', project[item]);
      case 'workplace':
        return c('h4', project[item]);
      case 'start':
        return c('span', project[item]);
      case 'end':
        return c('span', project[item]);
      case 'description':
        return c('p', project[item]);
    }
  }));
}

function displayResume(resume) {
  const sections = Object.keys(resume).filter((s) => s !== "expires");

  displaySectionList(sections);

  sections.forEach((section) => {
    displaySection(section, resume[section]);
  });
}

function displaySection(section, data) {
  const app = getApp();
  const title = c('h2', sectionTitles[section]);

  if (!Array.isArray(data)) {
    return null;
  }

  const contents = data.map(sectionRenderers[section]).map((el) => c('li', el));
  const list = c('ul', contents);
  const container = c('div', [ title, list ], { id: section });

  a(app, container);
}

function displaySectionList(sections) {
  const app = getApp();
  const list = c('ul', sections.map((section) => c('li', c('a', sectionTitles[section], {
    href: `#${section}`
  }))));

  a(app, list);
}

function displaySkill(section) {
  const items = [ 'skill', 'skills' ];

  return c('div', items.map((item) => {
    switch (item) {
      case 'skill':
        return c('h3', section[item]);
      case 'skills':
        return c('ul', section[item].map((skill) => c('li', skill)));
    }
  }));
}

function displayTalk(talk) {
  const items = [ 'title', 'presented', 'video', 'slides', 'description' ];

  return c('div', items.map((item) => {
    switch (item) {
      case 'title':
        return c('h3', talk[item]);
      case 'presented':
        return c('h4', talk[item]);
      case 'video':
        return c('a', talk[item], { href: talk[item] });
      case 'slides':
        return c('span', talk[item], { href: talk[item] });
      case 'description':
        return c('p', talk[item]);
    }
  }));
}

function getApp() {
  return document.getElementById('app');
}

function getResume() {
  const resume = localStorage.getItem(STORAGE_KEY);

  if (!resume || shouldExpire(resume.expires)) {
    return null;
  }

  return JSON.parse(resume);
}

function parseJSON(response) {
  return response.json().then(saveResume);
}

function saveResume(resume) {
  const newResume = Object.assign({}, resume, {
    expires: Date.now()
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newResume));
  } catch (e) {
    console.log('WARNING: localStorage may be full!', e);
  }

  return newResume;
}

function shouldExpire(expires, limit) {
  const expirationTime = Number.parseInt(limit, 10) || 900;
  const start = expires || 0;
  const now = Date.now();
  const diffSeconds = Math.floor((now - expires) / 1000);

  // expire after 15 minutes
  if (diffSeconds > expirationTime) {
    return true;
  }

  return false;
}

// DOM

function a(el, contents) {
  el.appendChild(contents);

  return el;
}

function c(tag, contents, attrs) {
  const el = document.createElement(tag);

  if (attrs) {
    Object.keys(attrs).forEach((attr) => {
      el[attr] = attrs[attr];
    });
  }

  if (!contents) {
    return el;
  }

  const type = Array.isArray(contents) ? 'array'
    : typeof contents;

  if (type === 'string') {
    el.textContent = contents;
  } else if (type === 'array') {
    contents.forEach((item) => a(el, item));
  } else if (type === 'object') {
    a(el, contents);
  }

  return el;
}
