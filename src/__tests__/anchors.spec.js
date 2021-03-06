import test from 'tape';
import { convertArcToEndPoint, getSegmentAnchors } from '../anchors';
import { complexPath, hardEdgePath, pathWithArc } from './fixtures';

test('anchors.convertArcToEndPoint', (t) => {
  t.deepEqual(
    convertArcToEndPoint(['A', 45, 45, 0, 0, 1, 125, 275]),
    ['A', 125, 275],
    'should strip an arc command down to just the end point',
  );
  t.deepEqual(
    convertArcToEndPoint(['M', 80, 230]),
    ['M', 80, 230],
    'should leave other commands untouched',
  );
  t.end();
});

test('anchors.getSegmentAnchors', (t) => {
  const msg = 'should reduce a path to a list of anchor point tuples';

  t.deepEqual(
    getSegmentAnchors(complexPath),
    [
      [ 10, 18.374 ], [ -1.533, -1.533 ], [ 0.25, -1.533 ], [ 0.236, 0 ],
      [ 0.428, -0.191 ], [ 0.428, -0.428 ], [ 0.428, -2.138 ],
      [ 1.709, -2.138 ], [ 1.709, 2.138 ], [ 0, 0.236 ], [ 0.192, 0.428 ],
      [ 0.428, 0.428 ], [ 0.251, 0.428 ], [ 10, 18.374 ],
    ],
    msg,
  );
  t.deepEqual(
    getSegmentAnchors(hardEdgePath),
    [
      [ 10, 10 ], [ 90, 10 ], [ 90, 90 ], [ 10, 90 ], [ 10, 90 ], [ 10, 20 ],
      [ 10, 30 ], [ 10, 10 ],
    ],
    msg,
  );
  t.deepEqual(
    getSegmentAnchors(pathWithArc),
    [
      [ 80, 230 ], [ 125, 275 ], [ 30, 275 ], [ 125, 275 ], [ 125, 30 ],
      [ 125, 230 ],
    ],
    msg,
  );
  t.end();
});
