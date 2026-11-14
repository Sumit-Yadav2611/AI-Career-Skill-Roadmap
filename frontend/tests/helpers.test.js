import test from 'node:test';
import assert from 'node:assert/strict';
import {
  classNames,
  formatTime,
  calculateSkillGap
} from '../src/utils/helpers.js';

test('classNames joins truthy class names', () => {
  assert.equal(classNames('card', false, null, 'active'), 'card active');
});

test('formatTime formats minutes and seconds', () => {
  assert.equal(formatTime(0), '00:00');
  assert.equal(formatTime(65), '01:05');
  assert.equal(formatTime(300), '05:00');
});

test('formatTime handles invalid and negative input safely', () => {
  assert.equal(formatTime(-10), '00:00');
  assert.equal(formatTime('invalid'), '00:00');
});

test('calculateSkillGap matches skill names case-insensitively and trims whitespace', () => {
  const result = calculateSkillGap(
    [{ name: '  react.js ', proficiency: 'Intermediate', source: 'self-reported' }],
    [
      { id: 'react', name: 'React.js', level: 'Advanced', category: 'Frontend' },
      { id: 'docker', name: 'Docker', level: 'Beginner', category: 'DevOps' }
    ]
  );

  assert.equal(result.percentage, 50);
  assert.equal(result.totalRequired, 2);
  assert.equal(result.acquired.length, 1);
  assert.equal(result.acquired[0].userLevel, 'Intermediate');
  assert.equal(result.acquired[0].level, 'Advanced');
  assert.equal(result.acquired[0].verified, false);
  assert.equal(result.missing[0].name, 'Docker');
});

test('calculateSkillGap supports string skills and empty data', () => {
  const result = calculateSkillGap(
    ['JavaScript'],
    [{ name: 'JavaScript', level: 'Intermediate' }]
  );

  assert.equal(result.percentage, 100);
  assert.equal(result.acquired[0].userLevel, null);
  assert.equal(result.acquired[0].source, 'self-reported');

  const empty = calculateSkillGap([], []);
  assert.equal(empty.totalRequired, 0);
  assert.equal(empty.percentage, null);
  assert.deepEqual(empty.acquired, []);
  assert.deepEqual(empty.missing, []);
});

test('calculateSkillGap ignores malformed and blank skill entries', () => {
  const result = calculateSkillGap(
    [null, {}, { name: '' }, { name: 'SQL', proficiency: 'Beginner' }],
    [null, {}, { name: '   ' }, { name: 'SQL', level: 'Advanced' }, { name: 'Docker' }]
  );

  assert.equal(result.totalRequired, 2);
  assert.equal(result.acquired.length, 1);
  assert.equal(result.acquired[0].userLevel, 'Beginner');
  assert.equal(result.missing.length, 1);
  assert.equal(result.missing[0].name, 'Docker');
});
