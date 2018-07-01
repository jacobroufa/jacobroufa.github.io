'use strict';

let _app;
let _scrollTop;

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

(() => {
  const resume = getResume();

  if (!resume) {
    fetch('./resume.json')
      .then(parseJSON)
      .then(displayResume);
  } else {
    displayResume(resume);
  }

  window.addEventListener('scroll', showScrollTop);
})();

// APP

function displayProject(project) {
  const items = [ 'title', 'workplace', 'start', 'description' ];

  return c('div', items.map((item) => {
    const value = project[item];

    switch (item) {
      case 'title':
        return c('h3', value, { style: 'display: inline-block; margin-left: -1em;' });
      case 'workplace':
        return c('h4', value, { style: 'display: inline-block; margin-left: 1em;' });
      case 'start':
        let projectEnd = project.end || 'present';
        let content = `${value} - ${projectEnd}`;
        return c('div', content);
      case 'description':
        return c('p', value);
    }
  }));
}

function displayResume(resume) {
  const app = getApp();
  const sections = Object.keys(resume).filter((s) => s !== "expires");

  app.style.position = "relative";

  a(app, c('div', c('h1', 'Jacob M. Roufa', { style: 'margin: 0;' }), {
    style: 'background: #fff; left: 10vw; padding: 1em 0; position: fixed; top: 0; width: 100vw; z-index: 1;'
  }));

  displaySectionList(sections);

  a(app, c('div', sections.map((section) => {
    return displaySection(section, resume[section]);
  }), {
    style: 'margin: 5.5em 10vw; width: 80vw;'
  }));

  displayScrollTop();
}

function displayScrollTop() {
  const app = getApp();
  _scrollTop = c('div', 'Back to Top', {
    style: 'background: #fff; cursor: pointer; display: none; padding: 1em 0; position: fixed; right: 1em; top: 0; z-index: 2;'
  });

  a(app, _scrollTop);

  _scrollTop.addEventListener('click', scrollToTop);
}

function displaySection(section, data) {
  const anchor = c('a', null, {
    name: section,
    style: 'position: absolute; top: -5.5em;'
  });
  const title = c('h2', sectionTitles[section]);

  if (!Array.isArray(data)) {
    return null;
  }

  const contents = data.map(sectionRenderers[section]).map((el) => c('li', el));
  const list = c('ul', contents, {
    style: "list-style-type: none;"
  });

  return c('div', [ anchor, title, list ], { style: 'margin-bottom: 2em; position: relative;' });
}

function displaySectionList(sections) {
  const app = getApp();
  const list = c('ul', sections.map((section) => c('li', c('a', sectionTitles[section], {
    href: `#${section}`
  }), {
    style: 'padding: 0.5em;'
  })), {
    style: 'list-style-type: none; margin: 0; padding: 0;'
  });

  a(app, c('div', list, {
    style: 'background: #fff; position: fixed; top: 5em; width: 8vw;'
  }));
}

function displaySkill(section) {
  const items = [ 'skill', 'skills' ];

  return c('div', items.map((item) => {
    switch (item) {
      case 'skill':
        return c('h3', section[item], { style: 'margin: 0.5em 0 0.5em -1em;' });
      case 'skills':
        return c('ul', section[item].map((skill) => c('li', skill, {
          style: 'border: 1px solid #ddd; border-radius: 6px; display: inline-block; margin: 0.25em; padding: 0.25em 0.5em;'
        })), {
          style: 'display: inline-flex; flex-wrap: wrap; list-style-type: none; max-width: 50vw; padding: 0;'
        });
    }
  }));
}

function displayTalk(talk) {
  const items = [ 'title', 'presented', 'video', 'slides', 'description' ];

  return c('div', items.map((item) => {
    const value = talk[item];

    if (!value) {
      return null;
    }

    switch (item) {
      case 'title':
        return c('h3', value, { style: 'margin-left: -1em;' });
      case 'presented':
        return c('h4', value);
      case 'video':
        return c('a', 'Watch the Video', { href: value, style: 'margin-right: 1em;' });
      case 'slides':
        return c('a', 'View the Slides', { href: value });
      case 'description':
        return c('p', value);
    }
  }).filter((v) => v !== null));
}

function getApp() {
  if (!_app) {
    _app = document.getElementById('app');
  }

  return _app;
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

function scrollToTop() {
  const location = window.location.href.split('#')[0];

  window.history.pushState({}, "", location);
  window.pageYOffset = 0;
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
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

function showScrollTop() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  _scrollTop.style.display = "none";

  if (scrollTop > 200) {
    _scrollTop.style.display = "inherit";
  }
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
